import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { Watermark } from '#components'
import { adminApi, clientApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { ElMessageBox, ElMessage, ElSwitch } from 'element-plus'
import { mockRouterProvider } from './util'

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

describe('[admin-watermark]Watermark', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(Watermark, {
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
  it('renders list and detail when list is populated', async () => {
    // Mock the list data
    wrapper.vm.list = [
      { id: '1', name: 'Test Watermark 1' },
      { id: '2', name: 'Test Watermark 2' }
    ]
    await wrapper.vm.$nextTick()

    // expect(wrapper.findComponent({ name: 'WatermarkList' }).exists()).toBe(true)
    // expect(wrapper.findComponent({ name: 'WatermarkDetail' }).exists()).toBe(false)

    // Simulate selecting an item
    await wrapper.vm.handleSwitch('1')
    // expect(wrapper.findComponent({ name: 'WatermarkDetail' }).exists()).toBe(true)
  })

  it('handles item deletion', async () => {
    await wrapper.vm.deleteItem('1')
  })
  it('handles saving watermark details', async () => {
    wrapper.vm.detail = { id: '1', watermarkSettings: [] }
    wrapper.vm.watermarkDetail = {
      save: vi.fn().mockResolvedValue({ update: { id: '1', name: 'Updated Watermark' } })
    }

    await wrapper.vm.save()
    expect(wrapper.vm.routerProvider?.message.success).toHaveBeenCalledWith('admin_watermarkSavedSuccessMsg')
  })
})
