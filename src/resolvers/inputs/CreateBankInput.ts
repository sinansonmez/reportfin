import {Field, InputType} from "type-graphql";

@InputType()
export class CreateBankInput {
  @Field()
  name: string;
  @Field()
  continent: string;
  @Field()
  country: string;
  @Field()
  logo: string;
  @Field()
  website: string;
}