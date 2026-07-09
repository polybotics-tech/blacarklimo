"use client";

import { ArrowLeft, ArrowRight, CarFront } from "lucide-react";
import { FleetDefaultCard } from "@/src/components/reuseable/CardComponent";
import { DefaultSectionHeader } from "@/src/components/reuseable/SectionHeaderComponent";
import React from "react";
import { popularVehicles } from "@/src/libs/vehicles";
import Link from "next/link";
import { VehicleCategoryType, VehicleType } from "@/src/libs/types";
import { VehicleRecordType } from "@/src/utils/db/types";
import toast from "react-hot-toast";

const FleetSection = ({ screen }: FleetSectionProps) => {
  //--refs
  const fleetScrollerRef = React.useRef<HTMLDivElement>(null);

  //--states
  const [activeCategory, setActiveCategory] = React.useState<
    VehicleCategoryType | ""
  >("suv");
  const [rawVehicles, setRawVehicles] = React.useState<VehicleRecordType[]>([]);
  const [isFetching, setIsFetching] = React.useState(false);

  const [fleet, setFleet] = React.useState<VehicleRecordType[]>([]);

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

  async function fetchAllVehicles() {
    setIsFetching(true);

    try {
      const response = await fetch(`/api/fleet/?activeOnly=true`);
      const data = await response.json();

      if (!response.ok || !data?.success) {
        toast.error(data?.message || "Something went wrong");
        return;
      }

      setRawVehicles(data?.data?.vehicles);
      return;
    } catch (error) {
      toast.error(
        error instanceof Error ? error?.message : "Something went wrong",
      );
      return;
    } finally {
      setIsFetching(false);
    }
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
      const defaultVehicles: VehicleRecordType[] = [];

      if (activeCategory === "") {
        defaultVehicles.push(...rawVehicles);
      } else {
        const filteredVehicles: VehicleRecordType[] = rawVehicles.filter(
          (vehicle) => vehicle.category === activeCategory,
        );
        defaultVehicles.push(...filteredVehicles);
      }

      setFleet(defaultVehicles);
    }

    updateFleetList();
  }, [activeCategory, rawVehicles.length]);

  React.useEffect(() => {
    fetchAllVehicles();
  }, []);

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

        <>
          {isFetching ? (
            <div className="w-full max-w-135 h-60 mx-auto rounded-2xl bg-card-bg centralize gap-4 flex-col">
              <div className="w-8 h-8 rounded-full border-2 border-t-0 border-l-0 border-sec-text animate-spin" />

              <div>
                <h4 className="text-center text-sec-text">
                  Fetching Our Premium Vehicles
                </h4>
                <p className="text-center text-dim-text">
                  Just hold on a minute
                </p>
              </div>
            </div>
          ) : (
            <>
              {!Boolean(fleet.length) ? (
                <div className="w-full max-w-135 h-60 mx-auto rounded-2xl bg-card-bg centralize gap-4 flex-col">
                  <CarFront
                    size={32}
                    strokeWidth={1.3}
                    className="text-sec-text"
                  />

                  <div>
                    <h4 className="text-center text-sec-text">
                      No Vehicles Available
                    </h4>
                    <p className="text-center text-dim-text">
                      Please try again later.
                    </p>
                  </div>

                  <button
                    className="w-full max-w-60 h-10 mt-4 rounded-full bg-pri-text centralize"
                    onClick={fetchAllVehicles}
                  >
                    <p className="text-pri-bg font-medium">Reload</p>
                  </button>
                </div>
              ) : (
                <>
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
                </>
              )}
            </>
          )}
        </>
      </div>
    </section>
  );
};

export default FleetSection;

interface FleetSectionProps {
  screen: "home" | "fleet";
}
