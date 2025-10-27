import { vi } from 'vitest'
export const adminApi = {
  api: {
    postPolicyHoldsPage: vi.fn().mockResolvedValue({ data: [] }),
    patchPolicyHoldsIdStatusStatus: vi.fn().mockResolvedValue({ data: true }),
    deletePolicyHoldsId: vi.fn().mockResolvedValue(true),
    putPolicyHolds: vi.fn().mockResolvedValue({}),
    postPolicyHolds: vi.fn().mockResolvedValue({}),
    patchPolicyRetentionsIdStatusStatus: vi.fn().mockResolvedValue({ data: true }),
    deletePolicyRetentionsId: vi.fn().mockResolvedValue({}),
    putPolicyRetentions: vi.fn().mockResolvedValue({}),
    getPolicyRetentionsId: vi.fn().mockResolvedValue({ data: { id: 1, status: 'A', actionType: 'A' } }),
    postPolicyRetentions: vi.fn().mockResolvedValue({}),

    getPolicyRetentionsPageConditions: vi.fn().mockResolvedValue({ data: [] })
  }
}
