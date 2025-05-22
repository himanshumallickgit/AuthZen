
"use client";

import type { User as FirebaseUser } from "firebase/auth";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth } from "@/lib/firebase/config";
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import type { 
  SignUpWithEmailCredentials, 
  SignInWithEmailCredentials 
} from "@/lib/firebase/auth"; 

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  signUpWithEmail: (credentials: SignUpWithEmailCredentials) => Promise<FirebaseUser | null>;
  signInWithEmail: (credentials: SignInWithEmailCredentials) => Promise<FirebaseUser | null>;
  signInWithGoogle: () => Promise<FirebaseUser | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signUpWithEmail = async ({ email, password }: SignUpWithEmailCredentials) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      return userCredential.user;
    } catch (error: any) {
      console.error("Error signing up with email:", error);
      if (error.code && error.message) {
        console.error("Firebase signup error code:", error.code);
        console.error("Firebase signup error message:", error.message);
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async ({ email, password }: SignInWithEmailCredentials) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      return userCredential.user;
    } catch (error: any) {
      console.error("Error signing in with email:", error);
      if (error.code && error.message) {
        console.error("Firebase email sign-in error code:", error.code);
        console.error("Firebase email sign-in error message:", error.message);
      }
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const signInWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      return result.user;
    } catch (error: any) {
      console.error("Error signing in with Google:", error);
      if (error.code && error.message) {
        console.error("Firebase Google sign-in error code:", error.code);
        console.error("Firebase Google sign-in error message:", error.message);
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUpWithEmail, signInWithEmail, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

