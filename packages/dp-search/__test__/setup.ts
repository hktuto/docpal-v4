import { vi } from 'vitest';
console.log('-----setup-----')
// Mock useI18n
const mockI18n = {
  t: (key: string) => key,
  locale: 'en',
  locales: ['en', 'zh'],
  setLocale: vi.fn(),
  getLocaleCookie: vi.fn(),
  setLocaleCookie: vi.fn()
};

vi.stubGlobal('useI18n', () => mockI18n);
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


export const mockReload = vi.fn()
export const mockQuery = vi.fn()
export const mockCleanSelectedRows = vi.fn()
export const mockTable = {
  value: {
    loadData: vi.fn(),
    initBar: vi.fn()
  }
}

const useVxeTable = vi.fn(() => ({
  tableConfig: {},
  tableEvent: {},
  tableRef: mockTable,
  reload: mockReload,
  cleanSelectedRows: mockCleanSelectedRows,
  query: mockQuery
}))
vi.stubGlobal('useVxeTable', useVxeTable);
