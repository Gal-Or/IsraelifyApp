import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["translate"],
  },
  build: {
    outDir: "/Users/barmoshe/Downloads/Israelify-backend/public",
    emptyOutDir: true,
  },
});
