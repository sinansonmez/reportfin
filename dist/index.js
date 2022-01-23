"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv-safe/config");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const bank_1 = require("./resolvers/bank");
const user_1 = require("./resolvers/user");
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const constants_1 = require("./constants");
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const Bank_1 = require("./entities/Bank");
const User_1 = require("./entities/User");
const Report_1 = require("./entities/Report");
const report_1 = require("./resolvers/report");
const path_1 = __importDefault(require("path"));
const main = async () => {
    const conn = await (0, typeorm_1.createConnection)({
        type: "postgres",
        url: process.env.DATABASE_URL,
        host: process.env.PG_HOST,
        username: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        port: parseInt(process.env.PORT),
        database: process.env.PG_DATABASE,
        logging: true,
        migrations: [path_1.default.join(__dirname, "./migrations/*")],
        entities: [Bank_1.Bank, User_1.User, Report_1.Report],
        ssl: constants_1.__prod__ ? { rejectUnauthorized: false } : false
    });
    await conn.runMigrations();
    const app = (0, express_1.default)();
    const redisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redis = new ioredis_1.default(process.env.REDIS_URL);
    app.set("trust proxy", 1);
    app.use((0, cors_1.default)({
        origin: constants_1.__prod__ ? process.env.CORS_ORIGIN : "http://localhost:3000",
        credentials: true
    }));
    app.use((0, express_session_1.default)({
        name: constants_1.COOKIE_NAME,
        store: new redisStore({
            client: redis,
            disableTouch: true
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "none",
            secure: constants_1.__prod__,
            domain: constants_1.__prod__ ? "vercel.app" : undefined
        },
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        resave: false
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [bank_1.BankResolver, user_1.UserResolver, report_1.ReportResolver],
            validate: false
        }),
        context: ({ req, res }) => ({ req, res, redis })
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(parseInt(process.env.PORT), () => console.log("Server listening on port 4000"));
};
main();
//# sourceMappingURL=index.js.map