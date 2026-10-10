// libraries
import React from "react";
import { createRoot } from "react-dom/client";
// components
import App from "@renderer/components/App/App";
// utils
import "./i18n";

const container = document.getElementById("root");
if (!container) throw new Error("Не найден корневой элемент #root");

if (typeof window.global === "undefined") {
  window.global = window;
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
