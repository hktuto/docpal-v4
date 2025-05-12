import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'
import { MasterTableTabLog, ResponsiveFilter } from '#components'
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
    expect(wrapper.find('.title').text()).toBe('master.setting.name')
    expect(wrapper.find('.description').text()).toBe('master.setting.nameDescription')
  })
})
