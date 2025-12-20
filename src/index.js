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

const root = ReactDOM.createRoot(document.getElementById("root")); // Cria o root
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
