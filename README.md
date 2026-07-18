# VoyageGH

An AI-powered travel agency platform specific to Ghana. Generate personalized trip itineraries using Google Gemini AI, book trips, and manage everything from an admin dashboard.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Database:** Neon PostgreSQL + Drizzle ORM
- **Auth:** Clerk
- **AI:** Google Gemini (trip itinerary generation)
- **Charts:** Recharts
- **Payments:** Stripe (ready to integrate)
- **Testing:** Vitest

## Features

- AI-generated Ghana trip itineraries (real destinations, GH₵ pricing)
- Trip browse page with search and filters (region, travel style, budget)
- User dashboard with bookings and reviews
- Admin dashboard with real-time stats and analytics
- Clerk authentication (sign in, sign up, user management)
- Star ratings and review system
- Loading skeletons and toast notifications
- Responsive design across all pages

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

Required:
- `DATABASE_URL` — Neon PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` — Clerk publishable key
- `CLERK_SECRET_KEY` — Clerk secret key

Optional (features disabled without these):
- `GEMINI_API_KEY` — Google Gemini API key (AI trip generation)
- `STRIPE_SECRET_KEY` — Stripe secret key (payments)

### 3. Set up the database

```bash
npm run db:push    # Push schema to Neon
npm run db:seed    # Seed 6 sample Ghana trips
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | TypeScript type checking |
| `npm run test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run db:push` | Push schema changes to database |
| `npm run db:seed` | Seed database with sample trips |
| `npm run db:studio` | Open Drizzle Studio |

## Project Structure

```
app/
├── (auth)/              # Sign in / Sign up pages
├── (public)/            # Public pages (home, trips, dashboard)
│   ├── trips/           # Browse trips, trip detail with reviews
│   └── dashboard/       # User dashboard (bookings, quick actions)
├── admin/               # Admin pages (protected)
│   ├── dashboard/       # Stats, charts, recent trips
│   ├── create-trip/     # AI trip generator form
│   ├── trips/           # All trips management
│   └── users/           # User management
├── api/                 # API routes
│   ├── ai/generate-trip # Gemini AI trip generation
│   ├── bookings/        # Booking CRUD
│   ├── reviews/         # Review CRUD
│   └── trips/           # Trip search/filter
├── layout.tsx           # Root layout with Clerk + Toast providers
├── not-found.tsx        # Custom 404 page
└── page.tsx             # Homepage

components/
├── BookingButton.tsx    # Book a trip (auth-gated)
├── ReviewForm.tsx       # Star rating + comment form
├── Skeletons.tsx        # Loading skeleton components
├── Toast.tsx            # Toast notification system
├── Header.tsx           # Nav with Clerk auth
├── Sidebar.tsx          # Admin sidebar
├── TripCard.tsx         # Trip card component
└── charts/              # Recharts analytics

lib/
├── actions.ts           # Server actions (trips, bookings, reviews, stats)
├── constants.ts         # Ghana regions, destinations, sample data
├── env.ts               # Environment variable validation
├── pricing.ts           # Price calculator (budget, group, region)
├── types.ts             # TypeScript interfaces
└── db/
    ├── index.ts         # Neon database connection
    └── schema.ts        # Drizzle schema (users, trips, bookings, reviews)

scripts/
└── seed.ts              # Database seed script

tests/
├── pricing.test.ts      # Pricing engine tests
├── utils.test.ts        # Utility function tests
├── constants.test.ts    # Ghana data constants tests
└── env.test.ts          # Env validation tests
```

## Ghana Data

The platform includes real Ghana data:
- **16 regions** (Greater Accra, Ashanti, Volta, Northern, etc.)
- **16 destinations** (Accra, Kumasi, Cape Coast, Mole National Park, etc.)
- **8 travel styles** (Heritage & History, Adventure, Cultural, etc.)
- **12 interests** (Food & Local Cuisine, Kente & Craft Villages, etc.)
- **6 group types** (Solo, Couple, Family, Diaspora Visit, etc.)

## Database Schema

- **users** — Clerk-synced user profiles
- **trips** — AI-generated trip itineraries with full day-by-day plans
- **bookings** — User trip bookings with status tracking
- **reviews** — User ratings and comments for trips

## License

MIT
