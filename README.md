# WDS Food Delivery App — Frontend

Ứng dụng đặt món ăn (Food Delivery) — dựng lại toàn bộ phần Frontend bằng **Next.js 16
(App Router)**, **Tailwind CSS**, **shadcn/ui** và **Zustand**.

Khách xem danh sách nhà hàng, mở menu, thêm món vào giỏ, rồi đặt hàng qua form giao hàng
có validate tiếng Việt.

## Tech stack

| Lớp | Công nghệ |
| --- | --- |
| Framework | Next.js 16 (App Router, Server Components) |
| Ngôn ngữ | TypeScript (strict) |
| Styling | Tailwind CSS + shadcn/ui |
| State | Zustand (+ persist LocalStorage) |
| Form & validate | React Hook Form + Zod |
| Thông báo | Sonner (toast) |
| Mock API | Next.js Route Handler |
| Package manager | pnpm |

## Yêu cầu môi trường

- Node.js LTS
- pnpm
- Git
- Docker Desktop
- OpenCode + VS Code

```sh
node -v
pnpm -v
git --version
docker -v
```

## Cài đặt và chạy

```sh
# 1. Cài dependency (package nằm trong apps/web)
cd apps/web
pnpm install

# 2. Chạy dev server
pnpm dev
# → http://localhost:3000

# 3. Build production
pnpm build
```

Các service phụ trợ (Postgres, chuẩn bị cho Buổi 4) chạy từ thư mục gốc:

```sh
docker compose up -d
docker compose config -q   # kiểm tra cấu hình
```

## Kiến trúc tóm tắt

Repo là monorepo nhẹ: `apps/web` là **pnpm package độc lập** với lockfile riêng (CI của
khoá cài bằng `pnpm -C apps/web`), `apps/api` là placeholder cho Buổi 4.

Trong `apps/web`, mọi route mặc định là **Server Component** — Home và trang nhà hàng
render dữ liệu mock ngay trên server. Chỉ những phần cần tương tác mới là **Client
Component**: nút thêm món, badge giỏ hàng, Cart Drawer, form checkout. Ranh giới này giữ
lượng JavaScript gửi xuống trình duyệt ở mức thấp, phục vụ mục tiêu Lighthouse
Performance > 85.

Chi tiết: [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md).

## Cấu trúc repo

```
.
├── apps/
│   ├── web/          # Next.js 16 frontend
│   └── api/          # Backend (Buổi 4) — placeholder
├── docs/
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── adr/
│   └── agents/
├── scripts/          # bộ chấm bài của khoá
├── AGENTS.md
├── GLOSSARY.md
└── docker-compose.yml
```

## Lệnh

| Lệnh | Chạy ở | Mô tả |
| ---- | ------ | ----- |
| `pnpm install` | `apps/web` | Cài dependency |
| `pnpm dev` | `apps/web` | Dev server |
| `pnpm build` | `apps/web` | Build production |
| `pnpm lint` | `apps/web` | ESLint |
| `docker compose up -d` | root | Bật Postgres |
| `node scripts/check-repo.mjs` | root | Chấm bài tự động |
| `node scripts/check-repo.mjs --build` | root | Chấm + build |

## Checklist kiểm tra thủ công

Grader chỉ kiểm tra tĩnh; các mục sau phải tự xác nhận:

- [ ] 375px: không tràn ngang, nav gọn gàng
- [ ] 768px: lưới card chuyển 2 cột
- [ ] 1440px: lưới card chuyển 3–4 cột, nội dung không kéo dài quá khổ
- [ ] Thêm món → badge tăng ngay, có toast
- [ ] Reload trang → giỏ hàng còn nguyên
- [ ] Bấm giảm số lượng về 0 → dòng món biến mất
- [ ] `/restaurant/khong-ton-tai` → trang not-found
- [ ] Bỏ trống từng trường checkout → đúng một lỗi tiếng Việt bên dưới
- [ ] `0901234567` qua validate; `012345` bị báo lỗi
- [ ] Đặt hàng → spinner → màn xác nhận có mã đơn → giỏ hàng trống
- [ ] Lighthouse (Home) Performance ≥ 0.85

## Quy ước

- Nhánh `feat/...`, gộp vào `main` qua Pull Request.
- Commit theo [Conventional Commits](https://www.conventionalcommits.org/).
- Đọc [`AGENTS.md`](./AGENTS.md) trước khi code bằng AI agent.

## Tài liệu

- [`docs/PRD.md`](./docs/PRD.md) — phạm vi, user story, checklist chuẩn đầu ra
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — kiến trúc, ranh giới Server/Client
- [`docs/adr/`](./docs/adr/) — Architecture Decision Records
- [`GLOSSARY.md`](./GLOSSARY.md) — thuật ngữ domain
- [`README-CHECK.md`](./README-CHECK.md) — cách dùng bộ chấm bài

## Screenshots

<!-- TODO: chụp lại sau lần chạy đầu tiên, thay thế phần này -->

| Trang chủ | Trang nhà hàng | Checkout |
| --------- | -------------- | -------- |
| _chưa có_ | _chưa có_ | _chưa có_ |

## Giấy phép

Dự án học tập.
