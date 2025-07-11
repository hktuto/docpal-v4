import { vi } from 'vitest'
export const adminApi = {
  api: {
    getWatermarkTemplatesAll: vi.fn(() =>
      Promise.resolve({
        data: [
          { id: '1', name: 'Test Watermark 1' },
          { id: '2', name: 'Test Watermark 2' }
        ]
      })
    ),
    deleteWorkflowProcess: vi.fn(() =>
      Promise.resolve({
        data: [
          { id: '1', name: 'Test Watermark 1' },
          { id: '2', name: 'Test Watermark 2' }
        ]
      })
    ),
    postNuxeoIdentityUsers: vi.fn(() => Promise.resolve({
      data: []
    })),
    postWorkflowTaskUnclaim: vi.fn(),
    postWorkflowTaskClaim: vi.fn(),
    postWorkflowRetryFailWorkflow: vi.fn(),
  }
}
export const clientApi = {
  api: {
    deleteWatermarkTemplatesId: vi.fn(() => Promise.resolve({})),
    patchWatermarkTemplates: vi.fn(() => Promise.resolve({}))
  }
}
