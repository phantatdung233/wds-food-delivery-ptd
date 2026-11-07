# Server Component là mặc định, Client Component là ngoại lệ

Mọi route render trên server; chỉ component cần tương tác mới có `"use client"`.
Next.js 16 và App Router không phải lựa chọn ở đây — grader của khoá bắt buộc, nên nó là
ràng buộc chứ không phải quyết định. Quyết định nằm ở chỗ ranh giới Server/Client đặt ở đâu.

## Hệ quả

- Danh sách nhà hàng và menu render phía server → ít JavaScript xuống client, cần cho mục
  tiêu Lighthouse Performance > 85.
- Boundary phải đẩy xuống lá cây component: nút thêm món là Client, cả trang nhà hàng vẫn
  là Server. Đặt `"use client"` ở `page.tsx` là lỗi cần sửa.
- Bảng component nào thuộc phía nào nằm ở `docs/ARCHITECTURE.md`.
