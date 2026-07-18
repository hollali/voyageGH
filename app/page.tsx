import Image from "next/image";
import Link from "next/link";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { TripCard } from "~/components/TripCard";
import { DUMMY_TRIPS } from "~/lib/constants";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="travel-hero">
        <div>
          <section className="wrapper">
            <article className="flex flex-col w-full md:max-w-[520px] gap-3.5">
              <h1 className="p-72-bold text-dark-100">
                Explore the Heart of Ghana
              </h1>
              <p className="text-lg font-normal text-dark-400">
                From the vibrant streets of Accra to the serene shores of Cape Coast. 
                AI-powered itineraries tailored to your Ghanaian adventure.
              </p>
              <div className="flex gap-4 mt-2">
                <Link
                  href="/trips"
                  className="px-6 py-3 bg-primary-100 text-white rounded-lg font-semibold hover:bg-primary-500 transition-colors"
                >
                  Explore Trips
                </Link>
                <Link
                  href="/admin/create-trip"
                  className="px-6 py-3 border border-primary-100 text-primary-100 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                >
                  Create with AI
                </Link>
              </div>
            </article>
          </section>
        </div>
      </section>

      {/* Featured Trips */}
      <section className="wrapper py-20">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h2 className="p-30-bold text-dark-100">Popular Ghana Trips</h2>
            <p className="text-gray-100 text-lg">Discover handcrafted itineraries across Ghana</p>
          </div>
          <div className="trip-grid">
            {DUMMY_TRIPS.map((trip) => (
              <TripCard
                key={trip.id}
                id={trip.id}
                name={trip.name}
                location={trip.itinerary[0]?.location || ""}
                imageUrl={trip.imageUrls[0] || ""}
                tags={trip.tags}
                price={trip.estimatedPrice}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="wrapper pb-20">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h2 className="p-30-bold text-dark-100">Top Ghana Destinations</h2>
            <p className="text-gray-100 text-lg">Explore the diverse regions of Ghana</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-20 shadow-300 flex flex-col gap-4">
              <Image src="/assets/icons/destination.svg" alt="accra" width={32} height={32} />
              <h3 className="p-18-bold text-dark-100">Greater Accra</h3>
              <p className="text-gray-100 text-sm">Vibrant capital city with nightlife, markets, and Independence Square</p>
            </div>
            <div className="bg-white p-8 rounded-20 shadow-300 flex flex-col gap-4">
              <Image src="/assets/icons/destination.svg" alt="cape-coast" width={32} height={32} />
              <h3 className="p-18-bold text-dark-100">Cape Coast & Central</h3>
              <p className="text-gray-100 text-sm">Historic castles, Kakum canopy walk, and beautiful beaches</p>
            </div>
            <div className="bg-white p-8 rounded-20 shadow-300 flex flex-col gap-4">
              <Image src="/assets/icons/destination.svg" alt="ashanti" width={32} height={32} />
              <h3 className="p-18-bold text-dark-100">Ashanti Region</h3>
              <p className="text-gray-100 text-sm">Kumasi city, Manhyia Palace, Kejetia Market, and craft villages</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="wrapper pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-20 shadow-300 flex flex-col gap-4">
            <Image src="/assets/icons/itinerary.svg" alt="trips" width={32} height={32} />
            <h3 className="p-30-bold text-dark-100">16</h3>
            <p className="text-gray-100">Regions Covered</p>
          </div>
          <div className="bg-white p-8 rounded-20 shadow-300 flex flex-col gap-4">
            <Image src="/assets/icons/users.svg" alt="users" width={32} height={32} />
            <h3 className="p-30-bold text-dark-100">50+</h3>
            <p className="text-gray-100">Unique Experiences</p>
          </div>
          <div className="bg-white p-8 rounded-20 shadow-300 flex flex-col gap-4">
            <Image src="/assets/icons/destination.svg" alt="destinations" width={32} height={32} />
            <h3 className="p-30-bold text-dark-100">100%</h3>
            <p className="text-gray-100">Made in Ghana</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
