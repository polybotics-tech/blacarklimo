import { registerAdmin } from "@/src/services/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email: string;
      password: string;
      fullname: string;
      role?: string;
    };

    if (!body.email || !body.password) {
      return NextResponse.json(
        { success: false, message: "Missing email or password." },
        { status: 400 },
      );
    }

    const { error, accessToken } = await registerAdmin(body);

    if (error) {
      return NextResponse.json(
        { success: false, message: error },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        accessToken,
      },
    });
  } catch (error) {
    console.error("admin register error:", error);

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
