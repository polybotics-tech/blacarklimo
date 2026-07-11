import constants from "@/src/libs/constants";
import { validateAccessToken } from "@/src/services/admin";
import { RedisCache } from "@/src/utils/cache";
import {
  createPaymentRequest,
  deleteBookingOrderById,
  deletePaymentRequestByBookingId,
  deletePaymentRequestById,
  getBookingOrder,
  getBookingOrderWithPayment,
  getPaymentRequest,
} from "@/src/utils/db";
import {
  BookingOrderRecordType,
  BookingOrderWithPaymentsRecordType,
  PaymentRequestRecordType,
} from "@/src/utils/db/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { error, admin } = await validateAccessToken(request);

    if (error) {
      return NextResponse.json(
        { success: false, message: error },
        { status: 401 },
      );
    }

    const body = (await request.json()) as Omit<
      PaymentRequestRecordType,
      "id" | "status" | "createdAt" | "updatedAt" | "bookingId"
    >;

    const { id: bookingId } = await params;
    const order: BookingOrderRecordType | null =
      await getBookingOrder(bookingId);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Booking order not found." },
        { status: 404 },
      );
    }

    const paymentRequest: PaymentRequestRecordType | null =
      await createPaymentRequest({
        ...body,
        bookingId: bookingId,
      });

    if (!paymentRequest) {
      return NextResponse.json(
        { success: false, message: "Unable to create payment request" },
        { status: 400 },
      );
    }

    await RedisCache.delete(
      [
        constants.cacheKeyTemp.booking.order(bookingId),
        constants.cacheKeyTemp.payment.requests(bookingId, "pending"),
      ],
      true,
    );

    return NextResponse.json({
      success: true,
      data: {
        paymentRequest,
      },
    });
  } catch (error) {
    console.error("Create payment request error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to create payment request.",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { error, admin } = await validateAccessToken(request);

    if (error) {
      return NextResponse.json(
        { success: false, message: error },
        { status: 401 },
      );
    }

    const { id: paymentId } = await params;
    const paymentRequest: PaymentRequestRecordType | null =
      await getPaymentRequest(paymentId);

    if (!paymentRequest) {
      return NextResponse.json(
        { success: false, message: "Payment request not found." },
        { status: 404 },
      );
    }

    if (paymentRequest.status === "paid") {
      return NextResponse.json(
        {
          success: false,
          message: "Payment request has already been paid for.",
        },
        { status: 400 },
      );
    }

    await deletePaymentRequestById(paymentId);

    await RedisCache.delete(
      [
        constants.cacheKeyTemp.booking.order(paymentRequest.bookingId),
        constants.cacheKeyTemp.payment.requests(
          paymentRequest.bookingId,
          "pending",
        ),
        constants.cacheKeyTemp.payment.request(paymentId),
      ],
      true,
    );

    return NextResponse.json({ success: true, data: true });
  } catch (error) {
    console.error("Delete payment request error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to delete payment request.",
      },
      { status: 500 },
    );
  }
}
