import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

history.scrollRestoration = 'manual';
if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname + window.location.search);
}
document.documentElement.style.scrollBehavior = 'auto';
window.scrollTo(0, 0);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
