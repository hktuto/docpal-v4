import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'
import { AdminSmartFolderPage, AdminSmartFolderDetail, SmartFolderInfoDialog, ResponsiveFilter } from '#components'
import { ElMessageBox, ElNotification, ElMessage } from 'element-plus'
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
  template: '<div class="FormRenderer">FormRenderer</div>',
  methods: {}
}
const ReaderDialog = {
  template: '<div class="FormRenderer">FormRenderer</div>',
  methods: {}
}
const SearchGroupTable = {
  template: '<div class="SearchGroupTable" ref="tableRef">SearchGroupTable</div>',
  methods: {
    initBar: vi.fn()
  }
}
describe('[admin-smart-folder]AdminAdminSmartFolderPage', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(AdminSmartFolderPage, {
      props: {
        docType: { name: 'Test Document Type' }
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog },
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
    const dialogRef = wrapper.vm.$refs.SmartFolderInfoDialogRef
    dialogRef.handleOpen = vi.fn()
    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.loadData = vi.fn();
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('renders correctly', async () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should fetch filter options on mount', async () => {
    wrapper.vm.ResponsiveFilterRef = {
      init: vi.fn().mockResolvedValue('true')
    }
    await wrapper.vm.getFilter()
    expect(adminApi.api.getNuxeoSfolderPageConditions).toHaveBeenCalled()
  })
  it('should delete a smart folder and show success message', async () => {
    const id = '123'
    ElMessageBox.confirm.mockResolvedValue('confirm')
    await wrapper.vm.handleDelete(id)
    expect(adminApi.api.deleteNuxeoSfolderId).toHaveBeenCalledWith(id)
    expect(mockRouterProvider.message.success).toHaveBeenCalledWith(expect.stringContaining('tip_deleteSuccessMessage'))
    expect(mockQuery).toHaveBeenCalledWith()
  })

  it('should open the dialog for creating a new smart folder', async () => {
    const dialogRef = wrapper.vm.$refs.SmartFolderInfoDialogRef
    wrapper.vm.handleCreate()
    expect(dialogRef.handleOpen).toHaveBeenCalled()
  })
  it('should handle filter form changes', async () => {
    const formModel = { name: 'Test' }
    wrapper.vm.handleFilterFormChange(formModel)
    expect(wrapper.vm.extraParams).toEqual(formModel)
    expect(wrapper.vm.reload).toHaveBeenCalled()
  })
  it('should navigate to the smart folder detail page on double click', async () => {
    const row = { id: '123' }
    wrapper.vm.handleDblclick(row)
    expect(mockRouterProvider.navigateTo).toHaveBeenCalledWith(expect.anything(), false)
  })
})
describe('[admin-smart-folder]AdminSmartFolderDetail', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = shallowMount(AdminSmartFolderDetail, {
      props: {
        id: 'sm'
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog, SearchGroupTable },
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
    const tableRef = wrapper.vm.$refs.tableRef
    tableRef.initBar = vi.fn()
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('renders correctly', async () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should initialize settings on mount', async () => {
    await wrapper.vm.handleInit()
    expect(adminApi.api.getNuxeoSfolderId).toHaveBeenCalledWith('sm')
  })
  it('should save settings and show success message', async () => {
    const data = { condition: 'and', docId: '', query: [] }
    wrapper.vm.filterRef = {
      getData: vi.fn(() => Promise.resolve(data))
    }

    await wrapper.vm.handleSave()
    expect(adminApi.api.patchNuxeoSfolder).toHaveBeenCalledWith(
      expect.objectContaining({
        json_value: JSON.stringify(data)
      })
    )
  })
  it('should clear filters', async () => {
    wrapper.vm.filterRef = {
      clear: vi.fn()
    }
    await wrapper.vm.handleClear()
    expect(wrapper.vm.filterRef.clear).toHaveBeenCalled()
  })
  test('should test the query and update the table', async () => {
    const data = [{ id: '1', name: 'Test' }]
    wrapper.vm.filterRef = {
      getData: vi.fn(() => Promise.resolve(data))
    }
    await wrapper.vm.$nextTick()
    await wrapper.vm.handleTest()
    expect(wrapper.vm.$refs.tableRef.initBar).toHaveBeenCalled()
  })
})
describe('[admin-smart-folder]SmartFolderInfoDialog', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(SmartFolderInfoDialog, {
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog, SearchGroupTable },
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
  it('renders correctly', async () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should open for creating a new folder', async () => {
    await wrapper.vm.handleOpen()
    expect(wrapper.vm.state.visible).toBe(true)
    expect(wrapper.vm.state.title).toBe(wrapper.vm.$t('doc_typeSmartFolderCreateFolder'))
  })
  it('should submit the form and show success message', async () => {
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn(() => Promise.resolve({ name: 'Test Folder', access: ['user1', 'user2'] }))
    }

    await wrapper.vm.handleSubmit()
    expect(adminApi.api.patchNuxeoSfolder).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Test Folder',
        bind: 'user1,user2'
      })
    )
    expect(ElMessage.success).toHaveBeenCalled()
    expect(wrapper.vm.state.visible).toBe(false)
    expect(wrapper.emitted('refresh')).toBeTruthy()
  })
  it('should handle opening with existing settings', async () => {
    const setting = { name: 'Existing Folder', bind: 'user1,user2' }
    await wrapper.vm.handleOpen(setting)
    expect(wrapper.vm.state.visible).toBe(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))
    expect(wrapper.vm.state.title).toBe(wrapper.vm.$t('doc_typeSmartFolderInfo'))
    expect(wrapper.vm.state.setting).toEqual({ access: ['user1', 'user2'], ...setting })
  })
})
