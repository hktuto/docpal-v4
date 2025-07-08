import { vi } from 'vitest'

export const clientApi = {
  api: {
    getNuxeoCollection: vi.fn(() => Promise.resolve(true)),
    deleteNuxeoDocument: vi.fn(() => Promise.resolve(true)),
    postNuxeoCollectionAlldocuments: vi.fn(() => Promise.resolve(true)),
    deleteNuxeoCollectionDeleteCollectionCollectionid: vi.fn(() => Promise.resolve(true)),
  }
}
