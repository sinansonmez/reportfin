import {Field, ObjectType} from "type-graphql";
import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

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

  @Field((_return) => String)
  @CreateDateColumn()
  createdAt: Date

  @Field((_return) => String)
  @UpdateDateColumn()
  updatedAt: Date

  @Field()
  @Column()
  country: string;

  @Field()
  @Column()
  website: string;
}