import { vi } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

mockNuxtImport('useI18n', () => () => useNuxtApp().$i18n)
// import { useVxeTable } from '../../../packages/base/composables/useVxeTable';
const useUserId = vi.fn(() => {
  return {
    value: 'unit-test'
  }
})
const mockEndPoint = {
  upload: 'http://example.com'
}
const useRBAC = vi.fn(() => {
  return {
    flatRole: {
      value: []
    }
  }
})
const useRuntimeConfig = vi.fn(() => {
  return {
    public: {
      endPoint: mockEndPoint
    }
  }
})

vi.stubGlobal('useIsLDAP', () => false)
vi.stubGlobal('MenuRouterKey', 'MenuRouterKey')
vi.stubGlobal('useUserId', useUserId)
vi.stubGlobal('useRuntimeConfig', useRuntimeConfig)
// vi.stubGlobal('useVxeTable', useVxeTable);
vi.stubGlobal('useRBAC', useRBAC)

export const mockReload = vi.fn()
export const mockQuery = vi.fn()
export const mockCleanSelectedRows = vi.fn()
export const mockTable = {
  value: {
    loadData: vi.fn(),
    initBar: vi.fn()
  }
}
vi.mock('../../../packages/base/composables/useVxeTable', () => ({
  useVxeTable: vi.fn(() => ({
    tableConfig: {},
    tableEvent: {},
    tableRef: mockTable,
    reload: mockReload,
    cleanSelectedRows: mockCleanSelectedRows,
    query: mockQuery
  }))
}))
