import {Arg, Int, Mutation, Query, Resolver, UseMiddleware} from "type-graphql";
import {Report} from "../entities/Report";
import {Bank} from "../entities/Bank";
import {isAuth} from "../middleware/isAuth";
import {getConnection} from "typeorm";
import {CreateReportInput} from "./inputs/CreateReportInput";

@Resolver()
export class ReportResolver {

  @Query((_returns) => [Report])
  reports(
    @Arg("limit", _returns => Int) limit: number,
    @Arg("cursor", _returns => String, {nullable: true}) cursor: string | null,
  ): Promise<Report[]> {
    const realLimit = Math.min(50, limit);
    const qb = getConnection()
      .getRepository(Report)
      .createQueryBuilder("report")
      .orderBy('"createdAt"', "DESC")
      .take(realLimit)

    if (cursor) qb.where('"createdAt" < :cursor', {cursor: new Date(parseInt(cursor))});

    return qb.getMany();
  }

  @Query((_returns) => Report, {nullable: true})
  report(@Arg("id") id: number): Promise<Report | undefined> {
    return Report.findOne(id)
  }

  @Mutation((_returns) => Report)
  @UseMiddleware(isAuth)
  async createReport(
    @Arg("options") options: CreateReportInput,
  ): Promise<Report> {
    const bankRecord = await Bank.findOne({where: {name: options.bank}})
    if (!bankRecord) throw new Error("Bank not found")

    const report = Report.create({
      year: options.year,
      quarter: options.quarter,
      link: options.link,
      bank: bankRecord,
      bankId: bankRecord.id
    })
    await report.save()
    return report;
  }

  // think about what other fields we want to update in the future, maybe website?
  @Mutation((_returns) => Report, {nullable: true})
  @UseMiddleware(isAuth)
  async updateReport(
    @Arg("id") id: number,
    @Arg("link") link: string,
  ): Promise<Report> {
    const report = await Report.findOne(id)
    if (!report) throw new Error("Bank not found");
    if (typeof link !== "undefined") {
      await Report.update({id}, {link}) // update logo
    }
    return report;
  }

  @Mutation((_returns) => Boolean, {nullable: true})
  @UseMiddleware(isAuth)
  async deleteReport(
    @Arg("id") id: number,
  ): Promise<boolean> {
    const report = await Report.findOne(id)
    if (!report) return false

    await Report.delete(id);
    return true
  }

}