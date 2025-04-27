import { vi } from 'vitest'
export const adminApi = {
  api: {
    deleteTemplateEmailLayoutId: vi.fn(() => Promise.resolve({ data: [] })),
    deleteTemplateEmailTemplateId: vi.fn(() => Promise.resolve({ data: [] })),
    postTemplateEmailLayoutPage: vi.fn(() =>
      Promise.resolve({
        data: {
          entryList: [{ id: '1111', layoutContent: 'sss' },{ id: 'new', layoutContent: 'sss' }]
        }
      })
    ),
    getTemplateEmailTemplateId: vi.fn(() => Promise.resolve({ })),
    postTemplateEmailTemplate: vi.fn(() => Promise.resolve({ })),
    
  }
}
