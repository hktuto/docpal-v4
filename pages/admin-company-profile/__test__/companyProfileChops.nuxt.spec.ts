import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi, clientApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'
import { CompanyProfileChopsDialog, CompanyProfileChopsTable, ResponsiveFilter } from '#components'
import { ElMessageBox, ElNotification, ElMessage } from 'element-plus'
import { mockQuery, mockTable } from './setup'

vi.mock('element-plus', () => ({
  ElMessageBox: {
    alert: vi.fn(),
    confirm: vi.fn()
  },
  ElNotification: {
    success: vi.fn()
  },
  ElMessage: {
    success: vi.fn(),
    warning: vi.fn(),
    error: vi.fn(),
  }
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

describe('[admin-company-profile-chops]CompanyProfileChopsDialog', () => {
  let wrapper: any
  const mockTabProvider = {}
  const mockCompanyId = '12345'
  const mockData = {
    id: '1',
    name: 'Chop A',
    status: 'A',
    roles: 'role1,role2',
    users: 'user1,user2'
  }

  beforeEach(async () => {
    wrapper = shallowMount(CompanyProfileChopsDialog, {
      props: {
        companyId: mockCompanyId
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog, Editorjs },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
        }
      }
    })
    await wrapper.vm.$nextTick()
    // const dialogRef = wrapper.vm.$refs.SmartFolderInfoDialogRef;
    // dialogRef.handleOpen = vi.fn();
    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.initBar = vi.fn();
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('should open add dialog and reset form', async () => {
    await wrapper.vm.handleAdd() // 触发打开添加对话框
    expect(wrapper.vm.visible).toBe(true) // 确保对话框可见
    expect(wrapper.vm.form.name).toBe('') // 确保表单重置
  })

  it('should open edit dialog and populate form', async () => {
    adminApi.api.getCompanyprofilesCompanyidChopsCompanychopidFile.mockResolvedValue(new Blob()) // 模拟文件获取
    await wrapper.vm.handleEdit(mockData) // 触发打开编辑对话框
    expect(wrapper.vm.visible).toBe(true) // 确保对话框可见
    expect(wrapper.vm.form.name).toBe(mockData.name) // 确保表单数据填充
    expect(wrapper.vm.form.permissions).toEqual(['role____role1', 'role____role2', 'user1', 'user2']) // 确保权限填充
  })

  it('should save data correctly in add mode', async () => {
    const formData = new FormData()
    formData.append('name', 'New Chop')
    formData.append('status', 'A')
    formData.append('file', new Blob())

    wrapper.vm.form.name = 'New Chop'
    wrapper.vm.form.status = 'A'
    wrapper.vm.form.file = new Blob()
    wrapper.vm.form.permissions = ['role____role1', 'user1']

    await wrapper.vm.onSave() // 提交保存

    expect(adminApi.api.postCompanyprofilesCompanyidChops).toHaveBeenCalled() // 确保 API 被调用
    expect(wrapper.vm.visible).toBe(false) // 确保对话框关闭
    expect(ElMessage.success).toHaveBeenCalledWith('Created successfully') // 确保成功消息被调用
  })
  it('should save data correctly in edit mode', async () => {
    const formData = new FormData()
    formData.append('name', 'Updated Chop')
    formData.append('status', 'A')
    formData.append('file', new Blob())

    wrapper.vm.form.name = 'Updated Chop'
    wrapper.vm.form.status = 'A'
    wrapper.vm.form.file = new Blob()
    wrapper.vm.form.permissions = ['role____role1', 'user1']
    wrapper.vm.isEdit = true
    wrapper.vm.editData = mockData
    wrapper.vm.fileChange = true

    await wrapper.vm.onSave() // 提交保存

    expect(adminApi.api.putCompanyprofilesCompanyidChopsCompanychopid).toHaveBeenCalled() // 确保编辑 API 被调用
    expect(wrapper.vm.visible).toBe(false) // 确保对话框关闭
    expect(ElMessage.success).toHaveBeenCalledWith('Updated successfully') // 确保成功消息被调用
  })
  it('should show error message when file is not uploaded', async () => {
    wrapper.vm.form.file = null // 模拟未上传文件
    await wrapper.vm.onSave() // 提交保存

    expect(ElMessage.error).toHaveBeenCalledWith('Please upload a file') // 确保错误消息被调用
  })

  it('should fetch permission options on mount', async () => {
    // clientApi.api.postNuxeoIdentityUsers.mockResolvedValue({ data: [{ username: 'user1', userId: 'user1' }, { username: 'user2', userId: 'user2' }] }) // 模拟用户列表
    await wrapper.vm.getOptions() // 获取权限选项

    expect(wrapper.vm.permissionOptions.length).toBeGreaterThan(0) // 确保权限选项被填充
  })
})
describe('[admin-company-profile-chops]CompanyProfileChopsTable', () => {
  let wrapper: any
  const mockTabProvider = {}
  const mockCompanyId = '12345'
  const mockRow = {
    id: '1',
    name: 'Chop A',
    createdBy: 'User A',
    createdDate: '2025-01-01',
    modifiedDate: '2025-01-02',
    status: 'A'
  }

  beforeEach(async () => {
    wrapper = shallowMount(CompanyProfileChopsTable, {
      props: {
        id: mockCompanyId
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog, Editorjs },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
        }
      }
    })
    await wrapper.vm.$nextTick()
    // const dialogRef = wrapper.vm.$refs.SmartFolderInfoDialogRef;
    // dialogRef.handleOpen = vi.fn();
    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.initBar = vi.fn();
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('should render correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should open the dialog to add a new chop', async () => {
    const dialogRef = wrapper.vm.DialogRef;
    dialogRef.handleAdd = vi.fn((oitem) => Promise.resolve(oitem));
    await wrapper.vm.handleAdd() // 触发添加操作
    expect(dialogRef.handleAdd).toHaveBeenCalled() // 确保调用了 Dialog 的 handleAdd 方法
  })

  it('should open the dialog to edit a chop', async () => {
    const dialogRef = wrapper.vm.DialogRef;
    dialogRef.handleEdit = vi.fn((oitem) => Promise.resolve(oitem));
    await wrapper.vm.handleEdit(mockRow) // 触发编辑操作
    expect(dialogRef.handleEdit).toHaveBeenCalledWith(mockRow) // 确保调用了 Dialog 的 handleEdit 方法，并传入正确的行数据
  })
  it('should change status to active', async () => {
    adminApi.api.putCompanyprofilesCompanyidChopsCompanychopidStatus.mockResolvedValue({ data: true }) // 模拟 API 返回成功
    await wrapper.vm.handleActive(mockRow, 'A') // 触发状态变更操作
    expect(mockRow.status).toBe('A') // 确保行状态已更新
  })

  it('should change status to inactive', async () => {
    adminApi.api.putCompanyprofilesCompanyidChopsCompanychopidStatus.mockResolvedValue({ data: true }) // 模拟 API 返回成功
    await wrapper.vm.handleActive(mockRow, 'D') // 触发状态变更操作
    expect(mockRow.status).toBe('D') // 确保行状态已更新
  })
  it('should show confirmation before deleting a chop', async () => {
    vi.spyOn(ElMessageBox, 'confirm').mockResolvedValue('confirm') // 模拟确认对话框
    adminApi.api.deleteCompanyprofilesCompanyidChopsCompanychopid.mockResolvedValue({ data: true }) // 模拟 API 返回成功

    await wrapper.vm.handleDelete(mockRow) // 触发删除操作
    expect(adminApi.api.deleteCompanyprofilesCompanyidChopsCompanychopid).toHaveBeenCalledWith(mockCompanyId, mockRow.id) // 确保 API 被调用
  })
  it('should not delete if confirmation is canceled', async () => {
    vi.spyOn(ElMessageBox, 'confirm').mockResolvedValue('cancel') // 模拟取消确认对话框
    await wrapper.vm.handleDelete(mockRow) // 触发删除操作
    expect(adminApi.api.deleteCompanyprofilesCompanyidChopsCompanychopid).not.toHaveBeenCalled() // 确保 API 没有被调用
  })
})
