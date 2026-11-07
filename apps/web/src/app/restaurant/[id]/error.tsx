"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function RestaurantError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-4 px-4 py-20 sm:px-6">
      <span className="grid size-12 place-items-center rounded-full bg-destructive/10">
        <AlertTriangle className="size-6 text-destructive" aria-hidden />
      </span>
      <h1 className="text-2xl font-semibold tracking-tight">Không tải được nhà hàng</h1>
      <p className="max-w-md text-muted-foreground">
        Đã có lỗi khi tải thực đơn. Bạn có thể thử lại, hoặc quay về danh sách nhà hàng.
      </p>
      {error.digest ? (
        <p className="text-xs text-muted-foreground">Mã lỗi: {error.digest}</p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => reset()}>Thử lại</Button>
        <Button variant="outline" render={<Link href="/" />}>
          Về trang chủ
        </Button>
      </div>
    </div>
  );
}
