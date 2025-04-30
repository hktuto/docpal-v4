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
