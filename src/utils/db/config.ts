import constants from "@/src/libs/constants";
import type { PoolConfig } from "pg";

export const DATABASE_URL = process.env.DATABASE_URL;

export const dbConfig: PoolConfig = {
  connectionString: DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? {
          rejectUnauthorized: false,
        }
      : undefined,
};

export const schemaSql = `
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS ${constants.db.table.admin} (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  password_hash TEXT NOT NULL,

  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'admin',

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ${constants.db.table.discount} (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  code TEXT NOT NULL,
  value NUMERIC(12, 2) NOT NULL DEFAULT 0,

  is_fixed_price BOOLEAN NOT NULL DEFAULT FALSE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ${constants.db.table.vehicle} (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  category TEXT NOT NULL,
  class TEXT NOT NULL,

  name TEXT NOT NULL,

  uri TEXT,

  price_per_hour NUMERIC(12, 2) NOT NULL,
  price_per_mile NUMERIC(12, 2) NOT NULL,

  num_of_passenger INTEGER NOT NULL,
  num_of_luggage INTEGER NOT NULL,

  is_active BOOLEAN NOT NULL DEFAULT TRUE,

  sort_order INTEGER NOT NULL DEFAULT 0,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ${constants.db.table.booking} (
  id UUID PRIMARY KEY,

  order_status TEXT NOT NULL DEFAULT 'pending_payment',
  payment_status TEXT NOT NULL DEFAULT 'unpaid',

  trip_choice TEXT NOT NULL,
  is_round_trip BOOLEAN NOT NULL DEFAULT FALSE,

  vehicle JSONB NOT NULL,
  num_of_passenger INTEGER NOT NULL,

  pickup_location JSONB NOT NULL,
  dropoff_location JSONB NOT NULL,
  extra_stops JSONB NOT NULL DEFAULT '[]'::jsonb,
  
  pickup_datetime TIMESTAMPTZ NOT NULL,

  customer_fullname TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_message TEXT,

  subtotal NUMERIC(12, 2) NOT NULL,
  discount NUMERIC(12, 2) NOT NULL DEFAULT 0,
  discount_code TEXT,
  discount_percentage NUMERIC(5, 2) NOT NULL DEFAULT 0,
  tax NUMERIC(12, 2) NOT NULL,
  tax_percentage NUMERIC(5, 2) NOT NULL,
  gratuity NUMERIC(12, 2) NOT NULL DEFAULT 0,
  gratuity_percentage NUMERIC(5, 2),
  total NUMERIC(12, 2) NOT NULL,

  estimated_distance NUMERIC(10, 2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  raw_booking JSONB NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ${constants.db.table.paymentRequest} (
    id UUID PRIMARY KEY,

    booking_id UUID NOT NULL
        REFERENCES ${constants.db.table.booking}(id)
        ON DELETE CASCADE,

    type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',

    description TEXT,

    amount NUMERIC(12,2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'USD',

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ${constants.db.table.transaction} (
  id UUID PRIMARY KEY,

  request_id UUID NOT NULL REFERENCES ${constants.db.table.paymentRequest}(id) ON DELETE CASCADE,
  paypal_order_id TEXT NOT NULL,
  paypal_capture_id TEXT,
  paypal_payer_id TEXT,

  payment_method TEXT NOT NULL,
  status TEXT NOT NULL,

  amount NUMERIC(12, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',

  paypal_response JSONB NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS booking_customer_email_idx ON ${constants.db.table.booking}(customer_email);
CREATE INDEX IF NOT EXISTS booking_pickup_datetime_idx ON ${constants.db.table.booking}(pickup_datetime);

CREATE INDEX IF NOT EXISTS transactions_request_id_idx ON ${constants.db.table.transaction}(request_id);

CREATE INDEX IF NOT EXISTS vehicle_is_active_idx ON ${constants.db.table.vehicle}(is_active);
`;
