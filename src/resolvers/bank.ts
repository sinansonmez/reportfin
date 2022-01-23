import {Arg, Mutation, Query, Resolver, UseMiddleware} from "type-graphql";
import {Bank} from "../entities/Bank";
import {isAuth} from "../middleware/isAuth";
import {CreateBankInput} from "./inputs/CreateBankInput";

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
  @UseMiddleware(isAuth)
  async createBank(
    @Arg("options") options: CreateBankInput,
  ): Promise<Bank> {
    console.log("----------")
    console.log("create bank options", options);
    console.log("----------")
    const bank = Bank.create({
      name: options.name,
      continent: options.continent,
      country: options.country,
      logo: options.logo,
      website: options.website
    })
    await bank.save()
    return bank;
  }

  // think about what other fields we want to update in the future, maybe website?
  @Mutation((_returns) => Bank, {nullable: true})
  @UseMiddleware(isAuth)
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
  @UseMiddleware(isAuth)
  async deleteBank(
    @Arg("id") id: number
  ): Promise<boolean> {
    const bank = await Bank.findOne(id)
    if (!bank) return false

    await Bank.delete(id);
    return true
  }

}