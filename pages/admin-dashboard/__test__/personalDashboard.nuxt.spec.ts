import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { PersonalDashboardManagePage, PersonalDashboardManageDetail, PersonalDashboardDialog } from '#components'
import { adminApi, publicApi } from './mock/api'
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

describe('[admin-dashboard]PersonalDashboardManagePage', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(PersonalDashboardManagePage, {
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
    expect(wrapper.find('.pageContainer--padding').exists()).toBe(true)
  })

  it('handles create action', async () => {
    wrapper.vm.DashboardDialogRef = { handleOpen: vi.fn() }
    wrapper.vm.handleConfig()
    expect(wrapper.vm.DashboardDialogRef.handleOpen).toHaveBeenCalled() // 确保打开对话框
  })
  it('handles double click action', async () => {
    const row = { id: 1, name: 'Test Dashboard' }
    await wrapper.vm.handleDblclick(row)

    expect(mockRouterProvider.navigateTo).toHaveBeenCalled()
  })
  it('deletes an item correctly', async () => {
    const row = { id: 1, name: 'Test Dashboard' }
    vi.spyOn(ElMessageBox, 'confirm').mockResolvedValueOnce('confirm') // 模拟确认对话框

    await wrapper.vm.deleteItem(row)

    expect(ElMessageBox.confirm).toHaveBeenCalledWith(expect.stringContaining('workPanel_deleteMsg'), expect.any(Object))
    expect(adminApi.api.deletePersonalDashboardId).toHaveBeenCalledWith(row.id)
    expect(wrapper.vm.routerProvider.message.success).toHaveBeenCalled()
  })

  it('handles filter form change', async () => {
    const formModel = { name: 'Test', orderBy: 'createdDate', isDesc: true }
    await wrapper.vm.handleFilterFormChange(formModel)

    expect(wrapper.vm.extraParams).toEqual({
      name: 'Test',
      orderBy: 'createdDate',
      isDesc: true
    })
    expect(wrapper.vm.reload).toHaveBeenCalled() // 确保重新加载数据
  })

  it('fetches filter data on mount', async () => {
    wrapper.vm.ResponsiveFilterRef = {
      init: vi.fn().mockResolvedValue('true')
    }
    await wrapper.vm.getFilter()

    expect(wrapper.vm.ResponsiveFilterRef.init).toHaveBeenCalled()
  })
})
