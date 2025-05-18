"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import { Logger } from "@/utils/Logger";

export default function ConfirmPage() {
  const searchParams = useSearchParams();
  const { supabase } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState("Verifying your email...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyEmail = async () => {
      const token_hash = searchParams.get("token_hash");
      Logger.info("Token Hash: ", token_hash);
      const type = searchParams.get("type");
      Logger.info("Type: ", type);

      if (token_hash && type === "signup") {
        try {
          const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
          });

          if (error) throw error;

          setMessage(
            "Email verified successfully! Redirecting to dashboard..."
          );
          setTimeout(() => router.push("/dashboard"), 2000);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Verification failed");
        }
      } else if (token_hash && type === "recovery") {
        try {
          const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
          });

          if (error) throw error;

          setMessage(
            "Email verified successfully! Redirecting to reset password..."
          );
          setTimeout(() => router.push("/reset-password"), 2000);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Verification failed");
        }
      } else {
        setError("Invalid verification link");
      }
    };

    verifyEmail();
  }, [searchParams, supabase, router]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
      {error ? (
        <div>
          <h1 className="text-2xl font-bold mb-4 text-red-600">Error</h1>
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => router.push("/signin")}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Go to Sign In
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">Verification</h1>
          <p>{message}</p>
          {message.includes("successfully") && (
            <div className="mt-4">
              <p>
                Not redirected?{" "}
                <a href="/dashboard" className="text-blue-600">
                  Click here
                </a>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
