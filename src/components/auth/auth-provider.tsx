"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { useSetSession, useSetLoading } from "@/stores/auth-store";

interface AuthStoreProviderProps {
  children: ReactNode;
}

function AuthStoreProvider({ children }: AuthStoreProviderProps) {
  const { data: session, status } = useSession();
  const setSession = useSetSession();
  const setLoading = useSetLoading();

  useEffect(() => {
    // Update loading state
    setLoading(status === "loading");

    // Update session in store when NextAuth session changes
    setSession(session);
  }, [session, status, setSession, setLoading]);

  return <>{children}</>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider>
      <AuthStoreProvider>{children}</AuthStoreProvider>
    </SessionProvider>
  );
}
