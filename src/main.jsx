import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserTypeProvider } from "./context/UserTypeContext";
import { CuentaProvider } from "./context/CuentaContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserTypeProvider>
      <CuentaProvider>
        <App />
      </CuentaProvider>
    </UserTypeProvider>
  </React.StrictMode>
);
