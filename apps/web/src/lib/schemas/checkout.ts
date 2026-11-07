import { z } from "zod";

/**
 * Số di động Việt Nam: đúng 10 chữ số, bắt đầu bằng 0, đầu số 03/05/07/08/09.
 * Không trim trước khi kiểm tra — khoảng trắng thừa bị từ chối, không bị lặng lẽ
 * cắt bỏ, để người dùng sửa đúng chỗ thay vì tin vào dữ liệu đã được "sửa hộ".
 */
const VIETNAMESE_PHONE = /^0(?:3|5|7|8|9)\d{8}$/;

export const phoneField = z
  .string()
  .min(1, "Vui lòng nhập số điện thoại.")
  .regex(
    VIETNAMESE_PHONE,
    "Số điện thoại không hợp lệ. Nhập số di động Việt Nam gồm 10 chữ số, không có dấu cách, ví dụ 0901234567.",
  );

export const nameField = z
  .string()
  .trim()
  .min(1, "Vui lòng nhập họ tên.")
  .min(2, "Họ tên phải có ít nhất 2 ký tự.")
  .max(60, "Họ tên không được dài quá 60 ký tự.")
  .refine((value) => !/\d/.test(value), "Họ tên không được chứa chữ số.");

export const addressField = z
  .string()
  .trim()
  .min(1, "Vui lòng nhập địa chỉ giao hàng.")
  .min(10, "Địa chỉ quá ngắn, vui lòng nhập số nhà, đường và phường/xã.")
  .max(200, "Địa chỉ không được dài quá 200 ký tự.");

export const checkoutSchema = z.object({
  customerName: nameField,
  phone: phoneField,
  address: addressField,
  note: z.string().trim().max(300, "Ghi chú không được dài quá 300 ký tự.").optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

/** Một dòng hàng gửi lên Route Handler. */
export const orderItemSchema = z.object({
  menuItemId: z.string().min(1),
  name: z.string().min(1),
  price: z.number().int().nonnegative(),
  quantity: z.number().int().min(1).max(99),
});

/** Đơn hàng gửi lên Route Handler: thông tin giao hàng + các dòng trong giỏ. */
export const createOrderSchema = checkoutSchema.extend({
  items: z.array(orderItemSchema).min(1, "Giỏ hàng đang trống, không thể đặt hàng."),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

export type Order = CreateOrderInput & {
  id: string;
  code: string;
  createdAt: string;
};
