import { vi } from 'vitest'

export const clientApi = {
  api: {
    postCaseTypesPage: vi.fn(() => Promise.resolve(true)),
    postCaseTypesCasetypeidRecordsPage: vi.fn(() => Promise.resolve(true)),
    getCaseDashboardCasetypeCasetypeidPrimaryform: vi.fn(() => Promise.resolve(true)),
    getCaseTypesCasetypeidRecordsPageConditions: vi.fn(() => Promise.resolve(true)),
    getCaseInstanceCasetypeidStarttask: vi.fn(() => Promise.resolve(true)),
    postCaseInstanceStart: vi.fn(() => Promise.resolve(true)),
    getRelationQuery: vi.fn(() => Promise.resolve(true)),
    getCaseDashboardVersionCmmnversionidPermission: vi.fn(() => Promise.resolve(true)),
    getCaseDashboardId: vi.fn(() => Promise.resolve(true)),
    postCaseDashboardInstanceActionPreRequisite: vi.fn(() => Promise.resolve(true)),
  }
}
