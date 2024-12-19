import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ChemicalVitePlugin } from "chemicaljs";
export default defineConfig({
  plugins: [react(), ChemicalVitePlugin()],
  server: {
    proxy: {
      "/cdn": {
        target: "https://gms.parcoil.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cdn/, ""),
      },
    },
  },
});
