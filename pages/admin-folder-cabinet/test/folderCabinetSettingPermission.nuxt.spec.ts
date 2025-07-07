import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'
import { FolderCabinetSettingPermission, FolderCabinetSettingPermissionAddDialog, FolderCabinetSettingPermissionEditTimeDialog, ResponsiveFilter } from '#components'
import { ElMessageBox, ElNotification, ElMessage } from 'element-plus'
import { mockQuery, mockTable } from './setup'

vi.mock('element-plus', () => ({
  ElMessageBox: {
    alert: vi.fn(),
    confirm: vi.fn()
  },
  ElNotification: vi.fn().mockReturnValue({
    close: vi.fn()
  }),
  ElMessage: {
    success: vi.fn(),
    warning: vi.fn()
  },
  ElDropdown: {
    name: 'ElDropdown',
    props: ['trigger'],
    template: '<div><slot /></div>',
  },
  ElTree: {
    name: 'ElTree',
    props: ['data', 'node-key', 'props', 'default-expand-all', 'highlight-current'],
    template: '<div><slot /></div>',
  },
}))
const FormRenderer = {
  template: '<div class="FormRenderer">FormRenderer</div>',
  methods: {
    setFormJson: vi.fn(),
    setFormData: vi.fn()
  }
}
const VFormRender = {
  template: '<div class="VFormRender">VFormRender</div>',
  methods: {}
}
const ReaderDialog = {
  template: '<div class="ReaderDialog">ReaderDialog</div>',
  methods: {}
}

const Editorjs = {
  template: '<div class="Editorjs">Editorjs</div>',
  methods: {}
}
describe('[admin-folder-cabinet]FolderCabinetSettingPermission', () => {
  let wrapper: any
  const mockTabProvider = {}
  const row = {
    userId: 'user-id',
    aceId: 'ace-id',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    loading: false,
    read: false,
  }
  const mockTableData = [
    { userId: 'user1', permission: 'Read', startDate: null, endDate: null },
    { userId: 'user2', permission: 'ReadWrite', startDate: null, endDate: null },
  ]

  beforeEach(async () => {
    wrapper = shallowMount(FolderCabinetSettingPermission, {
      props: {
        tableData: mockTableData,
        id: 'test-id',
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog, Editorjs },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider,
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key },
        }
      }
    })
    await wrapper.vm.$nextTick()
    // const tableRef = wrapper.vm.$refs.detailRef
    // tableRef.init = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })
  it('renders correctly', async () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h3').text()).toBe('folderCabinet.localPermission')
  })
  it('opens add permission dialog', async () => {
    const dialogRef = wrapper.vm.$refs.AclAddDialogRef
    dialogRef.handleOpen = vi.fn()
    wrapper.vm.handleAclLocalDialogShow()
    expect(wrapper.vm.AclAddDialogRef.handleOpen).toHaveBeenCalled()
  })

  
  it('should call deleteCabinetTemplatePermission when permission is print and open is false', async () => {
    wrapper.vm.handlePermissionChange(false, 'print', row)
    expect(adminApi.api.deleteCabinetTemplatePermission).toHaveBeenCalledWith(
      { id: 'test-id', userId: row.userId, permission: 'Print' },
      {}
    )
  })
  it('should call postCabinetTemplatePermission when permission is print and open is true', async () => {
    row.loading = false
    const _data = {
      userId: row.userId,
      startDate: row.startDate,
      endDate: row.endDate,
      permission: 'Print',
      id: 'test-id'
    }
    adminApi.api.postCabinetTemplatePermission.mockResolvedValue({})

    await wrapper.vm.handlePermissionChange(true, 'print', row)

    expect(row.loading).toBe(false)
    expect(adminApi.api.postCabinetTemplatePermission).toHaveBeenCalledWith(_data)
  })

  it('should handle permission revert logic', async () => {
    row.loading = false
    adminApi.api.postCabinetTemplatePermission.mockResolvedValue({})
    wrapper.vm.permissionRevert = vi.fn().mockReturnValue('Read')
    await wrapper.vm.handlePermissionChange(true, 'Read', row)

    expect(row.loading).toBe(false)
    expect(adminApi.api.postCabinetTemplatePermission).toHaveBeenCalledWith({
      id: 'test-id',
      aceId: row.aceId,
      permission: 'Everything',
      userId: row.userId,
      startDate: row.startDate,
      endDate: row.endDate,
    })
  })

  it('removes local ACL permission', async () => {
    const row = { userId: 'user1', aceId: 'ace1', permission: 'Read', loading: false }
    // 模拟取消对话框

    ElMessageBox.confirm.mockResolvedValue('confirm')
    await wrapper.vm.removeLocalAcl(row)

    expect(row.loading).toBe(false) 
    
    expect(mockRouterProvider.message.success).toHaveBeenCalledWith('folder_cabinetDetailLocalPermissionRemoveSuccessMsg')
  })
  it('cancels local ACL permission removal', async () => {
    const row = { userId: 'user1', aceId: 'ace1', permission: 'Read', loading: false }
    // 模拟取消对话框
    ElMessageBox.confirm = vi.fn().mockRejectedValue(new Error('cancel'))

    await wrapper.vm.removeLocalAcl(row)

    expect(row.loading).toBe(false) 
    
    expect(mockRouterProvider.message.success).not.toHaveBeenCalled()
  })
})
describe('[admin-folder-cabinet]FolderCabinetSettingPermissionAddDialog', () => {
  let wrapper: any
  const mockTabProvider = {}
  beforeEach(async () => {
    wrapper = shallowMount(FolderCabinetSettingPermissionAddDialog, {
      props: {
        exitList: [],
        id: 'test-id',
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog, Editorjs },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider,
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key },
        }
      }
    })
    await wrapper.vm.$nextTick()
    // const tableRef = wrapper.vm.$refs.detailRef
    // tableRef.init = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })
  it('renders correctly', async () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('loads users and groups on mount', async () => {
    const mockUsers: any = [
      { userId: 'user3', username: 'User 3' },
      { userId: 'user4', username: 'User 4' },
    ]
    const mockGroups: any = [
      { id: 'group1', name: 'Group 1' },
      { id: 'group2', name: 'Group 2' },
    ]
    
    adminApi.api.postNuxeoIdentityUsers.mockResolvedValue({ data: mockUsers })
    adminApi.api.postNuxeoIdentityGroups.mockResolvedValue({ data: mockGroups })

    await wrapper.vm.init()

    expect(wrapper.vm.state.userList).toEqual(mockUsers.map((user: any) => ({ ...user, value: user.userId, label: user.username })))
    expect(wrapper.vm.state.groupList).toEqual(mockGroups.map((group: any) => ({ ...group, value: group.id, label: group.name })))
  })
  it('handles form submission', async () => {
    const mockFormData = { userId: 'user3', permission: 'Read', time: 'dateBase', dateRange: ['2023-01-01', '2023-12-31'] }
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn(() => Promise.resolve(mockFormData)),
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn()
      }
    }
    adminApi.api.postCabinetTemplatePermission.mockResolvedValue({})

    await wrapper.vm.handleSubmit()

    expect(adminApi.api.postCabinetTemplatePermission).toHaveBeenCalledWith({
      id: 'test-id',
      userId: 'user3',
      permission: 'Read',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
    })
    expect(wrapper.vm.state.visible).toBe(false)
    expect(ElMessage.success).toHaveBeenCalled()
  })
  it('handles form submission error', async () => {
    const mockFormData = { userId: 'user3', permission: 'Read', time: 'dateBase', dateRange: ['2023-01-01', '2023-12-31'] }
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn(() => Promise.resolve(mockFormData)),
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn()
      }
    }
    adminApi.api.postCabinetTemplatePermission.mockRejectedValue(new Error('Submission failed'))

    await wrapper.vm.handleSubmit()

    expect(adminApi.api.postCabinetTemplatePermission).toHaveBeenCalled()
    expect(wrapper.vm.state.loading).toBe(false) 
  })
  it('loads options for userId field', async () => {
    const userIdRef = { loadOptions: vi.fn() }
    wrapper.vm.FormRendererRef = {
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn(),
        getWidgetRef: vi.fn().mockReturnValue(userIdRef)
      }
    }

    await wrapper.vm.handleOptions()
    expect(userIdRef.loadOptions).toHaveBeenCalled()
  })
})

describe('[admin-folder-cabinet]FolderCabinetSettingPermissionEditTimeDialog', () => {
  let wrapper: any
  const mockTabProvider = {}
  const mockAclItem = {
    userId: 'user1',
    permission: 'Read',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
  }

  beforeEach(async () => {
    wrapper = shallowMount(FolderCabinetSettingPermissionEditTimeDialog, {
      props: {
        exitList: [],
        id: 'test-id',
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog, Editorjs },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider,
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key },
        }
      }
    })
    await wrapper.vm.$nextTick()
    // const tableRef = wrapper.vm.$refs.detailRef
    // tableRef.init = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })
  it('renders correctly', async () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('opens dialog and sets form data', async () => {
    wrapper.vm.FormRendererRef = {
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn().mockReturnValue(true),
      }
    }
    const formData = {
      time: 'dateBase',
      dateRange: [mockAclItem.startDate, mockAclItem.endDate],
    }
    await wrapper.vm.handleOpen(mockAclItem)

    expect(wrapper.vm.FormRendererRef.vFormRenderRef.setFormData).toHaveBeenCalledWith(formData)
  })
  it('handles form submission successfully', async () => {
    const mockFormData = { time: 'dateBase', dateRange: ['2023-01-01', '2023-12-31'] }
    wrapper.vm.FormRendererRef = {
      getFormData:  vi.fn().mockResolvedValue(mockFormData),
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn().mockReturnValue(true),
      }
    }
    await wrapper.vm.handleSubmit()

    expect(adminApi.api.postCabinetTemplatePermission).toHaveBeenCalled()
    expect(wrapper.vm.state.visible).toBe(false)
  })

  it('handles form submission error', async () => {
    const mockFormData = { time: 'dateBase', dateRange: ['2023-01-01', '2023-12-31'] }
    wrapper.vm.FormRendererRef = {
      getFormData:  vi.fn().mockResolvedValue(mockFormData),
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn().mockReturnValue(true),
      }
    }
    adminApi.api.postCabinetTemplatePermission.mockRejectedValue(new Error('Submission failed'))
    await wrapper.vm.handleSubmit()

    expect(adminApi.api.postCabinetTemplatePermission).toHaveBeenCalled()
    expect(wrapper.vm.state.loading).toBe(false) // 确保 loading 状态被重置
  })
})
