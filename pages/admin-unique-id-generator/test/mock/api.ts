import { vi } from 'vitest'

export const adminApi = {
  api: {
    deleteIdTemplatesId: vi.fn(() => Promise.resolve(true)),
  }
}
