import Input from "@/components/ui/inputs/Input";
import React from "react";

const SignIn = () => {
  return (
    <div className="h-screen bg-[#824670]">
      <div className="flex flex-row">
        <div className="w-1/2 bg-[#824670] flex items-center justify-center">
          <div className="text-white font-semibold text-center pt-10 px-20">
            <h2 className="text-5xl">Welcome to ঘটকসাব</h2>
            <p className="mt-4 text-4xl">
              Start your journey with us to find your purpose of life.
            </p>
          </div>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <div className="w-96 bg-white p-8 rounded-lg shadow-md my-20">
            <h2 className="text-2xl font-bold mb-4">Sign In</h2>
            <form>
              <div className="mb-4">
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  id="email"
                  htmlFor="email"
                />
              </div>
              <div className="mb-4">
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  id="password"
                  htmlFor="password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#824670] text-white py-2 rounded-md"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
