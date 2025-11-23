import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: change this ONLY if your repo name is different
export default defineConfig({
  plugins: [react()],
  base: "/portfolio/", // must match the repo name exactly
});
