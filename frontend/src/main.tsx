import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ErrorBoundary } from "@/components/error-boundary";
import "./index.css";

createRoot(document.getElementById("root")!).render(
   <ErrorBoundary>
      <StrictMode>
         <App />
      </StrictMode>
   </ErrorBoundary>,
);
