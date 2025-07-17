import { vi } from 'vitest'
export const adminApi = {
  api: {
    deleteCompanyprofilesCompanyid: vi.fn(),
    putCompanyprofilesCompanyid: vi.fn(),
    postCompanyprofiles: vi.fn(),
    getCompanyprofilesCompanyidChopsCompanychopidFile: vi.fn(),
    postCompanyprofilesCompanyidChops: vi.fn(),
    putCompanyprofilesCompanyidChopsCompanychopid: vi.fn(),
    putCompanyprofilesCompanyidChopsCompanychopidStatus: vi.fn(),
    deleteCompanyprofilesCompanyidChopsCompanychopid: vi.fn(),
  }
}
export const clientApi = {
  api: {
    postNuxeoIdentityUsers: vi.fn(() => Promise.resolve({ data: [{ username: 'username', userId: 'username' }] }))
  }
}
