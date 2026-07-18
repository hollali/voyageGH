import { redirect } from "next/navigation";
import { Sidebar, MobileSidebar } from "~/components/Sidebar";
import { requireAdmin, getAllUsers } from "~/lib/actions";

export const metadata = {
  title: "All Users | VoyageGH",
  description: "Manage users in your travel agency platform",
};

export default async function AdminUsersPage() {
  let admin;
  try {
    admin = await requireAdmin();
  } catch {
    redirect("/");
  }

  const allUsers = await getAllUsers();

  return (
    <div className="admin-layout">
      <Sidebar />
      <MobileSidebar />

      <main className="children">
        <div className="wrapper py-10">
          <div className="all-users">
            <header className="flex flex-col gap-2">
              <h1 className="text-xl font-semibold text-dark-100">All Users</h1>
              <p className="text-gray-100">{allUsers.length} registered users</p>
            </header>

            <div className="bg-white rounded-20 shadow-400 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-light-400">
                    <th className="text-left p-4 text-sm font-semibold text-dark-200">User</th>
                    <th className="text-left p-4 text-sm font-semibold text-dark-200">Email</th>
                    <th className="text-left p-4 text-sm font-semibold text-dark-200">Role</th>
                    <th className="text-left p-4 text-sm font-semibold text-dark-200">Joined</th>
                    <th className="text-left p-4 text-sm font-semibold text-dark-200">Trips</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-100">
                        No users yet.
                      </td>
                    </tr>
                  ) : (
                    allUsers.map((user) => (
                      <tr key={user.id} className="border-b border-light-400 hover:bg-light-200 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-white text-sm font-bold">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm font-medium text-dark-100">{user.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-100">{user.email}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                            user.status === "admin" ? "bg-primary-100/10 text-primary-100" : "bg-light-500 text-gray-100"
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-gray-100">
                          {new Date(user.joinedAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="p-4 text-sm text-gray-100">{user.itineraryCreated}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
