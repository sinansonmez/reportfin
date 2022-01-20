import {dedupExchange, Exchange, fetchExchange, stringifyVariables} from "urql";
import {cacheExchange, Resolver} from "@urql/exchange-graphcache";
import {
  DeleteReportMutationVariables,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation
} from "../generated/graphql";
import {betterUpdateQuery} from "./betterUpdateQuery";
import {pipe, tap} from "wonka";
import Router from "next/router";
import {isServer} from "./isServer";

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
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) return undefined

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(cache.resolveFieldByKey(entityKey, fieldKey) as string, "reports")
    info.partial = !isItInTheCache;

    let hasMore = true;
    const result: string[] = []
    fieldInfos.forEach(fi => {
      const key = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string
      const data = cache.resolve(key, "reports") as string[]
      const _hasMore = cache.resolve(key, "hasMore")
      if (!_hasMore) hasMore = _hasMore as boolean
      result.push(...data)
    })
    return {
      __typename: "PaginatedReports",
      hasMore,
      reports: result
    }
  }
}

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie;
  }
  return {
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie ? {cookie} : undefined,
    },
    // cacheExchange is used to cache when user is logged in or registered or logged out
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedReports: () => null,
        },
        resolvers: {
          Query: {
            reports: cursorPagination(),
          }
        },
        updates: {
          Mutation: {
            deleteReport: (_result, args, cache, info) => {
              cache.invalidate({
                __typename: "Report",
                id: (args as DeleteReportMutationVariables).id,
              });
            },
            // this is used to update cache (refetch new reports)  when user creates a new report
            createReport: (_result, args, cache, info) => {
              const allFields = cache.inspectFields("Query");
              const fieldInfos = allFields.filter((info) => info.fieldName === "reports");
              fieldInfos.forEach((fi) => {
                cache.invalidate('Query', "reports", fi.arguments || {})
              })
            },
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
  }
}