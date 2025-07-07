import { defineVitestConfig } from '@nuxt/test-utils/config';
import path from 'path';
export default defineVitestConfig({
  // any custom Vitest config you require
  resolve: {
    alias: {
      "api": path.resolve(__dirname, "./test/mock/api")
    }
  },
  test: {
    setupFiles: ['./test/setup.ts', './test/mock/element-plus.ts'],
    reporters: ["html", "json"],
    outputFile: {
      html: "../../.vitest-reporter-html/html/client-trash/index.html",
      json: "../../.vitest-reporter-html/json/client-trash/index.json"
    },
  },
  // compilerOptions: {
  //   isCustomElement: (tag) => {
  //     // 在这里添加你的自定义元素名称
  //     return ['v-form-render'].includes(tag);
  //   }
  // }
});
