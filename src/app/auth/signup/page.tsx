"use client";

import Link from "next/link";
import { AuthFormWrapper } from "@/components/auth/AuthFormWrapper";
import { SignupForm } from "@/components/auth/SignupForm";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { Separator } from "@/components/ui/separator";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";


export default function SignupPage() {
  useAuthRedirect({ redirectTo: "/dashboard", condition: "authenticated" });

  return (
    <AuthFormWrapper
      title="Create an Account"
      description="Join AuthZen today to get started."
      footerContent={
        <>
          Already have an account?{" "}
          <Link href="/auth/login" className="font-semibold text-primary hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <SignupForm />
      <div className="my-6 flex items-center">
        <Separator className="flex-grow" />
        <span className="mx-4 text-xs text-muted-foreground">OR</span>
        <Separator className="flex-grow" />
      </div>
      <GoogleSignInButton />
    </AuthFormWrapper>
  );
}
