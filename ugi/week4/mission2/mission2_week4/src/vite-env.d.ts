/// <reference types="vite/client" />
import { defineConfig } from "vite";
import React from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
export default defineConfig({
    plugins: [React(), tailwindcss()],
});