
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

// Log individual environment variables to help debug
console.log("Attempting to load Firebase config from .env.local:");
console.log("NEXT_PUBLIC_FIREBASE_API_KEY:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
console.log("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:", process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN);
console.log("NEXT_PUBLIC_FIREBASE_PROJECT_ID:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
console.log("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:", process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
console.log("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:", process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID);
console.log("NEXT_PUBLIC_FIREBASE_APP_ID:", process.env.NEXT_PUBLIC_FIREBASE_APP_ID);

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app: FirebaseApp;
let authInstance: Auth;

// Validate that critical config values are present and not just empty strings
if (
  !firebaseConfig.apiKey ||
  !firebaseConfig.authDomain ||
  !firebaseConfig.projectId
) {
  console.error(
    "Firebase configuration is missing or incomplete. " +
    "Please ensure all NEXT_PUBLIC_FIREBASE_ environment variables are correctly set with non-empty values in your .env.local file, and that you have restarted your development server. " +
    "Refer to .env.local.example for the required variable names. Check the console logs above this message to see the values loaded for each variable."
  );
  console.error("Current firebaseConfig object causing the error:", JSON.stringify(firebaseConfig, null, 2));
  // To prevent further Firebase errors if config is bad, we avoid initializing.
  // We'll create a dummy app object and auth instance to prevent crashes if they are called.
  app = {} as FirebaseApp; 
  authInstance = {} as Auth;
} else {
  // This log will only appear if the basic check above passes.
  // console.log("Firebase API Key successfully loaded by the app:", firebaseConfig.apiKey); // Removed this as individual logs are more direct
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  authInstance = getAuth(app);
}

export { authInstance as auth }; // Exporting the authInstance (real or dummy)
export default app; // Exporting the app (real or dummy)
