import {ChakraProvider, ColorModeProvider} from '@chakra-ui/react'
import theme from "../theme"
import {createClient, dedupExchange, fetchExchange, Provider} from "urql";
import {cacheExchange, Cache, QueryInput} from "@urql/exchange-graphcache";
import {LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation} from "../generated/graphql";

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, data => fn(result, data as any) as any)
}

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  // cacheExchange is used to cache when user is logged in or registered
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
  }), fetchExchange]
});

function MyApp({Component, pageProps}: any) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
