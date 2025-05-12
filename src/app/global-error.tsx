"use client"; // Global error must be a client component

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-gray-100 flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-red-500 text-2xl">Oops! Something went wrong.</h2>
          <button
            onClick={reset}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
// This is a global error handler for the entire app. It will catch errors from all components and pages.
// It is a client component because it needs to use the `reset` function to reset the error state.
// The `reset` function is provided by Next.js and allows to reset the error state.
// The `error` object contains information about the error that occurred.
// It can customize the error message and the UI as per requirements.
// It can also log the error to an external service for monitoring and debugging purposes.
// This is a good place to show a fallback UI or a custom error page.
// It can also use to show a global error message or a toast notification.
