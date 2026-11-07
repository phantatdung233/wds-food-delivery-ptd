import Link from "next/link";

const columns = [
  {
    title: "Khám phá",
    links: [
      { href: "/", label: "Trang chủ" },
      { href: "/#nha-hang", label: "Danh sách nhà hàng" },
    ],
  },
  {
    title: "Hỗ trợ",
    links: [
      { href: "/#nha-hang", label: "Cách đặt món" },
      { href: "/#nha-hang", label: "Câu hỏi thường gặp" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-muted/40">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="text-base font-semibold tracking-tight">WDS Food Delivery</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Đồ ăn từ những nhà hàng quanh bạn, giao tận cửa. Dự án học tập xây dựng bằng
            Next.js, Tailwind CSS và shadcn/ui.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-medium">{column.title}</p>
            <ul className="mt-3 space-y-2">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t">
        <p className="mx-auto w-full max-w-6xl px-4 py-4 text-xs text-muted-foreground sm:px-6">
          © 2026 WDS Food Delivery. Dự án học tập, không dùng cho mục
          đích thương mại.
        </p>
      </div>
    </footer>
  );
}
