import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {Report} from "../entities/Report";
import {Bank} from "../entities/Bank";

@Resolver()
export class ReportResolver {

  @Query((_returns) => [Report])
  reports(): Promise<Report[]> {
    return Report.find()
  }

  @Query((_returns) => Report, {nullable: true})
  bank(@Arg("id") id: number): Promise<Report | undefined> {
    return Report.findOne(id)
  }

  @Mutation((_returns) => Report)
  async createBank(
    @Arg("year") year: string,
    @Arg("quarter") quarter: string,
    @Arg("link") link: string,
    @Arg("bank") bank: Bank,
  ): Promise<Report> {
    const report = Report.create({year, quarter, link, bank, bankId: bank.id})
    await report.save()
    return report;
  }

  // think about what other fields we want to update in the future, maybe website?
  @Mutation((_returns) => Report, {nullable: true})
  async updateBank(
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
  async deleteBank(@Arg("id") id: number,): Promise<boolean> {
    const report = await Report.findOne(id)
    if (!report) return false

    await Report.delete(id);
    return true
  }

}