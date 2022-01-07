import {Arg, Ctx, Mutation, Query, Resolver} from "type-graphql";
import {Bank} from "../entities/Bank";
import {MyContext} from "../types";

@Resolver()
export class BankResolver {

  @Query((_returns) => [Bank])
  banks(): Promise<Bank[]> {
    return Bank.find()
  }

  @Query((_returns) => Bank, {nullable: true})
  bank(@Arg("id") id: number): Promise<Bank | undefined> {
    return Bank.findOne(id)
  }

  @Mutation((_returns) => Bank)
  async createBank(
    @Arg("name") name: string,
    @Arg("continent") continent: string,
    @Arg("logo") logo: string,
    @Arg("country") country: string,
    @Arg("website") website: string,
    @Ctx() {req}: MyContext
  ): Promise<Bank> {
    if (!req.session.userId) throw new Error("not authenticated")

    const bank = Bank.create({name, continent, logo, country, website})
    await bank.save()
    return bank;
  }

  // think about what other fields we want to update in the future, maybe website?
  @Mutation((_returns) => Bank, {nullable: true})
  async updateBank(
    @Arg("id") id: number,
    @Arg("logo") logo: string,
    @Ctx() {req}: MyContext
  ): Promise<Bank | null> {
    if (!req.session.userId) throw new Error("not authenticated")
    const bank = await Bank.findOne(id)
    if (!bank) throw new Error("Bank not found");
    if (typeof logo !== "undefined") {
      await Bank.update({id}, {logo}) // update logo
    }
    return bank;
  }

  @Mutation((_returns) => Boolean, {nullable: true})
  async deleteBank(
    @Arg("id") id: number,
    @Ctx() {req}: MyContext
  ): Promise<boolean> {
    if (!req.session.userId) throw new Error("not authenticated")
    const bank = await Bank.findOne(id)
    if (!bank) return false

    await Bank.delete(id);
    return true
  }

}