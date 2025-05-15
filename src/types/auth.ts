import { Session, User } from "@supabase/supabase-js";

export type AuthContextType = {
  signUp: (
    email: string,
    password: string
  ) => Promise<{
    user: User | null;
    error: Error | null;
  }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{
    user: User | null;
    error: Error | null;
  }>;
  signOut: () => Promise<void>;
  user: User | null;
  loading: boolean;
};
