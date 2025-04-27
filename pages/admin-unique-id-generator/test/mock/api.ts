import { vi } from 'vitest'

export const adminApi = {
  api: {
    deleteIdTemplatesId: vi.fn(() => Promise.resolve(true)),
    postIdTemplatesPage: vi.fn(() => Promise.resolve(true)),
    getIdTemplatesId: vi.fn(() => Promise.resolve(true)),
  }
}
