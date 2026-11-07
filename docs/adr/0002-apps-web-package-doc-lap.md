# apps/web là package độc lập, repo không có root package

`apps/web` giữ `package.json` và `pnpm-lock.yaml` riêng; repo không có root `package.json`,
không phải pnpm workspace. CI của khoá cài bằng `pnpm -C apps/web install --frozen-lockfile`,
nên lockfile phải nằm trong `apps/web`.

Đánh đổi: mất khả năng chia sẻ dependency và script giữa các package. Chấp nhận, vì hiện
chỉ có một package JS thật (`apps/api` còn là placeholder), và workspace root sẽ làm hỏng
bước cài trong CI.

## Hệ quả

- Mọi lệnh chạy bằng `pnpm -C apps/web ...` hoặc `cd apps/web` trước.
- Khi Buổi 4 mang backend thật, cân nhắc lại: nếu hai app chia sẻ type (Order, MenuItem),
  một workspace có thể đáng giá hơn — nhưng phải sửa CI trước.
- `apps/api` không có deps và không được build.
