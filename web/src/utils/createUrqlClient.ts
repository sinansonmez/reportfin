import {dedupExchange, Exchange, fetchExchange, stringifyVariables} from "urql";
import {cacheExchange, Resolver} from "@urql/exchange-graphcache";
import {LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation} from "../generated/graphql";
import {betterUpdateQuery} from "./betterUpdateQuery";
import {pipe, tap} from "wonka";
import Router from "next/router";

const errorExchange: Exchange = ({forward}) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(async ({error}) => {
      if (error?.message.includes("not authenticated")) {
        await Router.replace("/login");
      }
    })
  );
};

const cursorPagination = (): Resolver => {
  return (parent, fieldArgs, cache, info) => {
    const {parentKey: entityKey, fieldName} = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter(info => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) return undefined

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolveFieldByKey(entityKey, fieldKey)
    info.partial = !isItInTheCache;

    const result: string[] = []
    fieldInfos.forEach(fi => {
      const data = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string[]
      result.push(...data)
    })
    return result
  }
}

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  // cacheExchange is used to cache when user is logged in or registered or logged out
  exchanges: [
    dedupExchange,
    cacheExchange({
      resolvers: {
        Query: {
          reports: cursorPagination(),
        }
      },
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
    errorExchange,
    ssrExchange,
    fetchExchange]
})