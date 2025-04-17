import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import {
  DocTypePage,
  DocTypeDetail,
  DocTypeInfo,
  DocTypeRelatedTypeTable,
  DocTypeDisplayMetaTable,
  DocTypeDialogNew,
  DocTypeDialogDuplicate,
  ResponsiveFilter
} from '#components'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { ElMessageBox, ElMessage } from 'element-plus'
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
    warning: vi.fn()
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

describe('[admin-document-type]DocTypePage', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(DocTypePage, {
      props: {
        pageNum: 0,
        pageSize: 20
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog },
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
    const dialogRef = wrapper.vm.$refs.DocTypeDialogNewRef
    dialogRef.handleOpen = vi.fn()
    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.loadData = vi.fn();
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should handle create new document type', async () => {
    await wrapper.vm.handleCreate()
    const dialogRef = wrapper.vm.$refs.DocTypeDialogNewRef
    expect(dialogRef.handleOpen).toHaveBeenCalled()
  })
  it('should handle filter form change', async () => {
    const formModel = { isDesc: true, orderBy: 'name' }
    await wrapper.vm.handleFilterFormChange(formModel)
    expect(wrapper.vm.extraParams).toEqual(formModel)
    expect(mockReload).toHaveBeenCalled()
  })
  it('should activate document type', async () => {
    const row = { name: 'Test Type', enable: false }
    await wrapper.vm.handleActive(row, true)
    expect(adminApi.api.patchDocpaltypeSettingsActive).toHaveBeenCalledWith({ name: 'Test Type', enable: true })
    expect(row.enable).toBe(true)
  })
  it('should navigate to document detail on double click', async () => {
    const row = { name: 'Test Type' }
    await wrapper.vm.handleDblclick(row)
    expect(mockRouterProvider.navigateTo).toHaveBeenCalledWith(expect.anything(), false)
  })
})

describe('[admin-document-type]DocTypeDetail', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(DocTypeDetail, {
      props: {
        name: 'File'
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog },
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
    // const dialogRef = wrapper.vm.$refs.DocTypeDialogNewRef;
    // dialogRef.handleOpen = vi.fn();
    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.loadData = vi.fn();
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('renders correctly', async () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should handle save action', async () => {
    wrapper.vm.LanguageUnitFormRef = {
      handleSubmit: vi.fn(() => Promise.resolve())
    }
    await wrapper.vm.handleSave()
    expect(wrapper.vm.state.lanLoading).toBe(false)
  })
  it('should show loading state when saving', async () => {
    wrapper.vm.LanguageUnitFormRef = {
      handleSubmit: vi.fn(() => Promise.resolve())
    }
    await wrapper.vm.handleSave()
    expect(wrapper.vm.state.lanLoading).toBe(false)
  })
})
describe('[admin-document-type]DocTypeInfo', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })
  it('renders correctly', async () => {
    const wrapper = mount(DocTypeInfo, {
      props: {
        docType: {
          name: 'Test Document',
          isFolder: false
        }
      },
      global: {
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
        }
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.html().includes('Test Document')).toBe(true)
    expect(wrapper.html().includes('common_file')).toBe(true)
  })
  it('displays folder type correctly', async () => {
    const wrapper = mount(DocTypeInfo, {
      props: {
        docType: {
          name: 'Test Folder',
          isFolder: true
        }
      },
      global: {
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
        }
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.html().includes('Test Folder')).toBe(true)
    expect(wrapper.html().includes('common_folder')).toBe(true)
  })
})
describe('[admin-document-type]DocTypeRelatedTypeTable', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(DocTypeRelatedTypeTable, {
      props: {
        docTypeDetail: {},
        name: 'Test Document Type'
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog },
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
    // const dialogRef = wrapper.vm.$refs.DocTypeDialogNewRef;
    // dialogRef.handleOpen = vi.fn();
    const tableRef = wrapper.vm.$refs.tableRef
    tableRef.loadData = vi.fn()
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('renders correctly', async () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should delete a related document type', async () => {
    // Mock the list and set it in the component
    wrapper.vm._list = [{ id: 1, rootDocPalType: 'Test Type' }]
    ElMessageBox.confirm.mockResolvedValue('confirm')
    await wrapper.vm.handleDelete({ id: 1 })

    expect(adminApi.api.deleteDocpaltypeSettingsRelatedId).toHaveBeenCalledWith(1)
    expect(mockRouterProvider.message.success).toHaveBeenCalled()
  })
  it('should show confirmation dialog on delete', async () => {
    // Mock the confirmation dialog
    vi.spyOn(ElMessageBox, 'confirm').mockResolvedValue('confirm')
    wrapper.vm._list = [{ id: 1, rootDocPalType: 'Test Type' }]

    await wrapper.vm.handleDelete({ id: 1 })
    expect(adminApi.api.deleteDocpaltypeSettingsRelatedId).toHaveBeenCalled()
  })
  it('should filter the list based on input', async () => {
    wrapper.vm._list = [{ rootDocPalType: 'Document A' }, { rootDocPalType: 'Document B' }]
    // Simulate filter input
    await wrapper.vm.handleFilterFormChange({ name: 'Document A' })
    expect(mockTable.value.loadData).toHaveBeenCalledWith([{ rootDocPalType: 'Document A' }])
  })
})

describe('[admin-document-type]DocTypeDisplayMetaTable', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(DocTypeDisplayMetaTable, {
      props: {
        docTypeDetail: { name: 'Test Document Type' },
        metadata: [{ metadata: 'Display A' }, { metadata: 'Display B' }]
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog },
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
    // const dialogRef = wrapper.vm.$refs.DocTypeDialogNewRef;
    // dialogRef.handleOpen = vi.fn();
    const tableRef = wrapper.vm.$refs.tableRef
    tableRef.loadData = vi.fn()
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('renders correctly', async () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should delete a display meta', async () => {
    wrapper.vm.metadata = [{ metadata: 'Test Meta', id: 1 }]

    ElMessageBox.confirm.mockResolvedValue('confirm')
    await wrapper.vm.handleDelete({ metadata: 'Test Meta', id: 1 })

    expect(adminApi.api.deleteDocpaltypeSettingsNameMetadata).toHaveBeenCalledWith('Test Document Type', {
      metadata: 'Test Meta'
    })
    expect(mockRouterProvider.message.success).toHaveBeenCalled()
  })
  it('should filter the list based on input', async () => {
    // Simulate filter input
    await wrapper.vm.handleFilterFormChange({ metaData: 'Display A' })
    expect(mockTable.value.loadData).toHaveBeenCalledWith([{ metadata: 'Display A' }])
  })
})
describe('[admin-document-type]DocTypeDialogNew', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(DocTypeDialogNew, {
      props: {
        docTypeDetail: { name: 'Test Document Type' },
        metadata: [{ metadata: 'Display A' }, { metadata: 'Display B' }]
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog },
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
    // const dialogRef = wrapper.vm.$refs.DocTypeDialogNewRef;
    // dialogRef.handleOpen = vi.fn();
    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.loadData = vi.fn();
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('renders correctly', async () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should submit form data and show success message', async () => {
    const mockData = { name: 'New Document Type' }

    // Mock the FormRenderer's getFormData method
    wrapper.vm.FormRendererRef = {
      vFormRenderRef: {
        getFormData: vi.fn(() => Promise.resolve(mockData)),
        resetForm: vi.fn()
      }
    }

    await wrapper.vm.handleSubmit()

    expect(adminApi.api.postDocpaltypeSettings).toHaveBeenCalledWith(mockData)
    expect(ElMessage.success).toHaveBeenCalledWith(expect.stringContaining('tip_createdSuccessMsg'))
    expect(wrapper.vm.state.visible).toBe(false)
  })
  it('should open dialog and reset form', async () => {
    wrapper.vm.FormRendererRef = {
      vFormRenderRef: {
        getFormData: vi.fn(() => Promise.resolve({})),
        resetForm: vi.fn()
      }
    }
    await wrapper.vm.handleOpen()

    expect(wrapper.vm.state.visible).toBe(true)
  })
})
describe('[admin-document-type]DocTypeDialogDuplicate', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(DocTypeDialogDuplicate, {
      props: {
        docTypeDetail: { name: 'Test Document Type' },
        metadata: [{ metadata: 'Display A' }, { metadata: 'Display B' }]
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog },
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
    // const dialogRef = wrapper.vm.$refs.DocTypeDialogNewRef;
    // dialogRef.handleOpen = vi.fn();
    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.loadData = vi.fn();
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('renders correctly', async () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should submit form data and show success message', async () => {
    const mockData = { fromName: 'New Document Type' }

    // Mock the FormRenderer's getFormData method
    wrapper.vm.FormRendererRef = {
      vFormRenderRef: {
        getFormData: vi.fn(() => Promise.resolve(mockData)),
        resetForm: vi.fn()
      }
    }

    await wrapper.vm.handleSubmit()

    expect(adminApi.api.postDocpaltypeSettingsCopyName).toHaveBeenCalled()
    expect(ElMessage.success).toHaveBeenCalledWith(expect.stringContaining('documentType_duplicateSuccessMsg'))
    expect(wrapper.vm.state.visible).toBe(false)
  })
  it('should open dialog and reset form', async () => {
    wrapper.vm.FormRendererRef = {
      vFormRenderRef: {
        getFormData: vi.fn(() => Promise.resolve({})),
        resetForm: vi.fn()
      }
    }
    await wrapper.vm.handleOpen()

    expect(wrapper.vm.state.visible).toBe(true)
  })
})
