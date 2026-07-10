import {
  BookingChargeSummaryType,
  BookingFormType,
  VehicleType,
} from "@/src/libs/types";

export type BookingOrderRecordType = {
  id: string;

  orderStatus: string;
  paymentStatus: string;

  booking: BookingFormType;

  charges: BookingChargeSummaryType;

  currency: string;

  createdAt: string;
};

export type BookingOrderRow = {
  id: string;

  order_status: string;
  payment_status: string;

  raw_booking: BookingFormType;

  subtotal: string;
  discount: string;
  discount_code: string | null;
  discount_percentage: string;
  tax: string;
  tax_percentage: string;
  gratuity: string;
  gratuity_percentage: string | null;
  total: string;

  estimated_distance: string;

  currency: string;

  created_at: Date;
};

//--------------------

export type PaymentRequestRow = {
  id: string;
  booking_id: string;

  type: "booking" | "overtime";
  status: "pending" | "paid" | "cancelled";

  description: string;

  amount: number;
  currency: string;

  created_at: Date;
};

export type PaymentRequestRecordType = {
  id: string;
  bookingId: string;

  type: "booking" | "overtime";
  status: "pending" | "paid" | "cancelled";

  description: string;

  amount: number;
  currency: string;

  createdAt: string;
};

//-------------------------

export type BookingOrderWithPaymentsRow = BookingOrderRow & {
  payment_requests: PaymentRequestRow[];
};

export type BookingOrderWithPaymentsRecordType = BookingOrderRecordType & {
  paymentRequests: PaymentRequestRecordType[];
};

export type PaymentRequestWithBookingRow = PaymentRequestRow &
  BookingOrderRow & {
    payment_request_id: string;
    payment_request_created_at: Date;
  };

export type PaymentRequestWithBookingRecordType = PaymentRequestRecordType & {
  order: BookingOrderRecordType;
};

//--------------------------

export type TransactionRecordType = {
  id: string;

  requestId: string;

  paypalOrderId: string;
  paypalCaptureId: string | null;
  paypalPayerId: string | null;

  paymentMethod: string;
  status: string;

  amount: number;
  currency: string;

  paypalResponse: unknown;

  createdAt: string;
};

export type TransactionRow = {
  id: string;

  request_id: string;

  paypal_order_id: string;
  paypal_capture_id: string | null;
  paypal_payer_id: string | null;

  payment_method: string;
  status: string;

  amount: string;
  currency: string;

  paypal_response: unknown;

  created_at: Date;
};

//-----------------------

export type VehicleRecordType = VehicleType & {
  isActive: boolean;

  sortOrder: number;

  createdAt: string;
  updatedAt: string;
};

export type VehicleUpdateRecordType = Omit<
  VehicleRecordType,
  "id" | "createdAt" | "updatedAt" | "uri"
>;

export type VehicleSortOrderUpdateType = { id: string; newOrder: number }[];

export type VehicleRow = {
  id: string;

  category: string;
  class: string;

  name: string;

  uri: string;

  price_per_hour: string;
  price_per_mile: string;

  num_of_passenger: number;
  num_of_luggage: number;

  is_active: boolean;

  sort_order: number;

  created_at: Date;
  updated_at: Date;
};

//-----------------------

export type DiscountRecordType = {
  id: string;

  code: string;
  value: number;

  isFixedPrice: boolean;

  createdAt: string;
};

export type DiscountRow = {
  id: string;

  code: string;
  value: string;

  is_fixed_price: boolean;

  created_at: Date;
};

//-----------------------

export type AdminRow = {
  id: string;

  password_hash: string;

  email: string;
  full_name: string;
  role: string;

  created_at: Date;
  updated_at: Date;
};

export type AdminRecordType = {
  id: string;

  passwordHash: string;

  email: string;
  fullName: string;
  role: string;

  createdAt: string;
};

export type AdminPushTokenRow = {
  id: string;

  admin_id: string;
  expo_push_token: string;

  created_at: Date;
};

export type AdminPushTokenRecordType = {
  id: string;

  adminId: string;
  expoPushToken: string;

  createdAt: string;
};

export type AnalyticsRow = {
  monthly_earnings: string;
  annual_earnings: string;
  total_customers: string;
  paid_bookings: string;
};

export type AnalyticsRecordType = {
  monthlyEarnings: number;
  annualEarnings: number;
  totalCustomers: number;
  paidBookings: number;
};

//-----------------------

export type PaginationMetaType = {
  totalCount: number;
  totalPage: number;

  page: number;

  hasNextPage: boolean;
  hasPrevPage: boolean;
};
