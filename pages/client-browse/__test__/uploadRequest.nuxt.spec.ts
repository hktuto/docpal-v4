import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { UploadRequestDetail, UploadRequestPage } from '#components'
import { adminApi, clientApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { ElMessageBox, ElMessage, ElSwitch } from 'element-plus'
import { mockRouterProvider } from './util'
import { mockQuery } from './setup'
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
    error: vi.fn()
  }
}))

const mockReload = vi.fn()
const mockCleanSelectedRows = vi.fn()
const mockTable = {
  value: {
    loadData: vi.fn()
  }
}
vi.mock('../../../packages/base/composables/useVxeTable', () => ({
  useVxeTable: vi.fn(() => ({
    tableConfig: {},
    tableEvent: {},
    tableRef: mockTable,
    reload: mockReload,
    cleanSelectedRows: mockCleanSelectedRows
  }))
}))
const FormRenderer = {
  template: '<div class="FormRenderer">FormRenderer</div>',
  methods: {
    setFormJson: vi.fn(),
    setFormData: vi.fn()
  }
}
const VFormRender = {
  template: '<div class="FormRenderer">FormRenderer</div>',
  methods: {}
}
const ReaderDialog = {
  template: '<div class="FormRenderer">FormRenderer</div>',
  methods: {}
}

describe('[client-browse-upload-request]UploadRequestPage', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(UploadRequestPage, {
      global: {
        components: { VxeGrid, FormRenderer, VFormRender, ReaderDialog },
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
    // const dialogRef = wrapper.vm.$refs.DocTypeDialogNewRef
    // dialogRef.handleOpen = vi.fn()
    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.loadData = vi.fn();
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('should render correctly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.vm.tableRef).toBeTruthy() // 确保表格引用存在
  })
  it('should handle filter form change', async () => {
    const formModel = { isDesc: false, orderBy: 'email' }
    await wrapper.vm.handleFilterFormChange(formModel)

    expect(wrapper.vm.extraParams).toEqual(formModel)
    expect(wrapper.vm.reload).toHaveBeenCalled() // 确保重载方法被调用
  })

  it('should double click to navigate to upload request detail', async () => {
    const mockRow = { status: 'pending_approval', documentId: '123' }

    await wrapper.vm.handleDblclick(mockRow)

    expect(mockRouterProvider.navigateTo).toHaveBeenCalled()
  })
  it('should not navigate if status is not pending_approval', async () => {
    const mockRow = { status: 'completed', documentId: '123' }
    await wrapper.vm.handleDblclick(mockRow)

    expect(mockRouterProvider.navigateTo).not.toHaveBeenCalled()
  })
  it('should navigate to folder', async () => {
    const mockRow = { documentId: '123' }
    await wrapper.vm.toFolder(mockRow)

    expect(mockRouterProvider.navigateTo).toHaveBeenCalled()
  })
})
describe('[client-browse-upload-request]UploadRequestDetail', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(UploadRequestDetail, {
      global: {
        components: { VxeGrid, FormRenderer, VFormRender, ReaderDialog },
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
    // const dialogRef = wrapper.vm.$refs.DocTypeDialogNewRef
    // dialogRef.handleOpen = vi.fn()
    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.loadData = vi.fn();
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('should render correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should handle file download', async () => {
    const mockFile = { id: 'file1', name: 'File1.txt' }
    clientApi.api.getWorkflowTaskAttachment.mockResolvedValue(new Blob(['file content'], { type: 'text/plain' }))

    await wrapper.vm.handleDownload(mockFile)

    // 这里可以添加对下载逻辑的验证，例如检查是否调用了 downloadBlob 函数
  })

  it('should submit form successfully', async () => {
    wrapper.vm.state.selectedRow = { id: 'file1', approved: true, documentType: 'File', properties: {} }
    wrapper.vm.state.tableData = [wrapper.vm.state.selectedRow]

    wrapper.vm.MetaFormRef = {
      checkMetaValidate: vi.fn().mockResolvedValue(true)
    }

    clientApi.api.postWorkflowFormSubmit.mockResolvedValue({ result: true })

    await wrapper.vm.handleSubmit()

    expect(clientApi.api.postWorkflowFormSubmit).toHaveBeenCalled()
    expect(wrapper.vm.state.submitLoading).toBe(false)
  })
  it('should handle form validation error', async () => {
    wrapper.vm.formRef = {
      validate: vi.fn().mockRejectedValue(new Error('Validation failed'))
    }

    await wrapper.vm.handleSubmit()

    expect(wrapper.vm.state.submitLoading).toBe(false)
  })
})
