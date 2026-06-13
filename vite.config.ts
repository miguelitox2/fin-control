import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// Altere o import para esta nova localização:
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(), // O nome da função continua o mesmo
  ],
});
