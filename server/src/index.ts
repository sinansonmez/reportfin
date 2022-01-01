import "reflect-metadata";
import {MikroORM} from "@mikro-orm/core";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import {HelloResolver} from "./resolvers/hello";
import {BankResolver} from "./resolvers/bank";
import {UserResolver} from "./resolvers/user";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import {__prod__, COOKIE_NAME} from "./constants";
import {MyContext} from "./types";
import cors from "cors";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig)
  await orm.getMigrator().up();

  const app = express();

  const redisStore = connectRedis(session);
  const redis = new Redis()
  app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }))

  app.use(
    session({
      name: COOKIE_NAME,
      store: new redisStore({
        client: redis,
        disableTouch: true
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        // secure: false // cookie only works in https
        secure: __prod__ // cookie only works in https
      },
      saveUninitialized: false,
      secret: "apdjq*owek2104+'P'^I£#$ü£#[½'casjfh*012",
      resave: false
    })
  )

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, BankResolver, UserResolver],
      validate: false
    }),
    context: ({req, res}): MyContext => ({em: orm.em, req, res})
  })
  await apolloServer.start()
  apolloServer.applyMiddleware({app, cors: false});
  app.listen(4000, () => console.log("Server listening on port 4000"));
}

main()