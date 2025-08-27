import { vi } from 'vitest'

export const adminApi = {
  api: {
    postDocpaltypeSettingsDocpalTypeV2MetadataQuery: vi.fn(),
    getCabinetTemplateId: vi.fn(),
    getCabinetList: vi.fn()
  }
}

export const mockApiResponses = {
  cabinetList: [
    { id: 'cabinet1', label: 'Cabinet 1' },
    { id: 'cabinet2', label: 'Cabinet 2' }
  ],
  cabinetDetail: {
    id: 'cabinet1',
    label: 'Cabinet 1',
    documentType: 'test-doc-type',
    children: [
      {
        id: 'folder1',
        label: 'Folder 1',
        folder: true,
        children: [
          {
            id: 'file1',
            label: 'File 1',
            folder: false
          }
        ]
      }
    ]
  },
  metadata: {
    metadataList: [
      { name: 'metadata1' },
      { name: 'metadata2' }
    ]
  }
}

adminApi.api.getCabinetList.mockResolvedValue({ data: mockApiResponses.cabinetList })
adminApi.api.getCabinetTemplateId.mockResolvedValue({ data: mockApiResponses.cabinetDetail })
adminApi.api.postDocpaltypeSettingsDocpalTypeV2MetadataQuery.mockResolvedValue({ data: mockApiResponses.metadata })
