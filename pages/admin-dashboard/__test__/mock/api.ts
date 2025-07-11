
import { vi } from 'vitest';
export const adminApi = {
  api: {
    deletePersonalDashboardId: vi.fn(() => Promise.resolve({})),
    putPersonalDashboardUpdate: vi.fn(() => Promise.resolve({})),
    getPersonalDashboardId: vi.fn(() => Promise.resolve({})),
    postPersonalDashboardSave: vi.fn(() => Promise.resolve({})),
  }
}
export const publicApi = {
  api: {
    deleteUserDashboardId: vi.fn(() => Promise.resolve({})),
    putUserDashboard: vi.fn(() => Promise.resolve({})),
    getUserDashboardId: vi.fn(() => Promise.resolve({})),
  }
}
