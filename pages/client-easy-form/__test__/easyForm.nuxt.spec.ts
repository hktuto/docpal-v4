import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { EasyFormPage, EasyFormDetail } from '#components'
import { clientApi, publicApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { ElMessageBox, ElNotification, ElMessage, ElSwitch } from 'element-plus'
import { mockRouterProvider } from './util'
import { mockQuery } from './setup'
import dayjs from 'dayjs'
vi.mock('element-plus', () => ({
  ElMessageBox: {
    alert: vi.fn(),
    confirm: vi.fn()
  },
  ElNotification: {
    success: vi.fn(),
    error: vi.fn()
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

describe('[client-dashboard]EasyFormPage', () => {
  let wrapper: any
  const mockTabProvider = {}
  const mockData = [
    { id: 1, name: 'Form 1', createdDate: '2025-01-01', modifiedDate: '2025-01-02', enable: true, processDefinitionKey: 'workflow1' },
    { id: 2, name: 'Form 2', createdDate: '2025-01-03', modifiedDate: '2025-01-04', enable: false, processDefinitionKey: 'workflow2' }
  ]
  beforeEach(async () => {
    wrapper = shallowMount(EasyFormPage, {
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

  it('should handle filter form change', async () => {
    await wrapper.vm.handleFilterFormChange({ isDesc: 'false', orderBy: 'name' })
    expect(wrapper.vm.extraParams).toEqual({ isDesc: false, orderBy: 'name' }) // 确保参数正确更新
    await wrapper.vm.reload() // 重新加载数据
  })

  it('should open email dialog on send action', async () => {
    const row = mockData[0]
    const dialogRef = wrapper.vm.DialogRef
    dialogRef.handleOpen = vi.fn((oitem) => Promise.resolve(oitem));
    await wrapper.vm.handleSend(row)
    expect(dialogRef.handleOpen).toHaveBeenCalledWith(row.id) // 确保 dialog 被正确打开
  })

  it('should navigate to detail page on double click', async () => {
    const row = mockData[0]
    await wrapper.vm.handleDblclick(row)
    expect(mockRouterProvider.navigateTo).toHaveBeenCalled() // 确保导航被调用
  })
 
})
