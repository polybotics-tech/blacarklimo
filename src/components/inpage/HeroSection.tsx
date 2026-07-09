"use client";

import Image from "next/image";
import { LocationPicker } from "@/src/components/reuseable/FormComponents";
import { useAppDispatch, useAppSelector } from "@/src/hooks/useStore";
import {
  BookingFormKeyType,
  LocationType,
  VehicleType,
} from "@/src/libs/types";
import { __Action_updateBookingForm } from "@/src/utils/store/slice/bookingSlice";
import { ArrowLeftRight } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  //--hooks
  const form = useAppSelector((state) => state.booking);
  const dispatch = useAppDispatch();

  //--functions
  function onFormChange(
    key: BookingFormKeyType,
    value:
      | null
      | string
      | number
      | boolean
      | VehicleType
      | LocationType
      | (LocationType | null)[],
  ) {
    dispatch(__Action_updateBookingForm({ [key]: value }));
  }

  function swapAddress() {
    const dropoff = form.pickupLocation;
    const pickup = form.dropoffLocation;

    //--TODO: also swap cordinates

    onFormChange("dropoffLocation", dropoff);
    onFormChange("pickupLocation", pickup);
  }

  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
      <div className="w-full sm:w-1/2 space-y-8">
        <div className="w-full space-y-2">
          <h1 className="text-center sm:text-left">
            Premium <span className="text-pri-gold">Chauffeur</span> for Elites
            Who Crave Elegance
          </h1>

          <p className="text-center sm:text-left">
            Discover the perfect blend of comfort and style with our premium
            chauffeur services.
          </p>
        </div>

        {/**QUICK BOOKING FORM */}
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col sm:flex-row items-center gap-2 sm:gap-0.5">
            <LocationPicker
              location={form.pickupLocation}
              setLocation={(location) =>
                onFormChange("pickupLocation", location)
              }
              label="From"
              placeholder="Pick-up address"
            />

            <div className="w-2 relative">
              <button
                onClick={swapAddress}
                className="w-8 h-8 centralize rounded-full bg-pri-bg border border-dim-text absolute -top-4 -left-3 group"
              >
                <ArrowLeftRight
                  size={16}
                  strokeWidth={1.3}
                  className="text-sec-text group-hover:text-pri-text"
                />
              </button>
            </div>

            <LocationPicker
              location={form.dropoffLocation}
              setLocation={(location) =>
                onFormChange("dropoffLocation", location)
              }
              label="To"
              placeholder="Destination"
              isRightAligned
            />
          </div>

          {Boolean(form.pickupLocation && form.dropoffLocation) && (
            <Link
              href="/booking"
              className="w-full h-10 rounded-full bg-pri-text centralize"
            >
              <p className="text-pri-bg font-medium">Continue Booking</p>
            </Link>
          )}
        </div>
      </div>

      <div className="w-full sm:w-1/2 py-4">
        <div className="w-full h-56 bg-sec-bg rounded-2xl card-glow overflow-hidden relative">
          <Image
            src={"/assets/images/img12.jpg"}
            alt="hero-image"
            fill
            sizes="540px"
            loading="eager"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
