"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import type { Session } from "@supabase/supabase-js";

type AuthContextType = {
  supabase: SupabaseClient;
  session: Session | null;
  user: User | null;
  signUp: (
    email: string,
    password: string
  ) => Promise<{
    error: Error | null;
  }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{
    error: Error | null;
  }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const [supabase] = useState(() => createClient());
  const [currentSession, setCurrentSession] = useState<Session | null>(session);
  const [user, setUser] = useState<User | null>(session?.user ?? null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setCurrentSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const value: AuthContextType = {
    supabase,
    session: currentSession,
    user,
    signUp: async (email: string, password: string) => {
      try {
        const { error } = await supabase.auth.signUp({ email, password });
        return { error: error ? new Error(error.message) : null };
      } catch (error) {
        return {
          error: error instanceof Error ? error : new Error("Signup failed"),
        };
      }
    },
    signIn: async (email: string, password: string) => {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        return { error: error ? new Error(error.message) : null };
      } catch (error) {
        return {
          error: error instanceof Error ? error : new Error("Login failed"),
        };
      }
    },
    signOut: async () => {
      await supabase.auth.signOut();
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
