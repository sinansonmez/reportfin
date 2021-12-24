import {MikroORM} from "@mikro-orm/core";
// import {Bank} from "./entities/Bank";
import mikroConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig)
  await orm.getMigrator().up();

  /*const bank = orm.em.create(Bank, {
    name: "Bank of America",
    country: "USA",
    continent: "North America",
    website: "www.bankofamerica.com",
  })*/
  // await orm.em.persistAndFlush(bank)
  // const posts = await orm.em.find(Bank, {})
  // console.log(posts)

}

main()