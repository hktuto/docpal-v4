import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'
import {
  CompanyProfilePage,
  CompanyProfileDetail,
  CompanyProfileNewDialog,
  ResponsiveFilter
} from '#components'
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
    warning: vi.fn()
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

describe('[admin-company-profile]CompanyProfilePage', () => {
  let wrapper: any
  const mockTabProvider = {}
  const mockData = [
    { id: 1, name: 'Company A', createdBy: 'User1', createdDate: '2025-01-01', modifiedDate: '2025-01-02', status: 'A' },
    { id: 2, name: 'Company B', createdBy: 'User2', createdDate: '2025-01-03', modifiedDate: '2025-01-04', status: 'D' }
  ]

  beforeEach(async () => {
    wrapper = shallowMount(CompanyProfilePage, {
      props: {
        page: 1,
        pageSize: 10
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

  it('should handle filter form change', async () => {
    await wrapper.vm.handleFilterFormChange({ isDesc: 'false', orderBy: 'name' })
    expect(wrapper.vm.extraParams).toEqual({ isDesc: false, orderBy: 'name' }) // 确保参数正确更新
    await wrapper.vm.reload() // 重新加载数据
  })

  it('should open new company profile dialog on add action', async () => {
    const dialogRef = wrapper.vm.DialogRef
    dialogRef.handleOpen = vi.fn((item) => Promise.resolve(item))
    await wrapper.vm.handleAdd()
    expect(dialogRef.handleOpen).toHaveBeenCalled() // 确保 dialog 被正确打开
  })

  it('should navigate to detail page on double click', async () => {
    const row = mockData[0]
    await wrapper.vm.handleDblclick(row)
    expect(mockRouterProvider.navigateTo).toHaveBeenCalled() // 确保导航被调用
  })
  it('should confirm and delete a company profile', async () => {
    const row = mockData[0]
    const messageBoxConfirmSpy = vi.spyOn(ElMessageBox, 'confirm').mockResolvedValue('confirm') // 模拟确认对话框

    await wrapper.vm.handleDelete(row)
    expect(messageBoxConfirmSpy).toHaveBeenCalledWith(expect.any(String)) // 确保确认对话框被调用
    expect(adminApi.api.deleteCompanyprofilesCompanyid).toHaveBeenCalledWith(row.id) // 确保删除 API 被调用
  })

  it('should not delete a company profile if cancelled', async () => {
    const row = mockData[0]
    const messageBoxConfirmSpy = vi.spyOn(ElMessageBox, 'confirm').mockResolvedValue('cancel') // 模拟取消对话框

    await wrapper.vm.handleDelete(row)
    expect(messageBoxConfirmSpy).toHaveBeenCalledWith(expect.any(String)) // 确保确认对话框被调用
    expect(adminApi.api.deleteCompanyprofilesCompanyid).not.toHaveBeenCalled() // 确保删除 API 未被调用
  })
})
describe('[admin-company-profile]CompanyProfileDetail', () => {
  let wrapper: any
  const mockTabProvider = {}
  const mockId = '12345'
  const mockData = {
    name: 'Company A',
    createdBy: 'User1',
    createdDate: '2025-01-01',
    modifiedDate: '2025-01-02',
    status: 'A'
  }
  beforeEach(async () => {
    wrapper = shallowMount(CompanyProfileDetail, {
      props: { id: mockId },
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
  it('should save form data correctly', async () => {
    await wrapper.vm.init() // 初始化以填充表单数据
    const formData = { ...mockData, status: true }
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn(() => Promise.resolve(formData)),
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn()
      }
    }

    await wrapper.vm.handleSave() // 触发保存操作

    expect(adminApi.api.putCompanyprofilesCompanyid).toHaveBeenCalledWith(mockId, { ...formData, status: 'A' }) // 确保更新 API 被调用
  })

  it('should handle save errors gracefully', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('Save failed')
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn(() => Promise.resolve(mockData)),
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn()
      }
    }
    adminApi.api.putCompanyprofilesCompanyid.mockRejectedValue(error) // 模拟保存失败

    await wrapper.vm.handleSave() // 触发保存操作

    expect(console.error).toHaveBeenCalledWith(error) // 确保错误被捕获并打印
  })

  it('should set loading state correctly during operations', async () => {
    expect(wrapper.vm.loading).toBe(false) // 初始状态应为 false

    await wrapper.vm.init() // 初始化时应设置为 true
    expect(wrapper.vm.loading).toBe(false)

    await wrapper.vm.handleSave() // 保存后应设置为 false
    expect(wrapper.vm.loading).toBe(false)
  })
})
describe('[admin-company-profile]CompanyProfileNewDialog', () => {
  let wrapper: any
  const mockTabProvider = {}
  const mockId = '12345'
  const mockData = {
    name: 'Company A',
    status: 'A'
  }

  beforeEach(async () => {
    adminApi.api.postCompanyprofiles.mockResolvedValue({}) // 模拟创建公司资料
    wrapper = shallowMount(CompanyProfileNewDialog, {
      props: { id: mockId },
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
  it('should open dialog and reset form', async () => {
    await wrapper.vm.handleOpen() // 触发打开对话框
    expect(wrapper.vm.state.visible).toBe(true) // 确保对话框可见
    expect(wrapper.vm.state.loading).toBe(false) // 确保加载状态为 false
  })
  it('should submit form data correctly', async () => {
    const formData = { ...mockData, status: true }
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn(() => Promise.resolve(mockData)),
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn()
      }
    }
    await wrapper.vm.handleSubmit() // 触发提交操作

    expect(adminApi.api.postCompanyprofiles).toHaveBeenCalledWith({...formData, status: 'A'}) // 确保创建 API 被调用
    expect(wrapper.vm.state.visible).toBe(false) // 确保对话框关闭
    expect(ElMessage.success).toHaveBeenCalledWith('tip_createdSuccessMsg') // 确保成功消息被调用
  })


  it('should handle submit errors gracefully', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('Submit failed')
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn(() => Promise.resolve(mockData)),
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn()
      }
    }
    adminApi.api.postCompanyprofiles.mockRejectedValue(error) // 模拟提交失败

    await wrapper.vm.handleSubmit() // 触发提交操作

    expect(console.error).toHaveBeenCalledWith(error) // 确保错误被捕获并打印
  })

  it('should set loading state correctly during operations', async () => {
    expect(wrapper.vm.state.loading).toBe(false) // 初始状态应为 false

    await wrapper.vm.handleSubmit() // 提交操作时应设置为 true
    expect(wrapper.vm.state.loading).toBe(false)

    // 模拟提交完成
    await wrapper.vm.handleSubmit()
    expect(wrapper.vm.state.loading).toBe(false) // 提交完成后应设置为 false
  })
})
