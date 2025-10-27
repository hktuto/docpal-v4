import { vi } from 'vitest'

export const clientApi = {
  api: {
    getMasterTablesFindAllByUser: vi.fn(() => Promise.resolve(true)),
    getMasterTablesId: vi.fn(() => Promise.resolve(true)),
  }
}
