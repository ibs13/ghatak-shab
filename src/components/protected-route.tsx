"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await createClient().auth.getUser();

      if (!user) {
        router.push("/signin");
      } else if (!user.email_confirmed_at) {
        router.push("/confirm");
      }
    };

    checkAuth();
  }, [session, router]);

  return <>{session ? children : null}</>;
}
