"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";

export const SignInButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="solid"
      color="primary"
      size="md"
      onClick={() => router.push("/signin")}
    >
      Sign In
    </Button>
  );
};
