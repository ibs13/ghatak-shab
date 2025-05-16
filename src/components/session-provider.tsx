import { createClient } from "@/lib/supabase/server";
import AuthProvider from "@/context/auth";
import { cookies } from "next/headers";

export default async function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient(cookies());
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <AuthProvider session={session}>{children}</AuthProvider>;
}
