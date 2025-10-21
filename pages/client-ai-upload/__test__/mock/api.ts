import { vi } from 'vitest'

export const clientApi = {
  api: {
    postNuxeoDocumentQueryuploadfiledtopage: vi.fn(() => Promise.resolve(true)),
    postNuxeoDocumentQueryuploadfiledetaildtolist: vi.fn(() => Promise.resolve(true)),
    postNuxeoDocumentCheckfileexist: vi.fn(() => Promise.resolve(true)),
    deleteNuxeoDocumentTempfileId: vi.fn(() => Promise.resolve(true)),
    getNuxeoDocumentRetryClassificationUploadid: vi.fn(() => Promise.resolve(true)),
    postNuxeoDocumentBatchconfirm: vi.fn(() => Promise.resolve(true)),
    getNuxeoDocumentDownloadTempFileId: vi.fn(() => Promise.resolve(true)),
  },
  instance: {
    post: vi.fn()
  }
}
