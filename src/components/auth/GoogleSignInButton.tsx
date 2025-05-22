"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { useRouter } from "next/navigation";

export function GoogleSignInButton() {
  const { signInWithGoogle, loading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const user = await signInWithGoogle();
    if (user) {
      toast({
        title: "Signed in successfully!",
        description: `Welcome back, ${user.displayName || user.email}!`,
      });
      router.push("/dashboard");
    } else {
      toast({
        title: "Sign in failed",
        description: "Could not sign in with Google. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={handleGoogleSignIn}
      disabled={loading}
    >
      <GoogleIcon className="mr-2 h-5 w-5" />
      Sign in with Google
    </Button>
  );
}
