import {dedupExchange, fetchExchange} from "urql";
import {cacheExchange} from "@urql/exchange-graphcache";
import {LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation} from "../generated/graphql";
import {betterUpdateQuery} from "./betterUpdateQuery";

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  // cacheExchange is used to cache when user is logged in or registered or logged out
  exchanges: [dedupExchange, cacheExchange({
    updates: {
      Mutation: {
        login: (_result, args, cache, _info) => {
          betterUpdateQuery<LoginMutation, MeQuery>(
            cache,
            {query: MeDocument},
            _result,
            (result, query) => {
              return result.login.errors ? query : {me: result.login.user}
            })
        },
        register: (_result, args, cache, _info) => {
          betterUpdateQuery<RegisterMutation, MeQuery>(
            cache,
            {query: MeDocument},
            _result,
            (result, query) => {
              return result.register.errors ? query : {me: result.register.user}
            })
        },
        logout: (_result, args, cache, _info) => {
          betterUpdateQuery<LogoutMutation, MeQuery>(
            cache,
            {query: MeDocument},
            _result,
            (_result, _query) => {
              return {me: null}
            })
        },
      }
    }
  }),
    ssrExchange,
    fetchExchange]
})