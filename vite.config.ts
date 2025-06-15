import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { visualizer } from "rollup-plugin-visualizer"; // Added import

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    ViteImageOptimizer({}),
    visualizer({ // Added plugin
      open: false, // Don't open in browser automatically
      filename: "dist/stats.html", // Output stats file to dist
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // It might be necessary to add build.rollupOptions here if not present
  build: {
    rollupOptions: {
      // Ensure rollupOptions exists for the visualizer, though Vite might handle this.
    }
  }
}));
