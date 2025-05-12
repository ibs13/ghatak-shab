"use client"; // Global error must be a client component

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Something went worng!</h2>
        <p>{error.message}</p>
        <button
          onClick={() => {
            reset();
          }}
        ></button>
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
