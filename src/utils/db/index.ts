import "server-only";

import { randomUUID } from "crypto";
import { Pool, QueryResultRow } from "pg";
import {
  BookingChargeSummaryType,
  VehicleCategoryType,
  VehicleClassType,
} from "@/src/libs/types";
import { BookingFormType } from "@/src/libs/types";
import { DATABASE_URL, dbConfig, schemaSql } from "@/src/utils/db/config";
import {
  AdminPushTokenRecordType,
  AdminPushTokenRow,
  AdminRecordType,
  AdminRow,
  AnalyticsRecordType,
  AnalyticsRow,
  BookingOrderRecordType,
  BookingOrderRow,
  BookingOrderWithPaymentsRecordType,
  BookingOrderWithPaymentsRow,
  DiscountRecordType,
  DiscountRow,
  PaymentRequestRecordType,
  PaymentRequestRow,
  PaymentRequestWithBookingRecordType,
  PaymentRequestWithBookingRow,
  TransactionRecordType,
  TransactionRow,
  VehicleRecordType,
  VehicleRow,
  VehicleSortOrderUpdateType,
  VehicleUpdateRecordType,
} from "@/src/utils/db/types";
import constants from "@/src/libs/constants";
import { RedisCache } from "@/src/utils/cache";
import { generateDbOffset } from "../generator";

declare global {
  var postgresPool: Pool | undefined;
  var postgresSchemaReady: Promise<void> | undefined;
}

const DEFAULT_LIMIT = constants.db.limit;
const DB_TABLE = constants.db.table;

function getPool() {
  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (!globalThis.postgresPool) {
    globalThis.postgresPool = new Pool(dbConfig);
  }

  return globalThis.postgresPool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  values: unknown[] = [],
) {
  const result = await getPool().query<T>(text, values);

  return result;
}

const safeJSON = (value: unknown) => JSON.parse(JSON.stringify(value));

export async function ensureDatabaseSchema() {
  if (!globalThis.postgresSchemaReady) {
    globalThis.postgresSchemaReady = query(schemaSql).then(() => undefined);
  }

  return globalThis.postgresSchemaReady;
}

//---------ADMIN
function mapAdmin(row: AdminRow): AdminRecordType {
  return {
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    passwordHash: row.password_hash,
    role: row.role,
    createdAt: row.created_at.toISOString(),
  };
}

export async function createAdmin(
  email: string,
  passwordHash: string,
  fullname: string,
  role = "admin",
) {
  await ensureDatabaseSchema();

  const result = await query<AdminRow>(
    `
    INSERT INTO ${DB_TABLE.admin} (
      email,
      password_hash,
      full_name,
      role
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [email, passwordHash, fullname, role],
  );

  return mapAdmin(result.rows[0]);
}

export async function findAdminByEmail(email: string) {
  try {
    const normalizedEmail = email.trim().toLowerCase();

    await ensureDatabaseSchema();

    const result = await query<Parameters<typeof mapAdmin>[0]>(
      `
      SELECT *
      FROM ${DB_TABLE.admin}
      WHERE email = $1
      LIMIT 1
      `,
      [normalizedEmail],
    );

    return result.rows[0] ? mapAdmin(result.rows[0]) : null;
  } catch (error) {
    console.log(error instanceof Error ? error.message : "get admin error");
    return null;
  }
}

export async function findAdminById(id: string) {
  try {
    await ensureDatabaseSchema();

    const result = await query<Parameters<typeof mapAdmin>[0]>(
      `
      SELECT *
      FROM ${DB_TABLE.admin}
      WHERE id = $1
      LIMIT 1
      `,
      [id],
    );

    return result.rows[0] ? mapAdmin(result.rows[0]) : null;
  } catch (error) {
    console.log(error instanceof Error ? error.message : "get admin error");
    return null;
  }
}

//---------ADMIN PUSH TOKEN
function mapAdminPushToken(row: AdminPushTokenRow): AdminPushTokenRecordType {
  return {
    id: row.id,
    adminId: row.admin_id,
    expoPushToken: row.expo_push_token,
    createdAt: row.created_at.toISOString(),
  };
}

function mapMultipleAdminPushTokens(
  rows: AdminPushTokenRow[],
): AdminPushTokenRecordType[] {
  return rows.map(mapAdminPushToken);
}

export async function createAdminPushToken(
  adminId: string,
  expoPushToken: string,
) {
  await ensureDatabaseSchema();

  const result = await query<AdminPushTokenRow>(
    `
    INSERT INTO ${DB_TABLE.adminPushToken} (
      admin_id,
      expo_push_token
    )
    VALUES ($1, $2)
    RETURNING *
    `,
    [adminId, expoPushToken],
  );

  return mapAdminPushToken(result.rows[0]);
}

export async function getAdminPushTokenByAdminId(adminId: string) {
  try {
    await ensureDatabaseSchema();

    const result = await query<Parameters<typeof mapAdminPushToken>[0]>(
      `
      SELECT *
      FROM ${DB_TABLE.adminPushToken}
      WHERE admin_id = $1
      LIMIT 1
      `,
      [adminId],
    );

    return result.rows[0] ? mapAdminPushToken(result.rows[0]) : null;
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : "get admin push token error",
    );
    return null;
  }
}

export async function getMultipleAdminPushTokens() {
  try {
    //check if in cache before fetching from db
    const cacheKey = constants.cacheKeyTemp.admin.push_token();

    const cached = await RedisCache.fetch(cacheKey);
    if (cached) {
      return cached as AdminPushTokenRecordType[];
    }
    ///////////////////

    await ensureDatabaseSchema();

    const result = await query<AdminPushTokenRow>(
      `SELECT * FROM ${DB_TABLE.adminPushToken} ORDER BY created_at DESC`,
      [],
    );

    const data = result.rows.length
      ? mapMultipleAdminPushTokens(result.rows)
      : [];

    await RedisCache.save(cacheKey, data);
    return data;
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : "get admin push token error",
    );
    return [];
  }
}

export async function updateAdminPushToken(
  adminId: string,
  expoPushToken: string,
) {
  await query(
    `
    UPDATE ${DB_TABLE.paymentRequest}
    SET expo_push_token = $1
    WHERE admin_id = $2
    `,
    [expoPushToken, adminId],
  );
}

//----------ANALYTICS
function mapAnalytics(row: AnalyticsRow): AnalyticsRecordType {
  return {
    monthlyEarnings: Number(row.monthly_earnings),
    annualEarnings: Number(row.annual_earnings),
    totalCustomers: Number(row.total_customers),
    paidBookings: Number(row.paid_bookings),
  };
}

export async function getDashboardAnalytics() {
  try {
    //check if in cache before fetching from db
    const cacheKey = constants.cacheKeyTemp.analytics.summary();

    const cached = await RedisCache.fetch(cacheKey);
    if (cached) {
      return cached as AnalyticsRecordType;
    }
    ///////////////////

    await ensureDatabaseSchema();

    const result = await query<AnalyticsRow>(`
      SELECT
          COALESCE(
              SUM(total)
              FILTER (
                  WHERE payment_status = 'paid'
                  AND DATE_TRUNC('month', created_at) = DATE_TRUNC('month', NOW())
              ),
              0
          ) AS monthly_earnings,

          COALESCE(
              SUM(total)
              FILTER (
                  WHERE payment_status = 'paid'
                  AND DATE_TRUNC('year', created_at) = DATE_TRUNC('year', NOW())
              ),
              0
          ) AS annual_earnings,

          COUNT(DISTINCT customer_email) AS total_customers,

          COUNT(*)
              FILTER (
                  WHERE payment_status = 'paid'
              ) AS paid_bookings

      FROM ${constants.db.table.booking};
    `);

    const data = result.rows[0] ? mapAnalytics(result.rows[0]) : null;

    await RedisCache.save(cacheKey, data);
    return data;
  } catch (error) {
    console.log(error instanceof Error ? error.message : "get analytics error");
    return null;
  }
}

//---------DISCOUNT
function mapDiscount(row: DiscountRow): DiscountRecordType {
  return {
    id: row.id,
    code: row.code,
    isFixedPrice: row.is_fixed_price,
    value: Number(row.value),
    createdAt: row.created_at.toISOString(),
  };
}

function mapMultipleDiscounts(rows: DiscountRow[]): DiscountRecordType[] {
  return rows.map(mapDiscount);
}

export async function createDiscount(
  code: string,
  value: number,
  isFixedPrice: boolean,
) {
  await ensureDatabaseSchema();

  const result = await query<DiscountRow>(
    `
    INSERT INTO ${DB_TABLE.discount} (
      code,
      value,
      is_fixed_price
    )
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [code, value, isFixedPrice],
  );

  return mapDiscount(result.rows[0]);
}

export async function getDiscountByCode(code: string) {
  try {
    await ensureDatabaseSchema();

    const result = await query<Parameters<typeof mapDiscount>[0]>(
      `SELECT * FROM ${DB_TABLE.discount} WHERE code = $1 LIMIT 1`,
      [code],
    );

    return result.rows[0] ? mapDiscount(result.rows[0]) : null;
  } catch (error) {
    console.log(error instanceof Error ? error.message : "get discount error");
    return null;
  }
}

export async function getMultipleDiscounts(page: number) {
  try {
    //check if in cache before fetching from db
    const cacheKey = constants.cacheKeyTemp.discount.codes(page);

    const cached = await RedisCache.fetch(cacheKey);
    if (cached) {
      return cached as DiscountRecordType[];
    }
    ///////////////////

    await ensureDatabaseSchema();

    const offset = generateDbOffset(page);

    const result = await query<DiscountRow>(
      `SELECT * FROM ${DB_TABLE.discount} ORDER BY created_at DESC LIMIT ${DEFAULT_LIMIT} OFFSET ${offset}`,
      [],
    );

    const data = result.rows.length ? mapMultipleDiscounts(result.rows) : [];

    await RedisCache.save(cacheKey, data);
    return data;
  } catch (error) {
    console.log(error instanceof Error ? error.message : "get discounts error");
    return [];
  }
}

export async function countAllDiscounts() {
  try {
    //check if in cache before fetching from db
    const cacheKey = constants.cacheKeyTemp.discount.count_codes();

    const cached = await RedisCache.fetch(cacheKey);
    if (cached) {
      return cached as number;
    }
    ///////////////////

    await ensureDatabaseSchema();

    const result = await query(`SELECT COUNT(*) FROM ${DB_TABLE.discount}`);

    const count = Number(result.rows[0]?.count ?? 0);

    await RedisCache.save(cacheKey, count);
    return count;
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : "count discount error",
    );
    return 0;
  }
}

export async function deleteDiscountById(id: string) {
  try {
    await ensureDatabaseSchema();

    const result = await query<DiscountRow>(
      `
      DELETE FROM ${DB_TABLE.discount} WHERE id = $1
      `,
      [id],
    );

    return true;
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : "delete discount error",
    );
    return false;
  }
}

//----------BOOKINGS
function mapBookingOrder(row: BookingOrderRow): BookingOrderRecordType {
  return {
    id: row.id,
    orderStatus: row.order_status,
    paymentStatus: row.payment_status,
    booking: row.raw_booking,
    charges: {
      subtotal: Number(row.subtotal),
      discount: Number(row.discount),
      taxableAmount: Number(row.subtotal) - Number(row.discount),
      tax: Number(row.tax),
      taxPercentage: Number(row.tax_percentage),
      gratuity: Number(row.gratuity),
      gratuityPercentage:
        row.gratuity_percentage === null
          ? null
          : Number(row.gratuity_percentage),
      total: Number(row.total),
      estimatedDistance: Number(row.estimated_distance),
      discountCode: row.discount_code ?? "",
      discountPercentage: Number(row.discount_percentage),
    },
    currency: row.currency,
    createdAt: row.created_at.toISOString(),
  };
}

function mapMultipleBookingOrders(
  rows: BookingOrderRow[],
): BookingOrderRecordType[] {
  return rows.map(mapBookingOrder);
}

export async function createBookingOrder({
  booking,
  charges,
}: {
  booking: BookingFormType;
  charges: BookingChargeSummaryType;
}) {
  await ensureDatabaseSchema();

  const orderId = randomUUID();
  const result = await query<Parameters<typeof mapBookingOrder>[0]>(
    `
    INSERT INTO ${DB_TABLE.booking} (
      id,
      trip_choice,
      vehicle,
      num_of_passenger,
      pickup_location,
      dropoff_location,
      extra_stops,
      is_round_trip,
      pickup_datetime,
      customer_fullname,
      customer_email,
      customer_phone,
      customer_message,
      subtotal,
      discount,
      discount_code,
      discount_percentage,
      tax,
      tax_percentage,
      gratuity,
      gratuity_percentage,
      total,
      estimated_distance,
      raw_booking
    )
    VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9,
      $10, $11, $12, $13, $14, $15, $16, $17,
      $18, $19, $20, $21, $22, $23, $24
    )
    RETURNING *
    `,
    [
      orderId,
      booking.tripChoice,
      safeJSON(booking.vehicle),
      booking.numOfPassenger,
      safeJSON(booking.pickupLocation),
      safeJSON(booking.dropoffLocation),
      JSON.stringify(booking.extraStops.filter(Boolean)),
      booking.isRoundTrip,
      new Date(booking.datetime),
      booking.fullname.trim(),
      booking.email.trim().toLowerCase(),
      booking.phone.trim(),
      booking.message?.trim() ?? "",
      charges.subtotal,
      charges.discount,
      charges.discountCode || null,
      charges.discountPercentage,
      charges.tax,
      charges.taxPercentage,
      charges.gratuity,
      charges.gratuityPercentage,
      charges.total,
      charges.estimatedDistance,
      safeJSON(booking),
    ],
  );

  return mapBookingOrder(result.rows[0]);
}

export async function getBookingOrder(orderId: string) {
  try {
    //check if in cache before fetching from db
    const cacheKey = constants.cacheKeyTemp.booking.order(orderId);

    const cached = await RedisCache.fetch(cacheKey);
    if (cached) {
      return cached as BookingOrderRecordType;
    }
    ///////////////////

    await ensureDatabaseSchema();

    const result = await query<Parameters<typeof mapBookingOrder>[0]>(
      `SELECT * FROM ${DB_TABLE.booking} WHERE id = $1 LIMIT 1`,
      [orderId],
    );

    const data = result.rows[0] ? mapBookingOrder(result.rows[0]) : null;

    await RedisCache.save(cacheKey, data);
    return data;
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : "get booking order error",
    );
    return null;
  }
}

export async function getBookingOrderWithPayment(
  id: string,
): Promise<BookingOrderWithPaymentsRecordType | null> {
  const [booking, paymentRequests] = await Promise.all([
    getBookingOrder(id),
    getMultiplePaymentRequests({ byBooking: true, bookingId: id }),
  ]);

  if (!booking) return null;

  return { ...booking, paymentRequests };
}

export async function getMultipleBookingOrders(page: number, q = "") {
  try {
    //check if in cache before fetching from db
    const cacheKey = constants.cacheKeyTemp.booking.orders(page, q);

    const cached = await RedisCache.fetch(cacheKey);
    if (cached) {
      return cached as BookingOrderRecordType[];
    }
    ///////////////////

    await ensureDatabaseSchema();

    const offset = generateDbOffset(page);

    const isSearch = Boolean(q);
    const searchText = String(q).trim();
    const searchQuery = isSearch ? " WHERE id::text ILIKE $1" : "";
    const params = isSearch ? [`%${searchText}%`] : [];

    const result = await query<BookingOrderRow>(
      `SELECT * FROM ${DB_TABLE.booking}${searchQuery} ORDER BY created_at DESC LIMIT ${DEFAULT_LIMIT} OFFSET ${offset}`,
      params,
    );

    const data = result.rows.length
      ? mapMultipleBookingOrders(result.rows)
      : [];
    await RedisCache.save(cacheKey, data);
    return data;
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : "get booking order error",
    );
    return [];
  }
}

export async function countAllBookingOrders(q = "") {
  try {
    //check if in cache before fetching from db
    const cacheKey = constants.cacheKeyTemp.booking.count_orders(q);

    const cached = await RedisCache.fetch(cacheKey);
    if (cached) {
      return cached as number;
    }
    ///////////////////

    await ensureDatabaseSchema();

    const isSearch = Boolean(q);
    const searchText = String(q).trim();
    const searchQuery = isSearch ? " WHERE id::text ILIKE $1" : "";
    const params = isSearch ? [`%${searchText}%`] : [];

    const result = await query(
      `SELECT COUNT(*) FROM ${DB_TABLE.booking}${searchQuery}`,
      params,
    );

    const count = Number(result.rows[0]?.count ?? 0);

    await RedisCache.save(cacheKey, count);
    return count;
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : "get booking order error",
    );
    return 0;
  }
}

export async function markBookingPaid(orderId: string) {
  await query(
    `
    UPDATE ${DB_TABLE.booking}
    SET order_status = 'confirmed',
        payment_status = 'paid',
        updated_at = NOW()
    WHERE id = $1
    `,
    [orderId],
  );
}

export async function deleteBookingOrderById(orderId: string) {
  try {
    await ensureDatabaseSchema();

    const result = await query<BookingOrderRow>(
      `
      DELETE FROM ${DB_TABLE.booking} WHERE id = $1
      `,
      [orderId],
    );

    return true;
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : "delete booking order error",
    );
    return false;
  }
}

//----------PAYMENT REQUESTS
function mapPaymentRequest(row: PaymentRequestRow): PaymentRequestRecordType {
  return {
    id: row.id,
    bookingId: row.booking_id,
    type: row.type,
    status: row.status,
    description: row.description,
    amount: row.amount,
    currency: row.currency,
    createdAt: row.created_at.toISOString(),
  };
}

function mapMultiplePaymentRequests(
  rows: PaymentRequestRow[],
): PaymentRequestRecordType[] {
  return rows.map(mapPaymentRequest);
}

export async function createPaymentRequest({
  bookingId,
  type,
  description,
  amount,
  currency,
}: {
  bookingId: string;
  type: PaymentRequestRow["type"];
  description: string;
  amount: number;
  currency: string;
}) {
  await ensureDatabaseSchema();

  const requestId = randomUUID();
  const result = await query<Parameters<typeof mapPaymentRequest>[0]>(
    `
    INSERT INTO ${DB_TABLE.paymentRequest} (
      id,
      booking_id,
      type, 
      description,
      amount,
      currency
    )
    VALUES (
      $1, $2, $3, $4, $5, $6
    )
    RETURNING *
    `,
    [requestId, bookingId, type, description, amount, currency],
  );

  return mapPaymentRequest(result.rows[0]);
}

export async function updatePaymentRequestStatus(
  requestId: string,
  status: PaymentRequestRow["status"],
) {
  await query(
    `
    UPDATE ${DB_TABLE.paymentRequest}
    SET status = $1,
        updated_at = NOW()
    WHERE id = $2
    `,
    [status, requestId],
  );
}

export async function getPaymentRequest(requestId: string) {
  try {
    //check if in cache before fetching from db
    const cacheKey = constants.cacheKeyTemp.payment.request(requestId);

    const cached = await RedisCache.fetch(cacheKey);
    if (cached) {
      return cached as PaymentRequestRecordType;
    }
    ///////////////////

    await ensureDatabaseSchema();

    const result = await query<Parameters<typeof mapPaymentRequest>[0]>(
      `SELECT * FROM ${DB_TABLE.paymentRequest} WHERE id=$1 LIMIT 1`,
      [requestId],
    );

    const data = result.rows[0] ? mapPaymentRequest(result.rows[0]) : null;

    await RedisCache.save(cacheKey, data);
    return data;
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : "get payment request error",
    );
    return null;
  }
}

export async function getPaymentRequestWithBooking(
  requestId: string,
): Promise<PaymentRequestWithBookingRecordType | null> {
  const paymentRequest = await getPaymentRequest(requestId);
  if (!paymentRequest) return null;

  const order = await getBookingOrder(paymentRequest.bookingId);
  if (!order) return null;

  return { ...paymentRequest, order };
}

export async function getMultiplePaymentRequests({
  byBooking,
  bookingId,
  status = "pending",
}: {
  byBooking?: boolean;
  bookingId?: string;
  status?: PaymentRequestRow["status"];
}) {
  try {
    //check if in cache before fetching from db
    const cacheKey = constants.cacheKeyTemp.payment.requests(bookingId, status);

    const cached = await RedisCache.fetch(cacheKey);
    if (cached) {
      return cached as PaymentRequestRecordType[];
    }
    ///////////////////

    await ensureDatabaseSchema();

    const params = byBooking ? [bookingId] : [status];

    const result = await query<PaymentRequestRow>(
      byBooking
        ? `SELECT * FROM ${DB_TABLE.paymentRequest} WHERE booking_id=$1 ORDER BY created_at DESC`
        : `SELECT * FROM ${DB_TABLE.paymentRequest} WHERE status=$1 ORDER BY created_at DESC`,
      params,
    );

    const data = result.rows.length
      ? mapMultiplePaymentRequests(result.rows)
      : [];

    await RedisCache.save(cacheKey, data);
    return data;
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : "get payment requests error",
    );
    return [];
  }
}

export async function deletePaymentRequestByBookingId(bookingId: string) {
  try {
    await ensureDatabaseSchema();

    const result = await query<PaymentRequestRow>(
      `
      DELETE FROM ${DB_TABLE.paymentRequest} WHERE booking_id = $1
      `,
      [bookingId],
    );

    return true;
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : "delete payment request error",
    );
    return false;
  }
}

export async function deletePaymentRequestById(requestId: string) {
  try {
    await ensureDatabaseSchema();

    const result = await query<PaymentRequestRow>(
      `
      DELETE FROM ${DB_TABLE.paymentRequest} WHERE id = $1
      `,
      [requestId],
    );

    return true;
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : "delete payment request error",
    );
    return false;
  }
}

//----------TRANSACTIONS
function mapTransaction(row: TransactionRow): TransactionRecordType {
  return {
    id: row.id,
    requestId: row.request_id,
    paypalOrderId: row.paypal_order_id,
    paypalCaptureId: row.paypal_capture_id,
    paypalPayerId: row.paypal_payer_id,
    paymentMethod: row.payment_method,
    status: row.status,
    amount: Number(row.amount),
    currency: row.currency,
    paypalResponse: row.paypal_response,
    createdAt: row.created_at.toISOString(),
  };
}

function mapMultipleTransactions(
  rows: TransactionRow[],
): TransactionRecordType[] {
  return rows.map(mapTransaction);
}

export async function createTransaction({
  requestId,
  paypalOrderId,
  paypalCaptureId,
  paypalPayerId,
  paymentMethod,
  status,
  amount,
  currency,
  paypalResponse,
}: {
  requestId: string;
  paypalOrderId: string;
  paypalCaptureId?: string | null;
  paypalPayerId?: string | null;
  paymentMethod: string;
  status: string;
  amount: number;
  currency: string;
  paypalResponse: unknown;
}) {
  await ensureDatabaseSchema();

  const result = await query<Parameters<typeof mapTransaction>[0]>(
    `
    INSERT INTO ${DB_TABLE.transaction} (
      id,
      request_id,
      paypal_order_id,
      paypal_capture_id,
      paypal_payer_id,
      payment_method,
      status,
      amount,
      currency,
      paypal_response
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    ON CONFLICT (paypal_order_id)
    DO UPDATE SET
      paypal_capture_id = EXCLUDED.paypal_capture_id,
      paypal_payer_id = EXCLUDED.paypal_payer_id,
      payment_method = EXCLUDED.payment_method,
      status = EXCLUDED.status,
      amount = EXCLUDED.amount,
      currency = EXCLUDED.currency,
      paypal_response = EXCLUDED.paypal_response,
      updated_at = NOW()
    RETURNING *
    `,
    [
      randomUUID(),
      requestId,
      paypalOrderId,
      paypalCaptureId ?? null,
      paypalPayerId ?? null,
      paymentMethod,
      status,
      amount,
      currency,
      paypalResponse,
    ],
  );

  return mapTransaction(result.rows[0]);
}

export async function getTransaction(transactionId: string) {
  try {
    //check if in cache before fetching from db
    const cacheKey = constants.cacheKeyTemp.transactions.order(transactionId);

    const cached = await RedisCache.fetch(cacheKey);
    if (cached) {
      return cached as TransactionRecordType;
    }
    ///////////////////

    await ensureDatabaseSchema();

    const result = await query<Parameters<typeof mapTransaction>[0]>(
      `SELECT * FROM ${DB_TABLE.transaction} WHERE id = $1 LIMIT 1`,
      [transactionId],
    );

    const data = result.rows[0] ? mapTransaction(result.rows[0]) : null;

    await RedisCache.save(cacheKey, data);
    return data;
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : "get transaction error",
    );
    return null;
  }
}

export async function getMultipleTransactions(page: number, q = "") {
  try {
    //check if in cache before fetching from db
    const cacheKey = constants.cacheKeyTemp.transactions.orders(page, q);

    const cached = await RedisCache.fetch(cacheKey);
    if (cached) {
      return cached as TransactionRecordType[];
    }
    ///////////////////

    await ensureDatabaseSchema();

    const offset = generateDbOffset(page);

    const isSearch = Boolean(q);
    const searchText = String(q).trim();
    const searchQuery = isSearch ? " WHERE id::text ILIKE $1" : "";
    const params = isSearch ? [`%${searchText}%`] : [];

    const result = await query<TransactionRow>(
      `SELECT * FROM ${DB_TABLE.transaction}${searchQuery} ORDER BY created_at DESC LIMIT ${DEFAULT_LIMIT} OFFSET ${offset}`,
      params,
    );

    const data = result.rows.length ? mapMultipleTransactions(result.rows) : [];

    await RedisCache.save(cacheKey, data);
    return data;
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : "get transactions error",
    );
    return [];
  }
}

export async function countAllTransactions(q = "") {
  try {
    //check if in cache before fetching from db
    const cacheKey = constants.cacheKeyTemp.transactions.count_orders(q);

    const cached = await RedisCache.fetch(cacheKey);
    if (cached) {
      return cached as number;
    }
    ///////////////////

    await ensureDatabaseSchema();

    const isSearch = Boolean(q);
    const searchText = String(q).trim();
    const searchQuery = isSearch ? " WHERE id::text ILIKE $1" : "";
    const params = isSearch ? [`%${searchText}%`] : [];

    const result = await query(
      `SELECT COUNT(*) FROM ${DB_TABLE.transaction}${searchQuery}`,
      params,
    );

    const count = Number(result.rows[0]?.count ?? 0);

    await RedisCache.save(cacheKey, count);
    return count;
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : "get transactions error",
    );
    return 0;
  }
}

//----------VEHICLES
function mapVehicle(row: VehicleRow): VehicleRecordType {
  return {
    id: row.id,

    category: row.category as VehicleCategoryType,
    class: row.class as VehicleClassType,

    name: row.name,

    uri: row.uri,

    pricePerHour: Number(row.price_per_hour),
    pricePerMile: Number(row.price_per_mile),

    numOfPassenger: row.num_of_passenger,
    numOfLuggage: row.num_of_luggage,

    isActive: row.is_active,

    sortOrder: Number(row.sort_order),

    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

function mapMultipleVehicles(rows: VehicleRow[]): VehicleRecordType[] {
  return rows.map(mapVehicle);
}

export async function createVehicle(vehicle: VehicleUpdateRecordType) {
  await ensureDatabaseSchema();

  const result = await query<Parameters<typeof mapVehicle>[0]>(
    `
    INSERT INTO ${DB_TABLE.vehicle} (
      category,
      class,
      name,
      price_per_hour,
      price_per_mile,
      num_of_passenger,
      num_of_luggage,
      is_active,
      sort_order
    )
    VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9
    )
    RETURNING *
    `,
    [
      vehicle.category,
      vehicle.class,
      vehicle.name.trim(),
      vehicle.pricePerHour,
      vehicle.pricePerMile,
      vehicle.numOfPassenger,
      vehicle.numOfLuggage,
      vehicle.isActive,
      vehicle.sortOrder,
    ],
  );

  return mapVehicle(result.rows[0]);
}

export async function updateVehicle(
  id: string,
  vehicle: VehicleUpdateRecordType,
) {
  await ensureDatabaseSchema();

  const result = await query<Parameters<typeof mapVehicle>[0]>(
    `
    UPDATE ${DB_TABLE.vehicle}
    SET
      category=$1,
      class=$2,
      name=$3,
      price_per_hour=$4,
      price_per_mile=$5,
      num_of_passenger=$6,
      num_of_luggage=$7,
      is_active=$8,
      updated_at=NOW()
    WHERE id=$9
    RETURNING *
    `,
    [
      vehicle.category,
      vehicle.class,
      vehicle.name.trim(),
      vehicle.pricePerHour,
      vehicle.pricePerMile,
      vehicle.numOfPassenger,
      vehicle.numOfLuggage,
      vehicle.isActive,
      id,
    ],
  );

  return result.rows[0] ? mapVehicle(result.rows[0]) : null;
}

export async function updateVehiclePhotoUri(id: string, uri: string) {
  await ensureDatabaseSchema();

  const result = await query<Parameters<typeof mapVehicle>[0]>(
    `
    UPDATE ${DB_TABLE.vehicle}
    SET
      uri=$1,
      updated_at=NOW()
    WHERE id=$2
    RETURNING *
    `,
    [uri, id],
  );

  return result.rows[0] ? mapVehicle(result.rows[0]) : null;
}

export async function updateVehicleSortOrder(
  orders: VehicleSortOrderUpdateType,
) {
  try {
    await ensureDatabaseSchema();

    const values = orders
      .map((_, i) => `($${i * 2 + 1}::uuid, $${i * 2 + 2}::int)`)
      .join(",");

    const params = orders.flatMap((o) => [o.id, o.newOrder]);

    await query(
      `
      UPDATE vehicles v
      SET sort_order = u.sort_order
      FROM (
          VALUES ${values}
      ) AS u(id, sort_order)
      WHERE v.id = u.id::uuid;
      `,
      params,
    );

    return true;
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : "update vehicle order error",
    );
    return false;
  }
}

export async function deleteVehicle(vehicleId: string) {
  await ensureDatabaseSchema();

  await query("DELETE FROM ${DB_TABLE.vehicle} WHERE id=$1", [vehicleId]);

  return true;
}

export async function getVehicle(id: string) {
  //check if in cache before fetching from db
  const cacheKey = constants.cacheKeyTemp.vehicles.order(id);

  const cached = await RedisCache.fetch(cacheKey);
  if (cached) {
    return cached as VehicleRecordType;
  }
  ///////////////////

  await ensureDatabaseSchema();

  const result = await query<Parameters<typeof mapVehicle>[0]>(
    `
      SELECT *
      FROM ${DB_TABLE.vehicle}
      WHERE id=$1
      LIMIT 1
      `,
    [id],
  );

  const data = result.rows[0] ? mapVehicle(result.rows[0]) : null;

  await RedisCache.save(cacheKey, data);
  return data;
}

export async function getMultipleVehicles(activeOnly = true) {
  //check if in cache before fetching from db
  const cacheKey = constants.cacheKeyTemp.vehicles.orders(activeOnly);

  const cached = await RedisCache.fetch(cacheKey);
  if (cached) {
    return cached as VehicleRecordType[];
  }
  ///////////////////

  await ensureDatabaseSchema();

  const result = await query<Parameters<typeof mapVehicle>[0]>(
    activeOnly
      ? `
        SELECT *
        FROM ${DB_TABLE.vehicle}
        WHERE is_active=TRUE
        ORDER BY
          sort_order ASC,
          created_at DESC;
        `
      : `
        SELECT *
        FROM ${DB_TABLE.vehicle}
        ORDER BY
          sort_order ASC,
          created_at DESC;
        `,
  );

  const data = result?.rows?.length ? mapMultipleVehicles(result.rows) : [];

  await RedisCache.save(cacheKey, data);
  return data;
}

export async function countAllVehicles() {
  try {
    //check if in cache before fetching from db
    const cacheKey = constants.cacheKeyTemp.vehicles.count_orders();

    const cached = await RedisCache.fetch(cacheKey);
    if (cached) {
      return cached as number;
    }
    ///////////////////

    await ensureDatabaseSchema();

    const result = await query(`SELECT COUNT(*) FROM ${DB_TABLE.vehicle}`);

    const count = Number(result.rows[0]?.count ?? 0);

    await RedisCache.save(cacheKey, count);
    return count;
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : "count vehicles error",
    );
    return 0;
  }
}
