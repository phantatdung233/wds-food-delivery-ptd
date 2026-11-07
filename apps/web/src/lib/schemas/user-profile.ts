import { z } from "zod";

import { addressField, nameField, phoneField } from "./checkout";

/**
 * Schema hồ sơ người dùng. Họ tên và SĐT dùng chung rule với checkout để một
 * người không thể có số hợp lệ ở trang đặt hàng nhưng không hợp lệ ở hồ sơ.
 */
export const userProfileSchema = z.object({
  displayName: nameField,
  phone: phoneField,
  defaultAddress: addressField.optional(),
});

export type UserProfileInput = z.infer<typeof userProfileSchema>;
