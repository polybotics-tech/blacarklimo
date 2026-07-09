import { getDiscountByCode } from "@/src/utils/db";
import { DiscountRecordType } from "@/src/utils/db/types";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  try {
    const code = searchParams.get("code") || "";

    const discount: DiscountRecordType | null = await getDiscountByCode(code);

    if (!discount) {
      return NextResponse.json(
        { success: false, message: "Discount not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: { discount } });
  } catch (error) {
    console.error("Get discounts error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to fetch discount.",
      },
      { status: 500 },
    );
  }
}
