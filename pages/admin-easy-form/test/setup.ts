import { vi } from 'vitest';
import { useVxeTable } from '../../../packages/base/composables/useVxeTable';
const useUserId = vi.fn(() => {
  return {
    value: 'unit-test',
  };
});

vi.stubGlobal('MenuRouterKey', 'MenuRouterKey');
vi.stubGlobal('useUserId', useUserId);
vi.stubGlobal('useVxeTable', useVxeTable);
vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => {
      return key;
    },
    locale: { value: 'en' },
    setLocale: vi.fn()
  })
}));
// vi.stubGlobal('useLayout', useLayout)
// vi.stubGlobal('deepCopy', deepCopy)

