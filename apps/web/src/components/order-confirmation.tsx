import { CheckCircle2 } from "lucide-react";

import type { Order } from "@/lib/schemas/checkout";

export function OrderConfirmation({ order }: { order: Order }) {
  return (
    <div className="flex flex-col items-start gap-4 py-10">
      <span className="grid size-12 place-items-center rounded-full bg-primary/10">
        <CheckCircle2 className="size-6 text-primary" aria-hidden />
      </span>
      <h2 className="text-2xl font-semibold tracking-tight">Đặt hàng thành công!</h2>
      <p className="text-muted-foreground">
        Cảm ơn {order.customerName}. Đơn của bạn đang được chuẩn bị và sẽ giao tới{" "}
        {order.address}.
      </p>

      <div className="w-full max-w-md rounded-xl border bg-muted/40 p-4">
        <p className="text-xs text-muted-foreground">Mã đơn hàng</p>
        <p className="mt-1 text-xl font-semibold tracking-wider tabular-nums">{order.code}</p>
        <p className="mt-3 text-xs text-muted-foreground">
          Liên hệ {order.phone} nếu cần thay đổi thông tin giao hàng.
        </p>
      </div>
    </div>
  );
}
