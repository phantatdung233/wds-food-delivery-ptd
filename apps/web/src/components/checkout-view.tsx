"use client";

import { Loader2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { OrderConfirmation } from "@/components/order-confirmation";
import { OrderForm } from "@/components/order-form";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { selectCartItems, selectDistinctRestaurantCount, selectTotalPrice, useCartStore } from "@/lib/cart-store";
import type { Order } from "@/lib/schemas/checkout";
import { useCartHydrated } from "@/lib/use-cart-hydrated";

export function CheckoutView() {
  const hydrated = useCartHydrated();
  const entries = useCartStore(selectCartItems);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = useCartStore(selectTotalPrice);
  const isMixed = useCartStore(selectDistinctRestaurantCount) > 1;
  const [order, setOrder] = useState<Order | null>(null);

  if (order) {
    return <OrderConfirmation order={order} />;
  }

  if (!hydrated) {
    return (
      <div className="flex items-center gap-2 py-10 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" aria-hidden />
        Đang tải giỏ hàng…
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-start gap-4 py-12">
        <span className="grid size-12 place-items-center rounded-full bg-muted">
          <ShoppingBag className="size-6 text-muted-foreground" aria-hidden />
        </span>
        <p className="text-muted-foreground">
          Giỏ hàng đang trống. Thêm món từ một nhà hàng để bắt đầu đặt hàng.
        </p>
        <Button render={<Link href="/#nha-hang" />}>Xem các nhà hàng</Button>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {isMixed ? (
        <p className="mb-6 rounded-lg bg-accent/60 px-4 py-3 text-sm">
          Giỏ hàng có món từ nhiều nhà hàng. Phiên bản này giao chung một đơn, các món có thể
          đến từ nhà hàng khác nhau.
        </p>
      ) : null}

      <OrderForm
        entries={entries}
        total={total}
        onOrdered={(placed) => {
          clearCart();
          setOrder(placed);
          toast.success("Đặt hàng thành công", { description: `Mã đơn ${placed.code}` });
        }}
      />

      <p className="mt-6 text-xs text-muted-foreground">
        Tổng tiền chưa gồm phí giao hàng. Đây là ứng dụng học tập, không có giao dịch thật.
        <span className="sr-only"> Tổng tạm tính {formatPrice(total)}.</span>
      </p>
    </div>
  );
}
