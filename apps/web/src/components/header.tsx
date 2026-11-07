import Link from "next/link";

import { Button } from "@/components/ui/button";

const navigation = [
  { href: "/", label: "Trang chủ" },
  { href: "/#nha-hang", label: "Nhà hàng" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <span
            aria-hidden
            className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground"
          >
            W
          </span>
          <span className="truncate text-base font-semibold tracking-tight">
            WDS Food Delivery
          </span>
        </Link>

        <nav aria-label="Điều hướng chính" className="hidden items-center gap-1 sm:flex">
          {navigation.map((item) => (
            <Button key={item.href} variant="ghost" size="sm" render={<Link href={item.href} />}>
              {item.label}
            </Button>
          ))}
        </nav>

        <Button size="sm" render={<Link href="/#nha-hang" />}>
          Đặt món
        </Button>
      </div>
    </header>
  );
}
