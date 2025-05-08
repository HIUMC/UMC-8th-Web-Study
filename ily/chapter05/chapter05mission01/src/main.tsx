import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PendingProvider } from "./context/useLoading.tsx";
import { LoginProvider } from "./context/useLogin.tsx";

createRoot(document.getElementById("root")!).render(
  <LoginProvider>
    <PendingProvider>
      <App />
    </PendingProvider>
  </LoginProvider>,
);
