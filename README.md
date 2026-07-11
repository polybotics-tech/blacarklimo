# BlacarkLimo

A premium limousine booking platform built with **Next.js**, designed for a chauffeur service operating across Northern California. The platform allows customers to browse available vehicles, estimate trip costs, securely complete online payments through PayPal, and receive booking confirmations, while providing administrators with tools to manage bookings, vehicles, payments, and notifications.

---

## Features

### Customer Website

- Responsive landing page
- Fleet catalogue with vehicle details
- Point-to-point and hourly booking
- Multi-stop trip support
- Dynamic fare estimation
- Discount code support
- Tax and gratuity calculation
- Secure PayPal checkout
- Booking receipt generation
- Downloadable payment receipt (PDF)
- Vehicle image optimization
- Mobile-friendly interface

### Admin Features

- Secure administrator authentication
- Vehicle management
- Vehicle ordering (drag-and-drop sorting)
- Vehicle image upload
- Booking management
- Payment request management
- Transaction history
- Push notification support
- Email notifications for new paid bookings
- Dashboard statistics
- Redis caching for improved performance

---

## Customer Pages

| Route                          | Description                                  |
| ------------------------------ | -------------------------------------------- |
| `/about`                       | Company information                          |
| `/fleet`                       | Browse available vehicles                    |
| `/booking`                     | Create a new booking                         |
| `/booking?vehicle_id=<id>`     | Booking page with a selected vehicle         |
| `/booking?destination_id=<id>` | Booking page with a pre-selected destination |
| `/booking/pay/[id]`            | Secure payment page                          |
| `/booking/receipt/[id]`        | Booking receipt                              |

---

## Technology Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Mapbox GL JS

### Backend

- Next.js Route Handlers
- PostgreSQL
- Redis
- Supabase Storage

### Payment

- PayPal Checkout
- PayPal Order Capture API

### Image Processing

- Sharp
- Supabase Storage Bucket

### Notifications

- Expo Push Notifications
- Nodemailer

---

## Database

Primary database:

- PostgreSQL

Cloud storage:

- Supabase Storage

Caching:

- Redis

---

## Main Project Structure

```text
app/
    about/
    fleet/
    booking/
    admin/
    api/

src/
    components/
    services/
    utils/
    libs/
    hooks/
    types/
```

---

## Environment Variables

Create a `.env.local` (or `.env.development`) file and configure the following variables.

```env
DATABASE_URL=

REDIS_URL=

SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_BUCKET=

PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
PAYPAL_BASE_URL=

JWT_SECRET=

EMAIL_USER=
EMAIL_PASSWORD=

APP_URL=
```

Production deployments should configure the same variables through the hosting provider (Vercel).

---

## Installation

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Build production

```bash
npm run build
```

Start production server

```bash
npm start
```

---

## Booking Flow

1. Customer selects a vehicle.
2. Customer enters trip information.
3. System calculates pricing.
4. Booking order is created.
5. Payment request is generated.
6. Customer completes payment using PayPal.
7. Payment is verified.
8. Booking status is updated.
9. Transaction record is created.
10. Administrator receives email and push notification.
11. Customer receives payment receipt.

---

## Image Uploads

Vehicle images are:

- validated before upload
- resized and optimized using Sharp
- converted to WebP format
- uploaded to Supabase Storage
- linked to the vehicle record
- old images are automatically removed after successful replacement

---

## Caching

Redis is used to cache frequently accessed resources including:

- Vehicles
- Vehicle counts
- Bookings
- Booking statistics
- Payment requests
- Transactions

Relevant cache entries are automatically invalidated whenever data changes.

---

## Security

- JWT authentication for administrators
- Password hashing
- Protected API routes
- Server-side payment verification
- Input validation
- Secure file upload validation
- Database parameterized queries to prevent SQL injection

---

## Deployment

Production deployment is hosted on Vercel.

Supporting services include:

- PostgreSQL database
- Supabase Storage
- Redis
- PayPal
- Expo Push Notification Service

---

## Future Improvements

- Background job processing for emails and push notifications
- Booking cancellation workflow
- Customer email receipts
- Booking rescheduling
- Analytics dashboard
- SMS notifications
- Multi-admin roles and permissions
- Automated scheduled maintenance reminders

---

## License

Private project developed for Ark Limo Services.
Not licensed for public redistribution.
