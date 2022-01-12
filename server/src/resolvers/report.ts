import {Arg, Field, Int, Mutation, ObjectType, Query, Resolver, UseMiddleware} from "type-graphql";
import {Report} from "../entities/Report";
import {Bank} from "../entities/Bank";
import {isAuth} from "../middleware/isAuth";
import {getConnection} from "typeorm";
import {CreateReportInput} from "./inputs/CreateReportInput";

@ObjectType()
class PaginatedReports {
  @Field(_returns => [Report])
  reports: Report[];

  @Field(_returns => Boolean)
  hasMore: boolean;
}

@Resolver()
export class ReportResolver {

  @Query((_returns) => PaginatedReports)
  async reports(
    @Arg("limit", _returns => Int) limit: number,
    @Arg("cursor", _returns => String, {nullable: true}) cursor: string | null,
  ): Promise<PaginatedReports> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = limit + 1;

    const replacements: any[] = [realLimitPlusOne]

    if (cursor) replacements.push(new Date(parseInt(cursor)));

    const posts = await getConnection().query(`
        SELECT *
        JSON_BUILD_OBJECT(
        "name": bank.name,
        "continent": bank.continent,
        "country": bank.country,
        "website": bank.website,
        "logo": bank.logo,
        "createdAt": report."createdAt",
        "updatedAt": report."updatedAt"
        ) bank
        FROM report
                 INNER JOIN bank ON bank.id = report."bankId"
        ORDER BY report."createdAt" DESC
            ${cursor ? `where  p."createdAt" < $2` : ''}
        LIMIT $1
    `, replacements);

    /*const qb = getConnection()
      .getRepository(Report)
      .createQueryBuilder("report")
      .innerJoinAndSelect("report.bank", "bank", 'bank.id = report."bankId"')
      .orderBy('"createdAt"', "DESC")
      .take(realLimitPlusOne)*/

    // if (cursor) qb.where('report."createdAt" < :cursor', {cursor: new Date(parseInt(cursor))});

    // const reports = await qb.getMany();

    return {reports: reports.slice(0, realLimit), hasMore: reports.length === realLimitPlusOne};
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