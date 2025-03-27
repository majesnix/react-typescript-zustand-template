import { test, expect } from "@playwright/test";

import { Server } from "miragejs";
import { makeServer } from "../src/mock/mock.server"

test.describe("init spec", () => {
  let server: Server;

  test.beforeEach(async () => {
    server = makeServer("test");
  });

  test("should load init text", async ({ page }) => {
    server.create("example", { id: "1", header: "init" });
    await page.goto("http://localhost:5173/");
    await expect(page.getByText("init")).toBeVisible();
  });
});
