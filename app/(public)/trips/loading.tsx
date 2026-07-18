export default function Loading() {
  return (
    <div className="wrapper py-10 flex flex-col gap-10 animate-pulse">
      <div className="flex flex-col gap-2">
        <div className="h-8 bg-light-300 rounded w-48" />
        <div className="h-5 bg-light-300 rounded w-72" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="trip-card animate-pulse">
            <div className="w-full h-[160px] bg-light-300 rounded-t-xl" />
            <div className="p-4 flex flex-col gap-3">
              <div className="h-5 bg-light-300 rounded w-3/4" />
              <div className="h-4 bg-light-300 rounded w-1/2" />
              <div className="flex gap-2">
                <div className="h-6 bg-light-300 rounded-full w-16" />
                <div className="h-6 bg-light-300 rounded-full w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
