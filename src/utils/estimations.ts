import { LocationType } from "@/src/libs/types";

const EARTH_RADIUS_IN_MILES = 3963.19; //--average = 3958.8
const ROAD_DISTANCE_MULTIPLIER = 1.35;

const CHAUFFEUR_AVERAGE_SPEED_MPH = 35;
const DURATION_ROUNDING_INTERVAL_IN_MINUTES = 15;

const BILLABLE_MINUM_HOUR = 2;
const BILLABLE_ROUNDING_HOUR_INTERVAL = 0.25;

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

function getCoordinates(location: LocationType) {
  const lat = location.coordinates?.lat;
  const lng = location.coordinates?.lng;

  if (typeof lat !== "number" || typeof lng !== "number") return null;
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

  return { lat, lng };
}

function calculateHaversineDistanceInMiles(
  origin: LocationType,
  destination: LocationType,
) {
  const originCoordinates = getCoordinates(origin);
  const destinationCoordinates = getCoordinates(destination);

  if (!originCoordinates || !destinationCoordinates) return null;

  const latDifference = toRadians(
    destinationCoordinates.lat - originCoordinates.lat,
  );
  const lngDifference = toRadians(
    destinationCoordinates.lng - originCoordinates.lng,
  );
  const originLat = toRadians(originCoordinates.lat);
  const destinationLat = toRadians(destinationCoordinates.lat);

  const haversine =
    Math.sin(latDifference / 2) ** 2 +
    Math.cos(originLat) *
      Math.cos(destinationLat) *
      Math.sin(lngDifference / 2) ** 2;

  return (
    2 *
    EARTH_RADIUS_IN_MILES *
    Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine))
  );
}

export function calculateEstimatedDistance(
  pickup: LocationType,
  dropoff: LocationType,
  stops?: LocationType[],
): number {
  const route = [pickup, ...(stops ?? []), dropoff];

  const totalDistance = route.reduce((distance, location, index) => {
    const nextLocation = route[index + 1];
    if (!nextLocation) return distance;

    const legDistance = calculateHaversineDistanceInMiles(
      location,
      nextLocation,
    );

    return distance + (legDistance ?? 0);
  }, 0);

  return totalDistance * ROAD_DISTANCE_MULTIPLIER;
}

export function calculateTravelDuration(distance: number): string {
  if (!Number.isFinite(distance) || distance <= 0)
    return `${DURATION_ROUNDING_INTERVAL_IN_MINUTES}mins`;

  const rawMinutes = (distance / CHAUFFEUR_AVERAGE_SPEED_MPH) * 60;

  const estimatedMinutes = Math.max(
    DURATION_ROUNDING_INTERVAL_IN_MINUTES,
    Math.round(rawMinutes / DURATION_ROUNDING_INTERVAL_IN_MINUTES) *
      DURATION_ROUNDING_INTERVAL_IN_MINUTES,
  );

  const hours = Math.floor(estimatedMinutes / 60);
  const minutes = estimatedMinutes % 60;

  if (hours <= 0) return `${minutes}mins`;
  if (minutes <= 0) return `${hours}hr`;

  return `${hours}hr ${minutes}mins`;
}

export function calculateBillableHours(distance: number) {
  if (!Number.isFinite(distance) || distance <= 0) return BILLABLE_MINUM_HOUR;

  const estimatedHours = distance / CHAUFFEUR_AVERAGE_SPEED_MPH;
  const roundedHours =
    Math.ceil(estimatedHours / BILLABLE_ROUNDING_HOUR_INTERVAL) *
    BILLABLE_ROUNDING_HOUR_INTERVAL;

  return Math.max(BILLABLE_MINUM_HOUR, roundedHours);
}

export function roundToCurrency(value: number) {
  return Number(value.toFixed(2));
}

export function formatCurrency(value: number) {
  return roundToCurrency(Number(value)).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
