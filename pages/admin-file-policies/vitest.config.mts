import { defineVitestConfig } from '@nuxt/test-utils/config';
import path from 'path';
export default defineVitestConfig({
  // any custom Vitest config you require
  resolve: {
    alias: {
      "api": path.resolve(__dirname, "./__test__/mock/api")
    }
  },
  test: {
    setupFiles: ['./__test__/setup.ts', './__test__/mock/element-plus.ts'],
    reporters: ["html", "json"],
    environment: 'happy-dom',
    outputFile: {
      html: "../../.vitest-reporter-html/html/admin-file-policies/index.html",
      json: "../../.vitest-reporter-html/json/admin-file-policies.json"
    },
  },
  // compilerOptions: {
  //   isCustomElement: (tag) => {
  //     // 在这里添加你的自定义元素名称
  //     return ['v-form-render'].includes(tag);
  //   }
  // }
});
