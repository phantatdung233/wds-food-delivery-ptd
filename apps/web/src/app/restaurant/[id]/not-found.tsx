import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function RestaurantNotFound() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-4 px-4 py-20 sm:px-6">
      <span className="grid size-12 place-items-center rounded-full bg-muted">
        <UtensilsCrossed className="size-6 text-muted-foreground" aria-hidden />
      </span>
      <h1 className="text-2xl font-semibold tracking-tight">Không tìm thấy nhà hàng</h1>
      <p className="max-w-md text-muted-foreground">
        Nhà hàng bạn tìm không tồn tại hoặc đã ngừng bán. Hãy chọn một nhà hàng khác trong
        danh sách.
      </p>
      <Button render={<Link href="/#nha-hang" />}>Xem các nhà hàng</Button>
    </div>
  );
}
