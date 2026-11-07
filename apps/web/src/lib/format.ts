const vnd = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

/** Format an integer VND amount, e.g. 55000 → "55.000 ₫". */
export function formatPrice(amount: number) {
  return vnd.format(amount);
}
