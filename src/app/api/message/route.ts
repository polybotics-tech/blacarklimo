import { sendContactMessage } from "@/src/services/mailer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      fullname: string;
      email: string;
      phone: string;
      message: string;
    };

    if (!body.fullname || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, message: "Complete all required fields" },
        { status: 400 },
      );
    }

    await sendContactMessage(
      String(body.fullname),
      String(body.email),
      String(body.phone || null),
      String(body.message),
    );

    return NextResponse.json({
      success: true,
      data: null,
    });
  } catch (error) {
    //console.error("admin login error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Contact enquiry failed.",
      },
      { status: 500 },
    );
  }
}
