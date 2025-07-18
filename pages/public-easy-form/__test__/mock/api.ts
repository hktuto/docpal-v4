import { vi } from 'vitest'
export const adminApi = {
  api: {}
}
export const clientApi = {
  api: {
    getFormDesignIdDetail: vi.fn(() =>
      Promise.resolve({
        data: {
          previewStyle: ''
        }
      })
    ),
    postFormDesignSubmitData: vi.fn(),
  }
}
