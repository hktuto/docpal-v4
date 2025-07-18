import { vi } from 'vitest'

export const clientApi = {
  api: {
    deleteNuxeoShare: vi.fn(() => Promise.resolve(true)),
    patchNuxeoShare: vi.fn(() => Promise.resolve(true)),
    postNuxeoSharePage: vi.fn(() => Promise.resolve(true)),
    postInternalshareOthers: vi.fn(() => Promise.resolve(true)),
    postInternalshareMe: vi.fn(() => Promise.resolve(true)),
  }
}
