"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice } from "@/lib/format";
import type { CartItem } from "@/lib/cart-store";
import { checkoutSchema, type CheckoutInput, type Order } from "@/lib/schemas/checkout";

type OrderFormProps = {
  entries: CartItem[];
  total: number;
  onOrdered: (order: Order) => void;
};

export function OrderForm({ entries, total, onOrdered }: OrderFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur",
    defaultValues: { customerName: "", phone: "", address: "", note: "" },
  });

  async function onSubmit(values: CheckoutInput) {
    setServerError(null);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...values,
          items: entries.map((entry) => ({
            id: entry.item.id,
            name: entry.item.name,
            price: entry.item.price,
            quantity: entry.quantity,
          })),
        }),
      });

      const payload = (await response.json()) as { order?: Order; message?: string };

      if (!response.ok || !payload.order) {
        setServerError(payload.message ?? "Đặt hàng thất bại, vui lòng thử lại.");
        return;
      }

      onOrdered(payload.order);
    } catch {
      setServerError("Không kết nối được tới máy chủ. Kiểm tra mạng rồi thử lại.");
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-8 max-w-xl">
      <h2 className="text-lg font-semibold tracking-tight">Thông tin giao hàng</h2>

      <div className="mt-4 space-y-4">
        <Field id="customerName" label="Họ và tên" error={errors.customerName?.message}>
          <Input
            id="customerName"
            autoComplete="name"
            placeholder="Nguyễn Văn An"
            aria-invalid={Boolean(errors.customerName)}
            aria-describedby={errors.customerName ? "customerName-error" : undefined}
            {...register("customerName")}
          />
        </Field>

        <Field id="phone" label="Số điện thoại" error={errors.phone?.message}>
          <Input
            id="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="0901234567"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
          />
        </Field>

        <Field id="address" label="Địa chỉ giao hàng" error={errors.address?.message}>
          <Textarea
            id="address"
            autoComplete="street-address"
            rows={3}
            placeholder="Số nhà, đường, phường/xã, quận/huyện"
            aria-invalid={Boolean(errors.address)}
            aria-describedby={errors.address ? "address-error" : undefined}
            {...register("address")}
          />
        </Field>

        <Field id="note" label="Ghi chú (không bắt buộc)" error={errors.note?.message}>
          <Textarea
            id="note"
            rows={2}
            placeholder="Ví dụ: ít đá, thêm tương ớt, gọi trước khi tới"
            aria-invalid={Boolean(errors.note)}
            aria-describedby={errors.note ? "note-error" : undefined}
            {...register("note")}
          />
        </Field>
      </div>

      {serverError ? (
        <p role="alert" className="mt-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {serverError}
        </p>
      ) : null}

      <div className="mt-6 flex items-center justify-between gap-4 border-t pt-4">
        <div>
          <p className="text-xs text-muted-foreground">Tổng thanh toán</p>
          <p className="text-lg font-semibold tabular-nums">{formatPrice(total)}</p>
        </div>
        <Button type="submit" size="lg" disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Đang đặt hàng…
            </>
          ) : (
            "Đặt hàng"
          )}
        </Button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

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
