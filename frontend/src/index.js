import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext";
import { PageContextProvider } from "./context/PageContext";
import { BrowserRouter } from "react-router-dom";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <PageContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </PageContextProvider>
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>
);
