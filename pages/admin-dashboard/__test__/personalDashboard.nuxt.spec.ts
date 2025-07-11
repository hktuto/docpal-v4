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

describe('[admin-dashboard]PersonalDashboardManageDetail', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(PersonalDashboardManageDetail, {
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
    expect(wrapper.find('.template-title').exists()).toBe(true)
  })
  it('handles add command', async () => {
    const command = 'someCommand' // 根据实际命令调整
    await wrapper.vm.handleAdd(command)

    expect(wrapper.vm.state.layout.length).toBeGreaterThan(0) // 确保布局中有元素
  })

  it('handles delete action', async () => {
    const item = { i: '1', name: 'Test Widget' }
    wrapper.vm.state.layout.push(item)

    await wrapper.vm.handleDelete(item.i)

    expect(wrapper.vm.state.layout).not.toContain(item) // 确保项目已被删除
  })

  it('handles refresh action', async () => {
    const layoutSetting = { i: '1', name: 'Updated Widget' }
    wrapper.vm.state.layout.push(layoutSetting)

    await wrapper.vm.handleRefresh(layoutSetting)

    expect(wrapper.vm.state.layout).toContainEqual(expect.objectContaining(layoutSetting)) // 确保布局已更新
  })
  it('saves data correctly', async () => {
    vi.spyOn(adminApi.api, 'putPersonalDashboardUpdate').mockResolvedValue({})

    wrapper.vm.state.info = { name: 'Test Dashboard' }
    await wrapper.vm.handleSave()

    expect(adminApi.api.putPersonalDashboardUpdate).toHaveBeenCalledWith({
      ...wrapper.vm.state.info,
      styleJson: JSON.stringify(wrapper.vm.state.layout)
    })
  })

  it('fetches info on mount', async () => {
    vi.spyOn(adminApi.api, 'getPersonalDashboardId').mockResolvedValue({
      data: { name: 'Test Dashboard', styleJson: JSON.stringify([]) }
    })

    await wrapper.vm.getInfo()

    expect(wrapper.vm.state.info.name).toBe('Test Dashboard') // 确保信息被正确获取
    expect(wrapper.vm.state.layout).toEqual([]) // 确保布局为空
  })
  it('handles error during save', async () => {
    vi.spyOn(adminApi.api, 'putPersonalDashboardUpdate').mockRejectedValue(new Error('Save error'))

    await wrapper.vm.handleSave()

    // 可以根据需要检查是否有错误处理逻辑
  })
})

describe('[admin-dashboard]PersonalDashboardDialog', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(PersonalDashboardDialog, {
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

  it('handles successful form submission', async () => {
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue({ name: 'Test', groupId: ['1'] })
    }

    vi.spyOn(adminApi.api, 'postPersonalDashboardSave').mockResolvedValue({
      data: { id: 1, name: 'Test' }
    })

    await wrapper.vm.handleSubmit()

    expect(wrapper.vm.state.visible).toBe(false) // 确保对话框关闭
    expect(wrapper.vm.state.loading).toBe(false) // 确保 loading 状态为 false
    expect(ElMessage.success).toHaveBeenCalled()
  })
  it('handles edit form submission', async () => {
    wrapper.vm.state.edit = true
    wrapper.vm.state.setting = { id: 1 }

    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue({ name: 'Updated Test', groupId: ['1'] })
    }

    vi.spyOn(adminApi.api, 'putPersonalDashboardUpdate').mockResolvedValue({})

    await wrapper.vm.handleSubmit()

    expect(wrapper.vm.state.visible).toBe(false) // 确保对话框关闭
    expect(wrapper.vm.state.loading).toBe(false) // 确保 loading 状态为 false
    expect(ElMessage.success).toHaveBeenCalledWith('tip_updateSuccessMsg')
  })
  it('handles opening the dialog for creating a new item', async () => {
    await wrapper.vm.handleOpen()

    expect(wrapper.vm.state.visible).toBe(true) // 确保对话框可见
    expect(wrapper.vm.state.edit).toBe(false) // 确保不是编辑状态
  })

  it('handles opening the dialog for editing an existing item', async () => {
    const setting = { id: 1, name: 'Edit Test', groupId: ['1'] }
    await wrapper.vm.handleOpen(setting)

    expect(wrapper.vm.state.visible).toBe(true) // 确保对话框可见
    expect(wrapper.vm.state.edit).toBe(true) // 确保处于编辑状态
  })
})
