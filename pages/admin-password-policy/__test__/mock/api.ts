
import { vi } from 'vitest';
export const adminApi = {
  api: {
    getPasswordConfig: vi.fn(() => Promise.resolve({})),
    postPasswordSaveConfig: vi.fn()
  }
}

