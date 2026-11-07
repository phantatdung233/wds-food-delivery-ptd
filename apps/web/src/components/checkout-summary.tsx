"use client";

import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/format";
import { selectCartItems, selectTotalQuantity, useCartStore } from "@/lib/cart-store";
import { useCartHydrated } from "@/lib/use-cart-hydrated";

export function CheckoutSummary() {
  const hydrated = useCartHydrated();
  const entries = useCartStore(selectCartItems);
  const count = useCartStore(selectTotalQuantity);

  if (!hydrated) {
    return <div className="h-24 animate-pulse rounded-xl bg-muted" aria-hidden />;
  }

  if (entries.length === 0) {
    return null;
  }

  return (
    <section aria-label="Món trong giỏ" className="rounded-xl border">
      <ul className="divide-y">
        {entries.map(({ item, quantity }) => (
          <li key={item.id} className="flex items-center gap-3 px-4 py-3">
            <span className="grid size-6 shrink-0 place-items-center rounded-md bg-muted text-xs font-semibold tabular-nums">
              {quantity}
            </span>
            <span className="min-w-0 flex-1 truncate text-sm">{item.name}</span>
            <span className="text-sm tabular-nums text-muted-foreground">
              {formatPrice(item.price * quantity)}
            </span>
          </li>
        ))}
      </ul>
      <Separator />
      <p className="px-4 py-3 text-xs text-muted-foreground">{count} món</p>
    </section>
  );
}
