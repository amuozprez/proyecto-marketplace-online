import React from "react";
import { createRoot } from "react-dom/client"; // Importa correctamente desde react-dom/client
import App from "./App";
import { GlobalProvider } from "./contexts/GlobalContext";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/custom.css"; // Archivo personalizado

// Crea el root de la aplicación
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>
);
