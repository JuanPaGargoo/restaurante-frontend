import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserTypeProvider } from "./context/UserTypeContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserTypeProvider>
      <App />
    </UserTypeProvider>
  </React.StrictMode>
);
