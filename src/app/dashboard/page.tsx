
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/config/site";

export default function DashboardPage() {
  useAuthRedirect({ redirectTo: "/auth/login", condition: "unauthenticated" });
  const { user, loading } = useAuth();
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="w-full max-w-lg text-center shadow-xl">
          <CardHeader>
            <Skeleton className="mx-auto h-8 w-48" />
            <Skeleton className="mx-auto mt-2 h-6 w-64" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="mx-auto h-24 w-24 rounded-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="mx-auto h-10 w-32" />
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const getInitials = (name?: string | null) => {
    if (!name) return "AU"; // AuthZen User
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };


  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/30 p-4">
      <Card className="w-full max-w-lg text-center shadow-xl overflow-hidden">
        <CardHeader className="bg-primary/5 p-8">
            <Avatar className="mx-auto h-24 w-24 mb-4 border-4 border-primary/20 shadow-md">
              <AvatarImage src={user.photoURL || undefined} alt={user.displayName || user.email || "User"} />
              <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-semibold">
                {getInitials(user.displayName || user.email)}
              </AvatarFallback>
            </Avatar>
          <CardTitle className="text-3xl font-bold">Welcome to {siteConfig.name}!</CardTitle>
          <CardDescription className="text-lg">
            We&apos;re glad to have you here, {user.displayName || user.email}.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <p className="text-muted-foreground">
            This is your personalized dashboard. Explore and manage your account.
          </p>
          <SignOutButton />
        </CardContent>
      </Card>
       <p className="mt-8 text-center text-sm text-muted-foreground">
        &copy; {currentYear ? currentYear : <Skeleton className="inline-block h-4 w-12" />} {siteConfig.name}. Your secure session.
      </p>
    </div>
  );
}
