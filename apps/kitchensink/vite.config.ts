import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { kamalion } from "@kamalion/web-ui/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), kamalion()],
  server: {
    port: 5173,
  },
});
