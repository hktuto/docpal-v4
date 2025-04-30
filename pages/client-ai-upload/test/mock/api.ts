import { vi } from 'vitest'

export const clientApi = {
  api: {
    postNuxeoDocumentQueryuploadfiledtopage: vi.fn(() => Promise.resolve(true)),
  },
  instance: {
    post: vi.fn()
  }
}
