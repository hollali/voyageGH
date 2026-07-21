import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { ChevronLeft, MapPin, Star, Calendar, DollarSign, Users, Compass, Sparkles, Thermometer } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "~/lib/i18n/routing";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { getTripById, getReviewsByTrip, getAverageRating } from "~/lib/actions";
import { DUMMY_TRIPS } from "~/lib/constants";
import { notFound } from "next/navigation";
import { BookingButton } from "~/components/BookingButton";
import { ReviewForm } from "~/components/ReviewForm";

async function findTrip(id: number) {
  try {
    const trip = await getTripById(id);
    if (trip) return trip;
  } catch {
    // DB unavailable — fall back to static data
  }
  const dummy = DUMMY_TRIPS.find((t) => t.id === id);
  if (!dummy) return null;
  // Normalize dummy trip to match DB shape
  return {
    id: dummy.id,
    name: dummy.name,
    description: dummy.description,
    estimatedPrice: dummy.estimatedPrice,
    duration: dummy.duration,
    budget: dummy.budget,
    travelStyle: dummy.travelStyle,
    interests: dummy.interests,
    groupType: dummy.groupType,
    country: dummy.itinerary[0]?.location || "Ghana",
    imageUrls: dummy.imageUrls,
    itinerary: [] as { day: number; location: string; activities: { time: string; description: string }[] }[],
    bestTimeToVisit: [] as string[],
    weatherInfo: [] as string[],
    location: null,
    paymentLink: null,
    createdAt: new Date(),
  };
}

async function findReviews(tripId: number) {
  try {
    return await getReviewsByTrip(tripId);
  } catch {
    return [];
  }
}

async function findRating(tripId: number) {
  try {
    return await getAverageRating(tripId);
  } catch {
    return { avgRating: 0, totalReviews: 0 };
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id } = await params;
  const trip = await findTrip(Number(id));
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://voyagegh.netlify.app";
  const imageUrl = trip?.imageUrls?.[0] || `${baseUrl}/assets/images/ghana/accra-city.jpg`;
  const absoluteImageUrl = imageUrl.startsWith("http") ? imageUrl : `${baseUrl}${imageUrl}`;

  return {
    title: trip ? `${trip.name} | VoyageGH` : "Trip Not Found | VoyageGH",
    description: trip?.description || "Ghana trip details",
    openGraph: {
      title: trip ? `${trip.name} | VoyageGH` : "Trip Not Found | VoyageGH",
      description: trip?.description || "Ghana trip details",
      url: `${baseUrl}/trips/${id}`,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: trip?.name || "VoyageGH Trip",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: trip ? `${trip.name} | VoyageGH` : "Trip Not Found | VoyageGH",
      description: trip?.description || "Ghana trip details",
      images: [absoluteImageUrl],
    },
  };
}

export default async function TripDetailPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id } = await params;
  const t = await getTranslations("tripDetail");
  const trip = await findTrip(Number(id));
  if (!trip) notFound();

  const { userId } = await auth().catch(() => ({ userId: null }));
  const [tripReviews, avgRating] = await Promise.all([
    findReviews(trip.id),
    findRating(trip.id),
  ]);

  const galleryImages = trip.imageUrls && trip.imageUrls.length > 0
    ? trip.imageUrls
    : ["/assets/images/ghana/accra-city.jpg"];

  const heroImage = galleryImages[0];
  const thumbnailImages = galleryImages.slice(1);

  const quickInfoItems = [
    { icon: <Calendar size={24} className="text-primary-100" />, label: t("duration"), value: `${trip.duration} ${t("days")}` },
    { icon: <DollarSign size={24} className="text-primary-100" />, label: t("budget"), value: trip.budget },
    { icon: <Users size={24} className="text-primary-100" />, label: t("group"), value: trip.groupType },
    { icon: <Compass size={24} className="text-primary-100" />, label: t("style"), value: trip.travelStyle },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-light-200">
      <Header />

      {/* Hero Image */}
      <div className="relative w-full h-[300px] md:h-[420px]">
        <Image
          src={heroImage}
          alt={trip.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 wrapper py-8">
          <Link
            href="/trips"
            className="inline-flex items-center gap-2 text-white/80 text-sm mb-4 hover:text-white transition-colors"
          >
            <ChevronLeft size={16} />
            {t("backToTrips")}
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">{trip.name}</h1>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-white/90 text-sm">
              <MapPin size={16} />
              {"country" in trip ? trip.country || "Ghana" : "Ghana"}
            </span>
            {avgRating && avgRating.totalReviews > 0 && (
              <span className="flex items-center gap-1 text-white/90 text-sm">
                <Star size={14} className="fill-white text-white" />
                {Number(avgRating.avgRating).toFixed(1)} ({avgRating.totalReviews} reviews)
              </span>
            )}
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full font-medium">
              {trip.travelStyle}
            </span>
          </div>
        </div>
      </div>

      <main className="wrapper py-10 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content — 2/3 width */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Thumbnail Gallery */}
            {thumbnailImages.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {thumbnailImages.map((url, index) => (
                  <div key={index} className="relative rounded-xl overflow-hidden aspect-[4/3]">
                    <Image
                      src={url}
                      alt={`${trip.name} ${index + 2}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="bg-white p-6 md:p-8 rounded-20 shadow-300">
              <h2 className="text-lg font-semibold text-dark-100 mb-4">{t("aboutTrip")}</h2>
              <p className="text-dark-400 text-base leading-relaxed">{trip.description}</p>
            </div>

            {/* Trip Quick Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickInfoItems.map((item) => (
                <div key={item.label} className="bg-white p-4 rounded-20 shadow-300 text-center flex flex-col items-center gap-2">
                  {item.icon}
                  <p className="text-xs text-gray-100">{item.label}</p>
                  <p className="text-sm font-semibold text-dark-100">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Day-by-Day Itinerary */}
            {trip.itinerary && trip.itinerary.length > 0 && (
              <div className="bg-white p-6 md:p-8 rounded-20 shadow-300">
                <h2 className="text-lg font-semibold text-dark-100 mb-6">{t("itinerary")}</h2>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-light-400" />

                  <div className="flex flex-col gap-8">
                    {trip.itinerary.map((day) => (
                      <div key={day.day} className="relative flex gap-5">
                        {/* Day dot */}
                        <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-white text-sm font-bold">
                          {day.day}
                        </div>

                        <div className="flex-1 pb-2">
                          <h3 className="text-base font-semibold text-dark-100 mb-3">
                            {day.location}
                          </h3>
                          <div className="flex flex-col gap-3">
                            {day.activities.map((activity, i) => (
                              <div key={i} className="flex gap-4 items-start">
                                <span className="text-xs font-semibold text-primary-100 bg-primary-50 px-2 py-1 rounded-md whitespace-nowrap mt-0.5">
                                  {activity.time}
                                </span>
                                <p className="text-sm text-dark-400 leading-relaxed">
                                  {activity.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Best Time to Visit */}
            {trip.bestTimeToVisit && trip.bestTimeToVisit.length > 0 && (
              <div className="bg-white p-6 md:p-8 rounded-20 shadow-300">
                <h2 className="text-lg font-semibold text-dark-100 mb-4">{t("bestTime")}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {trip.bestTimeToVisit.map((info, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-light-200 rounded-xl">
                      <span className="text-primary-100 text-lg mt-0.5">●</span>
                      <p className="text-sm text-dark-400 leading-relaxed">{info}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Weather Info */}
            {trip.weatherInfo && trip.weatherInfo.length > 0 && (
              <div className="bg-white p-6 md:p-8 rounded-20 shadow-300">
                <h2 className="text-lg font-semibold text-dark-100 mb-4">{t("weather")}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {trip.weatherInfo.map((info, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-light-200 rounded-xl">
                      <Thermometer size={18} className="text-primary-100 mt-0.5" />
                      <p className="text-sm text-dark-400 leading-relaxed">{info}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
              {[trip.travelStyle, trip.budget, trip.groupType, trip.interests]
                .filter((t): t is string => Boolean(t))
                .flatMap((t) => t!.split(","))
                .slice(0, 8)
                .map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white text-primary-500 text-sm rounded-full font-medium shadow-300"
                  >
                    {tag.trim()}
                  </span>
                ))}
            </div>

            {/* Reviews Section */}
            <div className="bg-white p-6 md:p-8 rounded-20 shadow-300">
              <h2 className="text-lg font-semibold text-dark-100 mb-6">
                {t("reviews")} ({tripReviews.length})
              </h2>

              {userId && <ReviewForm tripId={trip.id} userId={userId} />}

              {tripReviews.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-100 mb-2">{t("noReviews")}</p>
                  <p className="text-sm text-gray-200">{t("beFirst")}</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {tripReviews.map(({ review, user }) => (
                    <div key={review.id} className="border-b border-light-400 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-full bg-primary-50 flex items-center justify-center text-primary-100 font-semibold text-sm">
                          {user.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-dark-100">{user.name}</p>
                          <p className="text-xs text-gray-100">
                            {new Date(review.createdAt).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={i < Math.round(review.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                            />
                          ))}
                        </div>
                      </div>
                      {review.comment && (
                        <p className="text-sm text-dark-400 ml-12">{review.comment}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar — 1/3 width (sticky booking card) */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 flex flex-col gap-6">
              {/* Price & Book Card */}
              <div className="bg-white p-6 rounded-20 shadow-400 border border-light-400">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-100 mb-1">{t("startingFrom")}</p>
                    <p className="text-2xl font-bold text-dark-100">{trip.estimatedPrice}</p>
                  </div>
                  <span className="px-3 py-1.5 bg-success-50 text-success-700 text-xs rounded-full font-medium">
                    {t("available")}
                  </span>
                </div>

                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-100">{t("duration")}</span>
                    <span className="font-medium text-dark-100">{trip.duration} {t("days")}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-100">{t("groupType")}</span>
                    <span className="font-medium text-dark-100">{trip.groupType}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-100">{t("travelStyle")}</span>
                    <span className="font-medium text-dark-100">{trip.travelStyle}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-100">{t("budget")}</span>
                    <span className="font-medium text-dark-100">{trip.budget}</span>
                  </div>
                </div>

                <BookingButton tripId={trip.id} userId={userId} tripName={trip.name} price={trip.estimatedPrice || ""} />

                <p className="text-xs text-gray-100 text-center mt-3">
                  {t("freeCancellation")}
                </p>
              </div>

              {/* Interests Card */}
              {trip.interests && (
                <div className="bg-white p-6 rounded-20 shadow-400 border border-light-400">
                  <h3 className="text-sm font-semibold text-dark-100 mb-3">{t("interests")}</h3>
                  <div className="flex flex-wrap gap-2">
                    {trip.interests.split(",").map((interest, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-light-500 text-primary-500 text-xs rounded-full font-medium"
                      >
                        {interest.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Create Similar */}
              {userId && (
                <Link
                  href="/admin/create-trip"
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-primary-100 text-primary-100 rounded-xl font-semibold hover:bg-primary-50 transition-colors text-sm"
                >
                  <Sparkles size={18} />
                  {t("createSimilar")}
                </Link>
              )}

              {/* Help Card */}
              <div className="bg-primary-50 p-5 rounded-20 border border-primary-100/20">
                <h3 className="text-sm font-semibold text-dark-100 mb-2">{t("needHelp")}</h3>
                <p className="text-xs text-gray-100 leading-relaxed">
                  {t("helpText")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
