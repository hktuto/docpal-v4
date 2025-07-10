import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import {
  SettingDateTimeSetting,
  SettingUserSetting
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

describe('[admin-setting]SettingDateTimeSetting', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(SettingDateTimeSetting, {
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
  it('renders correctly with title', () => {
    expect(wrapper.find('h2').text()).toBe('admin.setting.title')
  })
 
  it('handles success event correctly', async () => {
    wrapper.vm.handleSuccess()
    expect(mockRouterProvider.message.success).toHaveBeenCalledWith('dpMsg_success')
  })
})
describe('[admin-setting]SettingUserSetting', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(SettingUserSetting, {
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
  it('renders correctly with title', () => {
    expect(wrapper.find('h3').text()).toBe('user.setting.userProfileView')
  })
  it('renders display field list', () => {
    const displayFieldList = wrapper.find('.dragArea.list-group')
    expect(displayFieldList.exists()).toBe(true)
  })
  it('opens dialog on edit icon click', async () => {
    const element = { key: 'testKey', label: 'Test Label', allowUserEdit: true }
    wrapper.vm.state.displayFieldList.push(element)

    await wrapper.vm.$nextTick() // 等待更新

    const editIcon = wrapper.find('.icon-actions svg')
    await editIcon.trigger('click')

    expect(wrapper.vm.state.visible).toBe(true)
    expect(wrapper.vm.editForm.label).toBe('Test Label')
  })

  it('clones item correctly', () => {
    const element = { key: 'testKey', label: 'Test Label' }
    wrapper.vm.cloneItem(element)

    expect(wrapper.vm.state.displayFieldList.length).toBe(1) // 确保只添加一次
  })

  it('removes item correctly', () => {
    const element = { key: 'testKey', label: 'Test Label' }
    wrapper.vm.state.displayFieldList.push(element)
    wrapper.vm.removeItem(element)

    expect(wrapper.vm.state.displayFieldList.length).toBe(0) // 确保已移除
  })

  it('handles handleSubmit correctly', async () => {
    const element = { key: 'testKey', label: 'Test Label' }
    wrapper.vm.state.displayFieldList.push(element)
    adminApi.api.putUserProfileSetting.mockResolvedValueOnce({ code: 200 })
    await wrapper.vm.handleSubmit()
    expect(mockRouterProvider.message.success).toHaveBeenCalledWith('tip_updateSuccessMsg')
  })

})
