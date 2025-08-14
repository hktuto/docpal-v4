import { vi } from 'vitest'
export const adminApi = {
  api: {
    postCabinetTemplatePage: vi.fn().mockResolvedValue({ data: [] }),
    deleteCabinetId: vi.fn().mockResolvedValue({}),
    getCabinetTemplateId: vi.fn().mockResolvedValue({ data: { folder: true } }),
    patchCabinetTemplate: vi.fn(),
    postCabinetTemplate: vi.fn(),
    postCabinetTemplateDuplicateName: vi.fn().mockResolvedValue({ data: false }),
    
    postCabinetTemplatePermission: vi.fn(),
    deleteCabinetTemplatePermission: vi.fn(),

    postNuxeoIdentityUsers: vi.fn(),
    postNuxeoIdentityGroups: vi.fn(),
    getCabinetIdUseWorkflow: vi.fn(),
  }
}
