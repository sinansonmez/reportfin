import {Field, ObjectType} from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {Bank} from "./Bank";

@ObjectType()
@Entity()
export class Report extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  year: string;

  @Field()
  @Column()
  quarter: string;

  @Field()
  @Column()
  link: string;

  @Field()
  @Column({type: "int", default: 0})
  downloadCount: number;

  @Field()
  @Column()
  bankId: number;

  @Field()
  @ManyToOne(() => Bank, bank => bank.reports)
  bank: Bank;

  @Field((_return) => String)
  @CreateDateColumn()
  createdAt: Date

  @Field((_return) => String)
  @UpdateDateColumn()
  updatedAt: Date
}