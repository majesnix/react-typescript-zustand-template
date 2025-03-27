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

// @ts-expect-error setup for mirage server with cypress
if (import.meta.env.DEV && window.Cypress) {
  import("miragejs").then(({ createServer, Response }) => {
    const otherDomains: string[] = [];
    const methods = ["get", "put", "patch", "post", "delete"];

    createServer({
      environment: "test",
      routes() {
        for (const domain of ["/*", ...otherDomains]) {
          for (const method of methods) {
            //@ts-expect-error mirage complains otherwise
            this[method](`${domain}`, async (schema, request) => {
              const [status, headers, body] =
                //@ts-expect-error mirage complains otherwise
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
