import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {Bank} from "../entities/Bank";

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
  ): Promise<Bank> {
    const bank = Bank.create({name, continent, logo, country, website})
    await bank.save()
    return bank;
  }

  // think about what other fields we want to update in the future, maybe website?
  @Mutation((_returns) => Bank, {nullable: true})
  async updateBank(
    @Arg("id") id: number,
    @Arg("logo") logo: string,
  ): Promise<Bank | null> {
    const bank = await Bank.findOne(id)
    if (!bank) throw new Error("Bank not found");
    if (typeof logo !== "undefined") {
      await Bank.update({id}, {logo}) // update logo
    }
    return bank;
  }

  @Mutation((_returns) => Boolean, {nullable: true})
  async deleteBank(@Arg("id") id: number,): Promise<boolean> {
    const bank = await Bank.findOne(id)
    if (!bank) return false

    await Bank.delete(id);
    return true
  }

}