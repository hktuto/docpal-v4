import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'
import { RetentionPage, AzureSettingOcr, AzureSettingMappingTable, AzureSettingLogTable, AzureSettingApi, ResponsiveFilter } from '#components'
import { ElMessageBox, ElNotification, ElMessage } from 'element-plus'
import { mockQuery, mockTable } from './setup'
import { useRuntimeConfig } from 'nuxt/app'
vi.mock('nuxt/app', () => ({
  useRuntimeConfig: vi.fn()
}))
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

describe('[admin-azure]RetentionPage', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = shallowMount(RetentionPage, {
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
          useRuntimeConfig: () => {
            return {
              public: {
                endPoint: {
                  docpal: 'ttt'
                }
              }
            }
          }
        }
      }
    })
    await wrapper.vm.$nextTick()
    // const dialogRef = wrapper.vm.$refs.SmartFolderInfoDialogRef;
    // dialogRef.handleOpen = vi.fn();
    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.initBar = vi.fn();
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('renders correctly', async () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('initializes Azure settings', async () => {
    adminApi.api.getAzureOcrQueryazuresetting.mockResolvedValueOnce({
      data: {
        azureOcrApiKey: {},
        azureOcrSetting: {},
        azureOcrProfileMappings: [],
        ocrTransactionLogs: {}
      }
    })

    await wrapper.vm.init()

    expect(adminApi.api.getAzureOcrQueryazuresetting).toHaveBeenCalled()
    expect(wrapper.vm.azureSetting).toEqual({
      azureOcrApiKey: {},
      azureOcrSetting: {},
      azureOcrProfileMappings: [],
      ocrTransactionLogs: {}
    })
  })
  it('initializes log conditions', async () => {
    adminApi.api.getAzureOcrConditions.mockResolvedValueOnce({
      data: {}
    })
    await wrapper.vm.$nextTick()
    wrapper.vm.ResponsiveFilterRef = {
      init: vi.fn().mockResolvedValue('true')
    }
    await wrapper.vm.initLogCondition()

    expect(adminApi.api.getAzureOcrConditions).toHaveBeenCalled()
    expect(wrapper.vm.ResponsiveFilterRef.init).toHaveBeenCalled()
  })
  it('handles filter form change', async () => {
    const formData = { name: 'test' }
    wrapper.vm.logTableRef = {
      reload: vi.fn()
    }
    wrapper.vm.handleFilterFormChange(formData)

    expect(wrapper.vm.filterFormdata).toEqual(formData)
    expect(wrapper.vm.logTableRef.reload).toHaveBeenCalled()
  })
})

