import { Server } from "miragejs";
import { makeServer } from "../../src/mock/mock.server";

describe("init spec", () => {
  let server: Server;

  beforeEach(() => {
    server = makeServer("test");
  });

  it("should load init text", () => {
    server.create("example", { id: "1", header: "init" });
    cy.visit("/");

    cy.findByText("init").should("exist");
  });
});
