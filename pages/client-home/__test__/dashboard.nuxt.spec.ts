import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { DashboardPage, DashboardDetailPage } from '#components'
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

describe('[client-dashboard]DashboardPage', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = shallowMount(DashboardPage, {
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

  it('should handle double click action', async () => {
    const row = { name: 'Test Dashboard', createdDate: '2025-01-01' }

    wrapper.vm.handleDblclick(row)

    expect(mockRouterProvider.navigateTo).toHaveBeenCalled()
  })

  it('should handle filter form change', async () => {
    const formModel = { isDesc: 'false', orderBy: 'name' }

    await wrapper.vm.handleFilterFormChange(formModel)

    expect(formModel.isDesc).toBe(false) // 确保 isDesc 被正确设置
    expect(wrapper.vm.extraParams).toEqual(formModel) // 验证 extraParams 更新
    expect(wrapper.vm.reload).toHaveBeenCalled() // 确保 reload 被调用
  })
})
describe('[client-dashboard]DashboardDetailPage', () => {
  let wrapper: any
  const mockTabProvider = {}
  const mockId = 1
  beforeEach(async () => {
    wrapper = shallowMount(DashboardDetailPage, {
      props: {
        id: mockId
      },
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

  it('should fetch info on mount', async () => {
    const mockResponse = {
      data: {
        name: 'Test Widget',
        styleJson: JSON.stringify([{ component: 'chart', settings: {} }])
      }
    }
    publicApi.api.getUserDashboardId.mockResolvedValue(mockResponse)

    await wrapper.vm.getInfo()

    expect(publicApi.api.getUserDashboardId).toHaveBeenCalledWith(mockId)
    expect(wrapper.vm.state.info.name).toBe('Test Widget')
    expect(wrapper.vm.state.layout).toEqual(expect.arrayContaining([expect.objectContaining({ component: 'chart' })]))
  })
  it('should handle empty styleJson gracefully', async () => {
    const mockResponse = {
      data: {
        name: 'Test Widget',
        styleJson: null
      }
    }
    publicApi.api.getUserDashboardId.mockResolvedValue(mockResponse)

    await wrapper.vm.getInfo()

    expect(wrapper.vm.state.layout).toEqual([
      {
        component: 'chart',
        settings: {}
      }
    ]) // layout 应为空数组
  })

  it('should initialize dates correctly', () => {
    const startOfYear = dayjs().startOf('year').format('YYYY-MM-DD')
    const today = dayjs(new Date()).format('YYYY-MM-DD')

    expect(wrapper.vm.state.dates).toEqual([startOfYear, today])
  })
})
