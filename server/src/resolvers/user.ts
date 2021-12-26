import {Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver} from "type-graphql";
import {MyContext} from "../types";
import {User} from "../entities/User";
import argon2 from "argon2";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field((_returns) => [FieldError], {nullable: true})
  errors?: FieldError[]

  @Field((_returns) => User, {nullable: true})
  user?: User
}


@Resolver()
export class UserResolver {

  @Mutation((_returns) => User)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() {em}: MyContext
  ): Promise<User> {
    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {username: options.username, password: hashedPassword});
    await em.persistAndFlush(user);
    return user;
  }

  @Mutation((_returns) => UserResponse)
  async login(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() {em}: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, {username: options.username});
    if (!user) {
      return {
        errors: [{
          field: "username",
          message: "Username or password is not correct"
        }]
      }
    }
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [{
          field: "password",
          message: "Username or password is not correct"
        }]
      }
    }
    return {user};
  }

}