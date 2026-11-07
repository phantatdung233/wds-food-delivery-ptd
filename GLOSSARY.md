# Glossary

Từ vựng domain của dự án. Dùng đúng thuật ngữ ở đây khi đặt tên biến, viết issue, test name hoặc đề xuất thay đổi.

| Thuật ngữ | Ý nghĩa | Không dùng |
| --------- | ------- | ---------- |
| **Restaurant** (Nhà hàng) | Đơn vị bán món ăn. Trang chủ liệt kê danh sách nhà hàng. | Shop, Store, Vendor |
| **MenuItem** (Món) | Một món ăn thuộc về một Restaurant. Có giá và hình ảnh. | Dish, Product, Food (dạng danh từ chung) |
| **Cart** (Giỏ hàng) | Tập các món khách đang chọn, kèm số lượng. Lưu trong Zustand + LocalStorage. | Basket, Bag |
| **CartItem** | Một dòng trong Cart: một MenuItem kèm `quantity`. | LineItem, OrderItem (chỉ dùng cho đơn đã đặt) |
| **Order** (Đơn hàng) | Cart đã được đặt kèm thông tin giao hàng và mã đơn. | Purchase, Transaction |
| **Checkout** | Bước điền thông tin giao hàng và xác nhận Order. | Payment (thanh toán thật nằm ngoài phạm vi) |
| **Order code** (Mã đơn) | Chuỗi giả lập hiển thị sau khi đặt hàng thành công. | Order ID (mã đơn không phải khoá chính DB) |
