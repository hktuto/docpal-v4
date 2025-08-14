import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'
import { AdminHoldPage, HoldDialog, ResponsiveFilter } from '#components'
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
const Editorjs = {
  template: '<div class="Editorjs">Editorjs</div>',
  methods: {}
}

describe('[admin-hold]AdminHoldPage', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(AdminHoldPage, {
      props: {
        setting: {
          name: '1111'
        }
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog, Editorjs },
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
    const dialogRef = wrapper.vm.$refs.HoldDialogRef
    dialogRef.handleOpen = vi.fn()
    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.initBar = vi.fn();
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })

  it('handles filter form change', async () => {
    const filterData = { policyName: 'test' }
    await wrapper.vm.handleFilterFormChange(filterData)

    expect(wrapper.vm.extraParams).toEqual(filterData)
    expect(wrapper.vm.reload).toHaveBeenCalled()
  })
  it('handles add button click', async () => {
    wrapper.vm.handleAdd()
    expect(wrapper.vm.HoldDialogRef.handleOpen).toHaveBeenCalled()
  })
  it('handles double click action', async () => {
    const row = { id: '1', policyName: 'Test Policy' }
    await wrapper.vm.handleDblclick(row)

    expect(wrapper.vm.HoldDialogRef.handleOpen).toHaveBeenCalledWith({
      ...row,
      isEdit: true
    })
  })
  it('handles activation of a policy', async () => {
    const row = { id: '1', status: 'D' }
    await wrapper.vm.handleActive(row, 'A')

    expect(adminApi.api.patchPolicyHoldsIdStatusStatus).toHaveBeenCalledWith('1', 'A')
    expect(row.status).toBe('A')
    expect(mockRouterProvider.message.success).toHaveBeenCalledWith('dpMsg_success')
  })
  it('handles deletion of a policy', async () => {
    const row = { id: '1' }
    ElMessageBox.confirm.mockResolvedValue('confirm')
    await wrapper.vm.deleteItem(row.id)

    expect(ElMessageBox.confirm).toHaveBeenCalled()
    expect(adminApi.api.deletePolicyHoldsId).toHaveBeenCalledWith('1')
    expect(mockRouterProvider.message.success).toHaveBeenCalled()
  })
  it('does not delete if confirmation is canceled', async () => {
    ElMessageBox.confirm.mockResolvedValueOnce('cancel')

    const row = { id: '1' }
    await wrapper.vm.deleteItem(row.id)

    expect(adminApi.api.deletePolicyHoldsId).not.toHaveBeenCalled()
  })
})
describe('[admin-hold]HoldDialog', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(HoldDialog, {
      props: {
        setting: {
          name: '1111'
        }
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog, Editorjs },
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
    wrapper.vm.handleOpen({ isEdit: false })
    await wrapper.vm.$nextTick()
    // const dialogRef = wrapper.vm.$refs.HoldDialogRef;
    // dialogRef.handleOpen = vi.fn();
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
  it('opens dialog for creation', async () => {
    expect(wrapper.vm.state.visible).toBe(true)
    expect(wrapper.vm.state.isEdit).toBe(false)
    expect(wrapper.vm.state.setting).toEqual({})
  })
  it('submits form data for creation', async () => {
    wrapper.vm.state.isEdit = false
    wrapper.vm.state.setting = {}
    const mockFormData = { policyName: 'New Policy' }
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue(mockFormData),
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn()
      }
    }

    await wrapper.vm.handleSubmit()

    expect(adminApi.api.postPolicyHolds).toHaveBeenCalledWith(mockFormData)
    expect(ElMessage.success).toHaveBeenCalledWith('tip_createdSuccessMsg')
    expect(wrapper.vm.state.visible).toBe(false)
  })
  it('submits form data for editing', async () => {
    wrapper.vm.state.isEdit = true
    wrapper.vm.state.setting = { id: '1' }
    const mockFormData = { policyName: 'Updated Policy' }
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue(mockFormData),
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn()
      }
    }

    await wrapper.vm.handleSubmit()

    expect(adminApi.api.putPolicyHolds).toHaveBeenCalledWith({
      ...wrapper.vm.state.setting,
      ...mockFormData
    })
    expect(ElMessage.success).toHaveBeenCalledWith('tip_updateSuccessMsg')
    expect(wrapper.vm.state.visible).toBe(false)
  })
  it('does not submit if form data is not valid', async () => {
    wrapper.vm.FormRendererRef = {
      vFormRenderRef: {
        getFormData: vi.fn().mockResolvedValue(null)
      }
    }

    await wrapper.vm.handleSubmit()

    expect(adminApi.api.postPolicyHolds).not.toHaveBeenCalled()
    expect(adminApi.api.putPolicyHolds).not.toHaveBeenCalled()
  })
})
