"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/inputs/Input";
import { Logger } from "@/utils/Logger";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    Logger.info("Sending password reset email...", email);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setMessage("Password reset link sent to your email!");
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="items-center justify-center">
      <div className="w-96 bg-white p-8 rounded-lg shadow-md my-20 mx-auto border-2 border-solid border-[#824670]">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <Input
              label="Email"
              name="email"
              type="text"
              id="email"
              htmlFor="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <Button isFullWidth={true}>Send Reset Link</Button>
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
