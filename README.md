# task-manager

Ứng dụng quản lý công việc (bài đánh giá kiến thức nhóm SE).
Công nghệ: Next.js, NestJS, TypeScript, PostgreSQL, Docker Compose.

> Trạng thái: **Ngày 1 – backend và database**. Frontend và Docker hóa toàn bộ hệ thống làm ở các ngày sau.

## Công cụ truy cập database

Dùng **TypeORM** vì tích hợp sẵn với NestJS, có hỗ trợ migration,
và mô hình Entity/Repository gần với JPA/Hibernate.
Schema được quản lý hoàn toàn bằng migration (`synchronize: false`).

## Cần cài

- Node.js 20 trở lên
- Docker Desktop
- Git

## Chạy backend

```bash
# 1. Tạo file biến môi trường (Windows cmd; Linux/macOS dùng cp)
copy .env.example .env

# 2. Bật PostgreSQL
docker compose up -d db

# 3. Cài thư viện, chạy migration (tạo bảng + 5 công việc mẫu), chạy backend
cd backend
npm install
npm run migration:run
npm run start:dev
```

API chạy tại http://localhost:3001

## API

| Method | Đường dẫn | Chức năng                 |
| ------ | --------- | ------------------------- |
| POST   | /tasks    | Tạo công việc             |
| GET    | /tasks    | Danh sách, mới nhất trước |

Ví dụ:

```bash
# Tạo công việc
curl -X POST http://localhost:3001/tasks -H "Content-Type: application/json" -d "{\"title\":\"Học Docker\",\"status\":\"IN_PROGRESS\",\"dueDate\":\"2026-10-20\"}"

# Lấy danh sách
curl http://localhost:3001/tasks
```

Backend từ chối (400): tên rỗng hoặc toàn khoảng trắng, tên quá 100 ký tự,
trạng thái không hợp lệ, ngày không hợp lệ, trường lạ không có trong DTO.

## Dữ liệu được lưu ở đâu

Trong PostgreSQL chạy ở container `db`, ghi vào Docker volume `pgdata`.
Tắt backend hoặc `docker compose down` (không có `-v`) thì dữ liệu vẫn còn.

## Chưa hoàn thành

- API xem, sửa, xóa, lọc theo trạng thái (Ngày 2)
- Giao diện Next.js (Ngày 2)
- Dockerfile cho web và API, chạy toàn bộ hệ thống bằng Docker Compose (Ngày 3)
