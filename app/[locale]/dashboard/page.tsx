import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Search, Compass, BookOpen } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "~/lib/i18n/routing";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { getBookingsByUser } from "~/lib/actions";
import { PaymentAlert } from "~/components/PaymentAlert";
import { UserBookingsTable } from "~/components/UserBookingsTable";

export const metadata = {
  title: "My Dashboard | VoyageGH",
  description: "View your trips and bookings",
};

export default async function UserDashboardPage(props: { searchParams?: Promise<{ payment?: string }> }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const searchParams = await props.searchParams;
  const paymentStatus = searchParams?.payment || null;

  const userBookings = await getBookingsByUser(userId);

  const t = await getTranslations("dashboard");

  const dashCards = [
    {
      href: "/trips",
      title: t("browseTrips"),
      description: t("browseDesc"),
      icon: <Compass size={20} className="text-primary-100" />,
    },
    {
      href: "/trips",
      title: t("findTrip"),
      description: t("findDesc"),
      icon: <Search size={20} className="text-primary-100" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="wrapper py-10 flex-1">
        <div className="flex flex-col gap-10">
          <header className="flex flex-col gap-2">
            <h1 className="p-30-bold text-dark-100">{t("title")}</h1>
            <p className="text-gray-100 text-lg">{t("subtitle")}</p>
          </header>

          {paymentStatus && <PaymentAlert status={paymentStatus} />}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dashCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="bg-white p-6 rounded-20 shadow-400 hover:shadow-500 transition-shadow flex flex-col gap-3"
              >
                {card.icon}
                <h3 className="p-18-semibold text-dark-100">{card.title}</h3>
                <p className="text-sm text-gray-100">{card.description}</p>
              </Link>
            ))}
            <div className="bg-white p-6 rounded-20 shadow-400 flex flex-col gap-3">
              <BookOpen size={20} className="text-primary-100" />
              <h3 className="p-18-semibold text-dark-100">{t("myBookings")}</h3>
              <p className="text-sm text-gray-100">{userBookings.length} {t("totalBookings")}</p>
            </div>
          </div>

          <UserBookingsTable bookings={userBookings} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
