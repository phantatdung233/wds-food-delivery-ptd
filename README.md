# WDS Food Delivery App — Frontend

Ứng dụng đặt món ăn (Food Delivery) — dựng lại toàn bộ phần Frontend bằng **Next.js 16 (App Router)**, **Tailwind CSS**, **shadcn/ui** và **Zustand**.

> Repo này là bài tập trong khoá WDS. Brief gốc: [`Food Delivery App - Frontend.md`](./Food Delivery App - Frontend.md).

## Tech stack

| Lớp | Công nghệ |
| --- | --------- |
| Framework | Next.js 16 (App Router, Server Components) |
| Ngôn ngữ | TypeScript (strict) |
| Styling | Tailwind CSS + shadcn/ui |
| State | Zustand (+ persist LocalStorage) |
| Form & validate | React Hook Form + Zod |
| Thông báo | Sonner (toast) |
| Package manager | pnpm (workspaces) |

## Yêu cầu môi trường

- Node.js **LTS**
- pnpm
- Git
- Docker Desktop
- OpenCode + VS Code

Kiểm tra:

```sh
node -v
pnpm -v
git --version
docker -v
```

## Bắt đầu

```sh
# 1. Cài dependency
pnpm install

# 2. Chạy dev server
pnpm dev
# → http://localhost:3000

# 3. Dựng service phụ trợ (Postgres cho buổi sau)
docker compose up -d
```

## Cấu trúc repo

```
.
├── apps/
│   ├── web/          # Next.js 16 frontend
│   └── api/          # Backend (Buổi 4)
├── data/             # Mock data
├── docs/
│   ├── PRD.md
│   ├── adr/
│   └── agents/
├── AGENTS.md
├── GLOSSARY.md
└── docker-compose.yml
```

## Lệnh

| Lệnh | Mô tả |
| ---- | ----- |
| `pnpm dev` | Chạy dev server |
| `pnpm build` | Build production |
| `pnpm lint` | Chạy ESLint |
| `docker compose up -d` | Bật các service phụ trợ |
| `docker compose down` | Tắt các service |

## Quy ước

- Nhánh mỗi task: `feat/...`, gộp vào `main` qua Pull Request.
- Commit theo [Conventional Commits](https://www.conventionalcommits.org/).
- Đọc [`AGENTS.md`](./AGENTS.md) trước khi code bằng AI agent.

## Tiến độ

- [ ] **Buổi 1** — Nền tảng, monorepo, layout Header/Footer, trang Home tĩnh
- [ ] **Buổi 2** — App Router, mock data, Zustand cart, Cart Drawer, Toast
- [ ] **Buổi 3** — Checkout form, Zod validation, Mock API, xác nhận đơn

## Screenshots

_Cập nhật sau khi hoàn thành Buổi 1._

## Giấy phép

Dự án học tập.
