# 🏡 Property Booking Platform - GlobeStay

Welcome to the GlobeStay — a modern, feature-rich full-stack web app where users can list, book, and manage properties for short-term stays.

Whether you're a traveler looking for your next stay or a host managing multiple listings, this platform is designed to offer a seamless experience for both.

---

## 🌟 Features

### ✅ For Users
- **Explore Listings** – Browse available properties with detailed descriptions, amenities, pricing, and reviews.
- **Book Stays** – Choose your check-in and check-out dates, select guests, and book your stay securely via Stripe.
- **Leave Reviews** – Share your experience with ratings and comments after your stay.
- **Manage Favorites** – Save and revisit your favorite listings for later.
- **See Booking History** – View your past and upcoming reservations.
- **Edit Profile** – Update your personal details and preferences.

### ✅ For Hosts
- **Create & Edit Rentals** – List properties with dynamic forms including categories, amenities, prices, images, and more.
- **Manage Bookings** – Track all reservations on your properties, including total income and nights booked.
- **Edit Listings on the Fly** – Easily update details or replace images of your property.
- **See Host Stats** – View real-time stats on revenue and performance.

### ✅ For Admins
- **Secure Admin Dashboard** – Protected route that only the configured admin can access.
- **Live Stats** – See platform-wide data on users, bookings, and properties.
- **Booking Analytics** – Visualized booking data across the last 6 months using bar charts.

---

## 🛠 Tech Stack

| Layer         | Technologies Used |
|--------------|-------------------|
| **Frontend**  | Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, React Icons |
| **Backend**   | Next.js API routes, Prisma ORM, PostgreSQL |
| **Auth**      | Clerk (for user authentication and session management) |
| **Payments**  | Stripe (Embedded Checkout) |
| **Database**  | Prisma with relational models for users, bookings, reviews, and properties |
| **State Mgmt**| Zustand (lightweight state management for UI interactions) |
| **Charts**    | Recharts (Admin analytics and stats) |
| **Image Uploads** | Custom integration with upload service (e.g., Cloudinary or S3) |
| **Validation**| Zod (server-side schema validation for forms and uploads) |

---

## 🧩 Key Functional Areas

### 📆 Listings
- Hosts can create property listings with dynamic amenities, location selection, guest counts, pricing, and images.

### 🔐 Authentication
- Clerk handles user registration, login, and secure session management.
- Admin routes are protected via middleware and environment-based user IDs.

### 💳 Stripe Embedded Checkout
- Users are redirected to a dedicated `/checkout` route that leverages Stripe's **Embedded Checkout** for a smooth booking experience.
- A unique booking is created first and any unpaid bookings are cleaned up.
- Stripe session metadata is used to associate payment confirmations with bookings.
- Booking status is marked as paid (`paymentStatus = true`) upon successful Stripe confirmation.
- Failed or unpaid bookings are filtered from all listings, stats, and reservation tables.

### 📊 Analytics & Admin
- Admin dashboard shows monthly booking trends and system-wide metrics (users, listings, bookings).
- Hosts see personal revenue, nights booked, and reservations via dedicated stats components.

### 🗓️ Reservations & Bookings
- Bookings respect availability (disabled dates), and only successful Stripe payments are stored.
- Hosts can view bookings and reservations in clean data tables with export-friendly structure.
- Reservation stats show total income, nights booked, and number of listings using real-time queries.

---

## ⚙️ Developer Notes

- Built using the **Next.js App Router**, leveraging server and client components for performance and flexibility.
- Features fully **type-safe** back-end and front-end interactions.
- **Zustand** is used for handling small but important shared states (like amenities and counters).
- Admin access is strictly controlled via `ADMIN_USER_ID` from environment variables.
- All actions (e.g., delete, update, submit forms) use **progress-aware buttons** and **form containers** for reusability and user feedback.
- Performance and loading states are covered with graceful **skeleton loaders**.
- All dates and currencies are properly formatted using built-in internationalization utilities.
- **Stripe Payment Flow Summary**:
  - Users initiate bookings via `createBookingAction`.
  - Unpaid bookings are purged before creating a new one.
  - A new Stripe Embedded Checkout session is created via `/api/payment`.
  - Booking is confirmed and marked `paid` through `/api/confirm` using session metadata.
  - Frontend renders `EmbeddedCheckout` using Stripe SDK and fetched `clientSecret`.

---

## 🚀 Getting Started (For Developers)

1. Clone the repo
2. Install dependencies: `npm install`
3. Set up `.env` with your keys (Stripe, Clerk, DB, etc.)
4. Push Prisma schema: `npx prisma db push`
5. Run: `npm run dev`

---

## 📦 Deployment

This app is production-ready and deployable on **Vercel** with environment variable support.
Link for the app: https://globe-stay.vercel.app

---

## Author

- LinkedIn - [Damla Kara](https://www.linkedin.com/in/damla-kara-348081232/)
