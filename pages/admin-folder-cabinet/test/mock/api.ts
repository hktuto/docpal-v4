import { vi } from 'vitest'
export const adminApi = {
  api: {
    postCabinetTemplatePage: vi.fn().mockResolvedValue({ data: [] }),
    deleteCabinetId: vi.fn().mockResolvedValue({}),
    getCabinetTemplateId: vi.fn().mockResolvedValue({ data: { folder: true } }),
  }
}
