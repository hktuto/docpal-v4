import { vi } from 'vitest'

export const clientApi = {
  api: {
    deleteNuxeoDocumentPurge: vi.fn(() => Promise.resolve(true)),
    postNuxeoDocumentRestore: vi.fn(() => Promise.resolve(true)),
    deleteNuxeoDocument: vi.fn(() => Promise.resolve(true))
  }
}
