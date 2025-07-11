import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { WorkflowManagePage, WorkflowRetryPage, WorkflowReallocateDialog, ResponsiveFilter } from '#components'
import { adminApi, clientApi } from './mock/api'
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

describe('[admin-workflow]WorkflowManagePage', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(WorkflowManagePage, {
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
  it('renders the component correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('handles delete confirmation and deletion', async () => {
    // Mock selected rows
    ElMessageBox.confirm.mockResolvedValue('confirm')
    wrapper.vm.state.selectedRows = [{ instanceId: '1' }]
    await wrapper.vm.handleDeleteSelected()

    expect(mockRouterProvider.message.success).toHaveBeenCalled()
  })

  it('handles filter form change', async () => {
    const formModel = { isDesc: 'false' }
    await wrapper.vm.handleFilterFormChange(formModel)

    expect(formModel.isDesc).toBe(false)
    expect(wrapper.vm.extraParams).toEqual(formModel)
  })

  it('handles reallocation action', async () => {
    const row = { instanceId: '1' }
    const reallocateSpy = vi.spyOn(wrapper.vm, 'handleReallocate')

    await wrapper.vm.handleReallocate(row)

    expect(reallocateSpy).toHaveBeenCalledWith(row) // 确保重新分配方法被调用
  })
})
describe('[admin-workflow]WorkflowReallocateDialog', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(WorkflowReallocateDialog, {
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
  it('renders the component correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('opens the dialog and populates the form', async () => {
    const row = { assignee: 'user123', id: 'task1' }
    await wrapper.vm.handleOpen(row)

    expect(wrapper.vm.dialogVisible).toBe(true)
    expect(wrapper.vm.form.assignee).toBe('user123')
    expect(wrapper.vm.form.id).toBe('task1')
  })

  it('validates form before submission', async () => {
    wrapper.vm.formRef = {
      validate: vi.fn().mockReturnValue(false)
    }
    await wrapper.vm.handleSubmit()

    expect(wrapper.vm.formRef.validate).toHaveBeenCalled()
  })
  it('submits the form and emits success', async () => {
    wrapper.vm.formRef = {
      validate: vi.fn().mockReturnValue(true)
    }
    wrapper.vm.form.assignee = 'newAssignee'
    wrapper.vm.form.oldAssignee = 'oldAssignee'
    wrapper.vm.form.id = 'task1'

    vi.spyOn(adminApi.api, 'postWorkflowTaskUnclaim').mockResolvedValue(true) // Mock API call
    vi.spyOn(adminApi.api, 'postWorkflowTaskClaim').mockResolvedValue(true) // Mock API call
    await wrapper.vm.handleSubmit()
    expect(wrapper.emitted('success')).toBeTruthy()
    expect(wrapper.vm.dialogVisible).toBe(false)
    expect(ElMessage.success).toHaveBeenCalledWith('workflow_ManageReallocateAssigneeSuccessMsg') // Ensure success message is shown
  })
  it('closes the dialog if assignee is unchanged', async () => {
    wrapper.vm.form.oldAssignee = 'user123'
    wrapper.vm.form.assignee = 'user123'

    await wrapper.vm.handleSubmit()

    expect(wrapper.vm.dialogVisible).toBe(false) // Dialog should close without submitting
  })
})
describe('[admin-workflow]WorkflowRetryPage', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(WorkflowRetryPage, {
      global: {
        components: { VxeGrid, FormRenderer, ResponsiveFilter, VFormRender, ReaderDialog },
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

    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.loadData = vi.fn();
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('renders the table correctly', () => {
    console.log(wrapper.html())
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.vxe-grid').exists()).toBe(true)
  })
  it('handles filter form change', async () => {
    const filterForm = {
      businessKey: 'testBusinessKey',
      isDesc: false,
      orderBy: 'startTime'
    }
    await wrapper.vm.handleFilterFormChange(filterForm)

    expect(wrapper.vm.extraParams.businessKey).toBe('testBusinessKey')
    expect(wrapper.vm.extraParams.isDesc).toBe(true) // should convert to true
    expect(wrapper.vm.extraParams.orderBy).toBe('startTime')
  })
  it('calls the retry API on retry action', async () => {
    const row = { id: 1 }
    vi.spyOn(adminApi.api, 'postWorkflowRetryFailWorkflow').mockResolvedValue(true) // Mock API call

    await wrapper.vm.handleRetry(row.id)
    expect(mockQuery).toHaveBeenCalled()
    expect(adminApi.api.postWorkflowRetryFailWorkflow).toHaveBeenCalledWith({ id: 1 }) // Ensure API is called with correct id
  })
})
