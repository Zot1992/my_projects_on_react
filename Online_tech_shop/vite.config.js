// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,              // <-- чтобы можно было использовать expect, describe, it без импорта
    environment: "jsdom",       // <-- нужно для тестов React
    setupFiles: './vitest.setup.js' // <-- подключаем твой setup-файл
  },
});