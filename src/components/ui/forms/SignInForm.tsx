"use client";
import React, { useState } from "react";
import Button from "../Button";
import Input from "../inputs/Input";
import { Logger } from "@/utils/Logger";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInForm() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;

    // Email Regex Patterns
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !password) {
      setErrorMessage("Please fill out both fields.");
      Logger.warn(errorMessage);
      return;
    }

    // Validate Email Format
    if (!email || !emailRegex.test(email)) {
      setErrorMessage("Invalid email format.");
      Logger.warn(errorMessage);
      return;
    }

    try {
      const { error } = await signIn(email, password);

      if (error) throw error;
      router.push("/dashboard");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-96 bg-white p-8 rounded-lg shadow-md my-20">
          <h2 className="text-2xl font-bold mb-4">Sign In</h2>
          <form onSubmit={handleSignIn}>
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
              <Input
                label="Password"
                name="password"
                type="password"
                id="password"
                htmlFor="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-4">
              <Button isFullWidth={true}>Sign in</Button>
            </div>

            <Link
              href="/forgot-password"
              className="text-[13px] text-blue-500 mb-2 font-semiblod block hover:underline"
            >
              Forget password?
            </Link>

            <p className="text-[13px] text-gray-500 font-semibold">
              Don't have any account?{" "}
              <Link
                href="/signup"
                className="text-blue-500 ml-1 hover:underline"
              >
                Signup
              </Link>{" "}
              now
            </p>

            {/* Error Message */}
            {errorMessage && (
              <div className="text-[12px] text-center text-red-700 mt-2 font-semibold sm:text-[15px]">
                {errorMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
