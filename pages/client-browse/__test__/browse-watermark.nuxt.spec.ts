import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { BrowseWatermark } from '#components'
import { clientApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { ElMessageBox, ElNotification, ElMessage, ElSwitch } from 'element-plus'
import { mockRouterProvider } from './util'
import { mockQuery } from './setup'
vi.mock('element-plus', () => ({
  ElMessageBox: {
    alert: vi.fn(),
    confirm: vi.fn()
  },
  ElNotification: {
    success: vi.fn(),
    error: vi.fn(),
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

describe('[client-browse-watermark]BrowseWatermark', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = shallowMount(BrowseWatermark, {
      props: {
        docId: 'doc123',
        docName: 'Test Document'
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
    wrapper.vm.temTemplate = {
      id: 'test'
    }
    wrapper.vm.doc = {
      id: 'test-doc'
    }
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('should render correctly with props', () => {
    expect(wrapper.props().docId).toBe('doc123')
    expect(wrapper.props().docName).toBe('Test Document')
  })
  it('should fetch watermark detail on mount', async () => {
    const spyGetWatermarkDetail = vi
      .spyOn(clientApi.api, 'postNuxeoDocument')
      .mockResolvedValue({ data: { name: 'Test Document', id: 'doc123', parentRef: 'parentDocId' } })
    const spyGetBreadcrumb = vi.spyOn(clientApi.api, 'postNuxeoDocumentBreadcrumb').mockResolvedValue({ data: [{ id: 'parentDocId' }] })

    await wrapper.vm.getWatermarkDetail()

    expect(spyGetWatermarkDetail).toHaveBeenCalledWith({ idOrPath: 'doc123' })
    expect(wrapper.vm.doc.name).toBe('Test Document')
    expect(wrapper.vm.breadcrumb).toEqual(['parentDocId'])
  })
  it('should show error if mime type is invalid', async () => {
    vi.spyOn(clientApi.api, 'postNuxeoDocument').mockResolvedValue({
      data: { name: 'Invalid Document', id: 'doc123', parentRef: 'parentDocId', mimeType: 'text/plain' }
    })

    await wrapper.vm.getWatermarkDetail()

    expect(wrapper.vm.errorOpen).toBe(true)
  })
  it('should open template change dialog', async () => {
    await wrapper.vm.templateChange('templateId')
    expect(wrapper.vm.changeTemplateDialog).toBe(true)
    expect(wrapper.vm.selectedTemplateId).toBe('templateId')
  })

  it('should confirm template change and update watermark settings', async () => {
    const mockTemplateDetail = { watermarkSettings: [{ id: '1', templateId: 'templateId' }], type: 'dynamic', content: 'Sample Content' }
    vi.spyOn(clientApi.api, 'getWatermarkTemplatesId').mockResolvedValue({
      data: mockTemplateDetail
    })

    await wrapper.vm.confirmChangeTemplate()

    expect(wrapper.vm.watermarkDetail.watermarkSettings).toHaveLength(1)
    expect(wrapper.vm.watermarkDetail.contentType).toBe('Sample Content')
  })
  it('should preview watermark', async () => {
    const mockSave = vi.fn().mockResolvedValue({ update: { watermarkSettings: [{ id: '1' }] } })
    wrapper.vm.watermarkRef = { save: mockSave }
    await wrapper.vm.preview()
    expect(wrapper.vm.previewDialog).toBe(true)
  })

  it('should save new version successfully', async () => {
    vi.spyOn(clientApi.api, 'postNuxeoDocumentAddWatermark').mockResolvedValue({})

    await wrapper.vm.saveNewVersion()

    expect(wrapper.vm.previewDialog).toBe(false)
    expect(ElNotification.success).toHaveBeenCalledWith('msg_successfullyModified')
  })
  it('should handle duplicate file name error', async () => {
    wrapper.vm.newFileForm.name = 'New File Name'
    vi.spyOn(clientApi.api, 'postNuxeoDocumentIsduplicatename').mockResolvedValue({ data: { 
      'New File Name': true 
    } })
    wrapper.vm.metaFormRef = {
      init: vi.fn(),
      getData: vi.fn(() => Promise.resolve({}))
    }
    wrapper.vm.pathFormRef = {
      init: vi.fn(),
      getData: vi.fn(() =>
        Promise.resolve({
          path: ['test/path']
        })
      )
    }
    await wrapper.vm.confimSaveNewFile()
    expect(ElNotification.error).toHaveBeenCalledWith('dpTip_duplicateError')
  })
  it('should navigate to new file on successful save', async () => {
    wrapper.vm.newFileForm.name = 'New File Name11'
    vi.spyOn(clientApi.api, 'postNuxeoDocumentIsduplicatename').mockResolvedValue({ data: { 
      'New File Name': true 
    } })
    wrapper.vm.metaFormRef = {
      init: vi.fn(),
      getData: vi.fn(() => Promise.resolve({}))
    }
    wrapper.vm.pathFormRef = {
      init: vi.fn(),
      getData: vi.fn(() =>
        Promise.resolve({
          path: ['test/path']
        })
      )
    }
    const mockNewFile = { id: 'newFileId', name: 'New File' }
    vi.spyOn(clientApi.api, 'postNuxeoDocumentCopyWatermark').mockResolvedValue({ data: mockNewFile })

    await wrapper.vm.confimSaveNewFile()

    expect(mockRouterProvider.navigateTo).toHaveBeenCalled()
  })
})
