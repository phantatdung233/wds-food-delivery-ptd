export type Restaurant = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  /** Đánh giá trung bình, 0–5. */
  rating: number;
  /** Thời gian giao dự kiến, tính bằng phút. */
  deliveryMinutes: number;
  /** Phí giao hàng, đơn vị VND. */
  deliveryFee: number;
};

export type MenuItem = {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  /** Đơn vị VND, số nguyên. */
  price: number;
  imageUrl: string;
};
