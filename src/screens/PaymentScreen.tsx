"use client";

import type {
  BookingOrderRecordType,
  PaymentRequestWithBookingRecordType,
} from "@/src/utils/db/types";
import { PayPalPaymentMethod } from "@/src/libs/types";
import { formatCurrency } from "@/src/utils/estimations";
import {
  PayPalGuestPaymentButton,
  PayPalOneTimePaymentButton,
  PayPalProvider,
  VenmoOneTimePaymentButton,
} from "@paypal/react-paypal-js/sdk-v6";
import { CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/src/hooks/useStore";
import { __Action_updateBookingForm } from "../utils/store/slice/bookingSlice";
import toast from "react-hot-toast";

export default function PaymentScreen({
  paymentRequest,
  clientId,
  environment,
}: {
  paymentRequest: PaymentRequestWithBookingRecordType;
  clientId?: string;
  environment: "sandbox" | "production";
}) {
  //--hooks
  const booking = useAppSelector((state) => state.booking);
  const dispatch = useAppDispatch();
  const router = useRouter();

  //--states
  const [activeMethod, setActiveMethod] =
    React.useState<PayPalPaymentMethod>("paypal");
  const [errorMessage, setErrorMessage] = React.useState("");

  //--variables
  const order: BookingOrderRecordType = paymentRequest.order;

  //--functions
  async function createOrder(paymentMethod: PayPalPaymentMethod) {
    setActiveMethod(paymentMethod);
    setErrorMessage("");

    try {
      const response = await fetch("/api/paypal/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId: paymentRequest?.id, paymentMethod }),
      });
      const data = await response.json();

      if (!response.ok || !data?.success) {
        console.log("createPayPalOrder Err: ", data?.message);
        toast.error(data?.message || "Unable to start payment");
        setErrorMessage(data?.message ?? "Unable to start payment");
        return { orderId: "" };
      }

      return { orderId: data.data.paypalOrderId as string };
    } catch (error) {
      console.log(
        "createPayPalOrder Err: ",
        error instanceof Error ? error.message : "Unable to start payment",
      );
      toast.error(
        error instanceof Error ? error?.message : "Unable to start payment",
      );
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to start payment.",
      );
      return { orderId: "" };
    }
  }

  async function captureOrder(
    paypalOrderId: string,
    paymentMethod: PayPalPaymentMethod,
  ) {
    try {
      setErrorMessage("");

      const response = await fetch(
        `/api/paypal/orders/${paypalOrderId}/capture`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            payemntId: paymentRequest?.id,
            paymentMethod,
          }),
        },
      );
      const data = await response.json();

      if (!response.ok || !data?.success) {
        console.log("capturePayPalOrder Err: ", data?.message);
        setErrorMessage(data?.message ?? "Unable to complete payment.");
      }

      if (order?.id === booking.pendingOrderId) {
        dispatch(__Action_updateBookingForm({ pendingOrderId: null }));
      }
      router.push(`/booking/receipt/${data.data.transactionId}`);
    } catch (error) {
      console.log(
        "capturePayPalOrder Err: ",
        error instanceof Error ? error.message : "Unable to start payment.",
      );
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to start payment.",
      );
    }
  }

  if (!clientId) {
    return (
      <main className="min-h-screen centralize bg-pri-bg px-4">
        <p className="max-w-120 text-center text-red-400">
          PayPal client ID is missing. Please Contact Support.
        </p>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen centralize bg-pri-bg px-4">
        <p className="max-w-120 text-center text-red-400">
          {errorMessage || "Booking order not found."}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-pri-bg px-4 py-24">
      <div className="mx-auto w-full max-w-160 space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-sec-gold">
            Secure Checkout
          </p>
          <h1 className="text-2xl font-semibold text-pri-text capitalize">
            {paymentRequest.type === "booking"
              ? "Complete your reservation"
              : `${paymentRequest.type} Payment`}
          </h1>
          <p className="text-sec-text">{paymentRequest.description}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-[1fr_18rem]">
          <section className="space-y-4 rounded-lg bg-card-bg p-4">
            <PayPalProvider
              clientId={clientId.trim()}
              environment={environment}
              components={[
                "paypal-payments",
                "venmo-payments",
                "paypal-guest-payments",
              ]}
              pageType="checkout"
            >
              <div className="space-y-3 space-x-3">
                <PayPalOneTimePaymentButton
                  type="pay"
                  presentationMode="modal"
                  createOrder={() => createOrder("paypal")}
                  onApprove={(data) => captureOrder(data.orderId, "paypal")}
                  onError={(error) => setErrorMessage(error.message)}
                />

                <VenmoOneTimePaymentButton
                  type="pay"
                  presentationMode="modal"
                  createOrder={() => createOrder("venmo")}
                  onApprove={(data) => captureOrder(data.orderId, "venmo")}
                  onError={(error) => setErrorMessage(error.message)}
                />

                <div className="space-y-2 rounded-lg border border-dim-text p-3">
                  <div className="flex items-center gap-1">
                    <CreditCard size={15} className="text-pri-text" />
                    <p className="text-xs text-sec-text">
                      Don&apos;t have PayPal?
                    </p>
                  </div>
                  <PayPalGuestPaymentButton
                    createOrder={() => createOrder("card")}
                    onApprove={(data) => captureOrder(data.orderId, "card")}
                    onError={(error) => setErrorMessage(error.message)}
                    buyerCountry="US"
                  />
                </div>
              </div>
            </PayPalProvider>

            {errorMessage && (
              <p className="rounded-lg border border-red-500/50 p-3 text-sm text-red-400">
                {errorMessage}
              </p>
            )}
          </section>

          {paymentRequest.type === "booking" ? (
            <aside className="h-fit space-y-3 rounded-lg bg-card-bg p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sec-text">Subtotal</p>
                <p className="font-medium text-pri-text">
                  $ {formatCurrency(order.charges.subtotal)}
                </p>
              </div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-sec-text">Tax</p>
                <p className="font-medium text-pri-text">
                  $ {formatCurrency(order.charges.tax)}
                </p>
              </div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-sec-text">Gratuity</p>
                <p className="font-medium text-pri-text">
                  $ {formatCurrency(order.charges.gratuity)}
                </p>
              </div>
              <div className="border-t border-b border-dashed border-dim-text py-3">
                <div className="flex items-end justify-between gap-4">
                  <p className="text-base text-pri-text">Total</p>
                  <h2 className="text-xl font-semibold text-sec-gold">
                    $ {formatCurrency(order.charges.total)}
                  </h2>
                </div>
              </div>
              <p className="text-[10px] text-sec-text text-center">
                All payments and transactions are securely processed through Ark
                Limo, the operating company behind Blacarklimo.
              </p>
            </aside>
          ) : (
            <aside className="h-fit space-y-3 rounded-lg bg-card-bg p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sec-text">Booking ID</p>
                <p className="font-medium text-pri-text text-right">
                  {paymentRequest.bookingId?.slice(0, 16)}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4">
                <p className="text-sec-text">Payment Type</p>
                <p className="font-medium text-pri-text uppercase text-right">
                  {paymentRequest.type}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4">
                <p className="text-sec-text">Customer Name</p>
                <p className="font-medium text-pri-text text-right">
                  {paymentRequest?.order?.booking?.fullname}
                </p>
              </div>

              <div className="flex items-center justify-between gap-6">
                <p className="text-sec-text">Vehicle</p>
                <p className="font-medium text-pri-text text-right truncate">
                  {paymentRequest?.order?.booking?.vehicle?.name}
                </p>
              </div>

              <div className="border-t border-b border-dashed border-dim-text py-3">
                <div className="flex items-end justify-between gap-4">
                  <p className="text-base text-pri-text">Amount</p>
                  <h2 className="text-xl font-semibold text-sec-gold">
                    $ {formatCurrency(paymentRequest.amount)}
                  </h2>
                </div>
              </div>
              <p className="text-[10px] text-sec-text text-center">
                All payments and transactions are securely processed through Ark
                Limo, the operating company behind Blacarklimo.
              </p>
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}
