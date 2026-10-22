import "./analytics";
import "./analytics-consent.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Browse } from "./components/Browse.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Browse />
  </StrictMode>,
);
