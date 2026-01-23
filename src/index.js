import React from "react";
import { SWRConfig } from "swr";
import ReactDOM from "react-dom/client"; // Importa `createRoot`
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "antd/dist/antd.min.css";
import "./oscar-theme.css";
import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root")); // Cria o root

const swrLocalStorageProvider = () => {
  const map = new Map(JSON.parse(localStorage.getItem("swr-cache") || "[]"));

  // salva só ao sair (cache fraco, sem ficar escrevendo o tempo todo)
  window.addEventListener("beforeunload", () => {
    const entries = Array.from(map.entries());
    localStorage.setItem("swr-cache", JSON.stringify(entries));
  });

  return map;
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <SWRConfig
        value={{
          provider: swrLocalStorageProvider,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          // "cache fraco": mantém por um tempo e não fica insistindo
          dedupingInterval: 1000 * 60 * 60 * 12, // 12h
          focusThrottleInterval: 1000 * 60 * 5, // 5min
          shouldRetryOnError: false,
        }}
      >
        <App />
      </SWRConfig>
    </BrowserRouter>
  </React.StrictMode>
);
