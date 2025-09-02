import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// ✅ Import i18n configuration
import "./i18n"; // <-- make sure this points to your i18n.js or i18n.ts
import React from "react";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
