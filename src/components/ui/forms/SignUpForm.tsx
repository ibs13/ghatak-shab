"use client";
import React, { useState } from "react";
import Button from "../Button";
import Input from "../inputs/Input";
import { Logger } from "@/utils/Logger";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

export default function SignUpForm() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);
  const [email, setEmail] = useState("");

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    setErrorMessage("");
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;
    const confirmPassword = formData.get("confirmPassword") as string | null;

    // Email Regex Patterns
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Password Regex Patterns
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!email || !password || !confirmPassword) {
      setErrorMessage("Please fill out all fields.");
      Logger.warn(errorMessage);
      return;
    }

    // Validate Email Format
    if (!email || !emailRegex.test(email)) {
      setErrorMessage("Invalid email format.");
      Logger.warn(errorMessage);
      return;
    }

    // Validate Password Format
    if (!password || !passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      Logger.warn(errorMessage);
      return;
    }
    // Validate Password Match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      Logger.warn(errorMessage);
      return;
    }

    try {
      const { error } = await signUp(email, password);

      if (error) throw error;

      // Registration successful
      setSuccess(true);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto my-20 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Check your email</h1>
        <p className="mb-4">
          We've sent a confirmation link to {email}. Please verify your email to
          complete registration.
        </p>
        <Button isFullWidth={true} href="/signin">
          Go to Signin
        </Button>
      </div>
    );
  }
  return (
    <>
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-96 bg-white p-8 rounded-lg shadow-md my-20">
          <h2 className="text-2xl font-bold mb-4">Sign Up Now</h2>
          <form onSubmit={handleSignUp}>
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
              <Input
                label="Rewrite password"
                name="confirmPassword"
                type="password"
                id="confirmPassword"
                htmlFor="confirmPassword"
                placeholder="Confirm your password"
              />
            </div>
            <div className="mb-4">
              <Button isFullWidth={true}>Sign up</Button>
            </div>
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
