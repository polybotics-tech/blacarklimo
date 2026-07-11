import constants from "@/src/libs/constants";
import { PayPalPaymentMethod } from "@/src/libs/types";
import Jobs from "@/src/services/jobs";
import { capturePayPalOrder } from "@/src/services/paypal";
import { RedisCache } from "@/src/utils/cache";
import {
  createTransaction,
  getPaymentRequestWithBooking,
  getTransactionByPaypalOrderId,
  markBookingPaid,
  updatePaymentRequestStatus,
} from "@/src/utils/db";
import {
  BookingOrderRecordType,
  PaymentRequestWithBookingRecordType,
} from "@/src/utils/db/types";
import { NextResponse } from "next/server";

function getCaptureDetails(paypalResponse: {
  purchase_units?: {
    payments?: {
      captures?: {
        id?: string;
        status?: string;
        amount?: {
          value?: string;
          currency_code?: string;
        };
      }[];
    };
  }[];
  payer?: {
    payer_id?: string;
  };
  status?: string;
}) {
  const capture =
    paypalResponse.purchase_units?.[0]?.payments?.captures?.[0] ?? null;

  return {
    captureId: capture?.id ?? null,
    status: capture?.status ?? paypalResponse.status ?? "UNKNOWN",
    amount: Number(capture?.amount?.value ?? 0),
    currency: capture?.amount?.currency_code ?? "USD",
    payerId: paypalResponse.payer?.payer_id ?? null,
  };
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: paypalOrderId } = await params;
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

    //--CONFIRM PAYMENT REQUEST
    const paymentRequest: PaymentRequestWithBookingRecordType | null =
      await getPaymentRequestWithBooking(body.paymentId);
    if (!paymentRequest) {
      return NextResponse.json(
        { success: false, message: "Payment request not found." },
        { status: 404 },
      );
    }

    //--CONFIRM ORDER
    const order: BookingOrderRecordType | null = paymentRequest.order;
    if (!order) {
      return NextResponse.json(
        { success: false, message: "Booking order not found." },
        { status: 404 },
      );
    }

    //--CHECK IF TRANSACTION HAS ALREADY BEEN CAPTURED
    const existing = await getTransactionByPaypalOrderId(paypalOrderId);
    if (existing && existing.status === "COMPLETED") {
      return NextResponse.json({
        success: true,
        data: {
          transactionId: existing.id,
          transaction: existing,
        },
      });
    }

    //--CAPTURE TRANSACTION FROM PAYPAL API
    const paypalResponse = await capturePayPalOrder(paypalOrderId);
    const capture = getCaptureDetails(paypalResponse);
    const transaction = await createTransaction({
      requestId: paymentRequest.id,
      paypalOrderId,
      paypalCaptureId: capture.captureId,
      paypalPayerId: capture.payerId,
      paymentMethod: body.paymentMethod ?? "paypal",
      status: capture.status,
      amount: capture.amount || order.charges.total,
      currency: capture.currency || order.currency,
      paypalResponse,
    });

    if (capture.status === "COMPLETED") {
      await markBookingPaid(order.id);
      await updatePaymentRequestStatus(paymentRequest.id, "paid");

      //--clear catch
      RedisCache.delete(
        [
          constants.cacheKeyTemp.booking.count_orders(""),
          constants.cacheKeyTemp.booking.orders(1, ""),
          constants.cacheKeyTemp.booking.order(order.id),
          constants.cacheKeyTemp.payment.request(paymentRequest.id),
          constants.cacheKeyTemp.payment.requests(order.id),
          constants.cacheKeyTemp.payment.requests(undefined, "pending"),
          constants.cacheKeyTemp.transactions.count_orders(""),
          constants.cacheKeyTemp.transactions.orders(1, ""),
        ],
        true,
      );

      //--send notification to admins
      Jobs.notifyAdmin({
        title: `Payment Transaction Successful`,
        body: `${paymentRequest.description}`,
        data: {
          screen: "transaction",
          id: transaction.id,
        },
      });
    } else {
      await updatePaymentRequestStatus(paymentRequest.id, "cancelled");
    }

    return NextResponse.json({
      success: true,
      data: {
        transactionId: transaction.id,
        transaction,
      },
    });
  } catch (error) {
    console.error("Capture PayPal order error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to capture PayPal order.",
      },
      { status: 500 },
    );
  }
}
