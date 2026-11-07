# 0001 — Dùng Next.js 16 App Router với Server Components mặc định

- **Status**: Accepted
- **Date**: 2026-11-07

## Bối cảnh

Ứng dụng cần render danh sách nhà hàng và menu, sau đó thêm tương tác (giỏ hàng, form). Dữ liệu ở Buổi 2–3 là mock data cục bộ, backend thật đến Buổi 4.

## Quyết định

- Frontend dùng **Next.js 16** với **App Router** trong `apps/web`.
- Server Component là mặc định; chỉ component cần tương tác mới có `"use client"` (nút thêm món, cart drawer, badge, form).
- State phía client (giỏ hàng) dùng **Zustand** với persist LocalStorage, tách khỏi dữ liệu server.

## Hệ quả

- Danh sách nhà hàng/menu render phía server → ít JavaScript xuống client, hỗ trợ mục tiêu Lighthouse > 85.
- Ranh giới server/client phải rõ: component dùng hook hoặc event handler phải là Client Component.
- Ở Buổi 4, có thể thay mock data bằng fetch tới `apps/api` mà không đổi cấu trúc trang.
