import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import ErrorBoundary from "./components/global/ErrorBoundary";
import FallbackUI from "./components/global/FallbackUI";
import "./index.css";
import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(
  <ErrorBoundary fallback={<FallbackUI />}>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <StrictMode>
        <App />
      </StrictMode>
    </ClerkProvider>
  </ErrorBoundary>
);
