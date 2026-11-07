# AGENTS.md

Hướng dẫn cho OpenCode (và các AI agent khác) khi làm việc trong repo này.

## Dự án

Ứng dụng đặt món ăn (Food Delivery) được xây dựng lại toàn bộ phần Frontend qua 3 buổi học.

- Kế hoạch & ticket: issue [#1](https://github.com/phantatdung233/wds-food-delivery-ptd/issues/1)
- PRD: [`docs/PRD.md`](./docs/PRD.md)
- Kiến trúc: [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)
- Quyết định: [`docs/adr/`](./docs/adr/)

## Cấu trúc repo

```
.
├── apps/
│   ├── web/            # Next.js 16 — package ĐỘC LẬP, lockfile riêng
│   │   ├── src/app/            # App Router
│   │   ├── src/components/     # Header, Footer, shadcn/ui
│   │   ├── src/data/           # mock catalogue (Restaurant, MenuItem)
│   │   └── src/lib/            # cart store, zod schemas, helpers
│   └── api/            # Placeholder cho Buổi 4 — không build, không deps
├── docs/
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── adr/
│   └── agents/
├── scripts/            # check-repo.mjs của khoá
├── GLOSSARY.md
└── docker-compose.yml  # Postgres 17
```

**Không có root `package.json`.** `apps/web` là pnpm package độc lập với `pnpm-lock.yaml`
riêng — CI của khoá chạy `pnpm -C apps/web install --frozen-lockfile`. Đừng biến repo
thành pnpm workspace, đừng thêm lockfile ở root.

## Lệnh thường dùng

```sh
# Trong apps/web
pnpm install
pnpm dev          # http://localhost:3000
pnpm build
pnpm lint

# Ở root
docker compose up -d
docker compose config -q
node scripts/check-repo.mjs          # chấm bài tĩnh
node scripts/check-repo.mjs --build  # chấm + build
```

## Quy ước code

- **Next.js 16 App Router**. Server Component mặc định; chỉ `"use client"` ở component
  cần event handler, browser API hoặc React state. Đẩy boundary xuống lá cây component.
- **TypeScript** strict. Không dùng `any` trừ khi có comment giải thích.
- **Tailwind CSS + shadcn/ui**. Dùng component shadcn có sẵn; thêm mới bằng
  `pnpm dlx shadcn@latest add <name>` (chạy trong `apps/web`).
- **State**: Zustand + persist cho Cart. Selector tính tổng số lượng / tổng tiền nằm
  trong store, không tính inline trong component.
- **Form**: React Hook Form + Zod resolver. Mọi thông báo lỗi bằng **tiếng Việt**, một
  lỗi mỗi trường, hiển thị ngay dưới trường đó.
- **Mock data** ở `apps/web/src/data/` — tên field khớp schema Buổi 4: `id`, `name`,
  `price`, `imageUrl`, `restaurantId`.
- **Giá** là số nguyên VND, không dùng số thực.
- **Responsive** từ 375px, không tràn ngang. Mobile-first.
- **Ngôn ngữ UI**: tiếng Việt. Dùng đúng thuật ngữ trong [`GLOSSARY.md`](./GLOSSARY.md).

## Git flow

- Nhánh `feat/<mô-tả-ngắn>` từ `main`, gộp qua **Pull Request**.
- **Conventional Commits** bắt buộc — `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`,
  `test:`. Grader FAIL nếu bất kỳ subject nào sai format, kể cả commit cũ.
- Commit message bằng tiếng Anh; nội dung code và UI bằng tiếng Việt.

## Testing

- **Không có test framework.** Đây là quyết định có chủ đích (xem spec #1).
- Seam duy nhất là grader: `node scripts/check-repo.mjs` + Lighthouse CI
  (`lighthouserc.json`, Home page, Performance ≥ 0.85).
- Trước khi mở PR: `pnpm -C apps/web lint`, `pnpm -C apps/web build`,
  `node scripts/check-repo.mjs` phải sạch.
- Các hành vi grader không chứng minh được (persist sau reload, toast, validate từng
  trường, responsive) kiểm tra thủ công theo checklist trong `README.md`.

## Agent skills

### Issue tracker

Issues và specs lưu trên GitHub Issues, dùng `gh` CLI. Xem `docs/agents/issue-tracker.md`.

### Triage labels

Năm triage role chuẩn, mỗi label trùng tên role. Xem `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `GLOSSARY.md` + `docs/adr/` ở thư mục gốc repo. Xem `docs/agents/domain.md`.
