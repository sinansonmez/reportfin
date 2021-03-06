import {Arg, Field, Int, Mutation, ObjectType, Query, Resolver, UseMiddleware} from "type-graphql";
import {Report} from "../entities/Report";
import {Bank} from "../entities/Bank";
import {isAuth} from "../middleware/isAuth";
import {getConnection, LessThan} from "typeorm";
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

    /* this is returning report as this shape
         {
          id: 163,
          year: '2008',
          quarter: '2Q',
          link: 'bbc.co.uk/congue/risus/semper/porta.json',
          downloadCount: 0,
          bankId: 1,
          createdAt: 2022-01-02T15:59:31.000Z,
          updatedAt: 2022-01-11T21:46:38.516Z,
          bank: [Object]
          }
      }
    */
    /*const reports = await getConnection().query(`
        SELECT report.*,
               JSON_BUILD_OBJECT(
                       'id', bank.id,
                       'name', bank.name,
                       'continent', bank.continent,
                       'country', bank.country,
                       'website', bank.website,
                       'logo', bank.logo
                   ) bank
        FROM report
                 INNER JOIN bank ON bank.id = report."bankId"
            ${cursor ? `WHERE report."createdAt" < $2` : ''}
        ORDER BY report."createdAt" DESC
        LIMIT $1
    `, replacements);*/

    const reports = await Report.find({
      where: cursor ? {createdAt: LessThan(replacements[1])} : {},
      take: replacements[0],
      relations: ["bank"]
    });

    return {reports: reports.slice(0, realLimit), hasMore: reports.length === realLimitPlusOne};
  }

  @Query((_returns) => Report, {nullable: true})
  report(@Arg("id", _returns => Int) id: number): Promise<Report | undefined> {
    return Report.findOne(id, {relations: ["bank"]});
  }

  @Mutation((_returns) => Boolean)
  async increaseDownloadCount(
    @Arg("id", _returns => Int) id: number,
  ): Promise<boolean> {
    await Report.update({id}, {downloadCount: () => `"downloadCount" + 1`})
    return true
  }

  @Mutation((_returns) => Report)
  @UseMiddleware(isAuth)
  async createReport(
    @Arg("options") options: CreateReportInput,
  ): Promise<Report> {
    const bankRecord = await Bank.findOne({where: {name: options.bank}})
    if (!bankRecord) throw new Error("Bank not found")
    if (options.year.length !== 4) throw new Error("Invalid year format")

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
    @Arg("id", _returns => Int) id: number,
    @Arg("year") year: string,
    @Arg("quarter") quarter: string,
    @Arg("link") link: string,
  ): Promise<Report> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Report)
      .set({year, quarter, link})
      .where("id = :id", {id})
      .returning("*")
      .execute()

    return result.raw[0]
  }

  @Mutation((_returns) => Boolean, {nullable: true})
  @UseMiddleware(isAuth)
  async deleteReport(
    @Arg("id", _returns => Int) id: number,
  ): Promise<boolean> {
    const report = await Report.findOne(id)
    if (!report) throw new Error("Report not found")

    await Report.delete(id);
    return true
  }

}