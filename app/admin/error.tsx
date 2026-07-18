"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-light-200">
      <div className="bg-white rounded-20 shadow-400 p-12 text-center max-w-md">
        <h2 className="text-xl font-semibold text-dark-100 mb-2">Something went wrong</h2>
        <p className="text-gray-100 mb-6">{error.message || "An unexpected error occurred"}</p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-primary-100 text-white rounded-lg font-semibold hover:bg-primary-500 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
