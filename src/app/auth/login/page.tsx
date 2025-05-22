"use client";

import Link from "next/link";
import { AuthFormWrapper } from "@/components/auth/AuthFormWrapper";
import { LoginForm } from "@/components/auth/LoginForm";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { Separator } from "@/components/ui/separator";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export default function LoginPage() {
  useAuthRedirect({ redirectTo: "/dashboard", condition: "authenticated" });
  
  return (
    <AuthFormWrapper
      title="Welcome Back!"
      description="Log in to access your dashboard."
      footerContent={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="font-semibold text-primary hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      <LoginForm />
      <div className="my-6 flex items-center">
        <Separator className="flex-grow" />
        <span className="mx-4 text-xs text-muted-foreground">OR</span>
        <Separator className="flex-grow" />
      </div>
      <GoogleSignInButton />
    </AuthFormWrapper>
  );
}
