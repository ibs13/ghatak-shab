"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  return <>{session ? children : null}</>;
}
