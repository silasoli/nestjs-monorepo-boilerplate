import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDeviceTable1678387938872 implements MigrationInterface {
  name = 'CreateDeviceTable1678387938872';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."devices_type_enum" AS ENUM('ANDROID', 'IOS', 'WEB', 'SSR', 'NODE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "devices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL DEFAULT now(), "type" "public"."devices_type_enum" NOT NULL, "platform" text, "screen" text, "ip" character varying NOT NULL, "version" character varying, "language" character varying, "lastActiveAt" TIMESTAMP, "fingerprint" character varying, "push" character varying, "clientId" character varying, "adminUserId" character varying, CONSTRAINT "PK_b1514758245c12daf43486dd1f0" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "devices"`);
    await queryRunner.query(`DROP TYPE "public"."devices_type_enum"`);
  }
}
