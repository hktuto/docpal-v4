import { vi } from 'vitest'
export const adminApi = {
  api: {
    getMasterTablesId: vi.fn(),
    getMasterTablesIdRecordTemplate: vi.fn(),
    postMasterTablesRecordImportFile: vi.fn(),
    getMasterTablesDownloadFailure: vi.fn(),
    postMasterTablesIdRecordExport: vi.fn(),
    postMasterTables: vi.fn(),
    putMasterTables: vi.fn(),
    getMasterTablesIdAcls: vi.fn(),
    postMasterTablesAclsRemove: vi.fn(),
    postMasterTablesAclsDelete: vi.fn(),
    postMasterTablesAclsAdd: vi.fn(),
    postMasterTablesLogsPageConditions: vi.fn(),
    postMasterTablesLogs: vi.fn(),
    postMasterTablesColumnAdd: vi.fn(),
  }
}
