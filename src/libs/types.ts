export type LocationType = {
  name?: string;

  address: string;

  coordinates?: {
    lat?: number;
    lng?: number;
  };
};

export type PlaceSuggestionType = {
  name: string;
  mapbox_id: string;
  full_address: string;
  maki?: string;
  distance?: number;
};

export type RawPlaceSuggestionType = {
  name: string;
  mapbox_id: string;
  feature_type: string;
  address: string;
  full_address: string;
  place_formatted: string;
  context: {
    country: {
      name: string;
      country_code: string;
      country_code_alpha_3: string;
    };
    region: {
      name: string;
      region_code: string;
      region_code_full: string;
    };
    postcode: { name: string };
    place: { name: string };
    neighborhood: { name: string };
    street: { name: string };
  };
  language: string;
  maki: string;
  distance?: number;
  poi_category: string[];
  poi_category_ids: string[];
  external_ids: {
    safegraph: string;
    foursquare: string;
  };
  metadata?: object;
};

export type PlaceInformationType = PlaceSuggestionType & {
  coordinates: [number, number]; // [longitude, latitude]
};

export type PlaceCategoryType =
  | "airport"
  | "hotel"
  | "shopping"
  | "university"
  | "attraction"
  | "business";

export type PlaceType = {
  id: string;
  category: PlaceCategoryType;

  name: string;

  address: string;
  lat: number; //--latitude
  lng: number; //--longitude
};

export type CountyType = {
  id: string;
  name: string;

  places: PlaceType[];
};

//----------------------------------

export type TestimonialType = {
  user: {
    fullname: string;
    uri: string;
  };
  comment: string;
  postOn: "google" | "trustpilot";
};

//----------------------------------

export type VehicleCategoryType = "suv" | "sedan" | "coach";
export type VehicleClassType = "standard" | "executive" | "premium";

export type VehicleType = {
  id: string;
  category: VehicleCategoryType;
  class: VehicleClassType;

  name: string;
  uri: string;

  pricePerHour: number; //-- (in US Dollars)
  pricePerMile: number; //-- (in US Dollars)

  numOfPassenger: number;
  numOfLuggage: number;
};

//-------------------------------------

export type BookingGuideType = {
  title: string;
  desc?: string;
  list?: string[];
};

export type FaqsType = {
  question: string;
  answer: string;
  foundHelpfulBy?: number;
};

//---------------------------------------

export type TripType = "point-to-point" | "hourly";
export type TripOptionType = {
  name: string;
  value: TripType;
};

export type BookingFormType = {
  tripChoice: TripType;

  vehicle: VehicleType | null;
  numOfPassenger: number;

  pickupLocation: LocationType | null;
  dropoffLocation: LocationType | null;
  isRoundTrip: boolean;

  datetime: string;

  extraStops: (LocationType | null)[];

  fullname: string;
  email: string;
  phone: string;
  message?: string;
};
export type BookingFormKeyType =
  | "tripChoice"
  | "vehicle"
  | "numOfPassenger"
  | "pickupLocation"
  | "dropoffLocation"
  | "isRoundTrip"
  | "datetime"
  | "extraStops"
  | "fullname"
  | "email"
  | "phone"
  | "message";

export type BookingSectionType = "ride" | "schedule" | "information";
export type BookingSectionOptionType = {
  name: string;
  value: BookingSectionType;
  isComplete?: boolean;
};

//--------------------------------

export type BookingPricingOptionsType = {
  discountCode?: string;
  discountPercentage?: number;
  gratuityPercentage?: number | null;
  customGratuity?: number;
};

export type BookingChargeSummaryType = {
  subtotal: number;
  discount: number;
  taxableAmount: number;
  tax: number;
  gratuity: number;
  total: number;
  estimatedDistance: number;
  taxPercentage: number;
  discountCode: string;
  discountPercentage: number;
  gratuityPercentage: number | null;
};

//---------------------------------

export type PayPalPaymentMethod = "paypal" | "venmo" | "card";

//---------
export type AdminStateType = {
  accessToken: string | null;
  isLogged: boolean;
};
