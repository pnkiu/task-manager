import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedTasks1792056427686 implements MigrationInterface {
  public async up(q: QueryRunner): Promise<void> {
    await q.query(`
    INSERT INTO "tasks" ("title", "description", "status", "due_date") VALUES
    ('Học NestJS cơ bản', 'Controller, service, module', 'DONE', NULL),
    ('Dựng PostgreSQL bằng Docker', NULL, 'DONE', NULL),
    ('Viết API tạo công việc', 'POST /tasks', 'IN_PROGRESS', now() + interval '2 days'),
    ('Làm giao diện /tasks', 'Next.js', 'TODO', now() + interval '5 days'),
    ('Viết README', NULL, 'TODO', now() + interval '7 days')
  `);
  }

  public async down(q: QueryRunner): Promise<void> {
    await q.query(`DELETE FROM "tasks" WHERE "title" IN (
    'Học NestJS cơ bản', 'Dựng PostgreSQL bằng Docker', 'Viết API tạo công việc',
    'Làm giao diện /tasks', 'Viết README')`);
  }
}
