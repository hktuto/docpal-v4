import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    reporters: ["html", "json"],
    outputFile: {
      html: "./.vitest-reporter-html/index.html",
      json: "./.vitest-reporter-html/index.json"
    }
  },
  server: {
    watch: null,
  }
});
