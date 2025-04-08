
import { vi } from 'vitest';
// export const getCommentList = async () => {
//   console.log("api mock success, getCommentList")
//   return []
// }
export const DeleteEasyFormActionApi = vi.fn(() => Promise.resolve(true));
export const AddEasyFormActionApi = vi.fn(() => Promise.resolve(true));
export const SaveEasyFormFieldsApi = vi.fn(() => Promise.resolve(true));

export const adminApi = {
  api: {
    postFormDesignSaveFormresultAppend: vi.fn((itemId, id) => Promise.resolve(id)),
    deleteFormDesignDraftidFormresultFormresultid: vi.fn((formId, id) => {
      return Promise.resolve(id + formId);
    }),
    postFormDesignPage: vi.fn().mockResolvedValue({
      data: { rows: [], total: 0 }
    }),
    patchFormDesignEnableId: vi.fn().mockResolvedValue({ data: true }),
    patchFormDesignDisableId: vi.fn().mockResolvedValue({ data: true }),
    getFormDesignDraftId: vi.fn(),
    postFormDesignSavePreview: vi.fn(),
    patchFormDesignName: vi.fn(),
    postNuxeoIdentityGroups: vi.fn(),
    postFormDesignSavePermission: vi.fn(),
  }
}

