<p align="center">
  <img src="public/assets/images/readme.png" alt="VoyageGH Banner" width="100%" />
</p>

<h1 align="center">VoyageGH</h1>

<p align="center">
  <strong>AI-Powered Travel Agency Platform for Ghana</strong>
</p>

<p align="center">
  <a href="https://voyagegh.netlify.app">Live Demo</a> ·
  <a href="https://github.com/hollali/voyageGH/issues">Report Bug</a> ·
  <a href="https://github.com/hollali/voyageGH">Source Code</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge" alt="Drizzle" />
  <img src="https://img.shields.io/badge/Clerk_Auth-6C47FF?style=for-the-badge" alt="Clerk" />
</p>

---

## About

VoyageGH is a full-stack travel agency platform built specifically for **Ghana tourism**. It uses **Google Gemini AI** to generate personalized day-by-day trip itineraries with real Ghanaian destinations, local pricing in GH₵, and authentic cultural experiences.

Users can browse AI-generated trips, book adventures across all 16 regions of Ghana, leave reviews, and manage everything from an admin dashboard with real-time analytics.

<p align="center">
  <img src="public/assets/images/ghana/accra-city.jpg" alt="Accra City" width="45%" />
  &nbsp;&nbsp;
  <img src="public/assets/images/ghana/cape-coast-castle.jpg" alt="Cape Coast Castle" width="45%" />
</p>

---

## Features

### For Travelers
- **AI Trip Generator** — Describe your preferences and get a custom Ghana itinerary powered by Google Gemini
- **Browse Trips** — Search and filter trips by region, travel style, budget, and interests
- **Trip Detail Pages** — Full day-by-day itinerary with photo gallery, weather info, and booking
- **Book Trips** — One-click booking with status tracking
- **Reviews & Ratings** — Rate and review trips you've experienced
- **User Dashboard** — View your bookings and quick actions

### For Admins
- **Dashboard** — Real-time stats (users, trips, bookings) with Recharts analytics
- **Trip Management** — View and manage all AI-generated itineraries
- **User Management** — Monitor platform users

### Technical
- **Lazy DB Connection** — Builds successfully on Netlify without env vars at build time
- **Resilient Data Loading** — Falls back to static data if database is unavailable
- **Clerk Auth** — Secure authentication with protected routes and middleware
- **50 Unit Tests** — Pricing engine, utilities, constants, and env validation

<p align="center">
  <img src="public/assets/images/ghana/kumasi.jpg" alt="Kumasi" width="45%" />
  &nbsp;&nbsp;
  <img src="public/assets/images/ghana/kakum-canopy.jpg" alt="Kakum Canopy Walkway" width="45%" />
</p>

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Database** | Neon PostgreSQL |
| **ORM** | Drizzle ORM |
| **Authentication** | Clerk |
| **AI** | Google Gemini |
| **Charts** | Recharts |
| **Payments** | Stripe (ready) |
| **Testing** | Vitest |
| **Hosting** | Netlify |

---

## Ghana Destinations

VoyageGH covers all **16 regions** of Ghana with real destination data:

<p align="center">
  <img src="public/assets/images/ghana/volta-region.jpg" alt="Volta Region" width="30%" />
  &nbsp;
  <img src="public/assets/images/ghana/mole-national-park.jpg" alt="Mole National Park" width="30%" />
  &nbsp;
  <img src="public/assets/images/ghana/kente-cloth.jpg" alt="Kente Cloth" width="30%" />
</p>

| Region | Highlights |
|--------|-----------|
| **Greater Accra** | Jamestown Lighthouse, Osu Oxford Street, Makola Market, Labadi Beach |
| **Ashanti** | Manhyia Palace, Kejetia Market, Bonwire Kente Village, Lake Bosomtwe |
| **Central** | Cape Coast Castle, Elmina Castle, Kakum Canopy Walkway |
| **Volta** | Wli Waterfalls, Keta Lagoon, Tafi Atome Monkey Sanctuary |
| **Northern** | Mole National Park, Larabanga Mosque |
| **Eastern** | Aburi Botanical Gardens, Akosombo Dam |
| **Western** | Busua Beach, Takoradi |

---

## Sample Trips

| Trip | Region | Duration | Budget | Price |
|------|--------|----------|--------|-------|
| Accra City Explorer | Greater Accra | 4 days | Mid-range | GH₵ 2,500 |
| Cape Coast Heritage Trail | Central | 5 days | Mid-range | GH₵ 3,800 |
| Kumasi & Ashanti Culture | Ashanti | 6 days | Luxury | GH₵ 5,200 |
| Volta Region Adventure | Volta | 7 days | Budget | GH₵ 1,800 |
| Northern Ghana Safari | Northern | 5 days | Mid-range | GH₵ 4,200 |
| Diaspora Heritage Journey | All Ghana | 10 days | Premium | GH₵ 6,800 |

<p align="center">
  <img src="public/assets/images/ghana/jollof-rice.jpg" alt="Ghana Jollof Rice" width="45%" />
  &nbsp;&nbsp;
  <img src="public/assets/images/ghana/bonwire-kente.jpg" alt="Bonwire Kente Weaving" width="45%" />
</p>

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Neon](https://neon.tech) PostgreSQL database
- A [Clerk](https://clerk.com) account
- A [Google Gemini](https://aistudio.google.com) API key (optional, for AI trips)

### Installation

```bash
git clone https://github.com/hollali/voyageGH.git
cd voyageGH
npm install
```

### Environment Variables

Create `.env.local`:

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@host.neon.tech/dbname?sslmode=require"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Google Gemini AI (optional)
GEMINI_API_KEY=AIza...

# Stripe (optional)
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
```

### Database Setup

```bash
npm run db:push    # Push schema to Neon
npm run db:seed    # Seed 6 sample Ghana trips
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
voyageGH/
├── app/
│   ├── (auth)/                 # Sign in / Sign up (Clerk)
│   ├── (public)/
│   │   ├── trips/              # Browse + trip detail with reviews
│   │   └── dashboard/          # User dashboard (bookings)
│   ├── admin/
│   │   ├── dashboard/          # Stats + Recharts analytics
│   │   ├── create-trip/        # AI trip generator
│   │   ├── trips/              # Trip management
│   │   └── users/              # User management
│   ├── api/
│   │   ├── ai/generate-trip    # Gemini AI endpoint
│   │   ├── bookings/           # Booking CRUD
│   │   ├── reviews/            # Review CRUD
│   │   └── trips/              # Trip search/filter
│   ├── layout.tsx              # Root (Clerk + Toast providers)
│   └── page.tsx                # Homepage
├── components/
│   ├── BookingButton.tsx       # Auth-gated booking
│   ├── ReviewForm.tsx          # Star rating + comment
│   ├── Skeletons.tsx           # Loading placeholders
│   ├── Toast.tsx               # Notification system
│   ├── Header.tsx              # Nav with Clerk auth
│   ├── Sidebar.tsx             # Admin sidebar
│   └── TripCard.tsx            # Trip card
├── lib/
│   ├── actions.ts              # Server actions
│   ├── constants.ts            # Ghana data + sample trips
│   ├── env.ts                  # Env validation
│   ├── pricing.ts              # Price calculator
│   ├── types.ts                # TypeScript interfaces
│   └── db/
│       ├── index.ts            # Lazy Neon connection
│       └── schema.ts           # Drizzle schema
├── scripts/
│   └── seed.ts                 # DB seed script
└── tests/                      # 50 Vitest tests
```

---

## Database Schema

```
users          trips           bookings        reviews
├── id (text)  ├── id (serial) ├── id (serial) ├── id (serial)
├── name       ├── name        ├── user_id FK  ├── user_id FK
├── email      ├── description ├── trip_id FK  ├── trip_id FK
├── image_url  ├── est_price   ├── status      ├── rating (real)
├── joined_at  ├── duration    └── created_at  ├── comment
├── status     ├── budget                      └── created_at
└── itinCount  ├── travel_style
               ├── interests
               ├── group_type
               ├── country
               ├── image_urls (jsonb)
               ├── itinerary (jsonb)
               ├── best_time (jsonb)
               ├── weather (jsonb)
               ├── location (jsonb)
               └── created_at
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | TypeScript checking |
| `npm run test` | Run all tests |
| `npm run test:watch` | Tests in watch mode |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Seed sample trips |
| `npm run db:studio` | Open Drizzle Studio |

---

## Testing

50 unit tests covering:

- **Pricing engine** — Budget/group/region multipliers, GH₵ rounding
- **Utilities** — Trend calculations, formatting, JSON parsing
- **Constants** — Ghana regions, destinations, trip data validation
- **Environment** — Required/optional env var validation

```bash
npm run test

#  test/files           tests     time
#  tests/pricing.test    11    0.2s
#  tests/utils.test      13    0.1s
#  tests/constants.test  18    0.1s
#  tests/env.test         8    0.1s
#  ─────────────────────────────────
#  Total:                50    0.5s
```

---

## Deployment

### Netlify (Recommended)

1. Push to GitHub
2. Connect repo in Netlify Dashboard
3. Add environment variables
4. Deploy — the `@netlify/plugin-nextjs` handles the rest

### Docker

```bash
docker build -t voyagegh .
docker run -p 3000:3000 voyagegh
```

### Other Platforms

Works on Vercel, Railway, Fly.io, or any Node.js hosting. Deploy the output of `npm run build`.

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  <img src="public/assets/images/ghana/ghana-flag.jpg" alt="Ghana Flag" width="60%" />
</p>

<p align="center">
  Made with ❤️ for Ghana 🇬🇭
</p>
