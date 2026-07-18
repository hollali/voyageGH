import { redirect } from "next/navigation";
import { Sidebar, MobileSidebar } from "~/components/Sidebar";
import { StatsCard } from "~/components/StatsCard";
import { UserGrowthChart } from "~/components/charts/UserGrowthChart";
import { TripDistributionChart } from "~/components/charts/TripDistributionChart";
import { getDashboardStats, getRecentTrips, requireAdmin, getMonthlyGrowthData, getTripDistributionByGroupType } from "~/lib/actions";

export const metadata = {
  title: "Admin Dashboard | VoyageGH",
  description: "Manage your travel agency platform",
};

export default async function AdminDashboardPage() {
  try {
    await requireAdmin();
  } catch {
    redirect("/");
  }

  const [stats, recentTrips, growthData, distributionData] = await Promise.all([
    getDashboardStats(),
    getRecentTrips(5),
    getMonthlyGrowthData(),
    getTripDistributionByGroupType(),
  ]);

  return (
    <div className="admin-layout">
      <Sidebar />
      <MobileSidebar />

      <main className="children">
        <div className="wrapper py-10">
          <div className="dashboard">
            <header className="flex flex-col gap-2">
              <h1 className="text-xl font-semibold text-dark-100">Dashboard</h1>
              <p className="text-gray-100">Welcome to your VoyageGH admin dashboard</p>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                headerTitle="Total Users"
                total={stats.totalUsers}
                lastMonthCount={stats.usersLastMonth}
                currentMonthCount={stats.usersThisMonth}
              />
              <StatsCard
                headerTitle="Total Trips"
                total={stats.totalTrips}
                lastMonthCount={stats.tripsLastMonth}
                currentMonthCount={stats.tripsThisMonth}
              />
              <StatsCard
                headerTitle="Active Bookings"
                total={stats.totalBookings}
                lastMonthCount={stats.bookingsLastMonth}
                currentMonthCount={stats.bookingsThisMonth}
              />
              <StatsCard
                headerTitle="This Month"
                total={stats.usersThisMonth + stats.tripsThisMonth + stats.bookingsThisMonth}
                lastMonthCount={stats.usersLastMonth + stats.tripsLastMonth + stats.bookingsLastMonth}
                currentMonthCount={stats.usersThisMonth + stats.tripsThisMonth + stats.bookingsThisMonth}
              />
            </div>

            {/* Charts */}
            <div className="container">
              <h1 className="text-xl font-semibold text-dark-100">Analytics</h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-20 shadow-400">
                  <h2 className="p-18-semibold text-dark-100 mb-4">User Growth</h2>
                  <UserGrowthChart data={growthData} />
                </div>
                <div className="bg-white p-6 rounded-20 shadow-400">
                  <h2 className="p-18-semibold text-dark-100 mb-4">Trip Distribution</h2>
                  <TripDistributionChart data={distributionData} />
                </div>
              </div>
            </div>

            {/* Recent Trips Table */}
            <div className="container">
              <h1 className="text-xl font-semibold text-dark-100">Recent Trips</h1>
              <div className="bg-white rounded-20 shadow-400 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-light-400">
                      <th className="text-left p-4 text-sm font-semibold text-dark-200">Name</th>
                      <th className="text-left p-4 text-sm font-semibold text-dark-200">Destination</th>
                      <th className="text-left p-4 text-sm font-semibold text-dark-200">Style</th>
                      <th className="text-left p-4 text-sm font-semibold text-dark-200">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTrips.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-gray-100">
                          No trips yet. Create one using AI Trip Generator.
                        </td>
                      </tr>
                    ) : (
                      recentTrips.map((trip) => (
                        <tr key={trip.id} className="border-b border-light-400 hover:bg-light-200 transition-colors">
                          <td className="p-4 text-sm text-dark-100 font-medium">{trip.name}</td>
                          <td className="p-4 text-sm text-gray-100">{trip.country}</td>
                          <td className="p-4 text-sm text-gray-100">{trip.travelStyle}</td>
                          <td className="p-4 text-sm text-gray-100">{trip.estimatedPrice}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
