import { sendEmailNotificationToAdmins } from "@/src/services/mailer";
import { sendPushNotificationToAdmins } from "@/src/services/notification";
import { PushNotificationType } from "@/src/services/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      notification: PushNotificationType;
    };

    const notification = body?.notification;
    if (!notification || !notification?.title) {
      return NextResponse.json(
        { success: false, message: "Notification content is missing." },
        { status: 400 },
      );
    }

    await sendPushNotificationToAdmins(notification);
    if (notification.data.screen === "transaction") {
      await sendEmailNotificationToAdmins(notification);
    }

    return NextResponse.json({
      success: true,
      data: null,
    });
  } catch (error) {
    console.error("Send notification error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to send notification.",
      },
      { status: 500 },
    );
  }
}
