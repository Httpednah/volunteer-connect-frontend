/**
 * Entry point of the React application.
 * Here we render the App component into the HTML 'root' element
 * and wrap it with necessary Global Providers (like ThemeProvider).
 */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css"; // Load our Tailwind and custom CSS
import { ThemeProvider } from "@/components/theme-provider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     {/* ThemeProvider makes Dark/Light mode available everywhere */}
     <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <App />
     </ThemeProvider>
  </React.StrictMode>
);
