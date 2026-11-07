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

## Kiểm tra

Ba lớp, không có test framework (xem [ADR-0003](docs/adr/0003-grader-la-seam-duy-nhat.md)):

```sh
node scripts/check-repo.mjs --build     # grader của khoá + build (bắt buộc, 0 FAIL)
pnpm -C apps/web build                  # build sạch
node scripts/e2e-check.mjs              # 18 kiểm tra hành vi thật trên Chromium
```

`e2e-check.mjs` cần `playwright-core` và Chromium, cài ngoài repo:

```sh
pnpm dlx playwright-core install chromium
cd /tmp && npm i playwright-core        # hoặc bất kỳ đâu ngoài repo
PLAYWRIGHT_CORE_PATH=/tmp/node_modules/playwright-core node scripts/e2e-check.mjs
```

Nó tự build xong chạy server ở cổng 3210, lái trình duyệt qua toàn bộ luồng đặt món, và
lưu ảnh vào `.screenshots/` (không commit).

Các mục dưới đây cần con người xác nhận:

- [ ] Lighthouse (Home) Performance ≥ 0.85 — chạy CI hoặc `pnpm dlx @lhci/cli autorun`
- [ ] 768px: lưới card chuyển 2 cột
- [ ] Không tràn ngang khi kéo DevTools từ 375px lên Desktop

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

Ảnh chụp tự động bởi `scripts/e2e-check.mjs` (Playwright, Chromium headless).

| Trang chủ (desktop) | Trang nhà hàng |
| ------------------- | -------------- |
| ![Trang chủ](docs/screenshots/home-1440.png) | ![Trang nhà hàng](docs/screenshots/restaurant-1440.png) |

| Trang chủ (375px) | Cart Drawer |
| ----------------- | ----------- |
| ![Trang chủ mobile](docs/screenshots/home-375.png) | ![Cart Drawer](docs/screenshots/cart-drawer.png) |

| Checkout | Xác nhận đặt hàng |
| -------- | ----------------- |
| ![Checkout](docs/screenshots/checkout-1440.png) | ![Xác nhận](docs/screenshots/confirmation.png) |

## Giấy phép

Dự án học tập.
