import "reflect-metadata";
import {MikroORM} from "@mikro-orm/core";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import {HelloResolver} from "./resolvers/hello";
import {BankResolver} from "./resolvers/bank";
import {UserResolver} from "./resolvers/user";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig)
  await orm.getMigrator().up();

  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, BankResolver, UserResolver],
      validate: false
    }),
    context: () => ({em: orm.em})
  })
  await apolloServer.start()
  apolloServer.applyMiddleware({app});
  app.listen(4000, () => console.log("Server listening on port 4000"));
}

main()