import {Entity, PrimaryKey, Property} from "@mikro-orm/core";
import {Field, ObjectType} from "type-graphql";

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryKey()
  id: number;

  @Field()
  @Property({type: "text", unique: true})
  username!: string;

  @Property({type: "text"})
  password!: string;

  @Field((_return) => String)
  @Property()
  createdAt: Date = new Date();

  @Field((_return) => String)
  @Property({onUpdate: () => new Date()})
  updatedAt: Date = new Date();
}