
import { vi } from 'vitest';
export const adminApi = {
  api: {
    postDocpaltypeSettingsPage: vi.fn(() => Promise.resolve({ data: [] })),
    patchDocpaltypeSettingsActive: vi.fn(() => Promise.resolve({ data: true })),
    getDocpaltypeSettingsNameName: vi.fn(() => Promise.resolve({ data: true })),
    deleteDocpaltypeSettingsRelatedId: vi.fn(() => Promise.resolve({ data: true })),
    deleteDocpaltypeSettingsNameMetadata: vi.fn(() => Promise.resolve({ data: true })),
    postDocpaltypeSettingsAddMetadata: vi.fn(() => Promise.resolve({})),
    postDocpaltypeSettings: vi.fn(() => Promise.resolve({})),
    getDocpaltypeSettingsMetadataDocumenttype: vi.fn(() => Promise.resolve({})),
    patchDocpaltypeSettingsNameNameRelated: vi.fn(() => Promise.resolve({})),
    postDocpaltypeSettingsNameNameRelated: vi.fn(() => Promise.resolve({})),
    getNuxeoSfolderPageConditions : vi.fn(() => Promise.resolve([])),
    deleteNuxeoSfolderId: vi.fn(() => Promise.resolve({ data: true })),
    getNuxeoSfolderId: vi.fn(() => Promise.resolve({})),
    patchNuxeoSfolder: vi.fn(() => Promise.resolve({})),
    deleteDocpaltypeSettingsDocpalTypeV2DeleteMetadataDocpaltypeid: vi.fn(() => Promise.resolve({})),
    getDocpaltypeSettingsCategories: vi.fn(() => Promise.resolve({})),
    // Add missing methods for DocTypePage tests
    postDocpaltypeSettingsDocpalTypeV2Query: vi.fn(() => Promise.resolve({ data: [] })),
    postDocpaltypeSettingsDocpalTypeV2ExportDocpalTypeCvs: vi.fn(() => Promise.resolve(new Blob(['test data']))),
    getDocpaltypeSettingsPageConditions: vi.fn(() => Promise.resolve({ data: [{ key: 'category', label: 'Category', type: 'select' }] })),
    // Add missing methods for DocTypeDisplayMetaTable tests
    postDocpaltypeSettingsDocpalTypeV2MetadataQuery: vi.fn(() => Promise.resolve({ 
      data: { 
        metadataList: [
          { id: 1, name: 'Test Meta 1', dataType: 'string', display: true, lastModifiedDate: '2023-01-01' },
          { id: 2, name: 'Test Meta 2', dataType: 'number', display: false, lastModifiedDate: '2023-01-02' }
        ] 
      } 
    })),
    postDocpaltypeSettingsDocpalTypeV2MoveMetadata: vi.fn(() => Promise.resolve({ data: true })),
    postDocpaltypeSettingsDocpalTypeV2UpdateMetadataDocpaltypeid: vi.fn(() => Promise.resolve({ data: true })),
    // Add missing methods for DocTypeDialogNew tests
    postDocpaltypeSettingsDocpalTypeV2Create: vi.fn(() => Promise.resolve({ data: true })),
    // Add missing methods for DocTypeDialogDuplicate tests
    postDocpaltypeSettingsCopyName: vi.fn(() => Promise.resolve({ data: true })),
    postDocpaltypeSettingsCheckDuplicate: vi.fn(() => Promise.resolve({ data: { data: false } })),
    postDocpaltypeSettingsDocpalTypeV2Duplicate: vi.fn(() => Promise.resolve({ data: true })),
    // Add missing methods for DocTypeDetail tests
    postDocpaltypeSettingsDocpalTypeV2Update: vi.fn(() => Promise.resolve({ data: true })),
    // Add missing methods for DocTypeDialogAddDisplayMeta tests
    postDocpaltypeSettingsDocpalTypeV2AddMetadataDocpaltypeid: vi.fn(() => Promise.resolve({ data: true })),
    // Add missing methods for DocTypeDialogAddRelatedType tests
    getDocpaltypeSettingsAll: vi.fn(() => Promise.resolve({ data: [] })),
  }
}

export const clientApi = {
  api: {
    postNuxeoIdentityUsers: vi.fn(() => Promise.resolve({ 
      data: [
        { userId: 'user1', username: 'User One' },
        { userId: 'user2', username: 'User Two' }
      ] 
    })),
  }
}

