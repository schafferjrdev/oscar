import React from "react";
import ReactDOM from "react-dom/client"; // Importa `createRoot`
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "antd/dist/antd.min.css";
import "./oscar-theme.css";
import App from "./components/App";
import "./components/styles/light.scss";
import "./components/styles/dark.scss";
import "./components/styles/mobile.scss";
import { SWRConfig } from "swr";

const swrLocalStorageProvider = () => {
  const map = new Map(JSON.parse(localStorage.getItem("swr-cache") || "[]"));

  window.addEventListener("beforeunload", () => {
    const entries = Array.from(map.entries());
    localStorage.setItem("swr-cache", JSON.stringify(entries));
  });

  return map;
};

const root = ReactDOM.createRoot(document.getElementById("root")); // Cria o root
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SWRConfig
        value={{
          provider: swrLocalStorageProvider,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          // opcional: evita revalidar se tiver cache fresco
          dedupingInterval: 60 * 60 * 1000, // 1h
        }}
      >
        <App />
      </SWRConfig>
    </BrowserRouter>
  </React.StrictMode>
);
