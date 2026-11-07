import type { Metadata } from "next";

import { CartSummary } from "@/components/cart-panel";

export const metadata: Metadata = {
  title: "Giỏ hàng",
};

export default function CheckoutLayout({ children }: LayoutProps<"/checkout">) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight sm:text-3xl">Giỏ hàng của bạn</h1>
      <CartSummary />
      {children}
    </div>
  );
}
