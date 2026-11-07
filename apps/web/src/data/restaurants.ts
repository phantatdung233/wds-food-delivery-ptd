import type { Restaurant } from "./types";

export const restaurants: Restaurant[] = [
  {
    id: "pho-ha-noi",
    name: "Phở Hà Nội",
    description: "Phở bò nước dùng xương ống ninh 12 tiếng, bánh phở tươi mỗi sáng.",
    imageUrl: "/images/restaurants/pho-ha-noi.svg",
    rating: 4.8,
    deliveryMinutes: 25,
    deliveryFee: 15000,
  },
  {
    id: "com-tam-sai-gon",
    name: "Cơm Tấm Sài Gòn",
    description: "Cơm tấm sườn nướng than, bì chả và nước mắm chua ngọt đúng vị Nam.",
    imageUrl: "/images/restaurants/com-tam-sai-gon.svg",
    rating: 4.6,
    deliveryMinutes: 30,
    deliveryFee: 20000,
  },
  {
    id: "banh-mi-hoi-an",
    name: "Bánh Mì Hội An",
    description: "Bánh mì vỏ giòn nướng củi, nhân pate gan và thịt xá xíu tự làm.",
    imageUrl: "/images/restaurants/banh-mi-hoi-an.svg",
    rating: 4.7,
    deliveryMinutes: 20,
    deliveryFee: 12000,
  },
];
