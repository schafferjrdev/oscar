import React from "react";
import ReactDOM from "react-dom/client"; // Importa `createRoot`
import "./index.css";
import "antd/dist/antd.min.css";
import "./oscar-theme.css";
import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root")); // Cria o root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
