"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  const { logout, loading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleSignOut = async () => {
    await logout();
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
    router.push("/auth/login");
  };

  return (
    <Button onClick={handleSignOut} disabled={loading} variant="outline">
      <LogOut className="mr-2 h-4 w-4" />
      {loading ? "Signing out..." : "Sign Out"}
    </Button>
  );
}
