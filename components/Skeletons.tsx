export function TripCardSkeleton() {
  return (
    <div className="trip-card animate-pulse">
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
  );
}

export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="bg-white rounded-20 shadow-400 overflow-hidden animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 border-b border-light-400"
        >
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="h-4 bg-light-300 rounded flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-20 shadow-400 flex flex-col gap-4">
          <div className="h-4 bg-light-300 rounded w-24" />
          <div className="h-8 bg-light-300 rounded w-16" />
          <div className="h-3 bg-light-300 rounded w-32" />
        </div>
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="wrapper py-10 flex flex-col gap-10 animate-pulse">
      <div className="flex flex-col gap-2">
        <div className="h-8 bg-light-300 rounded w-48" />
        <div className="h-5 bg-light-300 rounded w-72" />
      </div>
      <StatsSkeleton />
      <div className="h-64 bg-light-300 rounded-20" />
    </div>
  );
}
