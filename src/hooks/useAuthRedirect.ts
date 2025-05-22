"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface UseAuthRedirectOptions {
  redirectTo: string;
  condition: "authenticated" | "unauthenticated";
}

export function useAuthRedirect({ redirectTo, condition }: UseAuthRedirectOptions) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    const isAuthenticated = !!user;

    if (condition === "authenticated" && isAuthenticated && (pathname.startsWith("/auth"))) {
      router.replace(redirectTo);
    } else if (condition === "unauthenticated" && !isAuthenticated && !pathname.startsWith("/auth")) {
      router.replace(redirectTo);
    }
  }, [user, loading, router, redirectTo, condition, pathname]);
}
