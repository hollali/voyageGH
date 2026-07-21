import Link from "next/link";
import { MapPinOff } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="wrapper py-20 flex-1 flex flex-col items-center justify-center text-center gap-6">
        <MapPinOff size={80} className="text-primary-100 opacity-30 animate-bounce-subtle" />
        <h1 className="text-8xl font-bold text-primary-100">404</h1>
        <h2 className="text-2xl font-semibold text-dark-100">Page Not Found</h2>
        <p className="text-gray-100 max-w-md">
          The page you are looking for does not exist or has been moved. Let us get you back on track.
        </p>
        <div className="flex gap-4 mt-4">
          <Link
            href="/"
            className="px-6 py-3 bg-primary-100 text-white rounded-lg font-semibold hover:bg-primary-500 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/en/trips"
            className="px-6 py-3 border border-light-400 text-dark-200 rounded-lg font-semibold hover:bg-light-200 transition-colors"
          >
            Browse Trips
          </Link>
        </div>
      </main>
    </div>
  );
}
