import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'
import { AdminRetentionPage, ResponsiveFilter } from '#components'
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

describe('[admin-azure]AdminRetentionPage', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = shallowMount(AdminRetentionPage, {
      props: {
        page: 1,
        pageSize: 10
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog, Editorjs },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key },

        }
      }
    })
    await wrapper.vm.$nextTick()
    const dialogRef = wrapper.vm.$refs.RetentionAddDialogRef;
    dialogRef.handleOpen = vi.fn();
    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.initBar = vi.fn();
  })

  afterEach(() => {
    vi.clearAllMocks()
  })
  it('renders correctly', async () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('handles adding a new retention policy', async () => {
    wrapper.vm.handleAdd()
    expect(wrapper.vm.RetentionAddDialogRef.handleOpen).toHaveBeenCalled()
  })
  
  it('fetches filter options on mount', async () => {
    wrapper.vm.ResponsiveFilterRef = {
      init: vi.fn()
    }
    await wrapper.vm.getFilter()

    expect(adminApi.api.getPolicyRetentionsPageConditions).toHaveBeenCalled()
  })
  it('handles status activation', async () => {
    const row = { id: 1, status: 'D' }

    await wrapper.vm.handleActive(row, 'A')

    expect(adminApi.api.patchPolicyRetentionsIdStatusStatus).toHaveBeenCalledWith(1, 'A')
    expect(row.status).toBe('A')
    expect(mockRouterProvider.message.success).toHaveBeenCalledWith('dpMsg_success')
  })

  it('handles deletion confirmation', async () => {
    const row = { id: 1 }

    ElMessageBox.confirm.mockResolvedValue('confirm')
    await wrapper.vm.deleteItem(1)

    expect(ElMessageBox.confirm).toHaveBeenCalled()
    expect(adminApi.api.deletePolicyRetentionsId).toHaveBeenCalledWith(1)
    expect(mockRouterProvider.message.success).toHaveBeenCalledWith('tip_deleteSuccessMessage')
  })
  it('does not delete if confirmation is canceled', async () => {
    ElMessageBox.confirm.mockResolvedValueOnce('cancel')

    await wrapper.vm.deleteItem(1)

    expect(adminApi.api.deletePolicyRetentionsId).not.toHaveBeenCalled()
  })
  it('handles filter form change', async () => {
    const formModel = { policyName: 'test' }

    await wrapper.vm.handleFilterFormChange(formModel)

    expect(wrapper.vm.extraParams).toEqual(formModel)
    expect(wrapper.vm.reload).toHaveBeenCalled()
  })

})

