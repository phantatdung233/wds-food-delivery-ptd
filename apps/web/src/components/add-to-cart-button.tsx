"use client";

import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { MenuItem } from "@/data";
import { useCartStore } from "@/lib/cart-store";

export function AddToCartButton({
  item,
  restaurantName,
  className,
}: {
  item: MenuItem;
  restaurantName: string;
  className?: string;
}) {
  const addItem = useCartStore((state) => state.addItem);

  function handleAdd() {
    addItem(item, 1);
    toast.success("Đã thêm vào giỏ", {
      description: `${item.name} · ${restaurantName}`,
    });
  }

  return (
    <Button size="sm" className={className} onClick={handleAdd}>
      <Plus className="size-4" aria-hidden />
      Thêm
      <span className="sr-only"> {item.name}</span>
    </Button>
  );
}
