"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { CartList } from "@/components/cart-panel";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/format";
import { selectCartItems, selectTotalPrice, selectTotalQuantity, useCartStore } from "@/lib/cart-store";
import { useCartHydrated } from "@/lib/use-cart-hydrated";

export function CartSheet() {
  const hydrated = useCartHydrated();
  const entries = useCartStore(selectCartItems);
  const totalQuantity = useCartStore(selectTotalQuantity);
  const totalPrice = useCartStore(selectTotalPrice);

  const visible = hydrated ? entries : [];
  const count = hydrated ? totalQuantity : 0;

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="outline" size="sm" className="gap-2">
            <ShoppingBag className="size-4" aria-hidden />
            <span className="sr-only">Xem nội dung giỏ hàng, </span>
            <span className="hidden sm:inline">Giỏ hàng</span>
            <span
              className="grid min-w-5 place-items-center rounded-full bg-primary px-1.5 text-[0.7rem] leading-5 font-semibold text-primary-foreground tabular-nums"
              aria-hidden
            >
              {count}
            </span>
            <span className="sr-only">{count} món</span>
          </Button>
        }
      />

      <SheetContent side="right" className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Giỏ hàng</SheetTitle>
          <SheetDescription>
            {visible.length > 0 ? `${count} món đang chờ đặt.` : "Chưa có món nào trong giỏ."}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4">
          {hydrated ? (
            <CartList entries={visible} />
          ) : (
            <div className="h-16 animate-pulse rounded-lg bg-muted" aria-hidden />
          )}
        </div>

        <Separator />
        <SheetFooter className="gap-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Tổng cộng</span>
            <span className="text-base font-semibold tabular-nums">
              {formatPrice(hydrated ? totalPrice : 0)}
            </span>
          </div>
          <Button
            className="w-full"
            disabled={visible.length === 0}
            render={<Link href="/checkout" />}
          >
            Thanh toán
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
