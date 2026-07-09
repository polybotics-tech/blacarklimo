import {
  BookingChargeSummaryType,
  BookingFormType,
  BookingPricingOptionsType,
  LocationType,
} from "@/src/libs/types";
import {
  calculateBillableHours,
  calculateEstimatedDistance,
  roundToCurrency,
} from "@/src/utils/estimations";
import { VehicleRecordType } from "./db/types";

export const BOOKING_TAX_PERCENTAGE = 7;
export const DEFAULT_GRATUITY_PERCENTAGE = 12;

export const MINIMUM_SUBTOTAL_PER_TRIP = 65;
export const MINIMUM_SUBTOTAL_PER_HOUR = 100;

export const STARTING_HOUR_FOR_REDUCTION = 3;
export const STARTING_MILE_FOR_REDUCTION_30 = 30;
export const STARTING_MILE_FOR_REDUCTION_50 = 50;
export const STARTING_MILE_FOR_REDUCTION_80 = 80;
export const STARTING_MILE_FOR_REDUCTION_110 = 110;

function calculatePercentageAmount(value: number, percentage: number) {
  return roundToCurrency(value * (percentage / 100));
}

function normalizePercentage(value: number | undefined) {
  if (!Number.isFinite(value)) return 0;

  return Math.min(Math.max(Number(value), 0), 100);
}

export function calculateBookingCharges(
  booking: BookingFormType,
  options: BookingPricingOptionsType = {},
): BookingChargeSummaryType {
  const stops = booking.extraStops.filter(Boolean) as LocationType[];
  const rawEstimatedDistance = calculateEstimatedDistance(
    booking.pickupLocation as LocationType,
    booking.dropoffLocation as LocationType,
    stops,
  );
  const estimatedDistance = booking.isRoundTrip
    ? Number(rawEstimatedDistance * 2)
    : Number(rawEstimatedDistance);

  const subtotal = booking.vehicle
    ? booking.tripChoice === "hourly"
      ? calSubTotalByHour(
          booking.vehicle.pricePerHour,
          calculateBillableHours(estimatedDistance),
        )
      : calSubTotalByMile(booking.vehicle.pricePerMile, estimatedDistance)
    : 0;

  const discountPercentage = normalizePercentage(options.discountPercentage);
  const discount = calculatePercentageAmount(subtotal, discountPercentage);
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = calculatePercentageAmount(taxableAmount, BOOKING_TAX_PERCENTAGE);
  const gratuityPercentage =
    options.gratuityPercentage === null
      ? null
      : normalizePercentage(
          options.gratuityPercentage ?? DEFAULT_GRATUITY_PERCENTAGE,
        );
  const customGratuity = Number.isFinite(options.customGratuity)
    ? Math.max(0, Number(options.customGratuity))
    : 0;
  const gratuity =
    gratuityPercentage === null
      ? roundToCurrency(customGratuity)
      : calculatePercentageAmount(subtotal, gratuityPercentage);

  return {
    subtotal,
    discount,
    taxableAmount,
    tax,
    gratuity,
    total: roundToCurrency(taxableAmount + tax + gratuity),
    estimatedDistance: roundToCurrency(estimatedDistance),
    taxPercentage: BOOKING_TAX_PERCENTAGE,
    discountCode: options.discountCode?.trim().toUpperCase() ?? "",
    discountPercentage,
    gratuityPercentage,
  };
}

export function assertCompleteBooking(booking: BookingFormType) {
  if (!booking.vehicle) return "Please select a vehicle.";
  if (!booking.pickupLocation?.address) return "Please select a pickup point.";
  if (!booking.dropoffLocation?.address) return "Please select a destination.";
  if (!booking.datetime) return "Please select a pickup date and time.";
  if (!booking.fullname.trim()) return "Please enter your full name.";
  if (!booking.email.trim()) return "Please enter your email address.";
  if (!booking.phone.trim()) return "Please enter your phone number.";

  return null;
}

function calSubTotalByHour(pricePerHour: number, billableHours: number) {
  let subtotal = pricePerHour * billableHours;

  if (subtotal < MINIMUM_SUBTOTAL_PER_HOUR) {
    subtotal = MINIMUM_SUBTOTAL_PER_HOUR;
    return roundToCurrency(subtotal);
  }

  if (billableHours > STARTING_HOUR_FOR_REDUCTION) {
    subtotal = subtotal * 0.7;
    return roundToCurrency(subtotal);
  }

  return roundToCurrency(subtotal);
}

function calSubTotalByMile(pricePerMile: number, estimatedDistance: number) {
  let subtotal = pricePerMile * estimatedDistance;

  if (estimatedDistance < 10) {
    subtotal = pricePerMile * 10;
    return roundToCurrency(subtotal);
  }

  if (subtotal < MINIMUM_SUBTOTAL_PER_TRIP) {
    subtotal = MINIMUM_SUBTOTAL_PER_TRIP;
    return roundToCurrency(subtotal);
  }

  if (
    estimatedDistance > STARTING_MILE_FOR_REDUCTION_30 &&
    estimatedDistance < STARTING_MILE_FOR_REDUCTION_50
  ) {
    subtotal = subtotal * 0.9; //-- (-10%)
    return roundToCurrency(subtotal);
  }

  if (
    estimatedDistance > STARTING_MILE_FOR_REDUCTION_50 &&
    estimatedDistance < STARTING_MILE_FOR_REDUCTION_80
  ) {
    subtotal = subtotal * 0.75; //-- (-25%)
    return roundToCurrency(subtotal);
  }

  if (
    estimatedDistance > STARTING_MILE_FOR_REDUCTION_80 &&
    estimatedDistance < STARTING_MILE_FOR_REDUCTION_110
  ) {
    subtotal = subtotal * 0.7; //-- (-30%)
    return roundToCurrency(subtotal);
  }

  if (estimatedDistance > STARTING_MILE_FOR_REDUCTION_110) {
    subtotal = subtotal * 0.65; //-- (-35%)
    return roundToCurrency(subtotal);
  }

  return roundToCurrency(subtotal);
}
