# apps/web

Next.js 16 frontend của WDS Food Delivery. Package độc lập, có lockfile riêng.

Xem [README ở thư mục gốc](../../README.md) để biết cách chạy, và
[AGENTS.md](../../AGENTS.md) cho quy ước code.

```sh
pnpm install
pnpm dev      # http://localhost:3000
pnpm build
pnpm lint
```

Cấu trúc:

```
src/
├── app/          # App Router routes
│   └── restaurant/[id]/   # layout + page + loading + error + not-found
├── components/   # Header, Footer, cards, shadcn/ui
├── data/         # mock catalogue: restaurants, menu items, types
└── lib/          # format helpers, shadcn cn
```
