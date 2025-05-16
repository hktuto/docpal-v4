
import { vi } from 'vitest';

export const adminApi = {
  api: {
    getOauth2Setting: vi.fn(),
    postOauth2Setting: vi.fn(),
    postWhatsappFindWhatsappLog: vi.fn(),
    
    putWhatsappUpdateWhatsappSetting: vi.fn(),
    getWhatsappTestConnection: vi.fn(),
    postWhatsappOverview: vi.fn(),
  }
}

