import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTasksTable1792056420679 implements MigrationInterface {
  public async up(q: QueryRunner): Promise<void> {
    await q.query(
      `CREATE TYPE "task_status" AS ENUM ('TODO', 'IN_PROGRESS', 'DONE')`,
    );
    await q.query(`
      CREATE TABLE "tasks" (
        "id" SERIAL PRIMARY KEY,
        "title" varchar(100) NOT NULL,
        "description" text,
        "status" "task_status" NOT NULL DEFAULT 'TODO',
        "due_date" timestamptz,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now()
      )
    `);
  }

  public async down(q: QueryRunner): Promise<void> {
    await q.query(`DROP TABLE "tasks"`);
    await q.query(`DROP TYPE "task_status"`);
  }
}
