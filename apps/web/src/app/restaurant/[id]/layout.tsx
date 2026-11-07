import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nhà hàng",
};

export default function RestaurantLayout({ children }: LayoutProps<"/restaurant/[id]">) {
  return children;
}
