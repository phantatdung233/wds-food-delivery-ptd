#!/usr/bin/env node
// Vẽ ảnh placeholder SVG cho mock data. Chạy: node scripts/gen-images.mjs
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "apps", "web", "public");

const palettes = [
  ["#f97316", "#fb923c"],
  ["#0ea5e9", "#38bdf8"],
  ["#16a34a", "#4ade80"],
  ["#a855f7", "#c084fc"],
  ["#e11d48", "#fb7185"],
  ["#ca8a04", "#facc15"],
  ["#0f766e", "#2dd4bf"],
  ["#7c3aed", "#a78bfa"],
];

const restaurants = [
  ["pho-ha-noi", "Phở Hà Nội"],
  ["com-tam-sai-gon", "Cơm Tấm Sài Gòn"],
  ["banh-mi-hoi-an", "Bánh Mì Hội An"],
];

const menuItems = [
  ["pho-bo-tai", "Phở bò tái"],
  ["pho-bo-chin-nam", "Phở bò chín nạm"],
  ["pho-ga", "Phở gà ta"],
  ["quay-nong", "Quẩy nóng"],
  ["tra-dao", "Trà đào cam sả"],
  ["com-tam-suon-bi-cha", "Cơm tấm sườn bì chả"],
  ["com-tam-suon-nuong", "Cơm tấm sườn nướng"],
  ["com-tam-ga-quay", "Cơm tấm gà quay"],
  ["cha-trung-hap", "Chả trứng hấp"],
  ["nuoc-mia", "Nước mía tắc"],
  ["banh-mi-thap-cam", "Bánh mì thập cẩm"],
  ["banh-mi-ga-nuong", "Bánh mì gà nướng"],
  ["banh-mi-trung", "Bánh mì trứng"],
  ["mi-quang", "Mì Quảng tôm thịt"],
  ["cao-lau", "Cao lầu Hội An"],
];

function escapeXml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function svg(label, [from, to], width, height, fontSize) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXml(label)}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g)"/>
  <circle cx="${width * 0.82}" cy="${height * 0.22}" r="${height * 0.28}" fill="#ffffff" opacity="0.12"/>
  <circle cx="${width * 0.18}" cy="${height * 0.86}" r="${height * 0.34}" fill="#000000" opacity="0.08"/>
  <text x="50%" y="52%" text-anchor="middle" dominant-baseline="middle" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-weight="600" font-size="${fontSize}" fill="#ffffff">${escapeXml(label)}</text>
</svg>
`;
}

let written = 0;
async function put(path, contents) {
  const target = join(root, path);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, contents, "utf8");
  written += 1;
}

for (const [index, [slug, name]] of restaurants.entries()) {
  await put(`images/restaurants/${slug}.svg`, svg(name, palettes[index % palettes.length], 800, 450, 44));
}

for (const [index, [slug, name]] of menuItems.entries()) {
  await put(`images/menu-items/${slug}.svg`, svg(name, palettes[(index + 3) % palettes.length], 400, 400, 28));
}

console.log(`Đã tạo ${written} ảnh placeholder trong apps/web/public/images`);
