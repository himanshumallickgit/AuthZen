import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Log the API key being used to help with debugging
console.log("Firebase API Key being used by the app:", firebaseConfig.apiKey);

// Validate that all config values are present
if (
  !firebaseConfig.apiKey || firebaseConfig.apiKey === "YOUR_API_KEY" ||
  !firebaseConfig.authDomain || firebaseConfig.authDomain === "YOUR_AUTH_DOMAIN" ||
  !firebaseConfig.projectId || firebaseConfig.projectId === "YOUR_PROJECT_ID"
  // Add checks for other essential fields if necessary, but these are critical.
  // storageBucket, messagingSenderId, and appId might be optional for basic auth.
) {
  console.error(
    "Firebase configuration is missing or incomplete. " +
    "Please ensure all NEXT_PUBLIC_FIREBASE_ environment variables are set in your .env.local file. " +
    "Refer to .env.local.example for the required variables."
  );
}


// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const auth = getAuth(app);
export default app;
