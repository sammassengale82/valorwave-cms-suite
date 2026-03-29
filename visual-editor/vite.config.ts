import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  // ⭐ REQUIRED so Vite serves BOTH index.html AND preview.html in dev mode
  appType: "mpa",

  plugins: [
    react({
      // ⭐ Only apply React Fast Refresh to the EDITOR app
      include: [
        "src/app/**",
        "src/editor/**",
        "src/components/**",
        "src/canvas/**",
        "src/themes/**"
      ],
      // ⭐ EXCLUDE the preview iframe runtime
      exclude: [
        "src/visual/**"
      ]
    })
  ],

  server: {
    fs: {
      allow: [
        // Allow Vite to serve your public folder
        resolve(__dirname, "public"),

        // Allow Vite to serve the project root
        resolve(__dirname),

        // Allow Vite to serve the iframe runtime
        resolve(__dirname, "src/visual")
      ]
    },

    // ⭐ Prevent Vite HMR overlay from injecting into the iframe
    hmr: {
      overlay: false
    }
  },

  optimizeDeps: {
    // ⭐ Prevent Vite from pre-bundling the preview runtime
    // This keeps the iframe isolated from the editor app
    exclude: [
      "src/visual/iframe-entry.ts",
      "src/visual/iframe-main.ts",
      "src/visual/iframe-renderer.tsx"
    ]
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,

    rollupOptions: {
      input: {
        // ⭐ Main editor app
        main: resolve(__dirname, "index.html"),

        // ⭐ Preview iframe app — MUST point to public/preview.html
        preview: resolve(__dirname, "public/preview.html")
      },

      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]"
      }
    }
  }
});
