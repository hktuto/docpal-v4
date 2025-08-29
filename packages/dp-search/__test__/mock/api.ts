import { vi } from 'vitest'

export const clientApi = {
  api: {
    postNuxeoSearchSaveNestedSearchLog: vi.fn(),
    postLogsRecentSearchPageV2: vi.fn(),
    getNuxeoSearchQueryNestedSearchLog: vi.fn(),
    getNuxeoSfolder: vi.fn(),
    deleteNuxeoSearchDeleteNestedSearchLogId: vi.fn(),
    postMasterTablesRecordPageNonpermission: vi.fn().mockResolvedValue({
      data: [
        {
          name: 'test_table',
          id: 'test_table_id',
          displayColumn: 'name',
          valueColumn: 'id'
        }
      ]
    }),
    postNuxeoIdentityUsers: vi.fn().mockResolvedValue({
      data: [
        {
          username: 'test_user',
          userId: 'test_user_id'
        }
      ]
    }),
    getAclRoleRoot: vi.fn().mockResolvedValue({
      data: [
        {
          name: 'test_role',
          id: 'test_role_id'
        }
      ]
    }),
    postNuxeoIdentityGroups: vi.fn().mockResolvedValue({
      data: [
        {
          name: 'test_group',
          id: 'test_group_id'
        }
      ]
    })
  }
}
export const adminApi = {
  api: {
    getAclRoleRoot: vi.fn().mockResolvedValue({
      data: {
        name: 'test_role',
        id: 'test_role_id'
      }
    }),
    postNuxeoIdentityGroups: vi.fn().mockResolvedValue({
      data: [
        {
          name: 'test_group',
          id: 'test_group_id'
        }
      ]
    })
  }
}
export const globalApi = {
  api: {
    postNuxeoSearchOpenSearch: vi.fn(),
    postNuxeoSearchSaveNestedSearchLog: vi.fn(),
    postLogsRecentSearchPageV2: vi.fn(),
    getNuxeoSearchQueryNestedSearchLog: vi.fn(),
    getNuxeoSfolder: vi.fn(),
    deleteNuxeoSearchDeleteNestedSearchLogId: vi.fn(),
    getTypesActive: vi.fn(),
    postNuxeoIdentityGetkeycloakallusers: vi.fn(),
    getNuxeoCollection: vi.fn(),
    postNuxeoTagsGetalltags: vi.fn(),
    postNuxeoDocumentChildrenThumbnail: vi.fn()
  }
}
