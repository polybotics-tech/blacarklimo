import { loginAdmin } from "@/src/services/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email: string;
      password: string;
    };

    if (!body.email || !body.password) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 400 },
      );
    }

    const { error, accessToken, admin } = await loginAdmin(body);

    if (error) {
      return NextResponse.json(
        { success: false, message: error },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        accessToken,
        admin,
      },
    });
  } catch (error) {
    //console.error("admin login error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Authentication failed.",
      },
      { status: 500 },
    );
  }
}
