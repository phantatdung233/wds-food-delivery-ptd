#!/usr/bin/env node
// Kiểm tra UI thật trên Chromium: cart persist, toast, validate, checkout.
// Chạy sau `pnpm -C apps/web build`. Cách dùng: node scripts/e2e-check.mjs
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

// playwright-core is a dev-time tool kept out of the web app's dependencies.
const require = createRequire(import.meta.url);
const { chromium } = require(
  process.env.PLAYWRIGHT_CORE_PATH ?? "playwright-core",
);

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const web = join(root, "apps", "web");
const shots = join(root, ".screenshots");
const base = "http://localhost:3210";

const results = [];
function check(name, passed, detail = "") {
  results.push({ name, passed, detail });
  console.log(`${passed ? "[PASS]" : "[FAIL]"} ${name}${detail ? ` — ${detail}` : ""}`);
}

async function waitForServer(url, timeoutMs = 60000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // server not up yet
    }
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
  throw new Error(`Server did not start: ${url}`);
}

const server = spawn("pnpm", ["start", "-p", "3210"], { cwd: web, stdio: "ignore" });

let browser;
try {
  await waitForServer(base);
  await mkdir(shots, { recursive: true });

  browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: "vi-VN" });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(String(error)));

  // Home
  await page.goto(base, { waitUntil: "networkidle" });
  await page.screenshot({ path: join(shots, "home-1440.png"), fullPage: true });

  const cards = page.locator("#nha-hang li");
  check("Home liệt kê 3 nhà hàng", (await cards.count()) === 3, `${await cards.count()} card`);

  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(150);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    check(`Không tràn ngang ở ${width}px`, !overflow);
    if (width !== 1440) {
      await page.screenshot({ path: join(shots, `home-${width}.png`), fullPage: true });
    }
  }

  // Restaurant page
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.getByRole("link", { name: "Xem thực đơn" }).first().click();
  await page.waitForURL(/\/restaurant\//);
  await page.getByRole("heading", { name: "Thực đơn (5 món)" }).waitFor({ timeout: 20000 });
  check("Bấm card sang /restaurant/[id]", page.url().includes("/restaurant/pho-ha-noi"), page.url());
  await page.screenshot({ path: join(shots, "restaurant-1440.png"), fullPage: true });

  const dishCount = await page.locator('main section[aria-labelledby="thuc-don-title"] li').count();
  check("Trang nhà hàng hiển thị 5 món", dishCount === 5, `${dishCount} món`);

  // Add to cart + toast
  await page.getByRole("button", { name: /Thêm Phở bò tái/ }).click();
  const toastVisible = await page
    .locator("[data-sonner-toast]")
    .first()
    .waitFor({ state: "visible", timeout: 5000 })
    .then(() => true)
    .catch(() => false);
  check("Có toast sau khi thêm món", toastVisible);

  const badgeAfterAdd = await page.locator('a[href="/checkout"]').last().textContent();
  check("Badge cập nhật ngay (1 món)", /1/.test(badgeAfterAdd ?? ""), badgeAfterAdd?.trim());

  // Add the same dish again → quantity 2
  await page.getByRole("button", { name: /Thêm Phở bò tái/ }).click();
  const badgeAfterSecond = await page.locator('a[href="/checkout"]').last().textContent();
  check("Thêm trùng món thì tăng số lượng (2)", /2/.test(badgeAfterSecond ?? ""), badgeAfterSecond?.trim());

  // Reload → cart persists
  await page.reload({ waitUntil: "networkidle" });
  const badgeAfterReload = await page.locator('a[href="/checkout"]').last().textContent();
  check("Reload vẫn còn giỏ (2 món)", /2/.test(badgeAfterReload ?? ""), badgeAfterReload?.trim());

  // Drawer
  await page.locator('header button', { hasText: "Giỏ hàng" }).click();
  const drawerItem = page.locator("[role=dialog]").getByText("Phở bò tái").first();
  check("Cart Drawer hiển thị món", await drawerItem.isVisible());
  await page.screenshot({ path: join(shots, "cart-drawer.png") });
  const decrease = page.getByRole("button", { name: "Giảm Phở bò tái" });
  await decrease.click();
  await page.waitForTimeout(250);
  const qtyText = await page
    .locator("[role=dialog]")
    .getByText(/^[12]$/)
    .first()
    .textContent();
  check("Giảm số lượng hoạt động", qtyText?.trim() === "1", `còn ${qtyText?.trim()}`);

  // Unknown restaurant
  await page.goto(`${base}/restaurant/abc-khong-ton-tai`, { waitUntil: "networkidle" });
  check(
    "id không tồn tại hiện not-found",
    await page.getByText("Không tìm thấy nhà hàng").isVisible(),
  );

  // Checkout: submit empty → Vietnamese errors
  await page.goto(`${base}/checkout`, { waitUntil: "networkidle" });
  await page.screenshot({ path: join(shots, "checkout-1440.png"), fullPage: true });
  await page.getByRole("button", { name: "Đặt hàng" }).click();
  await page.waitForTimeout(300);
  const messages = await page.locator("p.text-destructive").allTextContents();
  check("Bỏ trống thì chặn submit và báo lỗi tiếng Việt", messages.length >= 2, messages.join(" | "));

  // Invalid phone
  await page.getByLabel("Họ và tên").fill("Nguyễn Văn An");
  await page.getByLabel("Số điện thoại").fill("12345");
  await page.getByLabel("Địa chỉ giao hàng").fill("12 Lê Lợi, Quận 1");
  await page.getByRole("button", { name: "Đặt hàng" }).click();
  await page.waitForTimeout(300);
  const phoneError = await page.getByText(/Số điện thoại không hợp lệ/).isVisible();
  check("SĐT 12345 bị báo lỗi", phoneError);

  // Valid phone → success
  await page.getByLabel("Số điện thoại").fill("0901234567");
  await page.getByRole("button", { name: "Đặt hàng" }).click();
  await page.getByRole("heading", { name: "Đặt hàng thành công!" }).waitFor({ timeout: 15000 });
  const code = await page.getByText(/^ORD-[A-Z0-9]{6}$/).first().textContent();
  check("Đặt hàng thành công có mã đơn", Boolean(code), code ?? "");
  await page.screenshot({ path: join(shots, "confirmation.png"), fullPage: true });

  await page.reload({ waitUntil: "networkidle" });
  const emptyCart = await page.getByText("Giỏ hàng đang trống").isVisible().catch(() => false);
  check("Sau khi đặt, giỏ hàng đã xóa sạch", emptyCart);

  const realErrors = consoleErrors.filter((message) => !/favicon|404 \(Not Found\)/.test(message));
  check("Console không có lỗi", realErrors.length === 0, realErrors.slice(0, 2).join(" | "));
} catch (error) {
  check("E2E chạy hết kịch bản", false, String(error).slice(0, 300));
} finally {
  await browser?.close();
  server.kill("SIGTERM");
}

const failed = results.filter((result) => !result.passed);
console.log(`\n${results.length - failed.length}/${results.length} kiểm tra đạt. Ảnh lưu ở ${shots}`);
process.exit(failed.length === 0 ? 0 : 1);
