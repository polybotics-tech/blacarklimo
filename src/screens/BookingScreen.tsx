"use client";

import React, { Suspense } from "react";

import mapboxgl from "mapbox-gl";
import type { Feature, LineString } from "geojson";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/src/hooks/useStore";
import {
  BookingFormKeyType,
  BookingSectionOptionType,
  BookingSectionType,
  TripOptionType,
  LocationType,
  VehicleType,
} from "@/src/libs/types";
import { __Action_updateBookingForm } from "@/src/utils/store/slice/bookingSlice";
import {
  BookingSummarySection,
  InformationSection,
  PendingBookingSection,
  RideSection,
  ScheduleSection,
} from "@/src/components/inpage/BookingFlowSection";
import constants from "@/src/libs/constants";

function BookingScreen() {
  const ACTIVITY_ZOOM = 13;

  //--hooks
  const searchParams = useSearchParams();
  const bookingForm = useAppSelector((state) => state.booking);
  const dispatch = useAppDispatch();

  //--states
  const [activeSection, setActiveSection] =
    React.useState<BookingSectionType>("ride");
  const [isSummarizeBooking, setIsSummarizeBooking] =
    React.useState<boolean>(false);
  const [hasPendingBooking, setHasPendingBooking] = React.useState<boolean>(
    Boolean(bookingForm.pendingOrderId),
  );

  //--refs
  const mapRef = React.useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = React.useRef<HTMLDivElement>(null);
  const pickupMarkerRef = React.useRef<mapboxgl.Marker | null>(null);
  const dropoffMarkerRef = React.useRef<mapboxgl.Marker | null>(null);
  const stopMarkersRef = React.useRef<mapboxgl.Marker[]>([]);

  //--variables
  const tripOptions: TripOptionType[] = [
    { name: "Point To Point", value: "point-to-point" },
    { name: "Hourly Trip", value: "hourly" },
  ];

  const bookingSections: BookingSectionOptionType[] = [
    {
      name: "Pick A Ride",
      value: "ride",
      isComplete: Boolean(bookingForm.vehicle),
    },
    {
      name: "Choose Schedule",
      value: "schedule",
      isComplete:
        bookingForm.tripChoice === "point-to-point"
          ? Boolean(
              bookingForm.pickupLocation?.address &&
              bookingForm.dropoffLocation?.address,
            )
          : Boolean(
              bookingForm.extraStops?.length
                ? Boolean(
                    bookingForm.pickupLocation?.address &&
                    bookingForm.dropoffLocation?.address &&
                    bookingForm.extraStops?.[bookingForm.extraStops?.length - 1]
                      ?.address,
                  )
                : Boolean(
                    bookingForm.pickupLocation?.address &&
                    bookingForm.dropoffLocation?.address,
                  ),
            ),
    },
    {
      name: "Other Information",
      value: "information",
      isComplete: Boolean(
        bookingForm.fullname && bookingForm.email && bookingForm.phone,
      ),
    },
  ];

  const canGoToPrevSection: boolean =
    activeSection === "schedule" || activeSection === "information";
  const canGoToNextSection: boolean = Boolean(
    (activeSection === "ride" && bookingSections[0].isComplete) ||
    (activeSection === "schedule" && bookingSections[1].isComplete) ||
    (activeSection === "information" && bookingSections[2].isComplete),
  );
  const isFinalSection: boolean = activeSection === "information";

  //--functions
  function handleFormChange(
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

  function prevSection() {
    switch (activeSection) {
      case "information":
        setActiveSection("schedule");
        break;

      case "schedule":
        setActiveSection("ride");
        break;

      default:
        setActiveSection("ride");
        break;
    }
  }

  function nextSection() {
    switch (activeSection) {
      case "information":
        setIsSummarizeBooking(true);
        break;

      case "schedule":
        setActiveSection("information");
        break;

      case "ride":
        setActiveSection("schedule");
        break;

      default:
        break;
    }
  }

  function updateRoute(locations: LocationType[]) {
    if (!mapRef.current || !locations?.length) return;

    const coordinates = locations?.map((location) => [
      Number(location.coordinates?.lng),
      Number(location.coordinates?.lat),
    ]);

    const routeGeoJson: Feature<LineString> = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates,
      },
    };

    const source = mapRef.current.getSource("route") as mapboxgl.GeoJSONSource;

    if (source) {
      source?.setData(routeGeoJson);
    }

    setTimeout(() => {
      const bounds = new mapboxgl.LngLatBounds();

      coordinates.forEach((coord) => {
        bounds.extend(coord as [number, number]);
      });

      mapRef.current?.fitBounds(bounds, {
        padding: 80,
        duration: 1200,
        maxZoom: 6.7,
        offset: [0, -100],
      });
    }, 1000);
  }

  //--effects
  React.useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) {
      return;
    }

    const INITIAL_CENTER: [number, number] = [-119.23, 36.76]; // Default center coordinates for northern california (longitude, latitude)
    const INITIAL_ZOOM = 6.35;

    mapRef.current = new mapboxgl.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      container: mapContainerRef.current as HTMLDivElement,
      //style: "mapbox://styles/mapbox/streets-v11",
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
      config: {
        basemap: {
          lightPreset: "night",
          theme: "dark",
        },
      },
    });

    const routeGeoJson: Feature<LineString> = {
      type: "Feature",
      properties: {
        title: "Route",
      },
      geometry: {
        type: "LineString",
        coordinates: [],
      },
    };

    mapRef.current?.on("load", () => {
      mapRef.current?.addSource("route", {
        type: "geojson",
        data: routeGeoJson,
      });

      mapRef.current?.addLayer({
        id: "route-line",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#f5f5f5",
          "line-width": 3,
          "line-opacity": 0.8,
          "line-emissive-strength": 1,
        },
      });
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  React.useEffect(() => {
    if (bookingForm.tripChoice === "point-to-point") {
      if (bookingForm.pickupLocation && bookingForm.dropoffLocation) {
        const locations: LocationType[] = [
          bookingForm.pickupLocation,
          bookingForm.dropoffLocation,
        ];

        setTimeout(() => {
          updateRoute(locations);
        }, 3500);
      }
    }

    if (bookingForm.tripChoice === "hourly") {
      stopMarkersRef.current?.forEach((marker) => marker?.remove());
      stopMarkersRef.current = [];

      bookingForm.extraStops.forEach((stop) => {
        if (!stop?.coordinates) return;

        stopMarkersRef.current.push(
          new mapboxgl.Marker({
            color: constants.locationColor.stops,
          })
            .setLngLat([
              Number(stop?.coordinates?.lng),
              Number(stop?.coordinates?.lat),
            ])
            .addTo(mapRef.current!),
        );
      });

      let locations: LocationType[] = [];

      if (
        bookingForm.pickupLocation &&
        bookingForm.dropoffLocation &&
        !bookingForm.extraStops?.length
      ) {
        locations = [bookingForm.pickupLocation, bookingForm.dropoffLocation];
      }

      if (
        bookingForm.pickupLocation &&
        bookingForm.dropoffLocation &&
        bookingForm.extraStops?.length &&
        bookingForm.extraStops?.[bookingForm.extraStops?.length - 1]
          ?.coordinates
      ) {
        locations = [
          bookingForm.pickupLocation,
          ...(bookingForm.extraStops as LocationType[]),
          bookingForm.dropoffLocation,
        ];
      }

      setTimeout(() => {
        updateRoute(locations);
      }, 3500);
    }
  }, [
    bookingForm.pickupLocation,
    bookingForm.dropoffLocation,
    bookingForm.extraStops,
    bookingForm.tripChoice,
  ]);

  React.useEffect(() => {
    if (!mapRef.current) return;

    if (
      bookingForm.pickupLocation?.coordinates?.lat &&
      bookingForm.pickupLocation?.coordinates?.lng
    ) {
      pickupMarkerRef.current?.remove();

      const centerCoords = [
        bookingForm.pickupLocation.coordinates?.lng,
        Number(bookingForm.pickupLocation.coordinates?.lat) - 0.01, // Adjust latitude to move the center slightly north
      ];

      mapRef.current?.flyTo({
        center: centerCoords as [number, number],
        zoom: ACTIVITY_ZOOM,
      });

      pickupMarkerRef.current = new mapboxgl.Marker({
        color: constants.locationColor.pickup,
      })
        .setLngLat([
          Number(bookingForm.pickupLocation?.coordinates?.lng),
          Number(bookingForm.pickupLocation?.coordinates?.lat),
        ])
        .addTo(mapRef.current!);
    }
  }, [bookingForm.pickupLocation]);

  React.useEffect(() => {
    if (!mapRef.current) return;

    if (
      bookingForm.dropoffLocation?.coordinates?.lat &&
      bookingForm.dropoffLocation?.coordinates?.lng
    ) {
      dropoffMarkerRef.current?.remove();

      const centerCoords = [
        bookingForm.dropoffLocation.coordinates?.lng,
        Number(bookingForm.dropoffLocation.coordinates?.lat) - 0.01, // Adjust latitude to move the center slightly north
      ];

      mapRef.current?.flyTo({
        center: centerCoords as [number, number],
        zoom: ACTIVITY_ZOOM,
      });

      dropoffMarkerRef.current = new mapboxgl.Marker({
        color: constants.locationColor.dropoff,
      })
        .setLngLat([
          Number(bookingForm.dropoffLocation?.coordinates?.lng),
          Number(bookingForm.dropoffLocation?.coordinates?.lat),
        ])
        .addTo(mapRef.current!);
    }
  }, [bookingForm.dropoffLocation]);

  return (
    <div className="w-full h-full relative">
      {/**MAP CONTAINER */}
      <div
        id="map-container"
        ref={mapContainerRef}
        className="w-full h-full"
      ></div>

      {/**TRIP TYPE */}
      <div className="absolute top-4 md:top-6 right-4 md:right-6 z-10 h-10 sm:h-12 bg-rounded-full bg-card-bg hover:bg-sec-bg p-2 rounded-full flex items-center shadow-2xl shadow-sec-bg/70">
        {tripOptions.map((trip, idx) => {
          const isActive = bookingForm.tripChoice === trip.value;

          return (
            <button
              key={idx}
              onClick={() => handleFormChange("tripChoice", trip.value)}
              className={`${isActive ? "bg-pri-text" : "bg-transparent"} h-full px-4 rounded-full centralize`}
            >
              <p className={`${isActive ? "text-pri-bg" : "text-sec-text"}`}>
                {trip.name}
              </p>
            </button>
          );
        })}
      </div>

      {/**FORM CONTAINER */}
      <div className="absolute bottom-0 left-0 z-10 w-full p-4 md:p-6 flex justify-center shadow-2xl shadow-sec-bg/70">
        <div className="w-full max-sm:max-w-100 sm:max-w-180 flex flex-col">
          {/**SECTION HEADERS */}
          <ul className="w-full sm:w-fit max-sm:mx-auto flex gap-[0.8px] sm:gap-0.5 rounded-t-xl sm:rounded-t-2xl overflow-hidden bg-sec-bg">
            {bookingSections.map((section, idx) => {
              const isActive: boolean = activeSection === section.value;
              const isComplete: boolean = Boolean(section.isComplete);

              return (
                <li key={idx} className="max-sm:flex max-sm:flex-1">
                  <div
                    className={`h-full max-sm:w-full py-2 px-2 sm:py-4 sm:px-8 centralize gap-1 sm:gap-2 ${isActive ? "bg-pri-text" : "bg-card-bg"} ${isComplete && "border-b-4 border-b-success"} group`}
                  >
                    <p
                      className={`${isActive ? "text-pri-bg" : "text-sec-text"} max-sm:text-[9px]`}
                    >
                      {section.name}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          {/**SECTION BODY */}
          <div className="w-full flex flex-col gap-4 bg-card-bg p-4 sm:p-6 rounded-b-xl sm:rounded-b-2xl sm:rounded-tr-2xl">
            {activeSection === "ride" ? (
              <RideSection
                form={bookingForm}
                onFormChange={(key, value) => handleFormChange(key, value)}
                searchParam={searchParams}
              />
            ) : activeSection === "schedule" ? (
              <ScheduleSection
                form={bookingForm}
                onFormChange={(key, value) => handleFormChange(key, value)}
                searchParam={searchParams}
              />
            ) : activeSection === "information" ? (
              <InformationSection
                form={bookingForm}
                onFormChange={(key, value) => handleFormChange(key, value)}
              />
            ) : (
              <div className="w-full h-52 centralize">
                <p>Something went wrong. Please reload page to fix.</p>
              </div>
            )}

            <div className="space-y-2">
              {(activeSection === "ride" ||
                activeSection === "schedule" ||
                activeSection === "information") && (
                <div className="w-full sm:w-fit sm:ml-auto flex items-center gap-4">
                  {canGoToPrevSection && (
                    <button
                      onClick={prevSection}
                      className="w-full sm:w-fit sm:min-w-40 h-10 sm:h-12 px-4 sm:px-8 rounded-full bg-pri-bg hover:bg-sec-bg group"
                    >
                      <p className="text-pri-text group-hover:text-sec-text">
                        Prev
                      </p>
                    </button>
                  )}

                  <button
                    onClick={nextSection}
                    className={`w-full sm:w-fit sm:min-w-40 h-10 sm:h-12 px-4 sm:px-8 rounded-full ${canGoToNextSection ? "bg-pri-text hover:bg-sec-text" : "bg-dim-text"} group`}
                    disabled={!canGoToNextSection}
                  >
                    <p className="text-pri-bg group-hover:text-sec-bg">
                      {isFinalSection ? "Complete Reservation" : "Next"}
                    </p>
                  </button>
                </div>
              )}

              <p className="text-center text-dim-text text-[10px]">
                Blacarklimo is proudly operated by Ark Limo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {isSummarizeBooking && (
        <BookingSummarySection onClose={() => setIsSummarizeBooking(false)} />
      )}

      {hasPendingBooking && (
        <PendingBookingSection onClose={() => setHasPendingBooking(false)} />
      )}
    </div>
  );
}

export default function BookingScreenWrapper() {
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
