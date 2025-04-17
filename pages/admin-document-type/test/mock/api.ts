
import { vi } from 'vitest';
export const adminApi = {
  api: {
    postDocpaltypeSettingsPage: vi.fn(() => Promise.resolve({ data: [] })),
    patchDocpaltypeSettingsActive: vi.fn(() => Promise.resolve({ data: true })),
    getDocpaltypeSettingsNameName: vi.fn(() => Promise.resolve({ data: true })),
    deleteDocpaltypeSettingsRelatedId: vi.fn(() => Promise.resolve({ data: true })),
    deleteDocpaltypeSettingsNameMetadata: vi.fn(() => Promise.resolve({ data: true })),
    postDocpaltypeSettingsAddMetadata: vi.fn(() => Promise.resolve({})),
    postDocpaltypeSettings: vi.fn(() => Promise.resolve({})),
    postDocpaltypeSettingsCopyName: vi.fn(() => Promise.resolve({})),
    getDocpaltypeSettingsMetadataDocumenttype: vi.fn(() => Promise.resolve({})),
    patchDocpaltypeSettingsNameNameRelated: vi.fn(() => Promise.resolve({})),
    postDocpaltypeSettingsNameNameRelated: vi.fn(() => Promise.resolve({})),
  }
}

