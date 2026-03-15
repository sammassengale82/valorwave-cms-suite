import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },

  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        iframe: path.resolve(__dirname, "src/visual/iframe-main.tsx")
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === "iframe") {
            return "assets/iframe-bundle.js";
          }
          return "assets/[name].js";
        }
      }
    }
  }
});
