import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // even if empty, keeps structure clean
import './i18n'; // <-- important!

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
