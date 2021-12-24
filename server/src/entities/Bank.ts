import {Entity, PrimaryKey, Property} from "@mikro-orm/core";

@Entity()
export class Bank {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property()
  continent: string;

  @Property()
  createdAt: Date = new Date();

  @Property({onUpdate: () => new Date()})
  updatedAt: Date = new Date();

  @Property()
  country: string;

  @Property()
  website: string;
}