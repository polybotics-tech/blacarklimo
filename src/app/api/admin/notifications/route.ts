import { validateAccessToken } from "@/src/services/admin";
import {
  createAdminPushToken,
  getAdminPushTokenByAdminId,
  updateAdminPushToken,
} from "@/src/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { error, admin } = await validateAccessToken(request);

    if (error) {
      return NextResponse.json(
        { success: false, message: error },
        { status: 401 },
      );
    }

    const body = (await request.json()) as {
      pushToken: string;
    };

    const pushToken = body?.pushToken;

    if (pushToken) {
      return NextResponse.json(
        { success: false, message: "Push Notification Token is missing." },
        { status: 400 },
      );
    }

    const adminId = admin?.id;

    if (!adminId) {
      return NextResponse.json(
        { success: false, message: "Unable to resolve admin ID." },
        { status: 400 },
      );
    }

    let notificationToken = await getAdminPushTokenByAdminId(adminId);

    if (!notificationToken) {
      await createAdminPushToken(adminId, pushToken);
    } else {
      if (pushToken !== notificationToken.expoPushToken) {
        await updateAdminPushToken(adminId, pushToken);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        isSaved: true,
      },
    });
  } catch (error) {
    //console.error("Create notification instance error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to create notification instance.",
      },
      { status: 500 },
    );
  }
}
