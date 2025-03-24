import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ChemicalVitePlugin } from "chemicaljs";
export default defineConfig({
  plugins: [react(), ChemicalVitePlugin({
  default: 'uv',
  uv: true,
  scramjet: true,
  rh: true
})],
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
