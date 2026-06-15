import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

history.scrollRestoration = 'manual';
document.documentElement.style.scrollBehavior = 'auto';
if (!window.location.hash) {
  window.scrollTo(0, 0);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
