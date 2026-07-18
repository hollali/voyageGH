import { Sidebar, MobileSidebar } from "~/components/Sidebar";

export const metadata = {
  title: "All Users | VoyageGH",
  description: "Manage users in your travel agency platform",
};

export default function AdminUsersPage() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <MobileSidebar />

      <main className="children">
        <div className="wrapper py-10">
          <div className="all-users">
            <header className="flex flex-col gap-2">
              <h1 className="text-xl font-semibold text-dark-100">All Users</h1>
              <p className="text-gray-100">Manage your platform users</p>
            </header>

            <div className="bg-white rounded-20 shadow-400 p-12 text-center">
              <p className="text-gray-100 text-lg">
                User management will be available once Clerk is configured with real users.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
