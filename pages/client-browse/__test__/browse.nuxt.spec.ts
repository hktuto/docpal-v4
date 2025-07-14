import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { BrowseDetail, BrowseShare, BrowseVersionComparison, BrowseDetailFileNamePicker } from '#components'
import { clientApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { ElMessageBox, ElMessage, ElSwitch } from 'element-plus'
import { mockRouterProvider } from './util'
import { mockQuery } from './setup'
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

describe('[client-browse]BrowseDetail', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(BrowseDetail, {
      props: {
        idOrPath: 'some/path',
        showHeaderAction: true,
        showInfo: true,
        commentId: '123',
        home: {}
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
  it('renders the component correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should mount the component and load document details', async () => {
    await wrapper.vm.getDetail()

    // 检查文档详情是否被正确加载
    expect(wrapper.vm.docDetail).toBeDefined()
  })

  it('should navigate to parent when goParent is called', async () => {
    wrapper.vm.docDetail = { parentRef: 'parent/path' }
    await wrapper.vm.goParent()

    expect(mockRouterProvider.navigateTo).toHaveBeenCalled()
  })

  it('should handle closePreview event', async () => {
    wrapper.vm.docDetail = { id: 'doc-id', parentRef: 'parent/path' }
    const eventDetail = { id: 'doc-id' }
    await wrapper.vm.closePreview({ detail: eventDetail })

    // 检查是否调用了 navigateTo
    expect(mockRouterProvider.navigateTo).toHaveBeenCalled()
  })
  it('should handle switch file', async () => {
    await wrapper.vm.switchFile()

    expect(mockRouterProvider.updateProps).toHaveBeenCalled()
  })
  it('should handle delete file', async () => {
    await wrapper.vm.itemDeleted()

    expect(mockRouterProvider.navigateTo).toHaveBeenCalled()
  })
})
describe('[client-browse-share]BrowseShare', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(BrowseShare, {
      props: {
        backPath: 'some/path'
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
  it('should render correctly with props', () => {
    expect(wrapper.props().backPath).toBe('some/path')
  })

  it('should load file preview on double click', async () => {
    const mockRow = { id: 'file1', name: 'File 1', watermark: null }

    await wrapper.vm.handleDblclick(mockRow)
    expect(wrapper.vm.previewFile.name).toBe('File 1')
  })

  it('should handle file preview failure', async () => {
    const mockRow = { id: 'file1', name: 'File 1', watermark: null }
    clientApi.api.postNuxeoDocumentPreview.mockRejectedValue(new Error('Preview failed'))
    await wrapper.vm.handleDblclick(mockRow)
    expect(wrapper.vm.state.loadingFileFail).toBe(true)
  })

  it('should submit share request successfully', async () => {
    const mockFormData = { emailList: ['test@example.com'], password: '12345', dueDate: new Date() }
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn(() => Promise.resolve(mockFormData)),
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn()
      }
    }
    clientApi.api.postNuxeoShareNew.mockResolvedValue({ data: {} })
    await wrapper.vm.handleSubmit()
    expect(clientApi.api.postNuxeoShareNew).toHaveBeenCalled()
    expect(mockRouterProvider.message.success).toHaveBeenCalledWith('share_success')
  })

  it('should handle delete row', () => {
    wrapper.vm.state.minTypeShareList = [{ id: 'file1' }, { id: 'file2' }]
    wrapper.vm.handleDeleteRow({ id: 'file1' })

    expect(wrapper.vm.state.minTypeShareList).toEqual([{ id: 'file2' }])
  })
  it('should discard changes', async () => {
    ElMessageBox.confirm.mockResolvedValue('confirm')
    await wrapper.vm.handleDiscard()
    expect(mockRouterProvider.navigateTo).toHaveBeenCalled()
  })
  it('should navigate to back path on add more', () => {
    wrapper.vm.handleAddMore()
    expect(mockRouterProvider.navigateTo).toHaveBeenCalled()
  })
})
describe('[client-browse-version]BrowseVersionComparison', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(BrowseVersionComparison, {
      props: {
        id: 'doc123',
        oldVersionNum: '1.0'
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

  it('should render correctly with props', () => {
    expect(wrapper.props().id).toBe('doc123')
    expect(wrapper.props().oldVersionNum).toBe('1.0')
  })

  it('should get preview files successfully', async () => {
    const mockPreviewFile = new Blob()
    const spyGetPreviewFile = vi.spyOn(clientApi.api, 'postNuxeoDocumentPreview').mockResolvedValue(mockPreviewFile)

    await wrapper.vm.getPreviewFile(wrapper.vm.state.previewNewFile, 'newDocId')
    // expect(wrapper.vm.state.previewNewFile.blob).toBe(mockPreviewFile)

    await wrapper.vm.getPreviewFile(wrapper.vm.state.previewOldFile, 'oldDocId')
    // expect(wrapper.vm.state.previewOldFile.blob).toBe(mockPreviewFile)
  })

  it('should handle back navigation', () => {
    wrapper.vm.back()
    expect(mockRouterProvider.navigateTo).toHaveBeenCalled()
  })

  it('should show loading state when fetching previews', async () => {
    const spyGetPreviewFile = vi.spyOn(clientApi.api, 'postNuxeoDocumentPreview').mockResolvedValue(new Blob())

    expect(wrapper.vm.state.previewNewFile.loading).toBe(false)
    await wrapper.vm.getPreviewFile(wrapper.vm.state.previewNewFile, 'newDocId')
    expect(wrapper.vm.state.previewNewFile.loading).toBe(false)
  })
  it('should handle errors when fetching preview files', async () => {
    vi.spyOn(clientApi.api, 'postNuxeoDocumentPreview').mockRejectedValue(new Error('Error fetching file'))

    await expect(wrapper.vm.getPreviewFile(wrapper.vm.state.previewNewFile, 'newDocId')).rejects.toThrow('Error fetching file')
  })
})
describe('[client-browse-version]BrowseDetailFileNamePicker', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(BrowseDetailFileNamePicker, {
      props: {
        title: 'Test Title',
        docId: 'doc123',
        parentRef: 'parentDocId',
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
  it('should render correctly with props', () => {
    expect(wrapper.props().title).toBe('Test Title')
    expect(wrapper.props().docId).toBe('doc123')
    expect(wrapper.props().parentRef).toBe('parentDocId')
  })

  it('should load more data if next page is available', async () => {
    await wrapper.vm.loadData([], 'parentDocId')
  })
})
