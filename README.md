To get started, take a look at src/app/page.tsx.

Core Framework: Next.js (specifically using the App Router for routing and Server Components/Client Components).
UI Library: React (the foundation for Next.js and ShadCN components).
Language: TypeScript (for type safety and improved developer experience).
Styling:
Tailwind CSS (for utility-first CSS styling).
ShadCN UI (a collection of beautifully designed, accessible, and customizable UI components built with Radix UI and Tailwind CSS).
Icons: Lucide React (for a wide variety of high-quality icons).
Authentication: Firebase Authentication (we've implemented Email/Password and Google Sign-In).
Firebase SDK: The Firebase JavaScript SDK is used for interacting with Firebase services.
Forms:
React Hook Form (for managing form state and validation).
Zod (for schema declaration and validation, used with React Hook Form).
State Management (for Auth): React Context API (used in AuthContext.tsx to manage and provide authentication state throughout the app).
Toasting/Notifications: The ShadCN Toaster component (which is built upon Radix UI's Toast component) for displaying success/error messages.
Development Environment (implied): Firebase Studio (your current working environment).
Generative AI (Setup): Genkit (with googleAI plugin for Gemini models) is configured in src/ai/genkit.ts, ready for you to implement AI-powered features.
