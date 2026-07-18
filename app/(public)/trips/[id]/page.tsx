import Image from "next/image";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { getTripById, getReviewsByTrip, getAverageRating } from "~/lib/actions";
import { notFound } from "next/navigation";
import { BookingButton } from "~/components/BookingButton";
import { ReviewForm } from "~/components/ReviewForm";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const trip = await getTripById(Number(id));
  return {
    title: trip ? `${trip.name} | VoyageGH` : "Trip Not Found | VoyageGH",
    description: trip?.description || "Ghana trip details",
  };
}

export default async function TripDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const trip = await getTripById(Number(id));

  if (!trip) notFound();

  const { userId } = await auth();
  const [tripReviews, avgRating] = await Promise.all([
    getReviewsByTrip(trip.id),
    getAverageRating(trip.id),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="wrapper py-10 flex-1">
        <div className="travel-detail">
          {/* Back Link */}
          <Link href="/trips" className="back-link w-fit">
            <Image src="/assets/icons/arrow-left.svg" alt="back" width={17} height={17} />
            <span>Back to Trips</span>
          </Link>

          {/* Title */}
          <div className="title">
            <article className="flex flex-col gap-4">
              <h3 className="text-xl md:text-3xl text-dark-100 font-semibold">{trip.name}</h3>
              <p className="text-base md:text-2xl text-gray-100 font-normal">
                {trip.country || "Ghana"}
              </p>
            </article>
            <h2 className="text-sm md:text-xl font-normal text-dark-100">{trip.estimatedPrice}</h2>
          </div>

          {/* Rating Summary */}
          {avgRating && avgRating.totalReviews > 0 && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Image
                    key={i}
                    src="/assets/icons/star.svg"
                    alt="star"
                    width={18}
                    height={18}
                    className={i < Math.round(Number(avgRating.avgRating)) ? "opacity-100" : "opacity-30"}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-100">
                {Number(avgRating.avgRating).toFixed(1)} ({avgRating.totalReviews} reviews)
              </span>
            </div>
          )}

          {/* Description */}
          <div className="bg-white p-6 rounded-20 shadow-300">
            <p className="text-dark-400 text-base leading-relaxed">{trip.description}</p>
          </div>

          {/* Image Gallery */}
          {trip.imageUrls && trip.imageUrls.length > 0 && (
            <div className="container">
              <div className="gallery">
                {trip.imageUrls.map((url, index) => (
                  <div key={index} className="relative rounded-xl overflow-hidden">
                    <Image
                      src={url}
                      alt={`${trip.name} ${index + 1}`}
                      width={400}
                      height={250}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trip Info */}
          <div className="visit">
            <div className="flex flex-col gap-4">
              <h3 className="text-base md:text-xl text-dark-400 font-semibold">Trip Details</h3>
              <ul className="flex flex-col gap-3">
                {[
                  ["Duration", `${trip.duration} days`],
                  ["Budget", trip.budget],
                  ["Travel Style", trip.travelStyle],
                  ["Group Type", trip.groupType],
                  ["Interests", trip.interests],
                ].map(([label, value]) =>
                  value ? (
                    <li key={label} className="flex justify-between gap-7 text-sm md:text-lg font-normal text-dark-400 !list-disc">
                      <span className="font-medium">{label}</span>
                      <span>{value}</span>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          </div>

          {/* Itinerary */}
          {trip.itinerary && trip.itinerary.length > 0 && (
            <div className="container">
              <h3 className="text-base md:text-xl text-dark-400 font-semibold">Day-by-Day Itinerary</h3>
              <div className="itinerary">
                {trip.itinerary.map((day) => (
                  <li key={day.day} className="flex flex-col gap-4">
                    <h3 className="text-base md:text-xl font-semibold text-dark-400">
                      Day {day.day} — {day.location}
                    </h3>
                    <ul className="flex flex-col sm:gap-3 gap-7">
                      {day.activities.map((activity, i) => (
                        <li key={i} className="flex max-sm:flex-col flex-row justify-between sm:gap-7 gap-3 text-sm md:text-lg font-normal text-dark-400 !list-disc">
                          <span className="w-[90px] font-medium">{activity.time}</span>
                          <span className="flex-1">{activity.description}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </div>
            </div>
          )}

          {/* Best Time to Visit */}
          {trip.bestTimeToVisit && trip.bestTimeToVisit.length > 0 && (
            <div className="bg-white p-6 rounded-20 shadow-300">
              <h3 className="text-base md:text-xl text-dark-400 font-semibold mb-4">Best Time to Visit</h3>
              <ul className="flex flex-col gap-2">
                {trip.bestTimeToVisit.map((info, i) => (
                  <li key={i} className="text-sm md:text-base text-dark-400 flex items-start gap-2">
                    <span className="text-primary-100 mt-1">•</span>
                    {info}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Weather Info */}
          {trip.weatherInfo && trip.weatherInfo.length > 0 && (
            <div className="bg-white p-6 rounded-20 shadow-300">
              <h3 className="text-base md:text-xl text-dark-400 font-semibold mb-4">Weather Information</h3>
              <ul className="flex flex-col gap-2">
                {trip.weatherInfo.map((info, i) => (
                  <li key={i} className="text-sm md:text-base text-dark-400 flex items-start gap-2">
                    <span className="text-primary-100 mt-1">•</span>
                    {info}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            {[trip.travelStyle, trip.budget, trip.groupType, trip.interests]
              .filter((t): t is string => Boolean(t))
              .flatMap((t) => t!.split(","))
              .slice(0, 6)
              .map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-light-500 text-primary-500 text-sm rounded-full font-medium"
                >
                  {tag.trim()}
                </span>
              ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <BookingButton tripId={trip.id} userId={userId} />
            <Link
              href="/admin/create-trip"
              className="px-8 py-3 border border-primary-100 text-primary-100 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Create Similar Trip
            </Link>
          </div>

          {/* Reviews Section */}
          <div className="flex flex-col gap-6">
            <h3 className="text-base md:text-xl text-dark-400 font-semibold">
              Reviews ({tripReviews.length})
            </h3>

            {userId && <ReviewForm tripId={trip.id} userId={userId} />}

            {tripReviews.length === 0 ? (
              <p className="text-gray-100">No reviews yet. Be the first to review this trip!</p>
            ) : (
              <div className="flex flex-col gap-4">
                {tripReviews.map(({ review, user }) => (
                  <div key={review.id} className="bg-white p-6 rounded-20 shadow-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-100 font-semibold text-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-dark-100">{user.name}</p>
                        <p className="text-xs text-gray-100">
                          {new Date(review.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="ml-auto flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Image
                            key={i}
                            src="/assets/icons/star.svg"
                            alt="star"
                            width={14}
                            height={14}
                            className={i < Math.round(review.rating) ? "opacity-100" : "opacity-30"}
                          />
                        ))}
                      </div>
                    </div>
                    {review.comment && (
                      <p className="text-sm text-dark-400">{review.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
