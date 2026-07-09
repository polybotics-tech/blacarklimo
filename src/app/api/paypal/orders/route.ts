import { PayPalPaymentMethod } from "@/src/libs/types";
import { createPayPalOrder } from "@/src/services/paypal";
import { getBookingOrder, getPaymentRequestWithBooking } from "@/src/utils/db";
import {
  BookingOrderRecordType,
  PaymentRequestWithBookingRecordType,
} from "@/src/utils/db/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      paymentId?: string;
      paymentMethod?: PayPalPaymentMethod;
    };

    if (!body.paymentId) {
      return NextResponse.json(
        { success: false, message: "Payment ID is required." },
        { status: 400 },
      );
    }

    const paymentRequest: PaymentRequestWithBookingRecordType | null =
      await getPaymentRequestWithBooking(body.paymentId);

    if (!paymentRequest) {
      return NextResponse.json(
        { success: false, message: "Payment request not found." },
        { status: 404 },
      );
    }

    const order: BookingOrderRecordType | null = paymentRequest.order;

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Booking order not found." },
        { status: 404 },
      );
    }

    if (paymentRequest.status === "paid") {
      return NextResponse.json(
        {
          success: false,
          message: "This payment request is already completed.",
        },
        { status: 400 },
      );
    }

    const paypalOrder = await createPayPalOrder({
      bookingId: order.id,
      amount: order.charges.total,
      currency: order.currency,
      description:
        paymentRequest.description ?? "Payment Request from Blacarklimo",
    });

    return NextResponse.json({
      success: true,
      data: {
        paypalOrderId: paypalOrder.id,
      },
    });
  } catch (error) {
    console.log("Create PayPal order error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to create PayPal order.",
      },
      { status: 500 },
    );
  }
}
