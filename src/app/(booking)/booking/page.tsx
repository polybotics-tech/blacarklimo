"use client";

import BookingScreen from "@/src/screens/BookingScreen";
import { Suspense } from "react";

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
