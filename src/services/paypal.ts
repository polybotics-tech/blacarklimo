import "server-only";
import { PayPalPaymentMethod } from "@/src/libs/types";

export type CreatePayPalOrderInput = {
  bookingId: string;
  amount: number;
  currency?: string;
  description: string;
  paymentMethod?: PayPalPaymentMethod;
};

const isProduction = process.env.PAYPAL_ENVIRONMENT === "production";

function getPayPalBaseUrl() {
  return isProduction
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
}

function getPayPalCredentials() {
  const clientId =
    process.env.PAYPAL_CLIENT_ID ?? process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("PayPal credentials are not configured.");
  }

  return { clientId, clientSecret };
}

async function getPayPalAccessToken() {
  const { clientId, clientSecret } = getPayPalCredentials();
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64",
  );
  const BASE_URL = getPayPalBaseUrl();

  const response = await fetch(`${BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error_description ?? "Unable to authenticate PayPal.",
    );
  }

  return data.access_token as string;
}

export async function createPayPalOrder({
  bookingId,
  amount,
  currency = "USD",
  description,
}: CreatePayPalOrderInput) {
  const accessToken = await getPayPalAccessToken();
  const response = await fetch(`${getPayPalBaseUrl()}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      application_context: {
        brand_name: "Blacarklimo Chauffeur Services",
      },
      purchase_units: [
        {
          custom_id: bookingId,
          description,
          amount: {
            currency_code: currency,
            value: amount.toFixed(2),
          },
          supplementary_data: {
            card: {
              level_2: {
                invoice_id: bookingId,
              },
            },
          },
        },
      ],
    }),
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message ?? "Unable to create PayPal order.");
  }

  return data as {
    id: string;
    status: string;
  };
}

export async function capturePayPalOrder(paypalOrderId: string) {
  const accessToken = await getPayPalAccessToken();
  const response = await fetch(
    `${getPayPalBaseUrl()}/v2/checkout/orders/${paypalOrderId}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message ?? "Unable to capture PayPal order.");
  }

  return data;
}
