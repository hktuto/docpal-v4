import { vi } from 'vitest'
const bolb = new Blob(['Hello, world!'], { type: 'text/plain' })
export const publicApi = {
  api: {
    getUserDashboardId: vi.fn()
  }
}
export const clientApi = {
  api: {
  }
}
