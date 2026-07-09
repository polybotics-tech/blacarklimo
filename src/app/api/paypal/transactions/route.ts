import { countAllTransactions, getMultipleTransactions } from "@/src/utils/db";
import {
  PaginationMetaType,
  TransactionRecordType,
} from "@/src/utils/db/types";
import { generatePaginationMeta } from "@/src/utils/generator";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  try {
    const query = searchParams.get("query") || "";
    const page = Number(searchParams.get("page")) || 1;

    const transactions: TransactionRecordType[] = await getMultipleTransactions(
      page,
      query,
    );

    const totalNumOfTransactions: number = await countAllTransactions(query);
    const meta: PaginationMetaType = generatePaginationMeta(
      page,
      totalNumOfTransactions,
    );

    return NextResponse.json({ success: true, data: { transactions, meta } });
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
