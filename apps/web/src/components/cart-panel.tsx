"use client";

import type { CartItem } from "@/lib/cart-store";
import { X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/lib/cart-store";
import { useCartHydrated } from "@/lib/use-cart-hydrated";

function QuantityStepper({ entry }: { entry: CartItem }) {
  const increase = useCartStore((state) => state.increaseQuantity);
  const decrease = useCartStore((state) => state.decreaseQuantity);
  const quantity = entry.quantity;

  function handleIncrease() {
    increase(entry.item.id);
  }

  function handleDecrease() {
    const isLast = quantity <= 1;
    decrease(entry.item.id);
    if (isLast) {
      toast("Đã bớt khỏi giỏ", { description: entry.item.name });
      return;
    }
    toast("Đã cập nhật số lượng", {
      description: `${entry.item.name} · còn ${quantity - 1}`,
    });
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        aria-label={`Giảm ${entry.item.name}`}
        onClick={handleDecrease}
      >
        -
      </Button>
      <span className="min-w-6 text-center text-sm tabular-nums" aria-live="polite">
        {quantity}
      </span>
      <Button
        variant="outline"
        size="sm"
        aria-label={`Tăng ${entry.item.name}`}
        onClick={handleIncrease}
      >
        +
      </Button>
    </div>
  );
}

export function CartList({ entries }: { entries: CartItem[] }) {
  const removeItem = useCartStore((state) => state.removeItem);

  function handleRemove(entry: CartItem) {
    removeItem(entry.item.id);
    toast("Đã xóa khỏi giỏ", { description: entry.item.name });
  }

  if (entries.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        Giỏ hàng đang trống. Thêm món từ thực đơn để bắt đầu đặt hàng.
      </p>
    );
  }

  return (
    <ul className="divide-y">
      {entries.map((entry) => (
        <li key={entry.item.id} className="flex items-center gap-3 py-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{entry.item.name}</p>
            <p className="text-xs text-muted-foreground">{formatPrice(entry.item.price)}</p>
          </div>

          <QuantityStepper entry={entry} />

          <p className="w-24 text-right text-sm font-semibold tabular-nums">
            {formatPrice(entry.item.price * entry.quantity)}
          </p>

          <Button
            variant="ghost"
            size="sm"
            aria-label={`Xóa ${entry.item.name}`}
            onClick={() => handleRemove(entry)}
          >
            <X className="size-4" aria-hidden />
          </Button>
        </li>
      ))}
    </ul>
  );
}

export function CartSummary() {
  const entries = useCartStore((state) => state.items);
  const hydrated = useCartHydrated();

  const visible = hydrated ? entries : [];
  const total = visible.reduce(
    (sum, entry) => sum + entry.item.price * entry.quantity,
    0,
  );

  return (
    <div className="flex flex-col gap-4">
      <CartList entries={visible} />
      <div className="flex items-center justify-between border-t pt-4 text-sm">
        <span className="text-muted-foreground">Tổng cộng</span>
        <span className="text-lg font-semibold tabular-nums">{formatPrice(total)}</span>
      </div>
    </div>
  );
}
