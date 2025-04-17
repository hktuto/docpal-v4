import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'
import { DocTypeDialogAddDisplayMeta, ResponsiveFilter } from '#components'
import { ElMessageBox, ElNotification, ElMessage } from 'element-plus'
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

describe('[admin-document-type]DocTypeDialogAddDisplayMeta', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(DocTypeDialogAddDisplayMeta, {
      props: {
        docTypeDetail: { name: 'Test Document Type' },
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
      },
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
    const mockData = {
      metadata: {},
      isRequire: true,
      display: 'Test Display',
      dataType: 'input',
      options: '{}'
    };
    
    // Mock the FormRenderer's getFormData method
    wrapper.vm.FormRendererRef = {
      vFormRenderRef: {
        getFormData: vi.fn(() => Promise.resolve(mockData)),
        resetForm: vi.fn(),
      },
    };

    await wrapper.vm.handleSubmit()

    expect(adminApi.api.postDocpaltypeSettingsAddMetadata).toHaveBeenCalledWith(expect.objectContaining({
      metaData: mockData.metadata,
      isRequire: mockData.isRequire,
      display: mockData.display,
      dataType: mockData.dataType,
      options: mockData.options,
      docType: 'Test Document Type'
    }));
    expect(wrapper.vm.state.visible).toBe(false);
  });

})
