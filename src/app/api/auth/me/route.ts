import { validateAccessToken } from "@/src/services/admin";
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

    return NextResponse.json({
      success: true,
      data: {
        admin,
      },
    });
  } catch (error) {
    //console.error("admin login error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Registeration failed.",
      },
      { status: 500 },
    );
  }
}
