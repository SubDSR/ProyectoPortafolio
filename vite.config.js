import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // El avatar 3D carga librerias pesadas en un chunk lazy separado.
    chunkSizeWarningLimit: 1200,
  },
});
