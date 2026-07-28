import BookingScreenWrapper from "@/src/screens/BookingScreen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book A Chauffeur | Blacarklimo",
  description:
    "Reserve premium chauffeur services with Blacarklimo. Book luxury airport transfers, executive transportation, hourly chauffeur services, and private rides throughout Northern California with secure online reservations.",
  keywords: [
    "book chauffeur service",
    "airport transfer booking",
    "luxury transportation booking",
    "executive car service",
    "black car reservation",
    "chauffeur booking Northern California",
    "airport transportation",
    "private driver service",
    "luxury ride booking",
    "hourly chauffeur service",
    "limo service",
    "blacarklimo",
  ],
  alternates: {
    canonical: "/booking",
  },
};

export default function Booking() {
  return <BookingScreenWrapper />;
}
