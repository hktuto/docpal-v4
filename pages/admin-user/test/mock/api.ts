
import { vi } from 'vitest';
export const adminApi = {
  api: {
    // patchFormDesignEnableId: vi.fn().mockResolvedValue({ data: true }),
    postNuxeoIdentityGetallusers: vi.fn(),
    putNuxeoUserStatus: vi.fn(),
    postNuxeoUserBatchActive: vi.fn(),
    postNuxeoIdentityUsersBatchDelete: vi.fn(),
    postNuxeoIdentityUsersBatchAddGroups: vi.fn(),
    postNuxeoIdentityGroups: vi.fn().mockResolvedValue({
      data: [{ name: 'User Group' }] // 模拟已有用户组
    }),
    postNuxeoIdentityGetlicenseusernumandactivecount: vi.fn(),
    getNuxeoUserUserid: vi.fn(),
    patchNuxeoIdentityUser: vi.fn(),
    BatchUsersToGroupsApi: vi.fn(),
    GetGroupListApi: vi.fn().mockResolvedValue([{ id: 'group-1', name: 'Group 1' }]),

    deleteNuxeoIdentityGroup: vi.fn(),
    postNuxeoIdentityGroup: vi.fn(),
  }
}

