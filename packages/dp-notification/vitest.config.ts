import { defineVitestConfig } from '@nuxt/test-utils/config'
import path from 'path';
export default defineVitestConfig({
  // any custom Vitest config you require
  resolve:{
    alias: {
      "dp-api" : path.resolve(__dirname, "./test/mock/api")
    }
  },
  test:{
    setupFiles: ['./unit.setup.ts'],
    reporters:  ["html", "json"],
    outputFile: {
      html: "../../.vitest-reporter-html/index.html",
      json: "../../.vitest-reporter-html/index.json"
    }
  }
})
