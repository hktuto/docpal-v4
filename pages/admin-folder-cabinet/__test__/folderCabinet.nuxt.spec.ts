import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'
import { AdminFolderCabinetPage, ResponsiveFilter } from '#components'
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

describe('[admin-folder-cabinet]AdminFolderCabinetPage', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(AdminFolderCabinetPage, {
      props: {
        id: 1
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider,
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
        }
      }
    })
    await wrapper.vm.$nextTick()
    const dialogRef = wrapper.vm.$refs.FolderCabinetSettingAddDialogRef;
    dialogRef.handleOpen = vi.fn();
    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.initBar = vi.fn();
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('handles adding a new folder cabinet', async () => {
    wrapper.vm.handleInfo()
    expect(wrapper.vm.FolderCabinetSettingAddDialogRef.handleOpen).toHaveBeenCalled()
  })
  it('handles filter form change', async () => {
    const formModel = { label: 'Test', isDesc: 'false', orderBy: 'label' }

    await wrapper.vm.handleFilterFormChange(formModel)

    expect(wrapper.vm.extraParams).toEqual({
      label: 'Test',
      orderBy: 'label',
      isDesc: false,
    })
    expect(wrapper.vm.reload).toHaveBeenCalled()
  })
  it('handles double click action', async () => {
    const row = { id: 1 }
    const navigateToSpy = vi.spyOn(wrapper.vm.routerProvider, 'navigateTo')

    await wrapper.vm.handleDblclick(row)

    expect(navigateToSpy).toHaveBeenCalled() 
  })
  it('handles deletion confirmation', async () => {
    const row = { id: 1 }

    ElMessageBox.confirm.mockResolvedValue('confirm')
    await wrapper.vm.handleDelete(row)

    expect(ElMessageBox.confirm).toHaveBeenCalled()
    expect(adminApi.api.deleteCabinetId).toHaveBeenCalledWith(1)
    expect(mockRouterProvider.message.success).toHaveBeenCalledWith(expect.anything())
  })
  it('does not delete if confirmation is canceled', async () => {
    ElMessageBox.confirm.mockResolvedValueOnce('cancel')

    const row = { id: 1 }

    await wrapper.vm.handleDelete(row)

    expect(adminApi.api.deleteCabinetId).not.toHaveBeenCalled()
  })
  it('initializes filter options on mount', async () => {
    wrapper.vm.ResponsiveFilterRef = {
      init: vi.fn().mockResolvedValue('true')
    }
    await wrapper.vm.initFilter()

    expect(wrapper.vm.ResponsiveFilterRef.init).toHaveBeenCalled()
  })
})
