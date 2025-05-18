"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import { Logger } from "@/utils/Logger";
import Input from "@/components/ui/inputs/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function ConfirmPage() {
  const searchParams = useSearchParams();
  const { supabase } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState("Verifying your email...");
  const [error, setError] = useState<string | null>(null);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Password Regex Patterns
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (password || !confirmPassword) {
      setMessage("Please fill out all fields.");
      Logger.warn(message);
      return;
    }

    // Validate Password Format
    if (!password || !passwordRegex.test(password)) {
      setMessage(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      Logger.warn(message);
      return;
    }
    // Validate Password Match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      Logger.warn(message);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;

      setMessage("Password updated successfully! Redirecting to dashboard...");
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    }
  };

  return (
    <div className="items-center justify-center">
      <div className="w-96 bg-white p-8 rounded-lg shadow-md my-20 mx-auto border-2 border-solid border-[#824670]">
        <h2 className="text-2xl font-bold mb-4">Reset your password</h2>
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <Input
              label="Password"
              name="password"
              type="password"
              id="password"
              htmlFor="password"
              placeholder="Enter new password"
            />
          </div>

          <div className="mb-4">
            <Input
              label="Confirm password"
              name="confirmPassword"
              type="password"
              id="confirmPassword"
              htmlFor="confirmPassword"
              placeholder="Enter new confirm password"
            />
          </div>

          <div className="mb-4">
            <Button isFullWidth={true}>Update Password</Button>
          </div>

          <Link
            href="/signin"
            className="text-[16px] text-center text-blue-500 mt-6 mb-2 font-semiblod block hover:underline"
          >
            Go to sign in page
          </Link>

          {/* Error Message */}
          {message && (
            <div className="text-[12px] text-center text-red-700 mt-2 font-semibold sm:text-[15px]">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
