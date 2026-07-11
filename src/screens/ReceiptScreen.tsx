"use client";

import type {
  BookingOrderWithPaymentsRecordType,
  PaymentRequestRecordType,
  PaymentRequestWithBookingRecordType,
  TransactionRecordType,
} from "@/src/utils/db/types";
import {
  calculateTravelDuration,
  formatCurrency,
} from "@/src/utils/estimations";
import { Copy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useReactToPrint } from "react-to-print";
import { SummaryLocationCard } from "../components/reuseable/CardComponent";
import constants from "../libs/constants";
import { LocationType } from "../libs/types";
import {
  formatDateFromISO,
  formatDateTimeFromISO,
  formatTimeFromISO,
} from "../utils/datetime";
import toast from "react-hot-toast";

export default function ReceiptScreen({
  transaction,
  paymentRequest,
}: {
  transaction: TransactionRecordType | null;
  paymentRequest: PaymentRequestWithBookingRecordType | null;
}) {
  //--states
  const [bookingOrder, setBookingOrder] =
    React.useState<BookingOrderWithPaymentsRecordType | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isPrinting, setIsPrinting] = React.useState(false);
  const [printError, setPrintError] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const componentRef = React.useRef<HTMLDivElement | null>(null);

  //--function

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `blacarklimo-receipt-${transaction?.id.slice(0, 8).toUpperCase()}`,
    onBeforePrint: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsPrinting(true);
    },
    onPrintError(errorLocation, error) {
      setPrintError(
        error instanceof Error
          ? error.message
          : "Unable to print receipt. Please contact support",
      );
    },
    onAfterPrint() {
      setIsPrinting(false);
      setPrintError("");
      toast.success("Receipt download started");
    },
  });

  const copyText = async (text: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);

        toast.success("Copied successfully");
        return true;
      }

      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      const successful = document?.execCommand("copy");

      document.body.removeChild(textarea);

      toast.success("Copied successfully");
      return successful;
    } catch (error) {
      toast.error(
        error instanceof Error ? error?.message : "Something went wrong",
      );
      return false;
    }
  };

  React.useEffect(() => {
    async function fetchBookingOrder() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await fetch(
          `/api/booking/orders/${paymentRequest?.order.id}`,
        );
        const data = await response.json();

        if (!response.ok || !data?.success) {
          throw new Error(
            data?.message ??
              "Unable to load booking order. Please contact support.",
          );
        }

        setBookingOrder(data.data?.order);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unable to load booking order. Please contact support.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchBookingOrder();
  }, [paymentRequest?.order.id]);

  return (
    <main className="w-full h-full centralize bg-pri-bg px-4 py-24">
      <div className="w-full max-w-120 rounded-lg bg-card-bg p-6">
        {isLoading ? (
          <div className="h-100 centralize flex-col gap-4">
            <div className="w-12 h-12 border-4 border-b-0 border-r-0 border-sec-text rounded-full animate-spin" />
            <p className="text-center text-sec-text">Loading receipt...</p>
          </div>
        ) : transaction ? (
          <div className="space-y-5">
            <div className="space-y-1 text-center">
              <p className="text-xs uppercase text-sec-gold">
                Payment Confirmed
              </p>
              <h1 className="text-2xl font-semibold text-pri-text">
                Reservation paid
              </h1>
              <p className="text-dim-text">
                Blacarklimo is operated by Ark Limo. All reservations and
                payment processing are handled securely through Ark Limo.
              </p>
            </div>

            <ul className="space-y-2 border-y border-dashed border-dim-text py-4">
              <li className="flex justify-between gap-4">
                <p className="text-sec-text">Transaction ID</p>
                <div className="flex flex-1 max-w-30 sm:max-w-none items-center justify-end gap-1">
                  <p className="font-medium text-pri-text truncate">
                    {transaction.id}
                  </p>

                  <button onClick={() => copyText(String(transaction.id))}>
                    <Copy
                      size={14}
                      strokeWidth={1.3}
                      className="text-sec-text"
                    />
                  </button>
                </div>
              </li>
              <li className="flex justify-between gap-4">
                <p className="text-sec-text">Amount</p>
                <p className="font-medium text-pri-text">
                  {transaction.currency} {formatCurrency(transaction.amount)}
                </p>
              </li>
              <li className="flex justify-between gap-4">
                <p className="text-sec-text">Status</p>
                <p className="font-medium text-pri-text">
                  {transaction.status}
                </p>
              </li>
              <li className="flex justify-between gap-4">
                <p className="text-sec-text">Payment Method</p>
                <p className="font-medium text-pri-text uppercase">
                  {transaction.paymentMethod}
                </p>
              </li>
              <li className="flex justify-between gap-4">
                <p className="text-sec-text">PayPal Order ID</p>

                <div className="flex flex-1 max-w-30 sm:max-w-none items-center justify-end gap-2">
                  <p className="text-right text-pri-text truncate">
                    {transaction.paypalOrderId}
                  </p>

                  <button
                    onClick={() => copyText(String(transaction.paypalOrderId))}
                  >
                    <Copy
                      size={14}
                      strokeWidth={1.8}
                      className="text-pri-text"
                    />
                  </button>
                </div>
              </li>
            </ul>

            <div className="mt-8 space-y-3">
              {printError && (
                <p className="rounded-lg border border-red-500/50 p-2 text-center text-[10px] text-red-400">
                  {printError}
                </p>
              )}

              <button
                onClick={handlePrint}
                className="centralize gap-2 w-full h-12 rounded-full bg-pri-text"
              >
                <p className="text-pri-bg font-medium">
                  Download / Print Receipt
                </p>
                {isPrinting && (
                  <div className="w-3 h-3 border-2 border-pri-bg rounded-full animate-spin" />
                )}
              </button>

              <Link
                href="/"
                className="centralize w-full h-12 rounded-full bg-pri-bg"
              >
                <p className="text-pri-text font-medium">Go Back Home</p>
              </Link>
            </div>

            <p className="text-[10px] text-center text-dim-text">
              You will be contacted shortly by your assigned chauffeur.
            </p>

            {Boolean(bookingOrder) && (
              <div className="absolute top[-9999px] -left-2499.75">
                <PrintableReceiptComponent
                  ref={componentRef}
                  order={bookingOrder as BookingOrderWithPaymentsRecordType}
                />
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-red-400">
            {errorMessage || "Receipt not found."}
          </p>
        )}
      </div>
    </main>
  );
}

const PrintableReceiptComponent = React.forwardRef<
  HTMLDivElement,
  PrintableReceiptComponentProps
>(({ order }: PrintableReceiptComponentProps, ref) => {
  //--variables
  const booking = order.booking;
  const charges = order.charges;
  const estimatedDistance = charges.estimatedDistance;

  const paymentRequests = order?.paymentRequests;

  return (
    <div
      ref={ref}
      className="w-full max-w-5xl h-full bg-card-bg flex flex-col gap-4"
    >
      <div className="p-4">
        <p className="text-sec-gold text-center">
          Blacarklimo Chauffuer Services
        </p>
        <h4 className="text-center">Booking Receipt</h4>
      </div>

      <div className="w-full flex flex-col flex-1 gap-4 px-4 pb-4 sm:px-6 sm:pb-6 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-sec-text">
        {/**PAYMENT REQUESTS */}
        {Boolean(paymentRequests && paymentRequests?.length) && (
          <div className="w-full gap-6">
            <div className="p-4 bg-sec-bg rounded-2xl">
              <h2 className="text-pri-text">Payment History</h2>
            </div>

            {paymentRequests?.map((request) => {
              const prTitleOpt: Record<
                PaymentRequestRecordType["type"],
                string
              > = {
                booking: "Main Booking",
                overtime: "Overtime Payment",
              };
              const title = prTitleOpt[request.type];
              const currency =
                request.currency === "USD" ? "$" : request.currency;
              const amount = formatCurrency(request.amount);
              const datetime = formatDateTimeFromISO(request.updatedAt);
              const desc = request.description;

              const isPaid = request.status === "paid";
              const isCancelled = request.status === "cancelled";

              return (
                <div
                  key={request.id}
                  className="w-full p-4 g-2 rounded-2xl bg-sec-bg"
                >
                  <div className="w-full flex-row items-center justify-between gap-6">
                    <h4>{title}</h4>
                    <h3>
                      {currency} {amount}
                    </h3>
                  </div>

                  <div className="w-full flex-row items-center justify-between gap-6">
                    <p>{datetime}</p>

                    <p
                      className={`text-[10px] ${isPaid ? "text-success" : isCancelled ? "text-red-400" : "text-sec-gold"}`}
                    >
                      {request.status?.toUpperCase()}
                    </p>
                  </div>

                  <div className="w-full h-0 border-t border-dashed border-t-dim-text" />

                  <p>{desc}</p>
                </div>
              );
            })}
          </div>
        )}

        <div className="w-full h-0 border-t border-dashed border-t-dim-text" />

        {/**DEPATURE TIME AND DATE */}
        <div className="w-full flex items-center justify-between gap-4 p-4 bg-sec-bg">
          <div className="space-y-0.5">
            <p className="text-[10px]">Date</p>
            <h4 className="text-[13px]">
              {formatDateFromISO(booking.datetime)}
            </h4>
          </div>

          <div className="space-y-0.5">
            <p className="text-[10px] text-right">Time</p>
            <h4 className="text-[13px] text-right">
              {formatTimeFromISO(booking.datetime)}
            </h4>
          </div>
        </div>

        {/**PICKUP-STOPS-DROPOFF */}
        <div className="w-full space-y-2">
          <SummaryLocationCard
            location={booking.pickupLocation as LocationType}
            markerColor={constants.locationColor.pickup}
          />
          {Boolean(booking.extraStops.length) &&
            booking.extraStops?.map((stop, idx) => (
              <SummaryLocationCard
                key={idx}
                location={stop as LocationType}
                isStop
                markerColor={constants.locationColor.stops}
              />
            ))}
          <SummaryLocationCard
            location={booking.dropoffLocation as LocationType}
            isLast
            markerColor={constants.locationColor.dropoff}
          />
        </div>

        {/**ESTIMATED DISTANCE AND DURATION */}
        <div className="w-full flex items-center justify-between gap-4 p-4 bg-sec-bg">
          <div className="space-y-0.5">
            <p className="text-[10px]">Estimated Distance</p>
            <h4 className="text-[13px]">
              {estimatedDistance.toFixed(1)} Miles
            </h4>
          </div>

          <div className="space-y-0.5">
            <p className="text-[10px] text-center">Round Trip</p>
            <h4 className="text-[13px] text-center">
              {booking.isRoundTrip ? "Yes" : "No"}
            </h4>
          </div>

          <div className="space-y-0.5">
            <p className="text-[10px] text-right">Travel Duration</p>
            <h4 className="text-[13px] text-right uppercase">
              ~ {calculateTravelDuration(estimatedDistance)}
            </h4>
          </div>
        </div>

        {/**CHOSEN VEHICLE */}
        {Boolean(booking.vehicle) && (
          <div className="centralize flex-col gap-2">
            <div>
              <Image
                src={booking.vehicle?.uri as string}
                alt="vehicle-image"
                width={240}
                height={135}
                sizes="1920px"
                loading="eager"
                className="object-cover"
              />
            </div>
            <h4 className="text-[13px] text-center">{booking.vehicle?.name}</h4>
          </div>
        )}

        {/**NUMBER OF PASSENGERS*/}
        <div className="w-full flex items-center justify-between gap-4 p-4 bg-sec-bg">
          <div className="space-y-0.5">
            <p className="text-[10px]">Number of Passenger(s)</p>
            <h4 className="text-[13px]">{booking.numOfPassenger}</h4>
          </div>

          <div className="space-y-0.5">
            <p className="text-[10px] text-right">Luggage Capacity</p>
            <h4 className="text-[13px] text-right">
              ~ {booking.vehicle?.numOfLuggage}
            </h4>
          </div>
        </div>

        {/**CONTACT INFORMATION & MESSAGE */}
        <ul className="w-full p-4 rounded-2xl bg-sec-bg space-y-2">
          <li className="w-full flex items-center justify-between gap-4">
            <p className="text-sec-text">Name of Primary Passenger</p>

            <p className="text-pri-text font-medium">{booking.fullname}</p>
          </li>

          <li className="w-full flex items-center justify-between gap-4">
            <p className="text-sec-text">Email Address</p>

            <p className="text-pri-text font-medium">{booking.email}</p>
          </li>

          <li className="w-full flex items-center justify-between gap-4">
            <p className="text-sec-text">Contact Phone Number</p>

            <p className="text-pri-text font-medium">{booking.phone}</p>
          </li>

          {Boolean(booking.message) && (
            <li className="w-full flex items-start justify-between gap-4">
              <p className="text-sec-text">Additional Information</p>

              <p className="text-pri-text">{booking.message}</p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
});

PrintableReceiptComponent.displayName = "PrintableReceiptComponent";
interface PrintableReceiptComponentProps {
  order: BookingOrderWithPaymentsRecordType;
}
