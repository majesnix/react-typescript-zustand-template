import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const renderRoot = () => {
  const root = ReactDOM.createRoot(document.getElementById("root")!);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

if (import.meta.env.PROD) {
  console.log = () => {};
}

if (import.meta.env.DEV) {
  import("./mock/mock.server").then(({ makeServer }) => {
    makeServer();
    renderRoot();
  });
} else {
  renderRoot();
}
