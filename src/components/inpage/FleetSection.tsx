"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { FleetDefaultCard } from "@/src/components/reuseable/CardComponent";
import { DefaultSectionHeader } from "@/src/components/reuseable/SectionHeaderComponent";
import React from "react";
import { popularVehicles } from "@/src/libs/vehicles";
import Link from "next/link";
import { VehicleCategoryType, VehicleType } from "@/src/libs/types";

const FleetSection = ({ screen }: FleetSectionProps) => {
  //--refs
  const fleetScrollerRef = React.useRef<HTMLDivElement>(null);

  //--states
  const [activeCategory, setActiveCategory] = React.useState<
    VehicleCategoryType | ""
  >("suv");
  const [fleet, setFleet] = React.useState<VehicleType[]>([]);

  //--variables
  const isFleetScreen: boolean = screen === "fleet";
  const categories: { name: string; value: VehicleCategoryType | "" }[] =
    React.useMemo(() => {
      if (isFleetScreen) {
        return [
          { name: "All", value: "" },
          { name: "Luxury SUVs", value: "suv" },
          { name: "Exclusive Sedans", value: "sedan" },
          { name: "Spacious Coaches", value: "coach" },
        ];
      } else {
        return [
          { name: "Luxury SUVs", value: "suv" },
          { name: "Exclusive Sedans", value: "sedan" },
        ];
      }
    }, [isFleetScreen]);

  //--functions
  function scrollFleet(direction: "left" | "right") {
    const fleetScroller = fleetScrollerRef.current;
    if (!fleetScroller) return;

    const scrollDistance = Math.max(fleetScroller.clientWidth * 0.85, 280);

    fleetScroller.scrollBy({
      left: direction === "left" ? -scrollDistance : scrollDistance,
      behavior: "smooth",
    });
  }

  //--effects
  React.useEffect(() => {
    function updateDefaultCategory() {
      setActiveCategory(categories[0].value);
    }

    updateDefaultCategory();
  }, [categories]);

  React.useEffect(() => {
    function updateFleetList() {
      const defaultVehicles: VehicleType[] = [];

      if (activeCategory === "") {
        defaultVehicles.push(...popularVehicles);
      } else {
        const filteredVehicles: VehicleType[] = popularVehicles.filter(
          (vehicle) => vehicle.category === activeCategory,
        );
        defaultVehicles.push(...filteredVehicles);
      }

      setFleet(defaultVehicles);
    }

    updateFleetList();
  }, [activeCategory]);

  return (
    <section about="Our Fleet" className="py-6 md:py-8 space-y-6">
      <DefaultSectionHeader
        title="Our Fleet"
        hideTitle={isFleetScreen}
        heading={
          <>
            Arrive In Style <br />A{" "}
            <span className="text-pri-gold">Collection</span> Built For Prestige
          </>
        }
        subHeading="From corporate travels to airport transfers and special occasions, our premium chauffeured fleet combines sophistication, performance, and reliability. Every vehicle is maintained to the highest standards to deliver elegance, comfort and a seamless journey from pickup to destination."
      />

      <div className="space-y-4">
        <div className="flex items-center flex-1 w-fit max-w-full md:max-w-xl mx-auto p-1 bg-sec-bg rounded-lg overflow-x-auto no-scrollbars md:scrollbar-thin md:scrollbar-track-transparent md:scrollbar-thumb-sec-text">
          {categories?.map((cat, idx) => {
            const isActive = cat.value === activeCategory;

            return (
              <button
                key={idx}
                className={`group min-w-fit rounded-sm py-1 px-3 ${isActive ? "bg-linear-to-r from-pri-text to-sec-text" : " bg-transparent"}`}
                onClick={() => setActiveCategory(cat.value)}
              >
                <p
                  className={`${isActive ? "text-pri-bg font-semibold" : "text-sec-text group-hover:text-pri-text"}`}
                >
                  {cat.name}
                </p>
              </button>
            );
          })}
        </div>

        <div
          ref={fleetScrollerRef}
          className={`flex sm:flex-row gap-4 ${isFleetScreen ? "flex-wrap justify-center" : "overflow-x-auto no-scrollbars"}`}
        >
          {Boolean(fleet.length) &&
            fleet?.map((ft, idx) => (
              <FleetDefaultCard
                key={idx}
                inWrapLayout={isFleetScreen}
                vehicle={ft}
              />
            ))}
        </div>

        {!isFleetScreen && (
          <div className="flex items-center justify-between gap-4">
            {/**SCROLL BUTTONS */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => scrollFleet("left")}
                className="w-6 h-6 rounded-full border border-sec-text hover:border-pri-text justify-center"
              >
                <ArrowLeft
                  size={14}
                  strokeWidth={1.3}
                  className={`text-sec-text hover:text-pri-text`}
                />
              </button>

              <button
                onClick={() => scrollFleet("right")}
                className="w-6 h-6 rounded-full border border-sec-text hover:border-pri-text justify-center"
              >
                <ArrowRight
                  size={14}
                  strokeWidth={1.3}
                  className={`text-sec-text hover:text-pri-text`}
                />
              </button>
            </div>

            <Link href={"/fleet"} className="centralize gap-2 group">
              <p className="font-medium text-sec-gold group-hover:text-pri-gold">
                Show All
              </p>
              <ArrowRight
                size={14}
                strokeWidth={1.3}
                className="text-sec-gold group-hover:text-pri-gold"
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FleetSection;

interface FleetSectionProps {
  screen: "home" | "fleet";
}
