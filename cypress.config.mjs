import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
  },
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: false,
});
