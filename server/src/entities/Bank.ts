import {Entity, PrimaryKey, Property} from "@mikro-orm/core";
import {Field, ObjectType} from "type-graphql";

@ObjectType()
@Entity()
export class Bank {
  @Field()
  @PrimaryKey()
  id: number;

  @Field()
  @Property()
  name: string;

  @Field()
  @Property()
  continent: string;

  @Field()
  @Property()
  logo: string;

  @Field((_return) => String)
  @Property()
  createdAt: Date = new Date();

  @Field((_return) => String)
  @Property({onUpdate: () => new Date()})
  updatedAt: Date = new Date();

  @Field()
  @Property()
  country: string;

  @Field()
  @Property()
  website: string;
}