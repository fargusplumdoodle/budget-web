import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const chunks = [
  { query: "@mui/material", name: "mui_material" },
  { query: "@mui/", name: "mui" },
  { query: "@emotion", name: "1" },
  { query: "react/", name: "react" },
  { query: "luxon", name: "1" },
  { query: "redux", name: "1" },
  { query: "react-hook-form", name: "1" },
  { query: "notistack", name: "1" },
  { query: "lodash", name: "lodash" },
  { query: "axios", name: "1" },
  { query: "react-router-dom", name: "react-router-dom" },
  { query: "faker", name: "faker" },
  { query: "storybook", name: "storybook" },
  { query: "react", name: "other_react" },
  { query: "hookform", name: "1" },
  { query: "react-scripts", name: "react-scripts" },
  { query: "yup", name: "1" },
  { query: "popper", name: "popper" },
  { query: "date-fns", name: "date-fns" },
];

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes("node_modules")) return "budget";

          const chunk = chunks.find(({ query }) => id.includes(query));

          if (chunk) {
            return `vendor_${chunk.name}`;
          }
          return "vendor";
        },
      },
    },
  },
  server: {
    proxy: {
      "/o": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});
