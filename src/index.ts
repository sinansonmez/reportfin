import "reflect-metadata";
import "dotenv-safe/config";
import express from "express";
import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import {BankResolver} from "./resolvers/bank";
import {UserResolver} from "./resolvers/user";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import {__prod__, COOKIE_NAME} from "./constants";
import {MyContext} from "./types";
import cors from "cors";
import {createConnection} from "typeorm"
import {Bank} from "./entities/Bank";
import {User} from "./entities/User";
import {Report} from "./entities/Report";
import {ReportResolver} from "./resolvers/report";
import path from "path";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    host: process.env.PG_HOST,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    port: parseInt(process.env.PORT),
    database: process.env.PG_DATABASE,
    logging: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Bank, User, Report],
    ssl: true,
    extra: {
      rejectUnauthorized: false,
    }
  })

  await conn.runMigrations()
  const app = express();

  const redisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);
  app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
  }))

  app.set("proxy", 1)
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
        secure: __prod__, // cookie only works in https
        domain: __prod__ ? ".vercel.app" : undefined
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false
    })
  )

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [BankResolver, UserResolver, ReportResolver],
      validate: false
    }),
    context: ({req, res}): MyContext => ({req, res, redis})
  })
  await apolloServer.start()
  apolloServer.applyMiddleware({app, cors: false});
  app.listen(parseInt(process.env.PORT), () => console.log("Server listening on port 4000"));
}

main()