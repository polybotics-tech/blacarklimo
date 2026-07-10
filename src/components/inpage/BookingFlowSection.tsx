"use client";

import {
  BookingChargeSummaryType,
  BookingFormKeyType,
  BookingFormType,
  CountyType,
  LocationType,
  PlaceType,
  VehicleType,
} from "@/src/libs/types";
import { popularVehicles } from "@/src/libs/vehicles";
import Image from "next/image";
import React from "react";
import {
  CounterTab,
  DateTimePicker,
  LocationPicker,
  ToggleSwitch,
} from "@/src/components/reuseable/FormComponents";
import { ncPopularCounties } from "@/src/libs/places";
import { ArrowLeftRight, CarFront, Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/src/hooks/useStore";
import { SummaryLocationCard } from "../reuseable/CardComponent";
import constants from "@/src/libs/constants";
import {
  formatDateFromISO,
  formatTimeFromISO,
  getLocalDateTimeString,
} from "@/src/utils/datetime";
import {
  calculateTravelDuration,
  formatCurrency,
  roundToCurrency,
} from "@/src/utils/estimations";
import {
  BOOKING_TAX_PERCENTAGE,
  calculateBookingCharges,
  STARTING_MILE_FOR_REDUCTION_110,
  STARTING_MILE_FOR_REDUCTION_30,
  STARTING_MILE_FOR_REDUCTION_50,
  STARTING_MILE_FOR_REDUCTION_80,
} from "@/src/utils/booking";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { __Action_updateBookingForm } from "@/src/utils/store/slice/bookingSlice";
import { VehicleRecordType } from "@/src/utils/db/types";

const RideSection = ({
  form,
  onFormChange,
  searchParam,
}: DefaultSectionProps) => {
  //--states
  const [fleet, setFleet] = React.useState<VehicleRecordType[]>([]);
  const [isFetching, setIsFetching] = React.useState(true);

  //--variables
  const maxPassengers = Boolean(form.vehicle)
    ? form.vehicle?.numOfPassenger
    : 14;

  //--functions
  async function fetchAllVehicles() {
    setIsFetching(true);

    try {
      const response = await fetch(`/api/fleet/?activeOnly=true`);
      const data = await response.json();

      if (!response.ok || !data?.success) {
        toast.error(data?.message || "Something went wrong");
        return;
      }

      setFleet(data?.data?.vehicles);
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

  async function autoFillVehicle() {
    const vehicle_id = searchParam?.get("vehicle_id");

    if (!vehicle_id) return;

    const targetVehicle: VehicleType = fleet.filter(
      (car) => car.id === vehicle_id,
    )[0];

    if (!targetVehicle) return;

    onFormChange("vehicle", targetVehicle);
  }

  //--effects
  React.useEffect(() => {
    autoFillVehicle();
  }, [fleet]);

  React.useEffect(() => {
    fetchAllVehicles();
  }, []);

  return (
    <div className="space-y-4">
      <div className="w-full p-4 bg-pri-bg flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-sec-text scrollbar-track-transparent">
        <>
          {isFetching ? (
            <div className="w-full h-43 rounded-2xl bg-card-bg centralize gap-4 flex-col">
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
                <div className="w-full h-43 rounded-2xl bg-card-bg centralize gap-4 flex-col">
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
                  {fleet.map((car, idx) => {
                    const pricePreview =
                      form.tripChoice === "hourly"
                        ? `$${car.pricePerHour}/hour`
                        : `$${car.pricePerMile}/mile`;

                    const isSelected = car.id === form.vehicle?.id;

                    return (
                      <div
                        key={idx}
                        onClick={() => onFormChange("vehicle", car)}
                        className={`relative w-fit min-w-fit p-4 space-y-1 cursor-pointer rounded-lg bg-card-bg ${isSelected && "card-glow"}`}
                      >
                        <div className="w-full flex flex-col gap-0.5">
                          <span
                            className={`text-[10px] font-sora font-semibold ${isSelected ? "text-sec-gold" : "text-pri-text"}`}
                          >
                            {car.name}
                          </span>
                          <span className="text-[9px] font-poppins font-light text-sec-text">
                            {car.numOfPassenger} passengers | {car.numOfLuggage}{" "}
                            luggages
                          </span>
                        </div>

                        <div className="overflow-hidden relative w-45 h-25.25">
                          {Boolean(car.uri) && (
                            <Image
                              src={car.uri}
                              alt="vehicle-image"
                              width={180}
                              height={101}
                              sizes="1920px"
                              loading="eager"
                              className="object-cover"
                            />
                          )}
                        </div>

                        <div className="absolute bottom-2 right-2 w-fit p-1 rounded-sm bg-pri-bg">
                          <p
                            className={`text-[9px] font-sora font-medium ${isSelected ? "text-sec-gold" : "text-sec-text"}`}
                          >
                            {pricePreview}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </>
          )}
        </>
      </div>

      <div className="w-full flex items-center justify-between gap-2">
        <label htmlFor="rounded-trip" className="text-xs">
          Number Of Passengers
        </label>

        <CounterTab
          id="num-of-passenger"
          count={form.numOfPassenger}
          onCountChange={(count) => onFormChange("numOfPassenger", count)}
          minCount={1}
          maxCount={maxPassengers}
        />
      </div>
    </div>
  );
};

const ScheduleSection = ({
  form,
  onFormChange,
  searchParam,
}: DefaultSectionProps) => {
  //--variables
  const maxStops = 5;
  const stopsCount = Number(form.extraStops.length);
  const extraStopsAllowed = Boolean(stopsCount < maxStops);

  //--functions
  function swapAddress() {
    const dropoff = form.pickupLocation;
    const pickup = form.dropoffLocation;

    //--TODO: also swap cordinates

    onFormChange("dropoffLocation", dropoff);
    onFormChange("pickupLocation", pickup);
  }

  function addExtraStop() {
    if (!extraStopsAllowed) return;

    if (stopsCount < 1) {
      onFormChange("extraStops", [null]);
      return;
    }

    if (form.extraStops[stopsCount - 1]?.address?.trim() !== "") {
      const updatedListOfStops = [...form.extraStops, null];
      onFormChange("extraStops", updatedListOfStops);
    }
  }

  function updateExtraStops({
    index,
    entry,
    isDel,
  }: {
    index: number;
    entry?: LocationType;
    isDel?: boolean;
  }) {
    const defaultList = [...form.extraStops];

    let updatedList;

    if (isDel) {
      updatedList = defaultList.filter((_, idx) => idx !== index);
    } else {
      defaultList[index] = entry || null;
      updatedList = defaultList;
    }

    onFormChange("extraStops", updatedList);
  }

  function autoFillDestination() {
    const destination_id = searchParam?.get("destination_id");

    if (!destination_id) return;

    const generalPlaces: PlaceType[] = [];
    ncPopularCounties.forEach((county: CountyType) => {
      generalPlaces.push(...county.places);
    });

    const targetDestination: PlaceType = generalPlaces.filter(
      (place) => place.id === destination_id,
    )[0];

    if (!targetDestination) return;

    const dropoffLocation: LocationType = {
      address: targetDestination.address,
      name: targetDestination.name,
      coordinates: {
        lat: targetDestination.lat,
        lng: targetDestination.lng,
      },
    };

    onFormChange("dropoffLocation", dropoffLocation);
  }

  //--effects
  React.useEffect(() => {
    autoFillDestination();
  }, []);

  return (
    <div className="space-y-8 sm:space-y-4">
      {/**PICKUP & DROPOFF */}
      <div className="space-y-4">
        <div className="w-full flex flex-col sm:flex-row items-center gap-2 sm:gap-0.5">
          <LocationPicker
            location={form.pickupLocation}
            setLocation={(location) => onFormChange("pickupLocation", location)}
            label="From"
            placeholder="Pick-up address"
          />

          <div className="w-2 relative">
            <button
              onClick={swapAddress}
              className="w-8 h-8 centralize rounded-full bg-card-bg border border-dim-text absolute -top-4 -left-3 group"
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

        <div className="w-full flex items-center justify-between gap-2">
          <label htmlFor="rounded-trip" className="text-xs">
            Secure Round Trip
          </label>
          <ToggleSwitch
            id="rounded-trip"
            status={form.isRoundTrip}
            onStatusChange={(status) => onFormChange("isRoundTrip", status)}
          />
        </div>
      </div>

      {/**ADDITIONAL STOPS */}
      {form.tripChoice === "hourly" && (
        <div className="flex flex-col gap-8 pt-4 pb-8">
          {/**ADD BUTTON */}
          <div className="w-full h-0 centralize border-[0.5px] border-dim-text">
            <div className="w-0 h-0 relative">
              {extraStopsAllowed ? (
                <button
                  onClick={addExtraStop}
                  className="w-44 h-8 mx-auto rounded-full centralize gap-2 bg-card-bg group border border-dim-text absolute -top-4 -left-22"
                >
                  <p className="text-sec-text group-hover:text-pri-text">
                    Click To Add Stop {stopsCount > 0 ? `(${stopsCount})` : ""}
                  </p>
                  <Plus
                    size={18}
                    strokeWidth={1.8}
                    className="text-sec-text group-hover:text-pri-text"
                  />
                </button>
              ) : (
                <div className="w-54 h-8 mx-auto rounded-full centralize bg-card-bg border border-dim-text absolute -top-4 -left-27">
                  <p className="text-dim-text">Maximum Stops Reached (5)</p>
                </div>
              )}
            </div>
          </div>

          {Boolean(stopsCount) && (
            <div className="w-full flex flex-col sm:flex-row sm:flex-wrap gap-4  max-h-40 sm:max-h-24 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-sec-text">
              {form.extraStops?.map((eStop, idx) => {
                const position = idx + 1;
                const value = eStop;

                return (
                  <LocationPicker
                    key={idx}
                    location={value}
                    setLocation={(location) =>
                      updateExtraStops({
                        index: idx,
                        entry: location,
                      })
                    }
                    label={`Stop ${position}`}
                    placeholder="Select location for this stop"
                    canDelete
                    onDelete={() =>
                      updateExtraStops({ index: idx, isDel: true })
                    }
                    containerClass="sm:min-w-[45%] sm:max-w-[49%]"
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const InformationSection = ({ form, onFormChange }: DefaultSectionProps) => {
  return (
    <div className="flex flex-col gap-2">
      <DateTimePicker
        label="Pickup Time"
        id="datetime"
        datetime={form.datetime}
        setDatetime={(datetime) => onFormChange("datetime", datetime)}
      />

      <div className="w-full flex flex-col gap-0.5 py-2 px-2 border border-dim-text rounded-lg">
        <label
          htmlFor="fullname"
          className="text-[10px] text-sec-text font-semibold"
        >
          Full Name
          <span className="text-red-400"> *</span>
        </label>
        <input
          id="fullname"
          name="fullname"
          type="text"
          placeholder="e.g John Doe"
          className="text-xs text-pri-text placeholder:text-dim-text font-light"
          value={form.fullname}
          onChange={(e) => onFormChange("fullname", e.target.value)}
        />
      </div>

      <div className="w-full flex flex-col gap-0.5 py-2 px-2 border border-dim-text rounded-lg">
        <label
          htmlFor="email"
          className="text-[10px] text-sec-text font-semibold"
        >
          Email Address
          <span className="text-red-400"> *</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="e.g youremail@example.com"
          className="text-xs text-pri-text placeholder:text-dim-text font-light"
          value={form.email}
          onChange={(e) => onFormChange("email", e.target.value)}
        />
      </div>

      <div className="w-full flex flex-col gap-0.5 py-2 px-2 border border-dim-text rounded-lg">
        <label
          htmlFor="phone"
          className="text-[10px] text-sec-text font-semibold"
        >
          Phone Number
          <span className="text-red-400"> *</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="e.g +1 234 567-890"
          className="text-xs text-pri-text placeholder:text-dim-text font-light"
          value={form.phone}
          onChange={(e) => onFormChange("phone", e.target.value)}
        />
      </div>

      <div className="w-full flex flex-col gap-0.5 py-2 px-2 border border-dim-text rounded-lg">
        <label
          htmlFor="message"
          className="text-[10px] text-sec-text font-semibold"
        >
          Additional Information
          <span className="text-dim-text text-[8px]"> (optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell us more about your trip need to help us serve you better"
          className="w-full h-18 text-xs text-pri-text placeholder:text-dim-text font-light resize-none"
          value={form.message}
          onChange={(e) => onFormChange("message", e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

const BookingSummarySection = ({ onClose }: BookingSummarySectionProps) => {
  //--hooks
  const booking = useAppSelector((state) => state.booking);
  const dispatch = useAppDispatch();
  const router = useRouter();

  //--states
  const [customGratuity, setCustomGratuity] = React.useState<number>(0); //--used when entered manually by user
  const [discountCode, setDiscountCode] = React.useState<string>("");
  const [discountPercentage, setDiscountPercentage] = React.useState<number>(0);
  const [chosenGratuity, setChosenGratuity] = React.useState<number | null>(15); //--calculated in percentage of gratuity (with reference to sub total)

  const [isCreatingOrder, setIsCreatingOrder] = React.useState(false);
  const [paymentError, setPaymentError] = React.useState("");

  const [isApplyingDiscount, setIsApplyingDiscount] = React.useState(false);
  const [discountError, setDiscountError] = React.useState("");

  //--variables
  const gratuityPercentage = [12, 15, 20, 25];

  //--functions
  function handleGratuityPercentageSelect(percent: number) {
    setChosenGratuity(percent);
  }

  function handleCustomGratuityChange(amount: number) {
    const nextGratuity = Number.isFinite(amount) ? Math.max(0, amount) : 0;

    setChosenGratuity(null);
    setCustomGratuity(roundToCurrency(nextGratuity));
  }

  function handleDiscountCodeChange(code: string) {
    setDiscountCode(code);
  }

  async function applyDiscountCode() {
    if (!discountCode.trim()) return;

    setIsApplyingDiscount(true);
    setDiscountError("");

    try {
      const response = await fetch(
        `/api/discount/codes/apply/?code=${discountCode}`,
      );
      const data = await response.json();

      if (!response.ok || !data?.success) {
        setDiscountError(data?.message ?? "Unable to apply discount code.");
      }

      const value = data.data?.discount?.value;
      const IsFixedPrice = data.data?.discount?.isFixedPrice;

      if (IsFixedPrice) {
        //--calculate how much percentage of subtotal
        const toPercentage = Number(Number(value * 100) / subtotal).toFixed(2);
        setDiscountPercentage(Number(toPercentage));
      } else {
        setDiscountPercentage(value);
      }

      toast.success("Discount applied to subtotal");
    } catch (error) {
      setDiscountError(
        error instanceof Error
          ? error.message
          : "Unable to apply discount code.",
      );
    } finally {
      setIsApplyingDiscount(false);
    }
  }

  async function handleProceedToPayment() {
    setIsCreatingOrder(true);
    setPaymentError("");

    try {
      const response = await fetch("/api/booking/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking,
          pricingOptions: {
            discountCode,
            discountPercentage,
            gratuityPercentage: chosenGratuity,
            customGratuity,
          },
        }),
      });
      const data = await response.json();

      if (!response.ok || !data?.success) {
        setPaymentError(data?.message ?? "Unable to create booking order.");
        return;
      }

      const orderId = data.data.orderId;
      const paymentId = data.data.paymentId;

      const defaultState: BookingFormType = {
        tripChoice: "point-to-point",

        vehicle: null,
        numOfPassenger: 1,

        pickupLocation: null,
        dropoffLocation: null,
        isRoundTrip: false,

        datetime: getLocalDateTimeString(),

        extraStops: [],

        fullname: "",
        email: "",
        phone: "",
        message: "",
      };

      dispatch(
        __Action_updateBookingForm({
          pendingOrderId: orderId,
          ...defaultState,
        }),
      );

      router.push(`/booking/pay/${paymentId}`);
    } catch (error) {
      setPaymentError(
        error instanceof Error
          ? error.message
          : "Unable to create booking order.",
      );
    } finally {
      setIsCreatingOrder(false);
    }
  }

  //--dynamic variables
  const charges: BookingChargeSummaryType = calculateBookingCharges(booking, {
    discountCode,
    discountPercentage,
    gratuityPercentage: chosenGratuity,
    customGratuity,
  });
  const subtotal = charges.subtotal;
  const discount = charges.discount;
  const tax = charges.tax;
  const gratuity = charges.gratuity;
  const total = charges.total;
  const estimatedDistance = charges.estimatedDistance;

  const autoDeduction: string = React.useMemo(() => {
    if (
      estimatedDistance > STARTING_MILE_FOR_REDUCTION_30 &&
      estimatedDistance < STARTING_MILE_FOR_REDUCTION_50
    ) {
      return "(-10%)";
    }

    if (
      estimatedDistance > STARTING_MILE_FOR_REDUCTION_50 &&
      estimatedDistance < STARTING_MILE_FOR_REDUCTION_80
    ) {
      return "(-25%)";
    }

    if (
      estimatedDistance > STARTING_MILE_FOR_REDUCTION_80 &&
      estimatedDistance < STARTING_MILE_FOR_REDUCTION_110
    ) {
      return "(-30%)";
    }

    if (estimatedDistance > STARTING_MILE_FOR_REDUCTION_110) {
      return "(-35%)";
    }

    return "";
  }, [estimatedDistance]);

  return (
    <div className="w-full h-full absolute top-0 left-0 z-50 bg-pri-bg/80 centralize p-4">
      <div onClick={onClose} className="absolute -z-1 w-full h-full"></div>

      <div className="w-full max-w-135 h-full bg-card-bg rounded-2xl flex flex-col gap-4">
        <div className="p-4">
          <h4 className="text-center">Reservation Summary</h4>
        </div>

        <div className="w-full flex flex-col flex-1 gap-4 px-4 sm:px-6 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-sec-text">
          {/**SUMMARY */}
          <ul className="w-full p-4 rounded-2xl bg-sec-bg space-y-2">
            <li className="w-full flex items-center justify-between gap-4">
              <p className="text-sec-text">Trip Choice</p>

              <p className="text-pri-text font-medium uppercase">
                {booking.tripChoice}
              </p>
            </li>

            <li className="w-full flex flex-col items-end gap-0.5">
              <div className="w-full flex items-center justify-between gap-4">
                <p className="text-sec-text">Subtotal</p>

                <p className="text-pri-text font-medium uppercase">
                  $ {formatCurrency(subtotal)}
                  {Boolean(autoDeduction) && (
                    <>
                      {" "}
                      <span className="text-[10px] text-dim-text">
                        {autoDeduction}
                      </span>
                    </>
                  )}
                </p>
              </div>

              {Boolean(autoDeduction) && (
                <p className="text-[10px] text-dim-text font-medium text-right">
                  auto-discount for long distance activated
                </p>
              )}
            </li>

            <li className="w-full flex items-center justify-between gap-4">
              <p className="text-sec-text">
                Tax{" "}
                <span className="text-[10px] text-dim-text">
                  ({BOOKING_TAX_PERCENTAGE}%)
                </span>
              </p>

              <p className="text-pri-text font-medium uppercase">
                $ {formatCurrency(tax)}
              </p>
            </li>

            {Boolean(discount) && (
              <li className="w-full flex items-center justify-between gap-4">
                <p className="text-sec-text">
                  Discount{" "}
                  <span className="text-[10px] text-dim-text">
                    (- {discountPercentage}%)
                  </span>
                </p>

                <p className="text-pri-text font-medium uppercase">
                  $ {formatCurrency(discount)}
                </p>
              </li>
            )}

            <li className="w-full flex items-center justify-between gap-4">
              <p className="text-sec-text">
                Gratuity{" "}
                <span className="text-[10px] text-dim-text">(Tip)</span>
              </p>

              <label htmlFor="gratuity" className="relative">
                <p className="text-pri-text font-medium uppercase">
                  $ {formatCurrency(gratuity)}
                </p>
                <input
                  type="number"
                  name="gratuity"
                  id="gratuity"
                  value={gratuity}
                  onChange={(e) =>
                    handleCustomGratuityChange(Number(e.target.value))
                  }
                  min={7}
                  className="sr-only"
                />
              </label>
            </li>

            <li className="w-full flex items-center justify-end gap-1">
              {gratuityPercentage.map((percent, idx) => {
                const isChosen = chosenGratuity === percent;

                return (
                  <button
                    key={idx}
                    onClick={() => handleGratuityPercentageSelect(percent)}
                    className={`py-1 px-2 rounded-xs ${isChosen ? "bg-pri-text" : "bg-card-bg"}`}
                  >
                    <p
                      className={`text-[10px] ${isChosen ? "text-sec-bg" : "text-sec-text"}`}
                    >
                      {percent}%
                    </p>
                  </button>
                );
              })}
            </li>
          </ul>

          {/**DISCOUNT */}
          <div className="w-full flex flex-col gap-2">
            <div className="w-full p-2 pl-4 flex items-center gap-4 rounded-full bg-sec-bg">
              <div className="flex flex-1">
                <input
                  type="text"
                  placeholder="Enter discount code"
                  maxLength={10}
                  className="w-full h-full placeholder:text-dim-text text-pri-text text-xs"
                  value={discountCode}
                  onChange={(e) => handleDiscountCodeChange(e.target.value)}
                />
              </div>
              <button
                onClick={applyDiscountCode}
                disabled={isApplyingDiscount}
                className="h-8 px-4 rounded-full bg-pri-text"
              >
                <p className="text-pri-bg text-[10px] font-semibold">
                  {isApplyingDiscount ? "Applying..." : "Apply Discount"}
                </p>
              </button>
            </div>
            {Boolean(discountError) && (
              <p className="text-[10px] text-red-400 text-center">
                {discountError}
              </p>
            )}
          </div>

          <div className="w-full h-0 border-t border-dashed border-t-dim-text" />

          {/**DEPATURE TIME AND DATE */}
          <div className="w-full flex items-center justify-between gap-4 p-4 bg-sec-bg">
            <div className="space-y-0.5">
              <p className="text-[10px]">Date</p>
              <h4 className="text-[13px]">
                {formatDateFromISO(booking.datetime)}
              </h4>
            </div>

            <div className="space-y-0.5">
              <p className="text-[10px] text-right">Time</p>
              <h4 className="text-[13px] text-right">
                {formatTimeFromISO(booking.datetime)}
              </h4>
            </div>
          </div>

          {/**PICKUP-STOPS-DROPOFF */}
          <div className="w-full space-y-2">
            <SummaryLocationCard
              location={booking.pickupLocation as LocationType}
              markerColor={constants.locationColor.pickup}
            />
            {Boolean(booking.extraStops.length) &&
              booking.extraStops?.map((stop, idx) => (
                <SummaryLocationCard
                  key={idx}
                  location={stop as LocationType}
                  isStop
                  markerColor={constants.locationColor.stops}
                />
              ))}
            <SummaryLocationCard
              location={booking.dropoffLocation as LocationType}
              isLast
              markerColor={constants.locationColor.dropoff}
            />
          </div>

          {/**ESTIMATED DISTANCE AND DURATION */}
          <div className="w-full flex items-center justify-between gap-4 p-4 bg-sec-bg">
            <div className="space-y-0.5">
              <p className="text-[10px]">Estimated Distance</p>
              <h4 className="text-[13px]">
                {estimatedDistance.toFixed(1)} Miles
              </h4>
            </div>

            <div className="space-y-0.5">
              <p className="text-[10px] text-center">Round Trip</p>
              <h4 className="text-[13px] text-center">
                {booking.isRoundTrip ? "Yes" : "No"}
              </h4>
            </div>

            <div className="space-y-0.5">
              <p className="text-[10px] text-right">Travel Duration</p>
              <h4 className="text-[13px] text-right uppercase">
                ~ {calculateTravelDuration(estimatedDistance)}
              </h4>
            </div>
          </div>

          {/**CHOSEN VEHICLE */}
          {Boolean(booking.vehicle) && (
            <div className="centralize flex-col gap-2">
              <div>
                <Image
                  src={booking.vehicle?.uri as string}
                  alt="vehicle-image"
                  width={240}
                  height={135}
                  sizes="1920px"
                  loading="eager"
                  className="object-cover"
                />
              </div>
              <h4 className="text-[13px] text-center">
                {booking.vehicle?.name}
              </h4>
            </div>
          )}

          {/**NUMBER OF PASSENGERS*/}
          <div className="w-full flex items-center justify-between gap-4 p-4 bg-sec-bg">
            <div className="space-y-0.5">
              <p className="text-[10px]">Number of Passenger(s)</p>
              <h4 className="text-[13px]">{booking.numOfPassenger}</h4>
            </div>

            <div className="space-y-0.5">
              <p className="text-[10px] text-right">Luggage Capacity</p>
              <h4 className="text-[13px] text-right">
                ~ {booking.vehicle?.numOfLuggage}
              </h4>
            </div>
          </div>

          {/**CONTACT INFORMATION & MESSAGE */}
          <ul className="w-full p-4 rounded-2xl bg-sec-bg space-y-2">
            <li className="w-full flex items-center justify-between gap-4">
              <p className="text-sec-text">Name of Primary Passenger</p>

              <p className="text-pri-text font-medium">{booking.fullname}</p>
            </li>

            <li className="w-full flex items-center justify-between gap-4">
              <p className="text-sec-text">Email Address</p>

              <p className="text-pri-text font-medium">{booking.email}</p>
            </li>

            <li className="w-full flex items-center justify-between gap-4">
              <p className="text-sec-text">Contact Phone Number</p>

              <p className="text-pri-text font-medium">{booking.phone}</p>
            </li>

            {Boolean(booking.message) && (
              <li className="w-full flex items-start justify-between gap-4">
                <p className="text-sec-text">Additional Information</p>

                <p className="text-pri-text">{booking.message}</p>
              </li>
            )}
          </ul>
        </div>

        <div className="p-4 sm:p-6 sm:py-4 space-y-4  border-t border-dashed border-dim-text">
          {/**TOTAL CHARGE */}
          <div className="w-full flex items-end justify-between gap-4">
            <h4 className="font-light text-sec-text">Total</h4>

            <h4 className="font-medium text-sec-gold">
              $ {formatCurrency(total)}
            </h4>
          </div>

          {/**ACTION BUTTONS */}
          <div className="w-full space-y-4">
            {paymentError && (
              <p className="rounded-lg border border-red-500/50 p-2 text-center text-[10px] text-red-400">
                {paymentError}
              </p>
            )}

            <button
              onClick={handleProceedToPayment}
              disabled={isCreatingOrder}
              className="w-full h-12 rounded-full bg-pri-text disabled:bg-dim-text"
            >
              <p className="text-pri-bg font-semibold">
                {isCreatingOrder ? "Creating Order..." : "Proceed To Payments"}
              </p>
            </button>

            <button onClick={onClose} className="w-full h-6 rounded-full">
              <p className="font-medium">Make Changes</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PendingBookingSection = ({ onClose }: BookingSummarySectionProps) => {
  //--hooks
  const { pendingOrderId } = useAppSelector((state) => state.booking);
  const dispatch = useAppDispatch();
  const router = useRouter();

  //--states
  const [booking, setBooking] = React.useState<BookingFormType | undefined>();

  const [charges, setCharges] = React.useState<
    BookingChargeSummaryType | undefined
  >();
  const [isFetching, setIsFetching] = React.useState(true);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [isDiscarding, setIsDiscarding] = React.useState(false);

  //--variables
  const subtotal = charges?.subtotal || 0;
  const discount = charges?.discount || 0;
  const tax = charges?.tax || 0;
  const gratuity = charges?.gratuity || 0;
  const total = charges?.total || 0;
  const estimatedDistance = charges?.estimatedDistance || 0;

  const autoDeduction: string = React.useMemo(() => {
    if (
      estimatedDistance > STARTING_MILE_FOR_REDUCTION_30 &&
      estimatedDistance < STARTING_MILE_FOR_REDUCTION_50
    ) {
      return "(-10%)";
    }

    if (
      estimatedDistance > STARTING_MILE_FOR_REDUCTION_50 &&
      estimatedDistance < STARTING_MILE_FOR_REDUCTION_80
    ) {
      return "(-25%)";
    }

    if (
      estimatedDistance > STARTING_MILE_FOR_REDUCTION_80 &&
      estimatedDistance < STARTING_MILE_FOR_REDUCTION_110
    ) {
      return "(-30%)";
    }

    if (estimatedDistance > STARTING_MILE_FOR_REDUCTION_110) {
      return "(-35%)";
    }

    return "";
  }, [estimatedDistance]);

  //--functions
  async function fetchPendingBookingRecord(orderId: string) {
    if (!orderId) return;

    try {
      setIsFetching(true);

      const response = await fetch(`/api/booking/orders/${pendingOrderId}`);
      const data = await response.json();

      if (!response.ok || !data?.success) {
        toast.error(data?.message || "Something went wrong");
        onClose();
        return;
      }

      const order = data.data;

      if (
        order?.paymentStatus === "paid" ||
        order?.orderStatus === "confirmed"
      ) {
        dispatch(__Action_updateBookingForm({ pendingOrderId: null }));
        onClose();
        return null;
      }

      return order;
    } catch (error) {
      toast.error(
        error instanceof Error ? error?.message : "Something went wrong",
      );
      return null;
    } finally {
      setIsFetching(false);
    }
  }

  function proceedToPayment() {
    if (!pendingOrderId) {
      onClose();
      return;
    }
    router.push(`/booking/pay/${pendingOrderId}`);
  }

  async function makeChanges() {
    if (!pendingOrderId || !booking) {
      onClose();
      return;
    }

    setIsUpdating(true);

    try {
      dispatch(
        __Action_updateBookingForm({ ...booking, pendingOrderId: null }),
      );

      const response = await fetch(`/api/booking/orders/${pendingOrderId}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok || !data?.success) {
        toast.error(data?.message || "Something went wrong");
        onClose();
        return;
      }

      onClose();
      return;
    } catch (error) {
      toast.error(
        error instanceof Error ? error?.message : "Something went wrong",
      );
      onClose();
      return;
    } finally {
      setIsUpdating(false);
    }
  }

  async function discardOrder() {
    if (!pendingOrderId || !booking) {
      onClose();
      return;
    }

    setIsDiscarding(true);

    try {
      dispatch(__Action_updateBookingForm({ pendingOrderId: null }));

      const response = await fetch(`/api/booking/orders/${pendingOrderId}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok || !data?.success) {
        toast.error(data?.message || "Something went wrong");
        onClose();
        return;
      }

      toast.success("Pending reservation discarded");
      onClose();
      return;
    } catch (error) {
      toast.error(
        error instanceof Error ? error?.message : "Something went wrong",
      );
      onClose();
      return;
    } finally {
      setIsDiscarding(false);
    }
  }

  //--effects
  React.useEffect(() => {
    async function fetchBooking() {
      if (!pendingOrderId) {
        onClose();
      }

      const orderRecord = await fetchPendingBookingRecord(pendingOrderId ?? "");

      if (!orderRecord) {
        onClose();
        return;
      }

      const bookingRecord = orderRecord.booking;
      setBooking({ ...bookingRecord });

      const chargesRecord = orderRecord.charges;
      setCharges({ ...chargesRecord });
      return;
    }

    fetchBooking();
  }, []);

  return (
    <div className="w-full h-full absolute top-0 left-0 z-50 bg-pri-bg/80 centralize p-4">
      <div className="w-full max-w-135 h-full bg-card-bg rounded-2xl flex flex-col gap-4">
        {isFetching || !booking ? (
          <div className="w-full h-full centralize">
            <div className="w-12 h-12 border-4 border-b-0 border-r-0 border-sec-text rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="p-4 border-b border-dashed border-dim-text">
              <h4 className="text-center font-semibold text-sec-gold">
                Pending Reservation - #
                {pendingOrderId?.slice(0, 8)?.toUpperCase()}
              </h4>
              <p className="text-center">
                It seems you have an unfinished booking reservation. What would
                you like to do about that?
              </p>
            </div>

            <div className="w-full flex flex-col flex-1 gap-4 px-4 sm:px-6 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-sec-text">
              {/**PICKUP-STOPS-DROPOFF */}
              <div className="w-full space-y-2">
                <SummaryLocationCard
                  location={booking.pickupLocation as LocationType}
                  markerColor={constants.locationColor.pickup}
                />
                {Boolean(booking.extraStops.length) &&
                  booking.extraStops?.map((stop, idx) => (
                    <SummaryLocationCard
                      key={idx}
                      location={stop as LocationType}
                      isStop
                      markerColor={constants.locationColor.stops}
                    />
                  ))}
                <SummaryLocationCard
                  location={booking.dropoffLocation as LocationType}
                  isLast
                  markerColor={constants.locationColor.dropoff}
                />
              </div>

              {/**DEPATURE TIME AND DATE */}
              <div className="w-full flex items-center justify-between gap-4 p-4 bg-sec-bg">
                <div className="space-y-0.5">
                  <p className="text-[10px]">Date</p>
                  <h4 className="text-[13px]">
                    {formatDateFromISO(booking.datetime)}
                  </h4>
                </div>

                <div className="space-y-0.5">
                  <p className="text-[10px] text-right">Time</p>
                  <h4 className="text-[13px] text-right">
                    {formatTimeFromISO(booking.datetime)}
                  </h4>
                </div>
              </div>

              {/**CHOSEN VEHICLE */}
              {Boolean(booking.vehicle) && (
                <div className="centralize flex-col gap-2">
                  <div>
                    <Image
                      src={booking.vehicle?.uri as string}
                      alt="vehicle-image"
                      width={240}
                      height={135}
                      sizes="1920px"
                      loading="eager"
                      className="object-cover"
                    />
                  </div>
                  <h4 className="text-[13px] text-center">
                    {booking.vehicle?.name}
                  </h4>
                </div>
              )}

              <div className="w-full h-0 border-t border-dashed border-t-dim-text" />

              {/**SUMMARY */}
              <ul className="w-full p-4 rounded-2xl bg-sec-bg space-y-2">
                <li className="w-full flex items-center justify-between gap-4">
                  <p className="text-sec-text">Trip Choice</p>

                  <p className="text-pri-text font-medium uppercase">
                    {booking.tripChoice}
                  </p>
                </li>

                <li className="w-full flex flex-col items-end gap-0.5">
                  <div className="w-full flex items-center justify-between gap-4">
                    <p className="text-sec-text">Subtotal</p>

                    <p className="text-pri-text font-medium uppercase">
                      $ {formatCurrency(subtotal)}
                      {Boolean(autoDeduction) && (
                        <>
                          {" "}
                          <span className="text-[10px] text-dim-text">
                            {autoDeduction}
                          </span>
                        </>
                      )}
                    </p>
                  </div>

                  {Boolean(autoDeduction) && (
                    <p className="text-[10px] text-dim-text font-medium text-right">
                      auto-discount for long distance activated
                    </p>
                  )}
                </li>

                <li className="w-full flex items-center justify-between gap-4">
                  <p className="text-sec-text">
                    Tax{" "}
                    <span className="text-[10px] text-dim-text">
                      ({BOOKING_TAX_PERCENTAGE}%)
                    </span>
                  </p>

                  <p className="text-pri-text font-medium uppercase">
                    $ {formatCurrency(tax)}
                  </p>
                </li>

                {Boolean(discount) && (
                  <li className="w-full flex items-center justify-between gap-4">
                    <p className="text-sec-text">Discount</p>

                    <p className="text-pri-text font-medium uppercase">
                      $ {formatCurrency(discount)}
                    </p>
                  </li>
                )}

                <li className="w-full flex items-center justify-between gap-4">
                  <p className="text-sec-text">
                    Gratuity{" "}
                    <span className="text-[10px] text-dim-text">(Tip)</span>
                  </p>

                  <p className="text-pri-text font-medium uppercase">
                    $ {formatCurrency(gratuity)}
                  </p>
                </li>
              </ul>

              <div className="w-full h-0 border-t border-dashed border-t-dim-text" />

              {/**ESTIMATED DISTANCE AND DURATION */}
              <div className="w-full flex items-center justify-between gap-4 p-4 bg-sec-bg">
                <div className="space-y-0.5">
                  <p className="text-[10px]">Estimated Distance</p>
                  <h4 className="text-[13px]">
                    {estimatedDistance.toFixed(1)} Miles
                  </h4>
                </div>

                <div className="space-y-0.5">
                  <p className="text-[10px] text-center">Round Trip</p>
                  <h4 className="text-[13px] text-center">
                    {booking.isRoundTrip ? "Yes" : "No"}
                  </h4>
                </div>

                <div className="space-y-0.5">
                  <p className="text-[10px] text-right">Travel Duration</p>
                  <h4 className="text-[13px] text-right uppercase">
                    ~ {calculateTravelDuration(estimatedDistance)}
                  </h4>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 sm:py-4 space-y-4  border-t border-dashed border-dim-text">
              {/**TOTAL CHARGE */}
              <div className="w-full flex items-end justify-between gap-4">
                <h4 className="font-light text-sec-text">Total</h4>

                <h4 className="font-medium text-sec-gold">
                  $ {formatCurrency(total)}
                </h4>
              </div>

              {/**ACTION BUTTONS */}
              <div className="w-full space-y-4">
                <button
                  onClick={proceedToPayment}
                  className="w-full h-12 rounded-full bg-pri-text disabled:bg-dim-text"
                >
                  <p className="text-pri-bg font-semibold">
                    Proceed To Payments
                  </p>
                </button>

                <button
                  onClick={discardOrder}
                  disabled={isDiscarding}
                  className="w-full h-12 rounded-full bg-red-200/5 disabled:bg-red-100/5 hover:bg-red-200/10"
                >
                  <p className="text-red-400 font-semibold">
                    {isDiscarding
                      ? "Discarding Order..."
                      : "Discard Reservation"}
                  </p>
                </button>

                <button
                  onClick={makeChanges}
                  disabled={isUpdating}
                  className="w-full h-6 rounded-full"
                >
                  <p className="font-medium">
                    {isUpdating ? "Please Wait..." : "Make Changes"}
                  </p>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export {
  RideSection,
  ScheduleSection,
  InformationSection,
  BookingSummarySection,
  PendingBookingSection,
};

//---------------------------
interface DefaultSectionProps {
  form: BookingFormType;
  onFormChange: (
    key: BookingFormKeyType,
    value:
      | null
      | string
      | number
      | boolean
      | VehicleType
      | LocationType
      | (LocationType | null)[],
  ) => void;
  searchParam?: URLSearchParams;
}

//---------------------------
interface BookingSummarySectionProps {
  onClose: () => void;
}
