import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAdminUserTable1676298991978 implements MigrationInterface {
  name = 'CreateAdminUserTable1676298991978';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."admin_users_type_enum" AS ENUM('MASTER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "admin_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "documentNumber" character varying NOT NULL, "type" "public"."admin_users_type_enum" NOT NULL DEFAULT 'MASTER', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_dcd0c8a4b10af9c986e510b9ecc" UNIQUE ("email"), CONSTRAINT "UQ_9e6a8115dae20cf67ed459b4dde" UNIQUE ("documentNumber"), CONSTRAINT "PK_06744d221bb6145dc61e5dc441d" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "admin_users"`);
    await queryRunner.query(`DROP TYPE "public"."admin_users_type_enum"`);
  }
}
