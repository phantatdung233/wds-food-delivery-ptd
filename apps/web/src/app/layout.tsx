import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";

import { FloatingCartButton } from "@/components/floating-cart";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "WDS Food Delivery — Đặt món từ nhà hàng quanh bạn",
    template: "%s · WDS Food Delivery",
  },
  description:
    "Đặt món ăn từ những nhà hàng quanh bạn, giao tận cửa. Dự án học tập Frontend với Next.js 16.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingCartButton />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
