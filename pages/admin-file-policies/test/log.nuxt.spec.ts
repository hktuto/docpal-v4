import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'
import { RetentionAddDialog, ResponsiveFilter } from '#components'
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

describe('[admin-retention]RetentionAddDialog', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(RetentionAddDialog, {
      props: {
        id: 1
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog, Editorjs },
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
    await wrapper.vm.handleOpen()
    await wrapper.vm.$nextTick()
    // const dialogRef = wrapper.vm.$refs.RetentionAddDialogRef;
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

  it('handles form submission', async () => {
    wrapper.vm.state.setting = { id: 1 }
    wrapper.vm.FormRendererRef = {
      vFormRenderRef: {
        getFormData: vi.fn().mockResolvedValue({ actionType: 'A' }),
      },
    }

    await wrapper.vm.handleSubmit()

    expect(adminApi.api.postPolicyRetentions).toHaveBeenCalledWith({
      id: 1,
      actionType: 'D',
    })
    expect(ElMessage.success).toHaveBeenCalledWith('tip_createdSuccessMsg')
    expect(wrapper.vm.state.visible).toBe(false)
  })
  it('does not submit if form data is not valid', async () => {
    wrapper.vm.FormRendererRef = {
      vFormRenderRef: {
        getFormData: vi.fn().mockResolvedValue(null),
      },
    }

    await wrapper.vm.handleSubmit()

    expect(adminApi.api.postPolicyRetentions).not.toHaveBeenCalled()
  })

  it('handles submission error', async () => {
    wrapper.vm.state.setting = { id: 1 }
    wrapper.vm.FormRendererRef = {
      vFormRenderRef: {
        getFormData: vi.fn().mockResolvedValue({ actionType: 'A' }),
      },
    }
    adminApi.api.postPolicyRetentions.mockRejectedValue(new Error('Error'))

    await wrapper.vm.handleSubmit()

    expect(wrapper.vm.state.loading).toBe(false)
    expect(wrapper.vm.state.visible).toBe(true) // 确保对话框保持打开状态
  })
})
