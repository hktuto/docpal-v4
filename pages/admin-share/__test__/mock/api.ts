
import { vi } from 'vitest';
export const adminApi = {
  api: {
    postNuxeoShareGet: vi.fn().mockResolvedValue({
      data: {
        list: [],
        total: 0,
      },
    }),
    deleteNuxeoShare: vi.fn().mockResolvedValue(true),
    patchNuxeoShare: vi.fn().mockResolvedValue(true),
    deleteInternalshare: vi.fn().mockResolvedValue(true),
    postInternalsharePage: vi.fn()
  }
}

