import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PendingProvider } from "./context/useLoading.tsx";

createRoot(document.getElementById("root")!).render(
  <PendingProvider>
    <App />
  </PendingProvider>,
);
