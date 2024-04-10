import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLocationTable1712713687573 implements MigrationInterface {
  name = 'CreateLocationTable1712713687573';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "location" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "location_number" character varying NOT NULL, "area" double precision NOT NULL DEFAULT '1', "parent_id" uuid, CONSTRAINT "UQ_ae74bdaefc19d260bc3e06bfce8" UNIQUE ("location_number"), CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "location" ADD CONSTRAINT "FK_92137b1457c0969fe2d20a9faff" FOREIGN KEY ("parent_id") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "location" DROP CONSTRAINT "FK_92137b1457c0969fe2d20a9faff"`,
    );
    await queryRunner.query(`DROP TABLE "location"`);
  }
}
