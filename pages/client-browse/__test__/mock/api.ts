import { vi } from 'vitest'
const bolb = new Blob(['Hello, world!'], { type: 'text/plain' })
export const clientApi = {
  api: {
    postNuxeoDocument: vi.fn(() =>
      Promise.resolve({
        data: {
          type: 'test-type',
          properties: {
            'file:content': {
              'mime-type': 'docx'
            }
          }
        }
      })
    ),
    postNuxeoDocumentPreview: vi.fn(() => Promise.resolve(bolb)),
    getNuxeoSharePrepareDownloadDocid: vi.fn(() =>
      Promise.resolve({
        data: 'YES'
      })
    ),
    getWatermarkDocumentPreview: vi.fn(() => Promise.resolve(bolb)),
    postNuxeoShareNew: vi.fn(),
    postNuxeoGetspecificversion: vi.fn(),
    postNuxeoDocumentBreadcrumb: vi.fn(),
    getWatermarkTemplatesId: vi.fn(() =>
      Promise.resolve({
        data: {
          watermarkSettings: []
        }
      })
    ),
    postWatermarkTemplates: vi.fn(() =>
      Promise.resolve({
        data: {
          watermarkSettings: []
        }
      })
    ),
    postNuxeoDocumentAddWatermark: vi.fn(),
    postNuxeoDocumentIsduplicatename: vi.fn(() =>
      Promise.resolve({
        data: {
          id: 'test',
          name: 'test-name'
        }
      })
    ),
    postNuxeoDocumentCopyWatermark: vi.fn(() =>
      Promise.resolve({
        data: {
          id: 'test',
          name: 'test-name'
        }
      })
    ),
    postNuxeoDocumentChildrenThumbnailV2: vi.fn(() =>
      Promise.resolve({
        data: {
          entryList: [],
          name: 'test-name'
        }
      })
    ),
    getNuxeoCollection: vi.fn(),
    deleteNuxeoCollectionDeleteCollectionCollectionid: vi.fn(),
    deleteNuxeoCollectionRemove: vi.fn(),
    postNuxeoCollectionCreate: vi.fn(),
    patchNuxeoCollection: vi.fn(),

    getWorkflowTaskAttachment: vi.fn(),
    postWorkflowFormSubmit: vi.fn(),
  }
}
