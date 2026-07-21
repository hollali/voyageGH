import Image from "next/image";
import { Map, Users, Navigation, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "~/lib/i18n/routing";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { TripCard } from "~/components/TripCard";
import { DUMMY_TRIPS } from "~/lib/constants";
import { FadeIn, HoverLift, IconHover } from "~/components/MotionWrappers";

export default async function HomePage() {
  const t = await getTranslations("home");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="travel-hero">
        <div>
          <section className="wrapper">
            <article className="flex flex-col w-full md:max-w-[520px] gap-3.5">
              <FadeIn>
                <h1 className="p-72-bold text-dark-100">
                  {t("heroTitle")}
                </h1>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="text-lg font-normal text-dark-400">
                  {t("heroSubtitle")}
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="flex gap-4 mt-2">
                  <Link
                    href="/trips"
                    className="px-6 py-3 bg-primary-100 text-white rounded-lg font-semibold hover:bg-primary-500 transition-colors flex items-center gap-2"
                  >
                    <Navigation size={18} />
                    {t("exploreTrips")}
                  </Link>
                  <Link
                    href="/admin/create-trip"
                    className="px-6 py-3 border border-primary-100 text-primary-100 rounded-lg font-semibold hover:bg-primary-50 transition-colors flex items-center gap-2"
                  >
                    <Sparkles size={18} />
                    {t("createWithAI")}
                  </Link>
                </div>
              </FadeIn>
            </article>
          </section>
        </div>
      </section>

      {/* Featured Trips */}
      <section className="wrapper py-20">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h2 className="p-30-bold text-dark-100">{t("popularTrips")}</h2>
            <p className="text-gray-100 text-lg">{t("popularTripsSub")}</p>
          </div>
          <div className="trip-grid stagger-children">
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
            <h2 className="p-30-bold text-dark-100">{t("topDestinations")}</h2>
            <p className="text-gray-100 text-lg">{t("topDestinationsSub")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            <Link href="/trips" className="group relative rounded-20 overflow-hidden h-[280px]">
              <Image
                src="/assets/images/ghana/accra-city.jpg"
                alt="Greater Accra"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="p-18-bold text-white">Greater Accra</h3>
                <p className="text-white/80 text-sm mt-1">{t("accraDesc")}</p>
              </div>
            </Link>
            <Link href="/trips" className="group relative rounded-20 overflow-hidden h-[280px]">
              <Image
                src="/assets/images/ghana/cape-coast-castle.jpg"
                alt="Cape Coast"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="p-18-bold text-white">Cape Coast & Central</h3>
                <p className="text-white/80 text-sm mt-1">{t("capeCoastDesc")}</p>
              </div>
            </Link>
            <Link href="/trips" className="group relative rounded-20 overflow-hidden h-[280px]">
              <Image
                src="/assets/images/ghana/kumasi.jpg"
                alt="Ashanti Region"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="p-18-bold text-white">Ashanti Region</h3>
                <p className="text-white/80 text-sm mt-1">{t("ashantiDesc")}</p>
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            <Link href="/trips" className="group relative rounded-20 overflow-hidden h-[280px]">
              <Image
                src="/assets/images/ghana/volta-region.jpg"
                alt="Volta Region"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="p-18-bold text-white">Volta Region</h3>
                <p className="text-white/80 text-sm mt-1">{t("voltaDesc")}</p>
              </div>
            </Link>
            <Link href="/trips" className="group relative rounded-20 overflow-hidden h-[280px]">
              <Image
                src="/assets/images/ghana/mole-national-park.jpg"
                alt="Northern Ghana"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="p-18-bold text-white">Northern Ghana</h3>
                <p className="text-white/80 text-sm mt-1">{t("northDesc")}</p>
              </div>
            </Link>
            <Link href="/trips" className="group relative rounded-20 overflow-hidden h-[280px]">
              <Image
                src="/assets/images/ghana/kente-cloth.jpg"
                alt="Culture & Heritage"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="p-18-bold text-white">Culture & Heritage</h3>
                <p className="text-white/80 text-sm mt-1">{t("cultureDesc")}</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="wrapper pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
          <HoverLift className="bg-white p-8 rounded-20 shadow-300 flex flex-col gap-4">
            <IconHover>
              <Map size={32} className="text-primary-100" />
            </IconHover>
            <h3 className="p-30-bold text-dark-100">16</h3>
            <p className="text-gray-100">{t("regionsCovered")}</p>
          </HoverLift>
          <HoverLift className="bg-white p-8 rounded-20 shadow-300 flex flex-col gap-4">
            <IconHover>
              <Users size={32} className="text-primary-100" />
            </IconHover>
            <h3 className="p-30-bold text-dark-100">50+</h3>
            <p className="text-gray-100">{t("uniqueExperiences")}</p>
          </HoverLift>
          <HoverLift className="bg-white p-8 rounded-20 shadow-300 flex flex-col gap-4">
            <IconHover>
              <Navigation size={32} className="text-primary-100" />
            </IconHover>
            <h3 className="p-30-bold text-dark-100">100%</h3>
            <p className="text-gray-100">{t("madeInGhana")}</p>
          </HoverLift>
        </div>
      </section>

      <Footer />
    </div>
  );
}
