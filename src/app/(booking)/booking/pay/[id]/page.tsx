import PaymentScreen from "@/src/screens/PaymentScreen";
import { getPaymentRequestWithBooking } from "@/src/utils/db";
import {
  BookingOrderRecordType,
  PaymentRequestWithBookingRecordType,
} from "@/src/utils/db/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  const paymentRequest: PaymentRequestWithBookingRecordType | null =
    await getPaymentRequestWithBooking(id);

  if (!paymentRequest) {
    return {
      title: "Payment Request Not Found | Blacarklimo",
      description: "The requested payment could not be located.",
    };
  }

  const order: BookingOrderRecordType = paymentRequest.order;

  return {
    title: `Complete Payment for ${order.booking.vehicle?.name ?? "Your Reservation"} | Blacarklimo`,

    description: `Review and complete payment for your ${order.booking.tripChoice} chauffeur reservation. Secure checkout for your upcoming journey with Blacarklimo.`,
  };
}

export default async function PayForBooking({ params }: PageProps) {
  const { id } = await params;
  const environment =
    process.env.PAYPAL_ENVIRONMENT === "production" ? "production" : "sandbox";

  const paymentRequest: PaymentRequestWithBookingRecordType | null =
    await getPaymentRequestWithBooking(id);

  if (!paymentRequest) {
    notFound();
  }

  return (
    <PaymentScreen
      clientId={process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}
      environment={environment}
      paymentRequest={paymentRequest}
    />
  );
}
