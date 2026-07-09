const constants = {
  companyPhone: "+1 (510) 415-8404",
  companyEmail: "blacarklimo@gmail.com",
  companyAddress: "16723 Tiger Ln san Lorenzo ca 94580", //--

  cacheKeyTemp: {
    map: {
      suggestion: (q: string) => `map_suggestion:${q.trim().toLowerCase()}`,
    },
    booking: {
      order: (id: string) => `booking_order:${id}`,
      orders: (page: number, q: string) =>
        `booking_orders:${page}_${q.trim().toLowerCase()}`,
      count_orders: (q: string) =>
        `booking_count_orders:${q.trim().toLowerCase()}`,
    },
    transactions: {
      order: (id: string) => `transaction_order:${id}`,
      orders: (page: number, q: string) =>
        `transaction_orders:${page}_${q.trim().toLowerCase()}`,
      count_orders: (q: string) =>
        `transaction_count_orders:${q.trim().toLowerCase()}`,
    },
    discount: {
      codes: (page: number) => `discount_codes:${page}`,
      count_codes: () => `discount_count_codes:all`,
    },
    payment: {
      request: (id: string) => `payment_request:${id}`,
      requests: (bookingId?: string, status?: string) =>
        `payment_requests:${bookingId ?? ""}_${status?.trim()?.toLowerCase()}`,
    },
  },

  locationColor: {
    pickup: "#22c55e",
    dropoff: "#ef4444",
    stops: "#facc15",
  },

  db: {
    limit: 20,
    defaultPage: 1,
  },

  token: {
    allowedBearers: ["Bearer"],
    expiresIn: 60 * 45, // 45 minutes
  },

  photoUpload: {
    MAX_WIDTH: 1600,
    MAX_HEIGHT: 1200,
    MAX_FILE_SIZE: 3 * 1024 * 1024,
  },
};

export default constants;
