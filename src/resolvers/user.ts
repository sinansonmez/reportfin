import {Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver} from "type-graphql";
import {MyContext} from "../types";
import {User} from "../entities/User";
import argon2 from "argon2";
import {COOKIE_NAME, FORGET_PASSWORD_PREFIX} from "../constants";
import {UsernamePasswordInput} from "./inputs/UsernamePasswordInput";
import {validateRegister} from "../utils/validateRegister";
import {sendEmail} from "../utils/sendEmail";
import {v4} from "uuid";

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

  @Mutation((_returns) => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() {redis, req}: MyContext
  ): Promise<UserResponse> {
    if (newPassword.length < 3) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "length must be greater than 3"
          }
        ]
      }
    }

    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);
    if (!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "token expired"
          }
        ]
      }
    }

    const userIdNum = parseInt(userId);
    const user = await User.findOne(userIdNum)
    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "user no longer exist"
          }
        ]
      }
    }

    await User.update({id: userIdNum}, {password: await argon2.hash(newPassword)})

    await redis.del(key);

    // login user after change password
    req.session.userId = user.id;

    return {user};
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() {redis}: MyContext
  ): Promise<boolean> {
    const user = await User.findOne({where: {email: email}})
    // user is not in DB
    if (!user) return true

    const token = v4()
    await redis.set(FORGET_PASSWORD_PREFIX + token, user.id, "ex", 1000 * 60 * 60 * 24 * 3) // 3 days
    const message = `<a href="http://localhost:3000/change-password/${token}">Reset Password</a>`

    await sendEmail(email, message)

    return true
  }

  @Query((_returns) => User, {nullable: true})
  me(
    @Ctx() {req}: MyContext
  ): Promise<User | undefined> | undefined {
    // you are not logged in
    if (!req.session.userId) return undefined
    return User.findOne(req.session.userId)
  }

  @Mutation((_returns) => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() {req}: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) return {errors};

    const hashedPassword = await argon2.hash(options.password);
    const user = User.create({username: options.username, password: hashedPassword, email: options.email});
    try {
      await user.save()
    } catch (e) {
      if (e.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "username already taken"
            }
          ]
        }
      }
    }

    // automatically log in user after registration
    req.session.userId = user.id;
    return {user};
  }

  @Mutation((_returns) => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() {req}: MyContext
  ): Promise<UserResponse> {
    const queryParam = usernameOrEmail.includes("@") ? {email: usernameOrEmail} : {username: usernameOrEmail}
    const user = await User.findOne({where: queryParam})
    if (!user) {
      return {
        errors: [{
          field: "usernameOrEmail",
          message: "Username or password is not correct"
        }]
      }
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [{
          field: "password",
          message: "Username or password is not correct"
        }]
      }
    }

    req.session.userId = user.id;
    return {user};
  }

  @Mutation((_returns) => Boolean)
  async logout(
    @Ctx() {req, res}: MyContext
  ): Promise<boolean> {
    return new Promise(resolve => req.session.destroy(err => {
      res.clearCookie(COOKIE_NAME);
      if (err) {
        console.log(err)
        resolve(false);
        return;
      }
      resolve(true);
    }));
  }

}