import type { Metadata } from "next";

import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Nhà hàng",
};

export default function RestaurantLayout({ children }: LayoutProps<"/restaurant/[id]">) {
  return (
    <>
      {children}
      <Toaster position="top-right" richColors />
    </>
  );
}
