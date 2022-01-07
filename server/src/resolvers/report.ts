import {Arg, Ctx, Mutation, Query, Resolver} from "type-graphql";
import {Report} from "../entities/Report";
import {Bank} from "../entities/Bank";
import {MyContext} from "../types";

@Resolver()
export class ReportResolver {

  @Query((_returns) => [Report])
  reports(): Promise<Report[]> {
    return Report.find()
  }

  @Query((_returns) => Report, {nullable: true})
  report(@Arg("id") id: number): Promise<Report | undefined> {
    return Report.findOne(id)
  }

  @Mutation((_returns) => Report)
  async createReport(
    @Arg("year") year: string,
    @Arg("quarter") quarter: string,
    @Arg("link") link: string,
    @Arg("bank") bank: Bank,
    @Ctx() {req}: MyContext
  ): Promise<Report> {
    if (!req.session.userId) throw new Error("not authenticated")
    const report = Report.create({year, quarter, link, bank, bankId: bank.id})
    await report.save()
    return report;
  }

  // think about what other fields we want to update in the future, maybe website?
  @Mutation((_returns) => Report, {nullable: true})
  async updateReport(
    @Arg("id") id: number,
    @Arg("link") link: string,
    @Ctx() {req}: MyContext
  ): Promise<Report> {
    if (!req.session.userId) throw new Error("not authenticated")
    const report = await Report.findOne(id)
    if (!report) throw new Error("Bank not found");
    if (typeof link !== "undefined") {
      await Report.update({id}, {link}) // update logo
    }
    return report;
  }

  @Mutation((_returns) => Boolean, {nullable: true})
  async deleteReport(
    @Arg("id") id: number,
    @Ctx() {req}: MyContext
  ): Promise<boolean> {
    if (!req.session.userId) throw new Error("not authenticated")
    const report = await Report.findOne(id)
    if (!report) return false

    await Report.delete(id);
    return true
  }

}