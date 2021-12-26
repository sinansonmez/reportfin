import {Migration} from '@mikro-orm/migrations';

export class Migration20211225235640 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "bank" add column "logo" varchar(255) not null;');
  }

}
