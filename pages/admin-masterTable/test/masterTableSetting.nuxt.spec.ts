import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'
import { MasterTableSettingName, MasterTableSettingPermission, MasterTableSettingAddPermissionDialog, MasterTableSettingActive,ResponsiveFilter } from '#components'
import { ElMessageBox, ElNotification, ElMessage } from 'element-plus'
import { mockQuery, mockTable } from './setup'
vi.mock('element-plus', () => ({
  ElMessageBox: {
    alert: vi.fn(),
    confirm: vi.fn()
  },
  ElNotification: vi.fn(),
  ElMessage: {
    success: vi.fn(),
    warning: vi.fn()
  }
}))
const Icon = {
  template: '<div class="Icon">Icon</div>',
  methods: {}
}
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


describe('[admin-master-table]MasterTableSettingName', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(MasterTableSettingName, {
      props: {
        tableId: 'test-id'
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog, Icon },
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

    // const MasterTableTabRecordsRef = wrapper.vm.$refs.MasterTableTabRecordsRef;
    // MasterTableTabRecordsRef.initTableColumns = vi.fn();
    // const logRef = wrapper.vm.$refs.logRef;
    // logRef.refresh = vi.fn();
  })
  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('renders correctly', () => {
    expect(wrapper.find('.title').text()).toBe('master.setting.name')
    expect(wrapper.find('.description').text()).toBe('master.setting.nameDescription')
  })
  it('shows error when name is empty', async () => {
    await wrapper.find('button').trigger('click')
    wrapper.vm.handleSave()
    expect(mockRouterProvider.message.error).toHaveBeenCalledWith('master.setting.namerender.hint.fieldRequired')
  })

  it('saves the name successfully', async () => {
    wrapper.vm.state.name = 'New Name'
    adminApi.api.putMasterTables.mockResolvedValueOnce({})
    await wrapper.vm.handleSave()
    expect(mockRouterProvider.message.success).toHaveBeenCalledWith('dpMsg_success')
  })

  it('handles save error', async () => {
    wrapper.vm.state.name = 'New Name'
    adminApi.api.putMasterTables.mockRejectedValueOnce(new Error('Error'))
    await wrapper.vm.handleSave()
    expect(mockRouterProvider.message.success).not.toHaveBeenCalled()
  })
})
describe('[admin-master-table]MasterTableSettingPermission', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = shallowMount(MasterTableSettingPermission, {
      props: {
        table: { id: '123', masterTableName: 'Test Table' },
        tableId: '123'
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog, Icon },
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

    // const MasterTableTabRecordsRef = wrapper.vm.$refs.MasterTableTabRecordsRef;
    // MasterTableTabRecordsRef.initTableColumns = vi.fn();
    // const logRef = wrapper.vm.$refs.logRef;
    // logRef.refresh = vi.fn();
  })
  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })

  it('adds a permission', async () => {
    wrapper.vm.AddPermissionDialogRef = {
      handleOpen: vi.fn()
    }
    wrapper.vm.handleAdd()
    expect(wrapper.vm.AddPermissionDialogRef.handleOpen).toHaveBeenCalled()
  })
  it('removes a permission', async () => {
    const row = { masterTableId: '123', userId: '456', masterTableName: 'Test Table', loading: false }
    ElMessageBox.confirm.mockResolvedValue('confirm')
    await wrapper.vm.handleRemove(row)
    expect(mockRouterProvider.message.success).toHaveBeenCalledWith('masterTable_settingRemoveSuccessMsg')
  })

  it('handles permission change', async () => {
    const row = { userId: '456', loading: false }
    await wrapper.vm.handlePermissionChange(true, 'edit', row)
    expect(adminApi.api.postMasterTablesAclsRemove).toHaveBeenCalledWith({
      ...row,
      edit: true,
      loading: true
    })
  })

  it('initializes table data', async () => {
    adminApi.api.getMasterTablesIdAcls.mockResolvedValueOnce({ data: [] })
    await wrapper.vm.init()
    expect(wrapper.vm.state.tableData).toEqual([])
  })
})
describe('[admin-master-table]MasterTableSettingAddPermissionDialog', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = shallowMount(MasterTableSettingAddPermissionDialog, {
      props: {
        exitList: [],
        tableId: '123'
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog, Icon },
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
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn(() => Promise.resolve({ name: '123', userId: '456' })),
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn(),
        getWidgetRef: vi.fn(() => ({ loadOptions: () => vi.fn() }))
      }
    }
    wrapper.vm.state.visible = true

    // const MasterTableTabRecordsRef = wrapper.vm.$refs.MasterTableTabRecordsRef;
    // MasterTableTabRecordsRef.initTableColumns = vi.fn();
    // const logRef = wrapper.vm.$refs.logRef;
    // logRef.refresh = vi.fn();
  })
  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('opens the dialog', async () => {
    await wrapper.vm.handleOpen()
    expect(wrapper.vm.state.visible).toBe(true)
  })
  it('submits the form and shows success message', async () => {
    adminApi.api.postMasterTablesAclsAdd.mockResolvedValueOnce({})

    await wrapper.vm.handleSubmit()

    expect(adminApi.api.postMasterTablesAclsAdd).toHaveBeenCalledWith({
      masterTableId: '123',
      userId: '456',
      name: '123'
    })
    
    expect(ElMessage.success).toHaveBeenCalledWith('tip_createdSuccessMsg')
    expect(wrapper.vm.state.visible).toBe(false)
  })
  it('handles submit error', async () => {
    adminApi.api.postMasterTablesAclsAdd.mockRejectedValueOnce(new Error('Error'))
    await wrapper.vm.handleSubmit()
    expect(ElMessage.success).not.toHaveBeenCalled()
    expect(wrapper.vm.state.visible).toBe(true) 
  })
})
describe('[admin-master-table]MasterTableSettingActive', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(MasterTableSettingActive, {
      props: {
        exitList: [],
        tableId: '123'
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog, Icon },
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
    // const MasterTableTabRecordsRef = wrapper.vm.$refs.MasterTableTabRecordsRef;
    // MasterTableTabRecordsRef.initTableColumns = vi.fn();
    // const logRef = wrapper.vm.$refs.logRef;
    // logRef.refresh = vi.fn();
  })
  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('renders correctly', () => {
    expect(wrapper.find('.title').text()).toBe('master.setting.active')
    expect(wrapper.find('.description').text()).toBe('master.setting.activeDescription')
  })
  it('saves the active status', async () => {
    adminApi.api.putMasterTables.mockResolvedValueOnce({})

    await wrapper.vm.handleSave()

    expect(adminApi.api.putMasterTables).toHaveBeenCalledWith({
      id: '123',
      status: 'D', // 默认状态为 'D'
    })
  })
  it('handles save error', async () => {
    adminApi.api.putMasterTables.mockRejectedValueOnce(new Error('Error'))

    await wrapper.vm.handleSave()

    expect(wrapper.vm.state.isActive).toBe('A')
  })
})
