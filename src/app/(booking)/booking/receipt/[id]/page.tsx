import ReceiptScreen from "@/src/screens/ReceiptScreen";
import { getPaymentRequestWithBooking, getTransaction } from "@/src/utils/db";
import {
  PaymentRequestWithBookingRecordType,
  TransactionRecordType,
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

  const transaction: TransactionRecordType | null = await getTransaction(id);

  if (!transaction) {
    return {
      title: "Receipt Not Found | Blacarklimo",
      description: "The requested payment receipt could not be located.",
    };
  }

  return {
    title: `Payment Receipt #${transaction.id.slice(0, 8)} | Blacarklimo`,

    description: `View your payment receipt and transaction details for your luxury chauffeur reservation. Payment amount: ${transaction.currency} ${transaction.amount}.`,
  };
}

export default async function PaymentReceipt({ params }: PageProps) {
  const { id } = await params;
  const transaction: TransactionRecordType | null = await getTransaction(id);

  if (!transaction) {
    notFound();
  }

  const paymentRequest: PaymentRequestWithBookingRecordType | null =
    await getPaymentRequestWithBooking(transaction.requestId);

  if (!paymentRequest) {
    notFound();
  }

  return (
    <ReceiptScreen transaction={transaction} paymentRequest={paymentRequest} />
  );
}
