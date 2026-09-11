import BookingScreenWrapper from "@/src/screens/BookingScreen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Premium Chauffeur Services Online CA | Blacark Limo",

  description:
    "Reserve premium chauffeur services for airport transfers, executive transportation, hourly service & private rides across Northern California with Blacark Limo.",

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

  openGraph: {
    type: "website",
    url: "https://www.blacarklimo.com/booking",
    title: "Book Premium Chauffeur Services Online CA | Blacark Limo",
    description:
      "Reserve premium chauffeur services for airport transfers, executive transportation, hourly service & private rides across Northern California with Blacark Limo.",
    images: [
      {
        url: "https://www.blacarklimo.com/assets/images/img13.jpg",
        width: 736,
        height: 736,
        alt: "Blacark Limo Premium Chauffeur Services",
      },
    ],
  },
};

export default function Booking() {
  return <BookingScreenWrapper />;
}
