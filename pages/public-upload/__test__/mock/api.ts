import { vi } from 'vitest'

const bolb = new Blob(['Hello, world!'], { type: 'text/plain' })
export const adminApi = {
  api: {}
}
export const clientApi = {
  api: {
    // getNuxeoPublicDocument: vi.fn(() =>
    //   Promise.resolve({
    //     data: {
    //     }
    //   })
    // ),
    getNuxeoPublicFilerequest: vi.fn(),
    postNuxeoPublicFilerequest: vi.fn(),
  }
}
