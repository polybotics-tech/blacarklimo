"use client";

import { useDebounce } from "@/src/hooks/useDebounce";
import { defaultMapSuggestions } from "@/src/libs/places";
import { LocationType, PlaceSuggestionType } from "@/src/libs/types";
import {
  calculateHowManyHoursFromNow,
  formatDateTimeFromISO,
} from "@/src/utils/datetime";
import { generateSessionToken } from "@/src/utils/generator";
import {
  ArrowUpRight,
  LocateFixed,
  MapPinOff,
  Minus,
  Plus,
  Search,
  X,
} from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

const ToggleSwitch = ({ id, status, onStatusChange }: ToggleSwitchProps) => {
  const enabled = Boolean(status);

  return (
    <label htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={status}
        onChange={(e) => onStatusChange(e.target.checked)}
        className="sr-only"
      />

      {/**TRACK */}
      <div
        className={`w-8 h-5 rounded-full transition-colors duration-300 ease-in-out flex items-center px-1 cursor-pointer ${enabled ? "bg-pri-gold" : "bg-dim-text"}`}
      >
        {/**THUMB */}
        <div
          className={`w-3 h-3 bg-pri-text rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${enabled ? "translate-x-3" : "translate-x-0"}`}
        ></div>
      </div>
    </label>
  );
};

const CounterTab = ({
  id,
  count,
  onCountChange,
  minCount,
  maxCount,
}: CounterTabProps) => {
  //--variables
  const absoluteMinimum = minCount || 0;

  //--functions
  function addCount() {
    if (maxCount && count >= maxCount) return;

    onCountChange(Number(count + 1));
  }

  function subtractCount() {
    if (count <= absoluteMinimum) return;

    onCountChange(Number(count - 1));
  }

  //--effects
  React.useEffect(() => {
    if (count < absoluteMinimum) {
      onCountChange(absoluteMinimum);
      return;
    }

    if (count > Number(maxCount)) {
      onCountChange(Number(maxCount));
      return;
    }
  }, [count, maxCount, absoluteMinimum, onCountChange]);

  return (
    <label htmlFor={id}>
      <input id={id} type="number" defaultValue={count} className="sr-only" />

      {/**counter */}
      <div className="h-7 rounded-full flex items-center gap-px bg-dim-bg border border-dim-text overflow-hidden">
        <button
          onClick={subtractCount}
          disabled={count <= absoluteMinimum}
          className="group w-7 h-full centralize bg-card-bg disabled:bg-sec-bg"
        >
          <Minus
            size={14}
            strokeWidth={1.3}
            className="text-sec-text group-hover:text-pri-text group-disabled:text-dim-text"
          />
        </button>

        <div className="w-7 h-full centralize">
          <p>{count}</p>
        </div>

        <button
          onClick={addCount}
          disabled={maxCount ? count >= maxCount : undefined}
          className="group w-7 h-full centralize bg-card-bg disabled:bg-sec-bg"
        >
          <Plus
            size={14}
            strokeWidth={1.3}
            className="text-sec-text group-hover:text-pri-text group-disabled:text-dim-text"
          />
        </button>
      </div>
    </label>
  );
};

const LocationPicker = ({
  location,
  setLocation,
  label,
  placeholder,
  isRightAligned,
  canDelete,
  onDelete,
  containerClass,
}: LocationPickerProps) => {
  //--states
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  //--variables
  const hasLocation = location && (location?.address || location?.name);
  const textPreview = hasLocation
    ? location?.name
      ? location?.name
      : location?.address
    : placeholder;

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className={`max-sm:w-full flex sm:flex-1 flex-col items-start gap-px py-2 px-2 border border-dim-text rounded-lg cursor-pointer ${containerClass}`}
      >
        <div className="w-full flex items-center gap-4">
          <div className="flex flex-1">
            <label
              htmlFor="pickup-address"
              className={`w-full text-[10px] text-sec-text font-semibold ${isRightAligned ? "text-right" : "text-left"}`}
            >
              {label}
            </label>
          </div>

          {canDelete && (
            <button onClick={onDelete} className="group">
              <X
                size={13}
                strokeWidth={1.3}
                className="text-sec-text group-hover:text-pri-text"
              />
            </button>
          )}
        </div>
        <p
          className={`w-full text-xs ${hasLocation ? "text-pri-text" : "text-dim-text"} ${isRightAligned ? "text-right" : "text-left"} font-light`}
        >
          {textPreview}
        </p>
      </div>

      {isModalOpen && (
        <LocationPickerModal
          title={placeholder}
          saveLocation={(location) => setLocation(location)}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

const DateTimePicker = ({
  label,
  id,
  datetime,
  setDatetime,
  minHoursFromNow,
  errorMessage,
}: DateTimePickerProps) => {
  //--hooks
  const datetimePreview = React.useMemo(() => {
    return formatDateTimeFromISO(datetime);
  }, [datetime]);

  //--states
  const [isInvalidDateTime, setIsInvalidDateTime] =
    React.useState<boolean>(false);

  //--effects
  React.useEffect(() => {
    function checkIsDateTimeValid() {
      if (!minHoursFromNow) return;
      const hoursUntilBooking = calculateHowManyHoursFromNow(datetime);

      setIsInvalidDateTime(hoursUntilBooking < (minHoursFromNow ?? 0));
    }

    checkIsDateTimeValid();
  }, [datetime, minHoursFromNow]);

  return (
    <div>
      <div
        className={`w-full flex flex-col gap-0.5 py-2 px-2 border ${
          isInvalidDateTime ? "border-red-500" : "border-dim-text"
        } rounded-lg`}
      >
        <label htmlFor={id} className="text-[10px] text-sec-text font-semibold">
          {label}
        </label>

        {/* Container wrapper for positioning */}
        <div className="relative w-full h-4">
          {/* Layer 1: The Custom Display Text (Pointer events disabled so click passes through) */}
          <div className="absolute inset-0 flex items-center justify-between pointer-events-none z-10">
            <p className="text-pri-text text-xs">
              {datetime ? datetimePreview : "Select Date & Time"}
            </p>
            {/* Calendar Indicator Icon */}
            <svg
              className="w-4 h-4 text-sec-text"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Layer 2: The Native Input (Transparent and on top to capture clicks) */}
          <input
            id={id}
            name={id}
            type="datetime-local"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 
                     [&::-webkit-calendar-picker-indicator]:absolute 
                     [&::-webkit-calendar-picker-indicator]:inset-0 
                     [&::-webkit-calendar-picker-indicator]:w-full 
                     [&::-webkit-calendar-picker-indicator]:h-full 
                     [&::-webkit-calendar-picker-indicator]:cursor-pointer"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
          />
        </div>
      </div>

      {isInvalidDateTime && (
        <p className="text-[10px] text-red-500 mt-1">
          {errorMessage ??
            `Booking must be at least ${minHoursFromNow} hours in advance`}
        </p>
      )}
    </div>
  );
};

export { ToggleSwitch, CounterTab, LocationPicker, DateTimePicker };

const LocationPickerModal = ({
  title,
  saveLocation,
  onClose,
}: LocationPickerModalProps) => {
  //--states
  const [searchQ, setSearchQ] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<PlaceSuggestionType[]>(
    [],
  );
  const [suggestionIsLoading, setSuggestionIsLoading] = React.useState(false);
  const [isFetchingPlaceInfo, setIsFetchingPlaceInfo] = React.useState(false);
  const [isFetchingInfoForThisSuggestion, setIsFetchingInfoForThisSuggestion] =
    React.useState<string | null>(null);
  const [deviceProximity, setDeviceProximity] = React.useState<{
    lat: number;
    lng: number;
  } | null>(null);

  //--hooks
  const { debouncedValue } = useDebounce(searchQ, 1500);
  const sessionToken = React.useMemo(() => generateSessionToken(), []);

  //--variables
  const thisYear = new Date().getFullYear();

  //--functions
  function handleLocationSelect(location: LocationType) {
    saveLocation(location);
    onClose();
  }

  async function useDeviceLocation() {
    let deviceCoords = null;

    if (!deviceProximity?.lat || !deviceProximity?.lng) {
      deviceCoords = await requestLocationPermission();
    } else {
      deviceCoords = deviceProximity;
    }

    if (!deviceCoords) {
      console.log("no device coords");
      //--TODO: show toast or alert that location permission is required to use this feature
      return;
    }

    setIsFetchingPlaceInfo(true);
    try {
      const response = await fetch(
        `/api/map/find?lat=${deviceProximity?.lat}&lng=${deviceProximity?.lng}`,
      );
      const data = await response.json();

      if (!data?.success || !data?.data) {
        console.log("no location found for device coords");
        //TODO: show toast or alert that no location found for device coords
        onClose();
        return;
      }

      const result: LocationType = data?.data;

      handleLocationSelect(result);
    } catch (error) {
      console.log("error: ", error);
      onClose();
      //TODO: show toast or alert
    } finally {
      setIsFetchingPlaceInfo(false);
    }
  }

  async function requestLocationPermission(): Promise<{
    lat: number;
    lng: number;
  } | null> {
    try {
      const coords: { lat: number; lng: number } | null = await new Promise(
        (resolve, reject) => {
          window.navigator.geolocation.getCurrentPosition(
            (position: GeolocationPosition) => {
              resolve({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => {
              reject(null);
            },
          );
        },
      );

      if (coords?.lat && coords?.lng) {
        setDeviceProximity(coords as { lat: number; lng: number });
      }

      return coords;
    } catch (error) {
      console.log("requestLocationPermission Error:", error); //--TODO: show alert or toast
      return null;
    }
  }

  //--effects
  React.useEffect(() => {
    if (!deviceProximity?.lat || !deviceProximity?.lng) {
      requestLocationPermission();
    }
  }, [deviceProximity?.lat, deviceProximity?.lng]);

  React.useEffect(() => {
    async function fetchMapSuggestions(q: string) {
      if (!q) {
        setSuggestions(defaultMapSuggestions);
        return;
      }

      setSuggestionIsLoading(true);

      try {
        const response = await fetch(
          `/api/map/suggestions?query=${q}&session=${sessionToken}&lng=${deviceProximity?.lng ?? ""}&lat=${deviceProximity?.lat ?? ""}`,
        );
        const data = await response.json();

        const result: PlaceSuggestionType[] = data?.data;

        setSuggestions(result);
      } catch (error) {
        toast.error(
          error instanceof Error ? error?.message : "Something went wrong",
        );
        setSuggestions([]);
        //TODO: show toast or alert
      } finally {
        setSuggestionIsLoading(false);
      }
    }

    fetchMapSuggestions(debouncedValue.trim());
  }, [debouncedValue]);

  return (
    <div className="fixed z-100 bottom-0 right-0 w-screen h-screen bg-pri-bg/90 flex items-end sm:items-center justify-center sm:p-6">
      {/**close */}
      <div
        onClick={onClose}
        className="w-full h-full absolute -z-1 top-0"
      ></div>

      {/**MODAL COMPONENT */}
      <div className="w-full max-w-135 p-4 sm:p-6 flex flex-col gap-4 bg-card-bg rounded-t-3xl sm:rounded-3xl">
        <div>
          <p className="text-center uppercase text-pri-text font-semibold">
            {title}
          </p>
        </div>

        <div className="w-full space-y-4">
          <div className="w-full h-10 flex items-center gap-2 bg-pri-bg px-4 rounded-lg">
            <Search size={18} strokeWidth={1.3} className="text-dim-text" />
            <input
              type="text"
              placeholder="Type to search address"
              className="flex flex-1 text-xs font-light text-pri-text placeholder:text-dim-text"
              maxLength={200}
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              enterKeyHint="search"
              autoFocus
            />
          </div>

          <button onClick={useDeviceLocation} className="group w-full">
            <LocateFixed
              size={18}
              strokeWidth={1.3}
              className="text-blue-400"
            />
            <div className="flex flex-1">
              <p className="group-hover:text-blue-400 font-medium">
                Use Your Current Location
              </p>
            </div>

            {isFetchingPlaceInfo && (
              <div className="w-4 h-4 border-2 border-sec-text border-t-transparent rounded-full animate-spin" />
            )}
          </button>
        </div>

        <div className="w-full max-h-140 overflow-y-auto scrollbar-thin scrollbar-thumb-sec-text scrollbar-track-transparent border-t border-t-dim-text pt-4">
          {suggestionIsLoading ? (
            <div className="w-full flex flex-col gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-full flex items-center gap-4">
                  <div className="w-7 h-7 rounded-full centralize bg-dim-text" />

                  <div className="flex flex-col flex-1 gap-2">
                    <div className="w-1/2 h-2.5 rounded-full bg-dim-text animate-pulse" />
                    <div className="w-2/3 h-2 rounded-full bg-dim-text animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full flex flex-col gap-4">
              {Boolean(suggestions.length) ? (
                suggestions.map((suggestion, idx) => {
                  const distanceInMiles = suggestion.distance
                    ? ((suggestion.distance / 1000) * 0.621).toFixed(0)
                    : null;
                  const isLoading =
                    isFetchingInfoForThisSuggestion === suggestion.mapbox_id;

                  async function fetchPlaceInformation(mapboxId: string) {
                    if (!mapboxId) return;

                    setIsFetchingInfoForThisSuggestion(mapboxId);

                    try {
                      const response = await fetch(
                        `/api/map/${mapboxId}?session=${sessionToken}`,
                      );
                      const data = await response.json();

                      if (!data?.success || !data?.data) {
                        console.log("no location found for device coords");
                        //TODO: show toast or alert that no location found for device coords
                        onClose();
                        return;
                      }
                      const result: LocationType = data?.data;

                      handleLocationSelect(result);
                    } catch (error) {
                      toast.error(
                        error instanceof Error
                          ? error?.message
                          : "Something went wrong",
                      );
                      console.log("error: ", error);
                      onClose();
                      //TODO: show toast or alert
                    } finally {
                      setSearchQ("");
                      setIsFetchingInfoForThisSuggestion(null);
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={async () =>
                        await fetchPlaceInformation(suggestion.mapbox_id)
                      }
                      className="w-full flex items-center gap-3 group"
                      disabled={isLoading}
                    >
                      <div className="w-6 centralize flex-col gap-1">
                        <div className="w-6 h-6 rounded-full centralize bg-sec-text">
                          <svg
                            width={15}
                            height={15}
                            className="text-pri-text centralize"
                          >
                            <use
                              href={`/assets/mapicons/${suggestion.maki}.svg`}
                            />
                          </svg>
                        </div>
                        {distanceInMiles && (
                          <p className="text-[8px] text-sec-text">
                            {distanceInMiles}mi
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col flex-1 gap-0.5">
                        <p className="text-left font-medium text-pri-text group-hover:text-sec-gold">
                          {suggestion.name}
                        </p>
                        <p className="text-left text-[10px] text-sec-text">
                          {suggestion.full_address}
                        </p>
                      </div>

                      <div className="w-6 centralize">
                        {isLoading ? (
                          <div className="w-4 h-4 border-2 border-sec-text border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <ArrowUpRight
                            size={18}
                            strokeWidth={1.3}
                            className="text-pri-text"
                          />
                        )}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="py-6 flex-col centralize gap-4">
                  <MapPinOff
                    size={24}
                    strokeWidth={1.3}
                    className="text-dim-text"
                  />

                  <p className="text-center text-dim-text">
                    No suggestions found
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <p className="text-center text-[10px] text-dim-text">
          &copy; {thisYear} Mapbox and its suppliers. All rights reserved.
        </p>
      </div>
    </div>
  );
};

interface ToggleSwitchProps {
  id: string;
  status: boolean;
  onStatusChange: (status: boolean) => void;
}

interface CounterTabProps {
  id: string;
  count: number;
  onCountChange: (count: number) => void;
  minCount?: number;
  maxCount?: number;
}

interface LocationPickerProps {
  location: LocationType | null;
  setLocation: (location: LocationType) => void;

  label: string;
  placeholder: string;

  isRightAligned?: boolean;

  canDelete?: boolean;
  onDelete?: () => void;

  containerClass?: string;
}

interface LocationPickerModalProps {
  title: string;

  saveLocation: (location: LocationType) => void;
  onClose: () => void;
}

interface DateTimePickerProps {
  label: string;
  id: string;

  datetime: string;
  setDatetime: (datetime: string) => void;

  minHoursFromNow?: number;
  errorMessage?: string;
}
