import { z } from "zod";

const VIETNAMESE_PHONE = /^0(?:3|5|7|8|9)\d{8}$/;

/**
 * Schema cho hồ sơ người dùng. Dùng lại quy tắc họ tên và SĐT của checkout để
 * một người không thể có số hợp lệ ở trang đặt hàng nhưng không hợp lệ ở hồ sơ.
 */
export const userProfileSchema = z
  .object({
    displayName: z
      .string()
      .trim()
      .min(1, "Vui lòng nhập tên hiển thị.")
      .min(2, "Tên hiển thị phải có ít nhất 2 ký tự.")
      .max(60, "Tên hiển thị không được dài quá 60 ký tự.")
      .refine((value) => !/\d/.test(value), "Tên hiển thị không được chứa chữ số."),

    phone: z
      .string()
      .trim()
      .min(1, "Vui lòng nhập số điện thoại.")
      .regex(VIETNAMESE_PHONE, "Số điện thoại không hợp lệ, cần 10 chữ số bắt đầu bằng 0."),

    email: z
      .string()
      .trim()
      .min(1, "Vui lòng nhập email.")
      .email("Email không hợp lệ."),

    defaultAddress: z
      .string()
      .trim()
      .max(200, "Địa chỉ không được dài quá 200 ký tự.")
      .optional(),

    dateOfBirth: z
      .string()
      .trim()
      .refine((value) => value === "" || !Number.isNaN(Date.parse(value)), {
        message: "Ngày sinh không hợp lệ.",
      })
      .refine(
        (value) => {
          if (value === "") return true;
          const age = (Date.now() - Date.parse(value)) / (365.25 * 24 * 60 * 60 * 1000);
          return age >= 13;
        },
        { message: "Bạn phải từ 13 tuổi trở lên." },
      )
      .optional(),
  })
  .refine(
    (profile) => !profile.defaultAddress || profile.defaultAddress.length >= 10,
    {
      message: "Địa chỉ mặc định quá ngắn, vui lòng nhập số nhà, đường và phường/xã.",
      path: ["defaultAddress"],
    },
  );

export type UserProfileInput = z.infer<typeof userProfileSchema>;
