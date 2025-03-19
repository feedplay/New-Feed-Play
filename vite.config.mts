import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";
import path from "path";

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Export the Vite configuration
export default defineConfig({
  server: {
    host: "::", // Enables IPv6 support
    port: 8080, // Custom port for dev server
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Allows for cleaner imports
    },
  },
  build: {
    target: "esnext", // Ensures compatibility with modern browsers
    commonjsOptions: {
      transformMixedEsModules: true, // Fixes compatibility with some CJS modules
    },
    outDir: "dist", // Defines the output directory
    rollupOptions: {
      external: ["react", "react-dom"], // Prevents bundling core React libraries
    },
    chunkSizeWarningLimit: 500, // Adjust chunk size limit for this warning
  },
  optimizeDeps: {
    esbuildOptions: {
      format: "esm", // Ensures ES module compatibility
    },
  },
});
