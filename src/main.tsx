import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import lightTheme from "@customThemes/lightTheme.ts";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import store from "@redux/store.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={lightTheme}>
      <Provider store={store}>
        <CssBaseline />
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
