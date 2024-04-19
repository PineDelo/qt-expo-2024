import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import svgr from "vite-plugin-svgr";

const api = "http://192.168.0.10:10403";

export default defineConfig({
  // base: '/qt/',
  plugins: [react(), nodePolyfills(), svgr()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    proxy: {
      "/api": {
        target: `${api}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    open: true,
    // port: 3201,
    host: "0.0.0.0",
  },
});
