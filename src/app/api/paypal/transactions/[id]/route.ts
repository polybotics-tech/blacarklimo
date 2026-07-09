import { getTransaction } from "@/src/utils/db";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const transaction = await getTransaction(id);

    if (!transaction) {
      return NextResponse.json(
        { success: false, message: "Transaction not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: { transaction } });
  } catch (error) {
    //console.error("Get transaction error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to fetch transaction.",
      },
      { status: 500 },
    );
  }
}
