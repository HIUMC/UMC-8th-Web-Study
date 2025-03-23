import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
// context API를 활용하기 위해서, 전역 상태를 공유하고 싶어하는 위치에 CounterProvider.tsx에서 만든 CounterProvider를 씌워주어야 함.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
