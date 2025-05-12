// This file is used to handle errors in the app
// and provide a fallback UI when an error occurs.
"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4 text-white">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-9xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          404
        </h1>
        <h2 className="text-3xl mb-6">Lost in Space?</h2>
        <p className="text-xl mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved to another
          galaxy.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:opacity-90 transition-opacity"
          >
            Return Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
// This is a custom 404 page for the Next.js application.
// It uses the `useRouter` hook from Next.js to navigate back or to the home page.
// The page is styled with Tailwind CSS and uses Framer Motion for animations.
// The page displays a 404 error message with a fun and engaging design.
// The `motion.div` component from Framer Motion is used to animate the appearance of the page.
// The `initial`, `animate`, and `transition` props are used to define the animation.
// The `router.back()` method is used to navigate back to the previous page.
// The `router.push("/")` method is used to navigate to the home page.
