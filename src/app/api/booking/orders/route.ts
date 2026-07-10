import {
  assertCompleteBooking,
  calculateBookingCharges,
} from "@/src/utils/booking";
import {
  countAllBookingOrders,
  createBookingOrder,
  createPaymentRequest,
  getMultipleAdminPushTokens,
  getMultipleBookingOrders,
} from "@/src/utils/db";
import {
  BookingChargeSummaryType,
  BookingFormType,
  BookingPricingOptionsType,
} from "@/src/libs/types";
import {
  BookingOrderRecordType,
  PaginationMetaType,
} from "@/src/utils/db/types";
import { NextResponse } from "next/server";
import { generatePaginationMeta } from "@/src/utils/generator";
import { sendAdminPushNotification } from "@/src/services/mailer";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      booking?: BookingFormType;
      pricingOptions?: BookingPricingOptionsType;
    };
    const booking = body.booking;

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking details are required." },
        { status: 400 },
      );
    }

    const validationError = assertCompleteBooking(booking);

    if (validationError) {
      return NextResponse.json(
        { success: false, message: validationError },
        { status: 400 },
      );
    }

    const charges: BookingChargeSummaryType = calculateBookingCharges(
      booking,
      body.pricingOptions,
    );
    const order: BookingOrderRecordType = await createBookingOrder({
      booking,
      charges,
    });
    const paymentRequest = await createPaymentRequest({
      bookingId: order.id,
      amount: order.charges.total,
      currency: order.currency,
      description: `Booking Reservation for ${order.booking.fullname} (${order.booking.vehicle?.name})`,
      type: "booking",
    });

    //--send push notification to admins
    const adminPushTokens = await getMultipleAdminPushTokens();
    if (adminPushTokens.length) {
      adminPushTokens.forEach((admin) =>
        sendAdminPushNotification(admin.expoPushToken, {
          title: `New Booking Request`,
          body: `${paymentRequest.description}`,
          data: {
            screen: "booking",
            id: paymentRequest.bookingId,
          },
        }),
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        orderId: order.id,
        paymentId: paymentRequest.id,
      },
    });
  } catch (error) {
    //console.error("Create booking order error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to create booking order.",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  try {
    const query = searchParams.get("query") || "";
    const page = Number(searchParams.get("page")) || 1;

    const orders: BookingOrderRecordType[] = await getMultipleBookingOrders(
      page,
      query,
    );

    const totalNumOfOrders: number = await countAllBookingOrders(query);
    const meta: PaginationMetaType = generatePaginationMeta(
      page,
      totalNumOfOrders,
    );

    return NextResponse.json({ success: true, data: { orders, meta } });
  } catch (error) {
    console.error("Get booking orders error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to fetch booking order.",
      },
      { status: 500 },
    );
  }
}
