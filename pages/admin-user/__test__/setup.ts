import { vi } from 'vitest';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';

mockNuxtImport('useI18n', () => () => useNuxtApp().$i18n);
// import { useVxeTable } from '../../../packages/base/composables/useVxeTable';
const useUserId = vi.fn(() => {
  return {
    value: 'unit-test',
  };
});
const mockEndPoint = {
  upload: 'http://example.com'
};

const useRuntimeConfig = vi.fn(() => {
  return {
    public: {
      endPoint: mockEndPoint,
    },
  };
});

vi.stubGlobal('useIsLDAP', () => false);
vi.stubGlobal('MenuRouterKey', 'MenuRouterKey');
vi.stubGlobal('useUserId', useUserId);
vi.stubGlobal('useRuntimeConfig', useRuntimeConfig);
// vi.stubGlobal('useVxeTable', useVxeTable);

// vi.stubGlobal('useLayout', useLayout)
// vi.stubGlobal('deepCopy', deepCopy)

