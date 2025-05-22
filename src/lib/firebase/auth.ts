// Type definitions for authentication credentials

export interface SignUpWithEmailCredentials {
  email: string;
  password: string;
}

export interface SignInWithEmailCredentials {
  email: string;
  password: string;
}

// Firebase auth functions (createUserWithEmailAndPassword, signInWithEmailAndPassword, etc.)
// are now directly implemented in AuthContext.tsx for simplicity in this scaffold.
// This file primarily serves for type definitions if needed elsewhere or if auth logic grows.
