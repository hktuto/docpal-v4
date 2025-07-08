import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'
import { AzurePage, AzureSettingOcr, AzureSettingMappingTable, AzureSettingLogTable, AzureSettingApi, ResponsiveFilter } from '#components'
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

describe('[admin-azure]AzurePage', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {

    wrapper = shallowMount(AzurePage, {
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

const mockAzureProvider = {
  UpdateAzureOcrSettingApi: vi.fn(),
  UpdateAzureOcrMappingApi: vi.fn(),
  UpdateAzureApiKeyApi: vi.fn()
}
const EmailTemplateReader = {
  template: '<div class="EmailTemplateReader" ref="tableRef">EmailTemplateReader</div>',
  methods: {
    initBar: vi.fn()
  }
}
describe('[admin-azure]AzureSettingOcr', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = shallowMount(AzureSettingOcr, {
      props: {
        page: 1,
        pageSize: 10
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog, EmailTemplateReader },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider,
          [AzureProviderKey]: mockAzureProvider
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
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
  it('initializes form with setting data', async () => {
    const formData = { alertEmail: ['test@example.com'] }
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn(() => Promise.resolve({ name: '1111' })),
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn()
      }
    }
    await wrapper.vm.initForm({ alertEmail: 'test@example.com' })

    expect(wrapper.vm.FormRendererRef.vFormRenderRef.setFormData).toHaveBeenCalledWith(formData)
  })
  it('handles save action correctly', async () => {
    const formData = { alertEmail: ['test@example.com'] }
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue(formData)
    }
    mockAzureProvider.UpdateAzureOcrSettingApi.mockResolvedValueOnce({ success: true })

    await wrapper.vm.handleSave()

    expect(mockAzureProvider.UpdateAzureOcrSettingApi).toHaveBeenCalledWith({
      ...formData,
      alertEmail: 'test@example.com'
    })
    expect(wrapper.vm.FormRendererRef.getFormData).toHaveBeenCalled()
    expect(mockRouterProvider.message.success).toHaveBeenCalledWith('dpMsg_success')
  })
  it('handles error during save action', async () => {
    const formData = { alertEmail: ['test@example.com'] }
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue(formData)
    }
    mockAzureProvider.UpdateAzureOcrSettingApi.mockRejectedValueOnce(new Error('Error'))

    await wrapper.vm.handleSave()
    expect(wrapper.vm.FormRendererRef.getFormData).toHaveBeenCalled()
    expect(mockRouterProvider.message.success).not.toHaveBeenCalled()
  })
  it('handles edit email template correctly', async () => {
    const formData = { emailTemplate: 'template-id' }
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue(formData)
    }
    wrapper.vm.emailTemplateEditor = { handleOpen: vi.fn() }

    await wrapper.vm.handleEditEmailTemplate()

    expect(wrapper.vm.emailTemplateEditor.handleOpen).toHaveBeenCalledWith('template-id', true)
  })
  it('handles error when editing email template', async () => {
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue({})
    }
    await wrapper.vm.handleEditEmailTemplate()
    expect(mockRouterProvider.message.error).toHaveBeenCalledWith('tip.emailTemplateMissing')
  })
})
describe('[admin-azure]AzureSettingMappingTable', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = shallowMount(AzureSettingMappingTable, {
      props: {
        tableData: []
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider,
          [AzureProviderKey]: mockAzureProvider
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
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
  it('handles add action correctly', async () => {
    wrapper.vm.AzureSettingMappingDialogRef = { handleOpen: vi.fn() }

    await wrapper.vm.handleAdd()

    expect(wrapper.vm.AzureSettingMappingDialogRef.handleOpen).toHaveBeenCalled()
  })
  it('handles active status change correctly', async () => {
    const row = { id: 1, ocrProfileName: 'Test Profile', status: 'close' }
    await wrapper.vm.handleActive('open', row)

    expect(mockAzureProvider.UpdateAzureOcrMappingApi).toHaveBeenCalledWith({
      ...row,
      name: 'Test Profile',
      status: 'open'
    })
    expect(wrapper.vm.tableConfig.loading).toBe(false)
    expect(mockRouterProvider.message.success).toHaveBeenCalledWith('dpMsg_success')
  })
  it('handles error during active status change', async () => {
    const row = { id: 1, ocrProfileName: 'Test Profile', status: 'close' }
    mockAzureProvider.UpdateAzureOcrMappingApi = vi.fn().mockRejectedValueOnce(new Error('Error'))

    await wrapper.vm.handleActive('open', row)

    expect(mockRouterProvider.message.success).not.toHaveBeenCalled()
    expect(wrapper.vm.tableConfig.loading).toBe(false)
  })
})
describe('[admin-azure]AzureSettingLogTable', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(AzureSettingLogTable, {
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog, Editorjs },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider,
          [AzureProviderKey]: mockAzureProvider
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
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
    expect(wrapper.find('h3').text()).toBe('azure.OCRTransactionLog')
  })
})
describe('[admin-azure]AzureSettingApi', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(AzureSettingApi, {
      props: {
        setting: {
          name: '1111'
        }
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog, Editorjs },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider,
          [AzureProviderKey]: mockAzureProvider
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
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
    expect(wrapper.find('.title').text()).toBe('azure.apiSetting')
    expect(wrapper.find('.description').text()).toBe('azure.apiSettingDescription')
  })
  it('initializes form with setting prop', async () => {
    await wrapper.vm.$nextTick()
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn(() => Promise.resolve({ name: '1111' })),
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn()
      }
    }
    wrapper.vm.initForm(wrapper.props().setting)
    expect(wrapper.vm.FormRendererRef.vFormRenderRef.setFormData).toHaveBeenCalledWith(wrapper.props().setting)
  })
  it('handles save correctly', async () => {
    mockAzureProvider.UpdateAzureApiKeyApi.mockReturnValue(true)
    await wrapper.vm.$nextTick()
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn(() => Promise.resolve({ description: 'Test description', apiKey: 'test-api-key' })),
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn()
      }
    }
    await wrapper.vm.handleSave()
    expect(mockAzureProvider.UpdateAzureApiKeyApi).toHaveBeenCalledWith({
      description: 'Test description',
      apiKey: 'test-api-key'
    })
    expect(mockRouterProvider.message.success).toHaveBeenCalledWith('dpMsg_success')
  })
})
