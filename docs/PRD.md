# PRD — Food Delivery Web App (Frontend)

> Kế hoạch triển khai và danh sách ticket: [issue #1](https://github.com/phantatdung233/wds-food-delivery/issues/1).
> Quyết định kiến trúc: [`docs/ARCHITECTURE.md`](./ARCHITECTURE.md) và [`docs/adr/`](./adr/).

## 1. Mục tiêu

Dựng lại toàn bộ phần Frontend của ứng dụng đặt món ăn dưới dạng một repo monorepo hoàn chỉnh, làm nền tảng để học các nội dung tiếp theo (Backend, Database ở Buổi 4).

## 2. Phạm vi

Trong phạm vi 3 buổi:

| Buổi | Nội dung | Đầu ra chính |
| ---- | -------- | ------------ |
| 1 | Nền tảng dự án: môi trường, Git flow, monorepo, Next.js 16, Tailwind, shadcn/ui | Layout Header/Footer, trang Home tĩnh |
| 2 | App Router, Server/Client Components, Zustand cart, mock data | Danh sách nhà hàng, trang `/restaurant/[id]`, Cart Drawer, badge, Toast |
| 3 | React Hook Form, Zod, Mock API | Trang `/checkout`, validate tiếng Việt, màn hình xác nhận đơn |

Ngoài phạm vi: thanh toán thật, xác thực người dùng, backend thật (Buổi 4).

## 3. Người dùng

Khách hàng đặt món trên web:

- Xem danh sách nhà hàng trên trang chủ.
- Xem menu của một nhà hàng, thêm món vào giỏ.
- Chỉnh số lượng hoặc xóa món trong giỏ, xem nhanh tổng tiền qua Cart Drawer.
- Điền thông tin giao hàng và đặt hàng.
- Nhận mã đơn giả lập sau khi đặt thành công.

## 4. Câu chuyện người dùng

- **US-1**: Là khách, tôi muốn xem danh sách nhà hàng trên trang chủ và bấm vào một nhà hàng để xem menu.
- **US-2**: Là khách, tôi muốn thấy món ăn kèm hình ảnh và giá để chọn món.
- **US-3**: Là khách, tôi muốn thêm, bớt, tăng giảm số lượng món trong giỏ và thấy tổng tiền ngay lập tức.
- **US-4**: Là khách, tôi muốn giỏ hàng còn nguyên sau khi reload trang.
- **US-5**: Là khách, tôi muốn nhận thông báo (Toast) khi thêm hoặc bớt món.
- **US-6**: Là khách, tôi muốn điền form giao hàng và được báo lỗi tiếng Việt rõ ràng ngay dưới trường nhập sai.
- **US-7**: Là khách, tôi muốn thấy spinner khi đặt hàng và màn hình xác nhận kèm mã đơn sau khi thành công.

## 5. Yêu cầu chức năng

### 5.1 Trang chủ (`/`)

- Server Component đọc mock data và render danh sách nhà hàng.
- Mỗi nhà hàng dẫn tới `/restaurant/[id]`.
- Có Header, Footer, thể hiện Button và Card của shadcn/ui.

### 5.2 Trang nhà hàng (`/restaurant/[id]`)

- Hiển thị danh sách món kèm hình ảnh và giá.
- Có `loading.tsx`, `error.tsx`; id không tồn tại → trang `not-found`.
- Nút thêm món là Client Component.

### 5.3 Giỏ hàng

- Zustand store: thêm, xóa, tăng giảm số lượng; selector tổng số lượng và tổng tiền.
- Persist vào LocalStorage.
- Cart Drawer xem trước đơn hàng, có nút sang `/checkout`.
- Floating badge hiển thị tổng số lượng.
- Toast (Sonner) mỗi khi thêm hoặc bớt món.

### 5.4 Thanh toán (`/checkout`)

- Form: họ tên, SĐT Việt Nam, địa chỉ giao hàng, ghi chú.
- Zod schema + React Hook Form resolver, thông báo lỗi tiếng Việt ngay dưới từng trường.
- Mock API đặt hàng (MSW hoặc Route Handler).
- Khi submit: spinner, vô hiệu hóa nút, sau đó màn hình xác nhận có mã đơn giả lập và giỏ hàng được xóa sạch.

## 6. Yêu cầu phi chức năng

- Responsive từ 375px lên Desktop, không tràn ngang.
- Lighthouse Performance > 85 trên trang chủ.
- `pnpm dev` không lỗi ở terminal và console trình duyệt.
- Chỉ dùng `"use client"` ở component cần tương tác.

## 7. Dữ liệu

Mock data tối thiểu 3 nhà hàng, mỗi nhà hàng 5 món. Field khớp schema Buổi 4:

- **Restaurant**: `id`, `name`, `imageUrl`, `description`
- **MenuItem**: `id`, `restaurantId`, `name`, `price`, `imageUrl`, `description`
- **Order** (mock): `id`, `customerName`, `phone`, `address`, `note`, `items`, `total`

## 8. Rủi ro

- Next.js 16 có thể khác API so với các bản trước; ưu tiên đọc docs chính thức.
- Mock data sai tên field sẽ phải sửa lại ở Buổi 4 khi nối backend.

## 9. Deliverables by buổi

Checklist gốc của khoá, chuyển vào đây để repo không cần giữ file brief riêng.
Mỗi mục tương ứng với ticket trên issue tracker (xem [issue #1](https://github.com/phantatdung233/wds-food-delivery/issues/1)).

### Buổi 1 — Nền tảng dự án

**A. Môi trường, Git flow & Repo**

- [ ] Cài Node.js (LTS), pnpm, Git, Docker Desktop, OpenCode và VS Code
- [ ] Repo GitHub (public) tên `wds-food-delivery`
- [ ] Monorepo: Frontend `apps/web`, Backend `apps/api`
- [ ] `README.md` giới thiệu, hướng dẫn chạy, kèm screenshots
- [ ] `AGENTS.md` cho OpenCode và `.gitignore` chuẩn
- [ ] Thư mục `/docs` lưu PRD
- [ ] `docker-compose.yml` cơ bản
- [ ] Mỗi task một nhánh `feat/...`, commit Conventional Commits

**AC**: `node -v` / `pnpm -v` / `git --version` / `docker -v` không lỗi · repo đã push với commit chuẩn ·
nhánh `feat/...` đã gộp qua PR · `docker compose up -d` lên bình thường · `/docs` đủ PRD ·
`README.md`, `AGENTS.md`, `.gitignore` có nội dung.

**B. Khung giao diện — Tailwind CSS + shadcn/ui**

- [ ] Khởi tạo **Next.js 16** trong `apps/web` bằng pnpm
- [ ] Setup **Tailwind CSS** và **shadcn/ui**
- [ ] Layout khung gồm Header và Footer
- [ ] Component cơ bản shadcn/ui: Button, Card…
- [ ] Trang Home tĩnh với dữ liệu cứng

**AC**: `pnpm dev` mở được Home, terminal và console không lỗi · Home có Header, Footer, Button, Card
đúng style · co giãn từ 375px lên Desktop, không tràn ngang · Home dùng dữ liệu tĩnh, chưa gọi API.

### Buổi 2 — App Router, Server/Client Components & giỏ hàng Zustand

- [ ] Mock data gồm tối thiểu 3 nhà hàng, mỗi nhà hàng 5 món; field gần schema Buổi 4
      (`id`, `name`, `price`, `imageUrl`, `restaurantId`…)
- [ ] Trang chủ hiển thị danh sách nhà hàng bằng **Server Component**
- [ ] Trang `/restaurant/[id]` hiển thị món kèm hình ảnh và giá
- [ ] Nested layout, `loading.tsx`, `error.tsx`, trang `not-found`
- [ ] Chỉ `"use client"` ở component cần tương tác
- [ ] Cart Store **Zustand**: thêm, xóa, tăng giảm, selector tổng số lượng và tổng tiền
- [ ] **Zustand Persist** lưu giỏ vào LocalStorage
- [ ] Cart Drawer xem trước đơn hàng
- [ ] Floating cart badge hiển thị tổng số lượng
- [ ] Toast (**Sonner**) mỗi khi thêm hoặc bớt món

**AC**: Home hiển thị đủ nhà hàng, bấm sang đúng `/restaurant/[id]` · trang nhà hàng đủ món kèm ảnh và giá ·
id không tồn tại hiện not-found · reload vẫn còn giỏ · badge đổi ngay và có Toast ·
responsive 100% và Lighthouse Performance > 85.

### Buổi 3 — Form Checkout với React Hook Form, Zod & Mock API

- [ ] Trang `/checkout`, có nút dẫn từ Cart Drawer
- [ ] Zod schema: họ tên, SĐT Việt Nam, địa chỉ giao hàng, ghi chú
- [ ] React Hook Form kết hợp Zod resolver
- [ ] Thông báo lỗi tiếng Việt rõ ràng cho từng trường
- [ ] Mock API đặt hàng bằng MSW hoặc Route Handler
- [ ] Trạng thái submit: spinner và vô hiệu hóa nút
- [ ] Sau submit thành công: màn hình xác nhận kèm mã đơn giả lập, xóa giỏ hàng
- [ ] Zod schema cho User Profile

**AC**: bỏ trống hoặc nhập sai họ tên / SĐT / địa chỉ thì không submit được · mỗi trường sai hiện đúng một
thông báo tiếng Việt bên dưới · `0901234567` hợp lệ, số khác báo lỗi · bấm đặt hàng thấy spinner rồi màn
xác nhận có mã đơn · quay lại thấy giỏ hàng đã xóa sạch.

### Tự kiểm tra

Chạy `node scripts/check-repo.mjs` (thêm `--build` hoặc `--docker`). Đọc `README-CHECK.md`.
`[PASS]` đã đạt · `[FAIL]` bắt buộc sửa · `[WARN]` nên tự kiểm tra lại.
