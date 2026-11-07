import { NextResponse } from "next/server";

import { createOrderSchema, type Order } from "@/lib/schemas/checkout";

const ORDER_CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function randomToken(length: number) {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes, (byte) => ORDER_CODE_ALPHABET[byte % ORDER_CODE_ALPHABET.length]).join(
    "",
  );
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Dữ liệu gửi lên không phải JSON hợp lệ." },
      { status: 400 },
    );
  }

  const parsed = createOrderSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Thông tin đặt hàng không hợp lệ.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  // Giả lập độ trễ mạng để thấy trạng thái đang gửi trên UI.
  await new Promise((resolve) => setTimeout(resolve, 900));

  const order: Order = {
    ...parsed.data,
    id: `ord_${randomToken(10).toLowerCase()}`,
    code: `ORD-${randomToken(6)}`,
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({ order }, { status: 201 });
}
