"use client";
import React, { useState } from "react";
import Button from "../Button";
import Input from "../inputs/Input";
import { Logger } from "@/utils/Logger";

export default function SignUpForm() {
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    setErrorMessage("");
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;
    const repeatPassword = formData.get("repeatPassword") as string | null;

    // Email Regex Patterns
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Password Regex Patterns
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!email || !password || !repeatPassword) {
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
    if (password !== repeatPassword) {
      setErrorMessage("Passwords do not match.");
      Logger.warn(errorMessage);
      return;
    }

    // Add your sign-in logic here

    // try {
    //   await login(email, password);
    //   Logger.info("Login Succcessfully");
    //   navigate("/"); // Redirect after successful login
    // } catch (error) {
    //   setErrorMessage("Invalid credentials. Please try again.");
    //   Logger.error("Login failed for:", email, error);
    // }
  };
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
                label="Repeat password"
                name="repeatPassword"
                type="password"
                id="repeatPassword"
                htmlFor="repeatPassword"
                placeholder="Repeat your password"
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
