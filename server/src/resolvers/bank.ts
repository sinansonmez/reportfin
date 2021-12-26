import {Arg, Ctx, Mutation, Query, Resolver} from "type-graphql";
import {Bank} from "../entities/Bank";
import {MyContext} from "../types";

@Resolver()
export class BankResolver {

  @Query((_returns) => [Bank])
  banks(
    @Ctx() {em}: MyContext
  ): Promise<Bank[]> {
    return em.find(Bank, {});
  }

  @Query((_returns) => Bank, {nullable: true})
  bank(
    @Arg("id") id: number,
    @Ctx() {em}: MyContext
  ): Promise<Bank | null> {
    return em.findOne(Bank, {id});
  }

  @Mutation((_returns) => Bank)
  async createBank(
    @Arg("name") name: string,
    @Arg("continent") continent: string,
    @Arg("logo") logo: string,
    @Arg("country") country: string,
    @Arg("website") website: string,
    @Ctx() {em}: MyContext
  ): Promise<Bank> {
    const bank = em.create(Bank, {name, continent, logo, country, website});
    await em.persistAndFlush(bank);
    return bank;
  }

  @Mutation((_returns) => Bank, {nullable: true})
  async updateBank(
    @Arg("id") id: number,
    @Arg("logo") logo: string,
    @Ctx() {em}: MyContext
  ): Promise<Bank | null> {
    const bank = await em.findOne(Bank, {id});
    if (!bank) throw new Error("Bank not found");
    if (typeof logo !== "undefined") {
      bank.logo = logo
      await em.persistAndFlush(bank);
    }
    return bank;
  }

  @Mutation((_returns) => Boolean, {nullable: true})
  async deleteBank(
    @Arg("id") id: number,
    @Ctx() {em}: MyContext
  ): Promise<boolean> {
    const bank = await em.findOne(Bank, {id});
    if (!bank) return false

    await em.removeAndFlush(bank);
    return true
  }

}