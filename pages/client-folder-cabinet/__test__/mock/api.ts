import { vi } from 'vitest'

export const clientApi = {
  api: {
    getCabinetLoginuserList: vi.fn(() => Promise.resolve(true)),
    getCabinetTemplateidPageConditions: vi.fn(() => Promise.resolve(true)),
    getCabinetRefreshcompletestatusId: vi.fn(() => Promise.resolve(true)),
    deleteNuxeoDocumentTrash: vi.fn(() => Promise.resolve(true)),
    postCabinetVerificationComplete: vi.fn(() => Promise.resolve(true)),
    getCabinetTemplateId: vi.fn(() => Promise.resolve(true)),
    patchNuxeoDocumentReplacefileV2: vi.fn(() => Promise.resolve(true)),
    postNuxeoDocumentIsduplicatename: vi.fn(() => Promise.resolve(true)),
    postNuxeoDocumentCreatedocument: vi.fn(() => Promise.resolve(true)),
    postNuxeoDocumentCreatefolders: vi.fn(() => Promise.resolve(true)),
    postCabinetCreate: vi.fn(() => Promise.resolve(true)),
  }
}
