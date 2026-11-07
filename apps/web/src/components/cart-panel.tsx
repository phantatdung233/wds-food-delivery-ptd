"use client";

import { X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import type { CartItem } from "@/lib/cart-store";
import { useCartStore } from "@/lib/cart-store";

function QuantityStepper({ entry }: { entry: CartItem }) {
  const increase = useCartStore((state) => state.increaseQuantity);
  const decrease = useCartStore((state) => state.decreaseQuantity);
  const { menuItem, quantity } = entry;

  function handleDecrease() {
    decrease(menuItem.id);
    toast(quantity <= 1 ? "Đã bớt khỏi giỏ" : "Đã cập nhật số lượng", {
      description: quantity <= 1 ? menuItem.name : `${menuItem.name} · còn ${quantity - 1}`,
    });
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        aria-label={`Giảm ${menuItem.name}`}
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
        aria-label={`Tăng ${menuItem.name}`}
        onClick={() => increase(menuItem.id)}
      >
        +
      </Button>
    </div>
  );
}

export function CartList({ entries }: { entries: CartItem[] }) {
  const removeItem = useCartStore((state) => state.removeItem);

  function handleRemove(entry: CartItem) {
    removeItem(entry.menuItem.id);
    toast("Đã xóa khỏi giỏ", { description: entry.menuItem.name });
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
        <li key={entry.menuItem.id} className="flex items-center gap-3 py-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{entry.menuItem.name}</p>
            <p className="text-xs text-muted-foreground">{formatPrice(entry.menuItem.price)}</p>
          </div>

          <QuantityStepper entry={entry} />

          <p className="w-24 text-right text-sm font-semibold tabular-nums">
            {formatPrice(entry.menuItem.price * entry.quantity)}
          </p>

          <Button
            variant="ghost"
            size="sm"
            aria-label={`Xóa ${entry.menuItem.name}`}
            onClick={() => handleRemove(entry)}
          >
            <X className="size-4" aria-hidden />
          </Button>
        </li>
      ))}
    </ul>
  );
}
