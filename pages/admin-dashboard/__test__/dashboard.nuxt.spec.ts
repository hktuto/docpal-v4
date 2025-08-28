import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import {
  DashboardManagePage,
  DashboardManageDetail
} from '#components'
import { adminApi, publicApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { ElMessageBox, ElMessage, ElSwitch } from 'element-plus'
import { mockRouterProvider } from './util'
import { mockQuery} from './setup'
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

describe('[admin-dashboard]DashboardManagePage', () => {
  let wrapper: any
  const mockTabProvider = {}
 console.log(process.env)
  beforeEach(async () => {
    wrapper = mount(DashboardManagePage, {
      props: {
        pageNum: 0,
        pageSize: 20
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
  it('renders correctly with title', () => {
    expect(wrapper.find('.vxe-grid--table-container').exists()).toBe(true) // 根据实际文本调整
  })
  it('opens dialog on create button click', async () => {
    wrapper.vm.DashboardDialogRef = { handleOpen: vi.fn() }
    wrapper.vm.handleConfig()
    expect(wrapper.vm.DashboardDialogRef.handleOpen).toHaveBeenCalled() // 根据实际实现调整
  })
  it('handles double click action correctly', async () => {
    const row = { id: 1, name: 'Test Dashboard' }
    await wrapper.vm.handleDblclick(row)

    // 验证路由跳转
    expect(mockRouterProvider.navigateTo).toHaveBeenCalled()
  })

  it('handles delete item correctly', async () => {
    const row = { id: 1, name: 'Test Dashboard' }
    ElMessageBox.confirm.mockResolvedValue('confirm')

    await wrapper.vm.deleteItem(row)

    // 验证 API 调用
    expect(publicApi.api.deleteUserDashboardId).toHaveBeenCalledWith(row.id)
    expect(mockQuery).toHaveBeenCalled()
  })

  it('initializes filter options on mount', async () => {
    wrapper.vm.ResponsiveFilterRef = {
      init: vi.fn().mockResolvedValue('true')
    }
    await wrapper.vm.getFilter()
    // 检查 ResponsiveFilterRef 是否初始化
    expect(wrapper.vm.ResponsiveFilterRef.init).toHaveBeenCalled()
  })
})
describe('[admin-dashboard]DashboardManageDetail', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(DashboardManageDetail, {
      global: {
        components: { VxeGrid, FormRenderer, VFormRender, ReaderDialog },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key },
          checkLicenseFeatures: () => true
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
  it('renders correctly with title', () => {
    expect(wrapper.find('.template-title').text()).toBe('') // 根据实际文本调整
  })

  it('adds a new widget correctly', async () => {
    const command = { /* widget command object */ }
    await wrapper.vm.handleAdd(command)

    expect(wrapper.vm.state.layout.length).toBe(1) // 确保添加了一个小部件
  })
  it('deletes a widget correctly', async () => {
    const command = { /* widget command object */ }
    await wrapper.vm.handleAdd(command)

    const widgetId = wrapper.vm.state.layout[0].i
    await wrapper.vm.handleDelete(widgetId)

    expect(wrapper.vm.state.layout.length).toBe(0) // 确保小部件已被删除
  })
  it('saves dashboard correctly', async () => {
    vi.spyOn(publicApi.api, 'putUserDashboard').mockResolvedValueOnce({}) // 模拟 API 返回

    await wrapper.vm.handleSave()

    expect(publicApi.api.putUserDashboard).toHaveBeenCalled()
    expect(wrapper.vm.state.saveLoading).toBe(false) // 确保保存后 loading 状态被重置
  })

  it('handles refresh setting correctly', async () => {
    const setting = {
      height: '111'
    }
    const command = { /* widget command object */ }
    await wrapper.vm.handleAdd(command)
    const layoutSetting = JSON.parse(JSON.stringify(wrapper.vm.state.layout[0]))
    layoutSetting.setting = setting
    await wrapper.vm.handleRefresh(layoutSetting)
    const item = wrapper.vm.state.layout.find((item: any) => item.i === layoutSetting.i)
    expect(wrapper.vm.state.layout.find((item: any) => item.i === layoutSetting.i)).toBeTruthy() // 确保布局更新
    expect(item.setting).toStrictEqual(setting)
  })
  it('fetches dashboard info on mount', async () => {
    vi.spyOn(publicApi.api, 'getUserDashboardId').mockResolvedValueOnce({
      data: {
        name: 'Test Dashboard',
        styleJson: JSON.stringify([]) // 模拟返回的数据
      }
    })

    await wrapper.vm.getInfo()

    expect(wrapper.vm.state.info.name).toBe('Test Dashboard') // 确保信息被正确获取
    expect(wrapper.vm.state.layout).toEqual([]) // 确保布局初始化为空
  })

  it('opens dialog for editing', async () => {
    wrapper.vm.DashboardDialogRef = { handleOpen: vi.fn() }
    wrapper.vm.handleEdit()
    expect(wrapper.vm.DashboardDialogRef.handleOpen).toHaveBeenCalled()
  })
})
