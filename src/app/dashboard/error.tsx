"use client";

export default function DashboardError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6 text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Something went wrong!
            </h1>
            <p className="text-gray-600 mb-6">
              {error.message || "An unexpected error occurred"}
            </p>
            <button
              type="button"
              onClick={reset}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
