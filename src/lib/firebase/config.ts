import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
  // To prevent further Firebase errors if config is bad, we might avoid initializing.
  // However, the getAuth() call below will likely fail anyway if config is truly bad.
} else {
  // This log will only appear if the basic check above passes.
  console.log("Firebase API Key successfully loaded by the app:", firebaseConfig.apiKey);
}


// Initialize Firebase
let app: FirebaseApp;
// Check if all critical Firebase config values are actually present before initializing
// This prevents Firebase from throwing its own "invalid-api-key" or similar errors if critical values are missing/empty.
if (firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId) {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
} else {
  // If config is bad, we can't initialize Firebase.
  // We'll create a dummy app object to prevent crashes, but auth will not work.
  // The console.error above should guide the user.
  console.warn("Firebase app could not be initialized due to missing critical configuration. Authentication will not work.");
  app = {} as FirebaseApp; // This is a workaround to prevent crashes if auth is called on uninitialized app
}

// It's safer to only call getAuth if the app was potentially initialized.
// If 'app' is a dummy object, getAuth might still throw an error or behave unexpectedly.
// A more robust solution would be to gate all auth functionality if 'app' isn't a real FirebaseApp.
export const auth = (app && app.name) ? getAuth(app) : {} as import("firebase/auth").Auth; // Provide a typed dummy if no real auth
export default app;
