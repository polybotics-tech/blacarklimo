import constants from "@/src/libs/constants";
import { RedisCache } from "@/src/utils/cache";
import { deleteDiscountById } from "@/src/utils/db";
import { NextResponse } from "next/server";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing discount id." },
        { status: 404 },
      );
    }

    const isDeleted: boolean = await deleteDiscountById(id);

    if (!isDeleted) {
      return NextResponse.json(
        { success: false, message: "Unable to delete discount." },
        { status: 400 },
      );
    }

    await RedisCache.delete(constants.cacheKeyTemp.discount.codes(1));

    return NextResponse.json({ success: true, data: true });
  } catch (error) {
    //console.error("Delete discount error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to delete discount.",
      },
      { status: 500 },
    );
  }
}
