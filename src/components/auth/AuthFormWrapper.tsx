
"use client";

import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { siteConfig } from '@/config/site';
import { Sparkles } from 'lucide-react'; // Using Sparkles as a generic app icon

interface AuthFormWrapperProps {
  title: string;
  description?: string;
  children: ReactNode;
  footerContent?: ReactNode;
}

export function AuthFormWrapper({ title, description, children, footerContent }: AuthFormWrapperProps) {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        {footerContent && (
          <div className="p-6 pt-0 text-center text-sm text-muted-foreground">
            {footerContent}
          </div>
        )}
      </Card>
       <p className="mt-8 text-center text-sm text-muted-foreground">
        &copy; {currentYear || new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </p>
    </div>
  );
}
