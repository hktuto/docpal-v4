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
    alias: [
      { find: /^lodash-es@4.17.21$/, replacement: 'lodash-es@4.17.21/esm/index.js' },
      { find: /^@antv+x6-common@2.0.17/, replacement: '@antv+x6-common@2.0.17/esm/index.js' },
    ],
    setupFiles: ['./__test__/setup.ts', './__test__/mock/element-plus.ts'],
    reporters: ["html", "json"],
    outputFile: {
      html: "../../.vitest-reporter-html/html/admin-dashboard/index.html",
      json: "../../.vitest-reporter-html/json/admin-dashboard.json"
    },
  },
  // compilerOptions: {
  //   isCustomElement: (tag) => {
  //     // 在这里添加你的自定义元素名称
  //     return ['v-form-render'].includes(tag);
  //   }
  // }
});
