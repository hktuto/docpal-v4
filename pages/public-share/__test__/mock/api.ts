import { vi } from 'vitest'

const bolb = new Blob(['Hello, world!'], { type: 'text/plain' })
export const adminApi = {
  api: {}
}
export const clientApi = {
  api: {
    getNuxeoPublicDocument: vi.fn(() =>
      Promise.resolve({
        data: {
        }
      })
    ),
    getNuxeoPublicSharePreview: vi.fn(() => Promise.resolve(bolb)),
    getNuxeoPublicShareDownload: vi.fn(() => Promise.resolve(bolb)),
  }
}
