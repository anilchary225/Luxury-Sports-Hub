import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Prevent Chrome extension communication errors from interrupting the app
if (typeof window !== "undefined") {
  window.addEventListener("error", (event) => {
    if (
      event.filename?.includes("chrome-extension://") ||
      event.message?.includes("chrome: call method")
    ) {
      event.stopImmediatePropagation();
    }
  });

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason?.message || String(event.reason || "");
    if (
      reason.includes("chrome: call method") ||
      reason.includes("chrome-extension://")
    ) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  });
}

createRoot(document.getElementById("root")!).render(<App />);