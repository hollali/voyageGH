export default function TripDetailLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="h-16 bg-white border-b border-light-100 wrapper flex items-center justify-between animate-pulse" />
      <div className="wrapper py-10 flex-1">
        <div className="flex flex-col gap-8">
          {/* Hero skeleton */}
          <div className="h-100 bg-light-200 rounded-20 animate-pulse" />
          {/* Content skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="h-8 bg-light-200 rounded w-1/2 animate-pulse" />
              <div className="h-4 bg-light-200 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-light-200 rounded w-2/3 animate-pulse" />
              <div className="flex gap-4 mt-4">
                <div className="h-10 w-24 bg-light-200 rounded-full animate-pulse" />
                <div className="h-10 w-24 bg-light-200 rounded-full animate-pulse" />
                <div className="h-10 w-24 bg-light-200 rounded-full animate-pulse" />
              </div>
              <div className="flex flex-col gap-4 mt-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 bg-light-200 rounded-xl animate-pulse" />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="h-48 bg-light-200 rounded-20 animate-pulse" />
              <div className="h-32 bg-light-200 rounded-20 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
