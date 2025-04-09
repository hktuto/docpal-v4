
import { vi } from 'vitest';
export const adminApi = {
  api: {
    // patchFormDesignEnableId: vi.fn().mockResolvedValue({ data: true }),
    postNuxeoIdentityGetallusers: vi.fn(),
    putNuxeoUserStatus: vi.fn(),
    postNuxeoUserBatchActive: vi.fn(),
    postNuxeoIdentityUsersBatchDelete: vi.fn(),
    postNuxeoIdentityUsersBatchAddGroups: vi.fn(),
    postNuxeoIdentityGroups: vi.fn(),
    postNuxeoIdentityGetlicenseusernumandactivecount: vi.fn(),
    getNuxeoUserUserid: vi.fn(),
  }
}

