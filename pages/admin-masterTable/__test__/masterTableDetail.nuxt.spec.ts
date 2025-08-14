import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'
import { AdminMasterTableDetail, ResponsiveFilter } from '#components'
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

describe('[admin-master-table]AdminMasterTableDetail', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = shallowMount(AdminMasterTableDetail, {
      props: {
        id: 'test-id'
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
    await wrapper.vm.$nextTick()
    // const dialogRef = wrapper.vm.$refs.FolderCabinetSettingAddDialogRef;
    // dialogRef.handleOpen = vi.fn();
    // const MasterTableTabRecordsRef = wrapper.vm.$refs.MasterTableTabRecordsRef;
    // MasterTableTabRecordsRef.initTableColumns = vi.fn();
    // const logRef = wrapper.vm.$refs.logRef;
    // logRef.refresh = vi.fn();
  })

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('initializes master table details on activation', async () => {
    const mockResponse = {
      data: {
        name: 'Test Table',
        fields: [],
        status: 'A'
      }
    }
    wrapper.vm.MasterTableTabRecordsRef = {
      initTableColumns: vi.fn()
    }
    adminApi.api.getMasterTablesId.mockResolvedValue(mockResponse)

    await wrapper.vm.init()

    expect(adminApi.api.getMasterTablesId).toHaveBeenCalledWith('test-id')
    expect(wrapper.vm.state.masterTable).toEqual(mockResponse.data)
  })

  it('handles template download correctly', async () => {
    const mockResponse = new Blob(['dummy content'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    adminApi.api.getMasterTablesIdRecordTemplate.mockResolvedValue(mockResponse)

    await wrapper.vm.handleTemplateDownload()

    expect(wrapper.vm.state.templateLoading).toBe(false)
  })
  it('handles file import correctly', async () => {
    wrapper.vm.MasterTableTabRecordsRef = {
      initTableColumns: vi.fn(),
      query: vi.fn()
    }
    const mockFile = new Blob(['dummy content'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const mockEvent = {
      target: {
        files: [mockFile],
        value: ''
      }
    }
    const mockResponse = { failureNumber: 1 }
    adminApi.api.postMasterTablesRecordImportFile.mockResolvedValue({ data: mockResponse })

    await wrapper.vm.handleFile(mockEvent)

    expect(adminApi.api.postMasterTablesRecordImportFile).toHaveBeenCalled()
    expect(wrapper.vm.state.importLoading).toBe(false)
  })
  it('downloads failure list correctly', async () => {
    const mockResponse = new Blob(['dummy content'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    adminApi.api.getMasterTablesDownloadFailure.mockResolvedValue(mockResponse)

    await wrapper.vm.downloadFailList()

    expect(ElNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        title: expect.any(String),
        type: 'warning'
      })
    )
  })
  it('handles export correctly', async () => {
    const mockResponse = new Blob(['dummy content'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    adminApi.api.postMasterTablesIdRecordExport.mockResolvedValue(mockResponse);

    await wrapper.vm.handleExport();

    expect(wrapper.vm.state.exportLoading).toBe(false);
  });
})
