import { vi } from 'vitest'
export const adminApi = {
  api: {
    patchExternalstorageIdStatus: vi.fn(),
    putCompanyprofilesCompanyidChopsCompanychopidStatus: vi.fn(),
    deleteCompanyprofilesCompanyidChopsCompanychopid: vi.fn(),
    // for ExternalStorageNewDialog test
    postExternalstorage: vi.fn(),
    putExternalstorageId: vi.fn(),
    // for ExternalStorageDetail test
    getExternalstorageId: vi.fn(),
    postExternalstorageIdProfilesPage: vi.fn(),
    patchExternalstorageIdProfilesProfileidStatus: vi.fn(),
    deleteExternalstorageIdProfilesProfileid: vi.fn(),
    // for ExternalStorageProfileDetail test
    getExternalstorageIdProfilesProfileid: vi.fn(),
    // for ExternalStorageProfilesGenerate test
    patchExternalstorageIdProfilesProfileidGeneral: vi.fn(),
    // for ExternalStorageProfilesImport test
    patchExternalstorageIdProfilesProfileidImport: vi.fn(),
    // for ExternalStorageProfilesProcess test
    patchExternalstorageIdProfilesProfileidProcess: vi.fn(),
    // for ExternalStorageProfilesCapture test
    patchExternalstorageIdProfilesProfileidCapture: vi.fn(),
    // for ExternalStorageProfilesOutput test
    getExternalstorageProfilesProfileidOutputrecordList: vi.fn(),
    patchExternalstorageProfilesProfileidOutputrecordOutputrecordidStatus: vi.fn(),
    getExternalstorageProfilesProfileidOutputrecordOutputrecordid: vi.fn(),
    deleteExternalstorageProfilesProfileidOutputrecordOutputrecordid: vi.fn(),
    // for ExternalStorageProfilesDialog test
    postExternalstorageIdProfiles: vi.fn(),
    // for ExternalStorageProfilesOutputDialog test
    postExternalstorageProfilesProfileidOutputrecord: vi.fn(),
    patchExternalstorageProfilesProfileidOutputrecordOutputrecordid: vi.fn(),
    // for WorkflowVariableMapping test
    postWorkflowProperties: vi.fn(),
  }
}
export const clientApi = {
  api: {
  }
}
