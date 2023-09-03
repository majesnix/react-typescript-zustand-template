/// <reference types="vitest" />
/// <reference types="vite/client" />
// 👆 do not forget to add the references above
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
  test: {
    environment: "jsdom",
    globals: true,
    transformMode: { web: [/\.[jt]sx?$/] },
    exclude: ["node_modules", "**/tests/*"],
    setupFiles: "./src/setupTests.ts",
  },
});
