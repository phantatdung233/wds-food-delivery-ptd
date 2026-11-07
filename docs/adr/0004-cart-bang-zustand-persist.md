# Cart giữ bằng Zustand + persist, không đẩy lên server

Cart là state thuần phía client: một Zustand store có middleware persist, lưu vào
LocalStorage. Selector tổng số lượng và tổng tiền nằm trong store.

Đánh đổi: Cart sống sót qua reload mà không cần session hay đăng nhập, và không có round-trip
mạng khi thêm món — nhưng Cart gắn với một trình duyệt, không đi theo khách sang thiết bị khác.
Với bài tập này (không có tài khoản, không có backend), LocalStorage là cách duy nhất đạt
chuẩn "reload vẫn còn giỏ".

## Hệ quả

- Hydrate từ LocalStorage xảy ra sau lần render đầu → badge phải chịu được trạng thái rỗng
  trước khi có dữ liệu, tránh nháy số từ 0 lên.
- Xóa Cart sau khi đặt hàng thành công là thao tác của store, không phải của form.
- Khi Buổi 4 có backend, Cart vẫn ở client; Order mới được lưu phía server.
