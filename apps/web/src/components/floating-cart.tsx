"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { useCartHydrated } from "@/lib/use-cart-hydrated";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { selectTotalPrice, selectTotalQuantity, useCartStore } from "@/lib/cart-store";

/** Fixed to the bottom of the viewport so the cart is always one tap away. */
export function FloatingCartButton() {
  const hydrated = useCartHydrated();
  const totalQuantity = useCartStore(selectTotalQuantity);
  const totalPrice = useCartStore(selectTotalPrice);

  const count = hydrated ? totalQuantity : 0;
  const price = hydrated ? totalPrice : 0;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30 flex justify-center px-4 sm:justify-end sm:px-6">
      <Button
        className="pointer-events-auto h-12 gap-3 rounded-full px-5 shadow-lg"
        render={<Link href="/checkout" aria-label={`Giỏ hàng, ${count} món`} />}
      >
        <ShoppingBag className="size-5" aria-hidden />
        <span className="text-sm font-medium">Giỏ hàng</span>
        <span
          className="grid min-w-6 place-items-center rounded-full bg-primary-foreground/20 px-2 text-xs leading-6 font-semibold tabular-nums"
          aria-live="polite"
        >
          {count}
        </span>
        {price > 0 ? (
          <span className="text-xs opacity-90 tabular-nums">{formatPrice(price)}</span>
        ) : null}
      </Button>
    </div>
  );
}
