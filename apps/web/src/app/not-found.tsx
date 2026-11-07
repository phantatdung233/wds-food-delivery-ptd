import Link from "next/link";
import { Compass } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-4 px-4 py-24 sm:px-6">
      <span className="grid size-12 place-items-center rounded-full bg-muted">
        <Compass className="size-6 text-muted-foreground" aria-hidden />
      </span>
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Trang bạn tìm không tồn tại
      </h1>
      <p className="max-w-md text-muted-foreground">
        Đường dẫn có thể đã sai hoặc trang đã được chuyển đi. Hãy quay lại trang chủ để tiếp
        tục đặt món.
      </p>
      <Button render={<Link href="/" />}>Về trang chủ</Button>
    </div>
  );
}
