import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="p-72-bold text-dark-100 mb-4">404</h1>
      <p className="text-xl text-gray-100 mb-8 text-center">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="px-8 py-3 bg-primary-100 text-white rounded-lg font-semibold hover:bg-primary-500 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
