export default function BookingsLoading() {
  return (
    <div className="admin-layout">
      <div className="hidden lg:block w-[270px] h-screen bg-white border-r border-light-100 animate-pulse" />
      <main className="children">
        <div className="wrapper py-10">
          <div className="flex flex-col gap-10">
            <div className="h-12 w-48 bg-light-200 rounded-lg animate-pulse" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-20 shadow-400 p-4 animate-pulse">
                  <div className="h-4 w-16 bg-light-200 rounded mb-2" />
                  <div className="h-8 w-10 bg-light-200 rounded" />
                </div>
              ))}
            </div>
            <div className="bg-white rounded-20 shadow-400 p-8">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-light-200 rounded-lg animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
