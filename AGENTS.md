# AGENTS.md

Hướng dẫn cho OpenCode (và các AI agent khác) khi làm việc trong repo này.

## Dự án

Ứng dụng đặt món ăn (Food Delivery) được xây dựng lại toàn bộ phần Frontend qua 3 buổi học.
Brief gốc: [`Food Delivery App - Frontend.md`](./Food Delivery App - Frontend.md).
PRD: [`docs/PRD.md`](./docs/PRD.md).

## Cấu trúc repo

Monorepo dùng pnpm workspaces:

```
.
├── apps/
│   ├── web/            # Next.js 16 frontend (App Router)
│   └── api/            # Backend — chuẩn bị cho Buổi 4 (chưa khởi tạo)
├── data/               # Mock data (restaurants, menu items)
├── docs/
│   ├── PRD.md
│   ├── adr/            # Architecture Decision Records
│   └── agents/         # Cấu hình cho agent (issue tracker, labels, domain docs)
├── GLOSSARY.md
└── docker-compose.yml
```

## Lệnh thường dùng

Chạy từ thư mục gốc:

```sh
pnpm install      # cài dependency cho toàn monorepo
pnpm dev          # chạy dev server (apps/web → http://localhost:3000)
pnpm build        # build production
pnpm lint         # ESLint
docker compose up -d   # chạy service phụ trợ
```

## Quy ước code

- **Next.js 16 App Router**. Mặc định là Server Component — chỉ thêm `"use client"` ở component cần tương tác (nút thêm món, giỏ hàng, form).
- **TypeScript** strict. Không dùng `any` trừ khi có lý do và comment giải thích.
- **Tailwind CSS + shadcn/ui**. Dùng component shadcn/ui có sẵn trước khi tự viết; thêm component mới bằng `pnpm dlx shadcn@latest add <name>`.
- **State**: Zustand cho giỏ hàng, có persist vào LocalStorage. Selector tính tổng số lượng / tổng tiền, không tính inline trong component.
- **Form**: React Hook Form + Zod resolver. Thông báo lỗi bằng **tiếng Việt**.
- **Mock data** trong `data/` — đặt tên field khớp schema backend ở Buổi 4 (`id`, `name`, `price`, `imageUrl`, `restaurantId`).
- **Responsive** từ 375px trở lên, không tràn ngang.
- **Ngôn ngữ UI**: tiếng Việt.

## Git flow

- Mỗi task một nhánh `feat/<mô-tả-ngắn>`, gộp vào `main` qua Pull Request.
- Commit theo [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`.
- Không commit trực tiếp lên `main`.

## Testing

- Chưa có test suite ở Buổi 1. Khi thêm: Vitest cho unit test, Playwright cho E2E.
- Trước khi mở PR, phải chạy `pnpm lint` và `pnpm build` không lỗi.
- Kiểm tra chuẩn đầu ra bằng bộ check của template — đọc `README-CHECK.md`.

## Agent skills

### Issue tracker

Issues và specs lưu trên GitHub Issues, dùng `gh` CLI. Xem `docs/agents/issue-tracker.md`.

### Triage labels

Năm triage role chuẩn, mỗi label trùng tên role. Xem `docs/agents/triage-labels.md`.

### Domain docs

Single-context: một `GLOSSARY.md` + `docs/adr/` ở thư mục gốc repo. Xem `docs/agents/domain.md`.
