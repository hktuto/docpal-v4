import { vi } from 'vitest'

export const clientApi = {
  api: {
    deleteNuxeoShare: vi.fn(() => Promise.resolve(true)),
  }
}
