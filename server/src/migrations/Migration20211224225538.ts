import {Migration} from '@mikro-orm/migrations';

export class Migration20211224225538 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "bank" ("id" serial primary key, "name" varchar(255) not null, "continent" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "country" varchar(255) not null, "website" varchar(255) not null);');
  }

}
