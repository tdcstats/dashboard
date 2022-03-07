import React from "react";
import "@/styles/globals.css";
import { ThemeProvider } from "@/hooks/theme.js";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
