"use client";

import BookingScreen from "@/src/screens/BookingScreen";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Book Limo Reservation | Blacarklimo",
    description:
      "Secure a premium chauffeur reservation, tailored for your desired travel experience. Choose your prefered vehicle from our fleet, select your destinations from our responsive map, and complete your booking.",
    keywords: [
      "limo service",
      "corporate chauffeur",
      "executive sedan",
      "personal driver",
      "black limo",
      "booking",
      "blacarklimo",
    ],
    alternates: {
      canonical: "/booking",
    },
  };
}

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
