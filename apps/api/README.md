# apps/api

Placeholder cho backend ở **Buổi 4**. Chưa có code, chưa có dependency, không được build
bởi CI.

Kế hoạch dự kiến:

- API phục vụ Restaurant và MenuItem theo cùng field name với mock data ở
  `apps/web/src/data` (`id`, `name`, `price`, `imageUrl`, `restaurantId`).
- Postgres chạy từ `docker-compose.yml` ở thư mục gốc repo.
- Endpoint đặt hàng trả về `Order` với `id` và `code` (xem `GLOSSARY.md`).

Khi bắt đầu Buổi 4, đọc lại `docs/ARCHITECTURE.md` và ADR-0002 trước khi quyết định có
chuyển repo sang pnpm workspace hay không.
