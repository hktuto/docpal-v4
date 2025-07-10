import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import {
  PasswordPolicy,
  PasswordPolicySwitch
} from '#components'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { ElMessageBox, ElMessage, ElSwitch } from 'element-plus'
import { mockRouterProvider } from './util'

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

describe('[admin-password-policy]PasswordPolicy', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(PasswordPolicy, {
      props: {
        pageNum: 0,
        pageSize: 20
      },
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
  it('should load initial password policy configuration', async () => {
    adminApi.api.getPasswordConfig.mockResolvedValue({
      data: {
        minPasswordLength: 10,
        containLowerAndUppercase: true,
        containNumericDigits: true,
        containSpecialCharacters: true,
        forceResetPassword: false,
        enableExpirationTime: true,
        expirationDay: 30,
        enableLockoutPolicy: true,
        retryPeriod: 5,
        lockoutPeriod: 20,
        lockoutCount: 3,
        enableReusePasswordLimit: true,
        reusePasswordCount: 2
      }
    })

    await wrapper.vm.init()
    await nextTick()

    expect(wrapper.vm.form.minPasswordLength).toBe(10)
    expect(wrapper.vm.form.containLowerAndUppercase).toBe(true)
    expect(wrapper.vm.form.enableExpirationTime).toBe(true)
  })
  
  it('should save password policy configuration', async () => {
    wrapper.vm.form.minPasswordLength = 12
    wrapper.vm.form.containLowerAndUppercase = false
    wrapper.vm.form.enableLockoutPolicy = true
    console.log('init')
    adminApi.api.postPasswordSaveConfig.mockResolvedValue({})
    console.log(wrapper.vm.form)
    await wrapper.vm.handleSave()
    await nextTick()

    expect(adminApi.api.postPasswordSaveConfig).toHaveBeenCalled()
    expect(ElMessage.success).toHaveBeenCalledWith(wrapper.vm.$t('passwordPolicy.saveSuccess'))
  })
  it('should handle error when loading password policy', async () => {
    adminApi.api.getPasswordConfig.mockRejectedValue(new Error('Failed to load'))

    await wrapper.vm.init()
    await nextTick()

    expect(ElMessage.error).toHaveBeenCalledWith(wrapper.vm.$t('passwordPolicy.loadError'))
  })
  it('should handle error when saving password policy', async () => {
    adminApi.api.postPasswordSaveConfig.mockRejectedValue(new Error('Failed to save'))

    await wrapper.vm.handleSave()
    await nextTick()

    expect(ElMessage.error).toHaveBeenCalledWith(wrapper.vm.$t('passwordPolicy.saveError'))
  })
})
describe('[admin-password-policy]PasswordPolicySwitch', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(PasswordPolicySwitch, {
      props: {
        label: 'Test Label',
        value: false,
        description: 'Test Description',
        disabled: false
      },
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
  it('renders correctly with props', async () => {
    console.log(wrapper.html())
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.label').text()).toBe('Test Label')
    expect(wrapper.find('.description').text()).toBe('Test Description')
  })
  it('updates localValue when value prop changes', async () => {
    await wrapper.setProps({ value: true })
    expect(wrapper.vm.localValue).toBe(true)
  })

})
