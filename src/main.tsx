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

//@ts-ignore
if (import.meta.env.DEV && window.Cypress) {
  import("miragejs").then(({ createServer, Response }) => {
    let otherDomains: string[] = [];
    let methods = ["get", "put", "patch", "post", "delete"];

    createServer({
      environment: "test",
      routes() {
        for (const domain of ["/*", ...otherDomains]) {
          for (const method of methods) {
            //@ts-ignore
            this[method](`${domain}`, async (schema, request) => {
              let [status, headers, body] =
                //@ts-ignore
                await window.handleFromCypress(request);

              return new Response(status, headers, body);
            });
          }
        }
      },
    });

    renderRoot();
  });
} else if (import.meta.env.DEV) {
  import("./mock/mock.server").then(({ makeServer }) => {
    makeServer();
    renderRoot();
  });
} else {
  renderRoot();
}
