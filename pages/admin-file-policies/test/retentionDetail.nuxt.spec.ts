import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'
import { RetentionDetail, ResponsiveFilter } from '#components'
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

describe('[admin-retention]RetentionDetail', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(RetentionDetail, {
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

  it('initializes setting on activation', async () => {
    await wrapper.vm.init()

    expect(adminApi.api.getPolicyRetentionsId).toHaveBeenCalledWith(1)
    
    await new Promise(resolve => setTimeout(resolve, 300)); 
    expect(wrapper.vm.state.setting).toEqual({ id: 1, status: 'A', actionType: false })
  })
  it('handles form submission', async () => {
    wrapper.vm.state.setting = { id: 1, status: 'A' }
    wrapper.vm.FormRendererRef = {
      vFormRenderRef: {
        getFormData: vi.fn().mockResolvedValue({ actionType: 'A' }),
        setFormData: vi.fn(),
      },
    }

    await wrapper.vm.handleSubmit()

    expect(adminApi.api.putPolicyRetentions).toHaveBeenCalledWith({
      id: 1,
      status: 'A',
      actionType: 'D',
    })
    expect(mockRouterProvider.message.success).toHaveBeenCalledWith('tip_updateSuccessMsg')
  })
  it('handles status changes', async () => {
    wrapper.vm.state.setting = { id: 1, status: 'D' }

    await wrapper.vm.handleSetStatus('A')

    expect(adminApi.api.patchPolicyRetentionsIdStatusStatus).toHaveBeenCalledWith(1, 'A')
    expect(wrapper.vm.state.setting.status).toBe('A')
    expect(mockRouterProvider.message.success).toHaveBeenCalledWith('dpMsg_success')
  })
})
