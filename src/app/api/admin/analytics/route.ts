import { validateAccessToken } from "@/src/services/admin";
import { getDashboardAnalytics } from "@/src/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { error, admin } = await validateAccessToken(req);

    if (error) {
      return NextResponse.json(
        { success: false, message: error },
        { status: 401 },
      );
    }

    const analytics = await getDashboardAnalytics();

    if (!analytics) {
      return NextResponse.json(
        { success: false, message: "Unable to fetch analytics" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        analytics,
      },
    });
  } catch (error) {
    //console.error("Get analytic error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Analytic fetch failed.",
      },
      { status: 500 },
    );
  }
}
