import {
  deleteBookingOrderById,
  deletePaymentRequestByBookingId,
  getBookingOrder,
  getBookingOrderWithPayment,
} from "@/src/utils/db";
import {
  BookingOrderRecordType,
  BookingOrderWithPaymentsRecordType,
} from "@/src/utils/db/types";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const order: BookingOrderWithPaymentsRecordType | null =
      await getBookingOrderWithPayment(id);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Booking order not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: { order } });
  } catch (error) {
    //console.error("Get booking order error:", error);

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

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const order: BookingOrderRecordType | null = await getBookingOrder(id);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Booking order not found." },
        { status: 404 },
      );
    }

    if (order?.paymentStatus === "paid" || order?.orderStatus === "confirmed") {
      return NextResponse.json(
        { success: false, message: "Booking order has already been paid for." },
        { status: 400 },
      );
    }

    await deleteBookingOrderById(id);
    await deletePaymentRequestByBookingId(id);

    return NextResponse.json({ success: true, data: null });
  } catch (error) {
    //console.error("Delete booking order error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to delete booking order.",
      },
      { status: 500 },
    );
  }
}
