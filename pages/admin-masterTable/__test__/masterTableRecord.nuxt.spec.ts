import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'
import { MasterTableTabLog, MasterTableTabSchema, MasterTableTabTables, ResponsiveFilter } from '#components'
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
describe('[admin-master-table]MasterTableTabLog', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(MasterTableTabLog, {
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
    expect(wrapper.exists()).toBe(true)
  })
  it('fetches filter options on activation', async () => {
    adminApi.api.postMasterTablesLogsPageConditions.mockResolvedValueOnce({
      data: [
        { key: 'someKey', label: 'Some Label' },
        { key: 'orderBy', label: 'Sort By' },
        { key: 'isDesc', label: 'Sort Order' }
      ]
    })

    await wrapper.vm.getFilter()

    expect(adminApi.api.postMasterTablesLogsPageConditions).toHaveBeenCalled()
  })

  it('handles filter form changes', async () => {
    const formModel = { isDesc: 'false' }
    await wrapper.vm.handleFilterFormChange(formModel)

    expect(formModel.isDesc).toBe(false)
    expect(wrapper.vm.filtersParams).toEqual(formModel)
  })
})
describe('[admin-master-table]MasterTableTabSchema', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = shallowMount(MasterTableTabSchema, {
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

    // const logRef = wrapper.vm.$refs.logRef;
    // logRef.refresh = vi.fn();
  })
  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('handles single schema add', async () => {
    wrapper.vm.schemaDialogRef = {
      handleOpen: vi.fn()
    }
    wrapper.vm.handleSingleSchemaAdd()
    expect(wrapper.vm.schemaDialogRef.handleOpen).toHaveBeenCalled()
  })
  it('adds a schema', async () => {
    adminApi.api.postMasterTablesColumnAdd.mockResolvedValueOnce({})

    const schema = { columnName: 'newColumn', dataType: 'varchar' }
    await wrapper.vm.handleAddSchama(schema)

    expect(adminApi.api.postMasterTablesColumnAdd).toHaveBeenCalledWith({
      id: 'test-id',
      ...schema
    })
    expect(wrapper.emitted('refresh')).toBeTruthy()
  })

  it('handles errors when adding a schema', async () => {
    adminApi.api.postMasterTablesColumnAdd.mockRejectedValueOnce(new Error('Error'))

    const schema = { columnName: 'newColumn', dataType: 'varchar' }
    await wrapper.vm.handleAddSchama(schema)
    expect(wrapper.emitted('refresh')).toBeFalsy()
  })
})
describe('[admin-master-table]MasterTableTabTables', () => {
  let wrapper: any
  const mockTabProvider = {}
  const masterTableProvider = {
    openNew: vi.fn(),
    DeleteMasterTablesApi: vi.fn(),
    UpdateMasterTableApi: vi.fn(),
    GetMasterTablesPageConditionApi: vi.fn(),
  }
  beforeEach(async () => {
    wrapper = shallowMount(MasterTableTabTables, {
      props: {
        tableId: 'test-id'
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog, Icon },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider,
          [MasterTableProviderKey]: masterTableProvider
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
        }
      }
    })
    await wrapper.vm.$nextTick()

    // const logRef = wrapper.vm.$refs.logRef;
    // logRef.refresh = vi.fn();
  })
  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('handles adding a new master table', async () => {
    wrapper.vm.handleAdd()
    expect(masterTableProvider.openNew).toHaveBeenCalled()
  })
  it('handles deletion confirmation', async () => {
    const row = { name: 'Test Table', id: '123' }
    ElMessageBox.confirm.mockResolvedValueOnce('confirm')
    masterTableProvider.DeleteMasterTablesApi.mockResolvedValueOnce(true)

    await wrapper.vm.handleDelete(row)

    expect(masterTableProvider.DeleteMasterTablesApi).toHaveBeenCalledWith('123')
    expect(mockRouterProvider.message.success).toHaveBeenCalled()
  })

  it('handles deletion failure', async () => {
    const row = { name: 'Test Table', id: '123' }
    ElMessageBox.confirm.mockResolvedValueOnce('confirm')
    masterTableProvider.DeleteMasterTablesApi.mockResolvedValueOnce(false)

    await wrapper.vm.handleDelete(row)

    expect(mockRouterProvider.message.error).toHaveBeenCalledWith('dpTip.deleteFailed')
  })

  it('handles status activation', async () => {
    const row = { id: '123', status: 'D' }
    masterTableProvider.UpdateMasterTableApi.mockResolvedValueOnce(true)

    await wrapper.vm.handleActive(row, 'A')

    expect(row.status).toBe('A')
    expect(masterTableProvider.UpdateMasterTableApi).toHaveBeenCalledWith({ id: '123', status: 'A' })
  })
  it('handles status activation failure', async () => {
    const row = { id: '123', status: 'D' }
    masterTableProvider.UpdateMasterTableApi.mockRejectedValueOnce(new Error('Error'))

    await wrapper.vm.handleActive(row, 'A')

    expect(row.status).toBe('D') // Should remain as 'D' after failure
  })

  it('fetches filter options on mount', async () => {
    masterTableProvider.GetMasterTablesPageConditionApi.mockResolvedValueOnce({ data: [] })

    await wrapper.vm.getFilter()

    expect(masterTableProvider.GetMasterTablesPageConditionApi).toHaveBeenCalled()
  })
})
