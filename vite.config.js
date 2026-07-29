import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  server: {
    port: 5003,
    proxy: {
      "/api": "http://localhost:5500",
      "/socket.io": {
        target: "http://localhost:5500",
        ws: true,
      },
    },
  },
});
