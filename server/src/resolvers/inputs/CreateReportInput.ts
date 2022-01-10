import {Field, InputType} from "type-graphql";

@InputType()
export class CreateReportInput {
  @Field()
  year: string;
  @Field()
  quarter: string;
  @Field()
  link: string;
  @Field()
  bank: string;
}