"use client";

import React from "react";
import { DefaultSectionHeader } from "../reuseable/SectionHeaderComponent";
import {
  ArrowUpRight,
  Building2,
  CandyCane,
  ChartCandlestick,
  CheckCheck,
  Plane,
  School,
  School2,
  Search,
  ShoppingBasket,
  X,
} from "lucide-react";
import { ncPopularCounties } from "@/src/libs/places";
import Link from "next/link";
import { CountyType, PlaceCategoryType, PlaceType } from "@/src/libs/types";

const LocationSection = () => {
  //--states
  const [filterByCounty, setFilterByCounty] = React.useState<string>("");
  const [places, setPlaces] = React.useState<PlaceType[] | null>(null);
  const [searchQ, setSearchQ] = React.useState<string>("");

  //--variables
  const popularSpots: CountyType[] = ncPopularCounties;
  const counties = popularSpots.map((spot) => spot.name);

  //--functions
  function strToLc(str: string): string {
    return str.toLowerCase().trim();
  }

  function handleCountyFilter(county: string): void {
    setFilterByCounty((prev) =>
      Boolean(prev === strToLc(county)) ? "" : strToLc(county),
    );
  }

  //--effects
  React.useEffect(() => {
    async function handlePlaceSearch(query: string) {
      const generalPlaces: PlaceType[] = [];

      //--check if filterByCounty is active
      const workingSpots: CountyType[] = Boolean(filterByCounty)
        ? popularSpots.filter(
            (spot) => strToLc(spot.name) === strToLc(filterByCounty),
          )
        : popularSpots;

      workingSpots.forEach((spot: CountyType) => {
        generalPlaces.push(...spot.places);
      });

      //--search for places
      const matchedPlaces: PlaceType[] = generalPlaces.filter(
        (place) =>
          strToLc(place.name).includes(strToLc(query)) ||
          strToLc(place.category).includes(strToLc(query)) ||
          strToLc(place.address).includes(strToLc(query)),
      );

      setPlaces(matchedPlaces);
    }

    handlePlaceSearch(searchQ);
  }, [searchQ, popularSpots, filterByCounty]);

  return (
    <section
      about="Popular Destinations"
      className="py-6 md:py-8 flex flex-col md:flex-row items-start justify-between gap-6"
    >
      <div className="w-full md:w-1/2 space-y-4">
        <DefaultSectionHeader
          align="left"
          title="Popular Destinations"
          heading={
            <>
              Serving <span className="text-pri-gold">Northern California</span>
              <br />
              Wherever Your Journey Takes You
            </>
          }
          subHeading="From major airports and luxury hotels to business districts, universities, and iconic destinations, we proudly provide premium chauffeur services throughout Northern California. Search and click from our list of popular destinations to reserve a reliable luxury transportation tailored to your travel needs."
        />

        <div className="w-full rounded-4xl bg-sec-bg p-4 space-y-2">
          <div className="w-full h-12 px-4 flex items-center gap-2 border border-dim-text rounded-full overflow-hidden">
            <div className="h-full centralize">
              <Search size={18} strokeWidth={1.3} className="text-dim-text" />
            </div>
            <div className="h-full flex flex-1">
              <input
                type="text"
                placeholder="Type to search for popular spots"
                className="peer w-full h-full text-xs text-pri-text font-light placeholder:text-dim-text"
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
              />
            </div>
            {Boolean(searchQ.length) && (
              <button
                className="h-full centralize"
                onClick={() => setSearchQ("")}
              >
                <X
                  size={14}
                  strokeWidth={1.3}
                  className="text-sec-text hover:text-pri-text"
                />
              </button>
            )}
          </div>

          {/**counties clickable list */}
          <div className="w-full flex flex-wrap gap-2">
            {counties?.map((county, idx) => {
              const isFiltered = filterByCounty === county.toLowerCase();

              return (
                <button
                  key={idx}
                  className={`py-1.5 px-3 flex items-center gap-1 rounded-full ${isFiltered ? "bg-linear-to-r from-pri-text to-sec-text" : "bg-pri-bg"}`}
                  onClick={() => handleCountyFilter(county)}
                >
                  {isFiltered && (
                    <CheckCheck
                      size={14}
                      strokeWidth={1.3}
                      className="text-sec-bg"
                    />
                  )}
                  <p
                    className={`${isFiltered ? "text-sec-bg" : "text-sec-text"} text-[10px]`}
                  >
                    {county}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 rounded-2xl bg-card-bg p-4 space-y-4">
        <div className="w-full pb-2 border-b-[0.3px] border-b-dim-text border-dashed">
          <p>Showing popular spots:</p>
        </div>

        <div className="w-full max-h-96 space-y-4 overflow-y-auto scrollbar-thin scrollbar-track-pri-bg scrollbar-thumb-sec-text">
          {places?.length ? (
            places.map((place: PlaceType) => {
              const iconSize = 20;
              const iconWeight = 1.3;

              const cat = place.category;
              const placeIcon =
                cat === "airport" ? (
                  <Plane
                    size={iconSize}
                    strokeWidth={iconWeight}
                    className="text-pri-text"
                  />
                ) : cat === "attraction" ? (
                  <CandyCane
                    size={iconSize}
                    strokeWidth={iconWeight}
                    className="text-pri-text"
                  />
                ) : cat === "business" ? (
                  <ChartCandlestick
                    size={iconSize}
                    strokeWidth={iconWeight}
                    className="text-pri-text"
                  />
                ) : cat === "hotel" ? (
                  <Building2
                    size={iconSize}
                    strokeWidth={iconWeight}
                    className="text-pri-text"
                  />
                ) : cat === "shopping" ? (
                  <ShoppingBasket
                    size={iconSize}
                    strokeWidth={iconWeight}
                    className="text-pri-text"
                  />
                ) : (
                  <School2
                    size={iconSize}
                    strokeWidth={iconWeight}
                    className="text-pri-text"
                  />
                );

              const iconBgColors: Record<PlaceCategoryType, string> = {
                airport: "bg-[#0F4C81]", // Aviation Blue
                hotel: "bg-[#8B6B1F]", // Luxury Gold
                shopping: "bg-[#166534]", // Deep Emerald
                university: "bg-[#3730A3]", // Royal Indigo
                attraction: "bg-[#9F1239]", // Burgundy
                business: "bg-[#334155]", // Executive Slate
              };

              return (
                <Link
                  href={`/booking/?destination_id=${place.id}`}
                  key={place.id}
                  className="w-full flex items-center gap-2"
                >
                  {/**TODO: alternate SVG icon based on category */}
                  <div
                    className={`w-12 h-12 p-0.5 pb-1 rounded-lg ${iconBgColors[cat] ?? "bg-pri-bg"} flex flex-col items-center justify-end`}
                  >
                    <div className="flex flex-1 centralize">{placeIcon}</div>
                    <p className="text-[6px] font-medium uppercase text-pri-text">
                      {cat}
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col gap-0.5">
                    <h4 className="text-[13px] hover:text-sec-gold text-left">
                      {place.name}
                    </h4>
                    <p className="text-[9px] text-left">{place.address}</p>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="w-full min-h-46 py-8 centralize flex-col gap-6">
              <div className="w-full centralize flex-col gap-6">
                <div className="centralize flex-col gap-2">
                  <h4 className="text-center uppercase">Not Found</h4>
                  <p className="text-center">
                    It seems the place you&apos;re looking for isn&apos;t in our
                    POPULAR RECORD. Nonetheless, there&apos;s no cause for
                    alarm. You can visit our Booking page to search the global
                    map.
                  </p>
                </div>
                <button className="py-2 px-4 rounded-full centralize gap-2 bg-pri-text hover:bg-sec-text">
                  <p className="text-sec-bg">Go To Bookings</p>
                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.8}
                    className="text-sec-bg"
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
