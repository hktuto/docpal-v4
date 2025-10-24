import { vi } from 'vitest'
export const adminApi = {
  api: {
    getAzureOcrQueryazuresetting: vi.fn(),
    getAzureOcrConditions: vi.fn(),
    putAzureOcrUpdateapisetting: vi.fn(),
    putAzureOcrUpdateocrsetting: vi.fn(),
    postAzureOcrCreateocrprofilemapping: vi.fn(),
    putAzureOcrUpdateocrprofilemapping: vi.fn(),
    getAzureOcrQueryazureocrmodels: vi.fn(),
    postAzureOcrQueryocrtransactionlogs: vi.fn(),
  }
}
