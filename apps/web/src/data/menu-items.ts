import { restaurants } from "./restaurants";
import type { MenuItem } from "./types";

export const menuItems: MenuItem[] = [
  // Phở Hà Nội
  {
    id: "pho-bo-tai",
    restaurantId: "pho-ha-noi",
    name: "Phở bò tái",
    description: "Thịt bò tái mềm, nước dùng trong, kèm hành lá và rau thơm.",
    price: 55000,
    imageUrl: "/images/menu-items/pho-bo-tai.svg",
  },
  {
    id: "pho-bo-chin-nam",
    restaurantId: "pho-ha-noi",
    name: "Phở bò chín nạm",
    description: "Bò chín và nạm gầu thái mỏng, nước dùng đậm vị quế hồi.",
    price: 60000,
    imageUrl: "/images/menu-items/pho-bo-chin-nam.svg",
  },
  {
    id: "pho-ga",
    restaurantId: "pho-ha-noi",
    name: "Phở gà ta",
    description: "Gà ta luộc xé, da vàng giòn, nước dùng thanh ngọt.",
    price: 50000,
    imageUrl: "/images/menu-items/pho-ga.svg",
  },
  {
    id: "quay-nong",
    restaurantId: "pho-ha-noi",
    name: "Quẩy nóng",
    description: "Quẩy chiên giòn, chấm cùng nước phở.",
    price: 10000,
    imageUrl: "/images/menu-items/quay-nong.svg",
  },
  {
    id: "tra-dao",
    restaurantId: "pho-ha-noi",
    name: "Trà đào cam sả",
    description: "Trà đào ướp lạnh, thêm cam và sả đập.",
    price: 25000,
    imageUrl: "/images/menu-items/tra-dao.svg",
  },

  // Cơm Tấm Sài Gòn
  {
    id: "com-tam-suon-bi-cha",
    restaurantId: "com-tam-sai-gon",
    name: "Cơm tấm sườn bì chả",
    description: "Sườn nướng than, bì trộn thính, chả trứng hấp, kèm đồ chua.",
    price: 65000,
    imageUrl: "/images/menu-items/com-tam-suon-bi-cha.svg",
  },
  {
    id: "com-tam-suon-nuong",
    restaurantId: "com-tam-sai-gon",
    name: "Cơm tấm sườn nướng",
    description: "Một miếng sườn cốt lết ướp mật ong, nướng lửa than.",
    price: 55000,
    imageUrl: "/images/menu-items/com-tam-suon-nuong.svg",
  },
  {
    id: "com-tam-ga-quay",
    restaurantId: "com-tam-sai-gon",
    name: "Cơm tấm gà quay",
    description: "Gà quay da giòn, thịt mềm, ăn kèm dưa chua.",
    price: 60000,
    imageUrl: "/images/menu-items/com-tam-ga-quay.svg",
  },
  {
    id: "cha-trung-hap",
    restaurantId: "com-tam-sai-gon",
    name: "Chả trứng hấp",
    description: "Chả trứng hấp thêm miến và nấm mèo, cắt miếng vừa ăn.",
    price: 20000,
    imageUrl: "/images/menu-items/cha-trung-hap.svg",
  },
  {
    id: "nuoc-mia",
    restaurantId: "com-tam-sai-gon",
    name: "Nước mía tắc",
    description: "Mía ép tươi, thêm tắc và gừng, đá đầy ly.",
    price: 18000,
    imageUrl: "/images/menu-items/nuoc-mia.svg",
  },

  // Bánh Mì Hội An
  {
    id: "banh-mi-thap-cam",
    restaurantId: "banh-mi-hoi-an",
    name: "Bánh mì thập cẩm",
    description: "Đủ loại nhân: pate, xá xíu, chả lụa, rau sống và nước sốt đặc biệt.",
    price: 30000,
    imageUrl: "/images/menu-items/banh-mi-thap-cam.svg",
  },
  {
    id: "banh-mi-ga-nuong",
    restaurantId: "banh-mi-hoi-an",
    name: "Bánh mì gà nướng",
    description: "Gà nướng sả ớt, sốt mayo và dưa leo.",
    price: 35000,
    imageUrl: "/images/menu-items/banh-mi-ga-nuong.svg",
  },
  {
    id: "banh-mi-trung",
    restaurantId: "banh-mi-hoi-an",
    name: "Bánh mì trứng",
    description: "Trứng ốp la, pate gan, tiêu và ngò rí.",
    price: 22000,
    imageUrl: "/images/menu-items/banh-mi-trung.svg",
  },
  {
    id: "mi-quang",
    restaurantId: "banh-mi-hoi-an",
    name: "Mì Quảng tôm thịt",
    description: "Mì Quảng nước dùng sền sệt, tôm tươi và thịt ba chỉ.",
    price: 45000,
    imageUrl: "/images/menu-items/mi-quang.svg",
  },
  {
    id: "cao-lau",
    restaurantId: "banh-mi-hoi-an",
    name: "Cao lầu Hội An",
    description: "Sợi cao lầu dai, thịt xá xíu, giá đỗ và bánh đa giòn.",
    price: 48000,
    imageUrl: "/images/menu-items/cao-lau.svg",
  },
];

export function getRestaurant(id: string) {
  return restaurants.find((restaurant) => restaurant.id === id);
}

export function getMenuItemsByRestaurant(restaurantId: string) {
  return menuItems.filter((item) => item.restaurantId === restaurantId);
}
