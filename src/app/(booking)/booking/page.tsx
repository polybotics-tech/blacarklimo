"use client";

import BookingScreen from "@/src/screens/BookingScreen";
import { Metadata } from "next";
import { Suspense } from "react";

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
  return (
    <Suspense
      fallback={
        <div className="w-full h-full centralize">
          <div className="w-12 h-12 border-4 border-sec-text border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <BookingScreen />
    </Suspense>
  );
}
