import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  server: {
    port: 5003,
    proxy: {
      "/api": "https://muro-back.vercel.app",
      "/socket.io": {
        target: "https://muro-back.vercel.app",
        ws: true,
      },
    },
  },
});
