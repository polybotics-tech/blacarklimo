import constants from "@/src/libs/constants";
import { RedisCache } from "@/src/utils/cache";
import {
  countAllDiscounts,
  createDiscount,
  getMultipleDiscounts,
} from "@/src/utils/db";
import { DiscountRecordType, PaginationMetaType } from "@/src/utils/db/types";
import {
  generatePaginationMeta,
  generateRandomPromoCodes,
} from "@/src/utils/generator";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  try {
    const page = Number(searchParams.get("page")) || 1;

    const discounts: DiscountRecordType[] = await getMultipleDiscounts(page);

    const totalNumOfOrders: number = await countAllDiscounts();
    const meta: PaginationMetaType = generatePaginationMeta(
      page,
      totalNumOfOrders,
    );

    return NextResponse.json({ success: true, data: { discounts, meta } });
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

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      value: number;
      isFixedPrice: boolean;
      code?: string;
    };

    const { value, isFixedPrice, code } = body;

    if (!value) {
      return NextResponse.json(
        { success: false, message: "Discount details are required." },
        { status: 400 },
      );
    }

    const promoCode = code ?? generateRandomPromoCodes();

    const discount: DiscountRecordType = await createDiscount(
      promoCode,
      value,
      isFixedPrice,
    );

    await RedisCache.delete(constants.cacheKeyTemp.discount.codes(1));

    return NextResponse.json({
      success: true,
      data: {
        discount,
      },
    });
  } catch (error) {
    //console.error("Create discount order error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to create discount order.",
      },
      { status: 500 },
    );
  }
}
