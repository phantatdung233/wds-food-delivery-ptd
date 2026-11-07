"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { useCartHydrated } from "@/lib/use-cart-hydrated";
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
import { selectTotalPrice, selectTotalQuantity, useCartStore } from "@/lib/cart-store";

export function CartSheet() {
  const hydrated = useCartHydrated();
  const itemCount = useCartStore((state) => state.items.length);
  const totalQuantity = useCartStore(selectTotalQuantity);
  const totalPrice = useCartStore(selectTotalPrice);

  const count = hydrated ? totalQuantity : 0;

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="outline" size="sm" className="gap-2">
            <ShoppingBag className="size-4" aria-hidden />
            <span className="hidden sm:inline">Giỏ hàng</span>
            <span
              aria-label={`${count} món trong giỏ`}
              className="grid min-w-5 place-items-center rounded-full bg-primary px-1.5 text-[0.7rem] leading-5 font-semibold text-primary-foreground tabular-nums"
            >
              {count}
            </span>
          </Button>
        }
      />

      <SheetContent side="right" className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Giỏ hàng</SheetTitle>
          <SheetDescription>
            {hydrated && itemCount > 0
              ? `${count} món đang chờ đặt.`
              : "Chưa có món nào trong giỏ."}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4">
          {hydrated && itemCount === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
              <span className="grid size-12 place-items-center rounded-full bg-muted">
                <ShoppingBag className="size-6 text-muted-foreground" aria-hidden />
              </span>
              <p className="text-sm text-muted-foreground">
                Thêm món từ thực đơn của nhà hàng để bắt đầu.
              </p>
            </div>
          ) : null}
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
            disabled={!hydrated || itemCount === 0}
            render={<Link href="/checkout" />}
          >
            Thanh toán
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
