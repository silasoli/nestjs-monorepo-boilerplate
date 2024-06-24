import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateApiCallTable1677696222510 implements MigrationInterface {
  name = 'CreateApiCallTable1677696222510';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "api_calls" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "method" character varying NOT NULL, "url" character varying NOT NULL, "args" json, "running" boolean NOT NULL DEFAULT true, "duration" character varying, "host" character varying NOT NULL, "ok" boolean NOT NULL DEFAULT true, "result" json, "error" json, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c13bd40114bb06091a7dc59d74c" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "api_calls"`);
  }
}
