import { vi } from 'vitest'
export const adminApi = {
  api: {}
}
export const clientApi = {
  api: {
    patchNuxeoIdentityUser: vi.fn(),
    putUserSetting: vi.fn(),
    postNotificationSettingUserUseridPreferences: vi.fn(),
    getUserProfileSetting: vi.fn(() =>
      Promise.resolve({
        data: {
          properties: {}
        }
      })
    ),
    getNotificationSettingUserUseridPreferences: vi.fn(() =>
      Promise.resolve({
        data: {
          properties: {}
        }
      })
    ),
    getNuxeoUserGetapplication: vi.fn(),
    getAclUserUserid: vi.fn(),
    postUserprofileUseridSignature: vi.fn(),
    getUserprofileUseridSignature: vi.fn(),
  }
}
