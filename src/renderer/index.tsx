import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App/App.js";

const container = document.getElementById("root");
if (!container) throw new Error("Не найден корневой элемент #root");

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
