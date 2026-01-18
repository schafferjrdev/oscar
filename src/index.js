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
  const KEY = "swr-cache";
  const map = new Map(JSON.parse(localStorage.getItem(KEY) || "[]"));

  const persist = () => {
    localStorage.setItem(KEY, JSON.stringify(Array.from(map.entries())));
  };

  // persiste em unload também (ok manter)
  window.addEventListener("beforeunload", persist);

  // ✅ persiste SEMPRE que o cache mudar
  const originalSet = map.set.bind(map);
  map.set = (key, value) => {
    const result = originalSet(key, value);
    persist();
    return result;
  };

  const originalDelete = map.delete.bind(map);
  map.delete = (key) => {
    const result = originalDelete(key);
    persist();
    return result;
  };

  map.clear = () => {
    Map.prototype.clear.call(map);
    persist();
  };

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
