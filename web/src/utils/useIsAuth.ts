import {useMeQuery} from "../generated/graphql";
import {useEffect} from "react";
import {useRouter} from "next/router";

export const useIsAuth = () => {
  const router = useRouter()
  const [{data, fetching}] = useMeQuery()
  useEffect(() => {
      if (!data?.me && !fetching) router.replace("/login")
    }, [fetching, data, router]
  )
}