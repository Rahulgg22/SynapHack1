import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./style.css";

const container = document.getElementById("root");
if (!container) {
  // eslint-disable-next-line no-console
  console.error("Root element with id 'root' not found in index.html");
  const fallback = document.createElement("div");
  fallback.textContent = "Root element not found";
  document.body.appendChild(fallback);
} else {
  // eslint-disable-next-line no-console
  console.log("Mounting React app...");
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}
