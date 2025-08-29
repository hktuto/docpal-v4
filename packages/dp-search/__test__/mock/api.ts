import { vi } from 'vitest'
export const adminApi = {
  api: {
  }
}
export const clientApi = {
  api: {
    postNuxeoSearchSaveNestedSearchLog: vi.fn(),
    postLogsRecentSearchPageV2: vi.fn(),
    getNuxeoSearchQueryNestedSearchLog: vi.fn(),
    getNuxeoSfolder: vi.fn(),
    deleteNuxeoSearchDeleteNestedSearchLogId: vi.fn()
  }
}
export const globalApi = {
  api: {
    postNuxeoSearchOpenSearch: vi.fn(),
    postNuxeoSearchSaveNestedSearchLog: vi.fn(),
    postLogsRecentSearchPageV2: vi.fn(),
    getNuxeoSearchQueryNestedSearchLog: vi.fn(),
    getNuxeoSfolder: vi.fn(),
    deleteNuxeoSearchDeleteNestedSearchLogId: vi.fn()
  }
}
