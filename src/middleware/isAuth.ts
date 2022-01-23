import {MiddlewareFn} from "type-graphql";
import {MyContext} from "../types";

export const isAuth: MiddlewareFn<MyContext> = ({context}, next) => {
  if (!context.req.session!.userId) throw new Error('not authenticated')
  console.log("------------")
  console.log("isAuth middleware", context.req.session)
  console.log("next", next)
  console.log("------------")
  return next()
}