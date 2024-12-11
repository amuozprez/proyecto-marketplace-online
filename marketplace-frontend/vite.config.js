import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Construye los archivos del frontend en la carpeta public del backend
    outDir: "../marketplace-backend/public",
    emptyOutDir: true, // Limpia la carpeta antes de construir
  },
  server: {
    // Proxy para redirigir las peticiones a la API en desarrollo
    proxy: {
      "/api": {
        target: "http://localhost:4000", // Puerto donde corre el backend
        changeOrigin: true,
      },
    },
  },
});
