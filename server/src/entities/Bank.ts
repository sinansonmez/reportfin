import {Field, ObjectType} from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {Report} from "./Report";

@ObjectType()
@Entity()
export class Bank extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  continent: string;

  @Field()
  @Column()
  logo: string;

  @Field()
  @Column()
  country: string;

  @Field()
  @Column()
  website: string;

  @Field(_returns => Report)
  @OneToMany(() => Report, report => report.bank)
  reports: Report[];

  @Field((_return) => String)
  @CreateDateColumn()
  createdAt: Date

  @Field((_return) => String)
  @UpdateDateColumn()
  updatedAt: Date
}