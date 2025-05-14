import SignInForm from "@/components/ui/forms/SignInForm";

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
        <SignInForm />
      </div>
    </div>
  );
};

export default SignIn;
