import React from "react";
import { DefaultSectionHeader } from "../reuseable/SectionHeaderComponent";
import { BookingGuideCard } from "../reuseable/CardComponent";
import { Calendar1, Car, Wine } from "lucide-react";
import { BookingGuideType } from "@/src/libs/types";

const GuideSection = () => {
  const bookingGuides: BookingGuideType[] & { icon?: React.ReactNode }[] = [
    {
      title: "Choose Your Ride",
      desc: "Browse our premium fleet of executive sedans, SUVs, limousines, and chauffer-driven vehicles tailored to your travel needs and occasion",
      icon: <Car size={18} strokeWidth={1.3} className="text-pri-text" />,
      list: ["Premium Executive Fleet", "Flexible Travel Packages"],
    },
    {
      title: "Schedule & Confirm Booking",
      desc: "Provide your pickup and dropoff details, preferred schedule, and complete your reservation through our secure online booking system",
      icon: <Calendar1 size={18} strokeWidth={1.3} className="text-pri-bg" />,
      list: [
        "Easy Online Reservations",
        "Secure Paypal/Venmo Payments",
        "Instant Booking Confirmation",
      ],
    },
    {
      title: "Enjoy Premium Services",
      desc: "Relax and enjoy a smooth, punctual, and comfortable travel experience from our professional chauffeur",
      icon: <Wine size={18} strokeWidth={1.3} className="text-pri-text" />,
      list: ["Professional Licensed Chauffeurs", "On-Time Delivery Services"],
    },
  ];
  return (
    <section about="How It Works" className="py-6 md:py-8 space-y-6">
      <DefaultSectionHeader
        title="How It Works"
        heading={
          <>
            From Pickup To Dropoff <br />
            <span className="text-pri-gold">Reservation</span> Made Fast & Easy
          </>
        }
        subHeading="We have simplified our booking process to ensure a smooth, stress-free, and secure reservation experience for every client. From selecting the perfect ride to arriving at your destination, every detail is handled with professionalism and precision."
      />

      <div className="flex flex-col md:flex-row md:items-end md:justify-center gap-4 md:gap-2">
        {bookingGuides?.map((guide, idx) => (
          <BookingGuideCard
            key={idx}
            tag={`Step ${idx + 1}`}
            containerClass="md:min-w-1/3"
            isBgPrimary={idx === 1}
            {...guide}
          />
        ))}
      </div>
    </section>
  );
};

export default GuideSection;
