import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { BrowseShare } from '#components'
import { clientApi } from './mock/api'
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

const mockGetMineTypeShareList = vi.fn()
const mockUpdateShareList = vi.fn()
const mockGetUseWatermark = vi.fn()

const useShareStore = () => ({
  getMineTypeShareList: mockGetMineTypeShareList,
  updateShareList: mockUpdateShareList,
  getUseWatermark: mockGetUseWatermark,
  shareList: []
})
vi.stubGlobal('useShareStore', useShareStore)
const FormRenderer = {
  template: '<div class="FormRenderer">FormRenderer</div>',
  methods: {
    setFormJson: vi.fn(),
    setFormData: vi.fn(),
    getFormData: vi.fn(() =>
      Promise.resolve({
        emailList: ['test@example.com'],
        password: 'test123',
        dueDate: new Date()
      })
    )
  },
  computed: {
    vFormRenderRef: {
      get() {
        return {
          getWidgetRef: vi.fn(() => ({
            getOptionItems: vi.fn(() => [{ value: 'contact@example.com' }])
          }))
        }
      }
    }
  }
}

const Reader = {
  template: '<div class="Reader">Reader</div>',
  methods: {}
}

const BrowseShareTableSet = {
  template: '<div class="BrowseShareTableSet" @dblclick="$emit(\'db-click\', {})" @delete="$emit(\'delete\', {})">Table</div>',
  props: ['tableData'],
  emits: ['db-click', 'delete']
}

describe('[client-browse-share]BrowseShare', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    mockGetMineTypeShareList.mockResolvedValue([
      {
        id: 'doc1',
        name: 'Test Document 1',
        watermark: '',
        readOnly: false,
        mimeType: 'application/pdf'
      },
      {
        id: 'doc2',
        name: 'Test Document 2',
        watermark: 'watermark-id',
        readOnly: true,
        mimeType: 'application/pdf'
      }
    ])

    wrapper = mount(BrowseShare, {
      props: {
        backPath: '/browse'
      },
      global: {
        components: { VxeGrid, FormRenderer, Reader, BrowseShareTableSet },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        }
      }
    })

    await wrapper.vm.$nextTick()
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })

  it('renders the component correctly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.pageContainer').exists()).toBe(true)
    expect(wrapper.find('.share-main').exists()).toBe(true)
  })

  it('should handle double click to preview file without watermark', async () => {
    const mockBlob = new Blob(['test'], { type: 'application/pdf' })
    vi.spyOn(clientApi.api, 'postNuxeoDocumentPreview').mockResolvedValue(mockBlob)

    const row = {
      id: 'doc1',
      name: 'Test Document 1',
      watermark: ''
    }

    await wrapper.vm.handleDblclick(row)

    expect(clientApi.api.postNuxeoDocumentPreview).toHaveBeenCalledWith({ idOrPath: 'doc1' }, { format: 'blob' })
    expect(wrapper.vm.previewFile.name).toBe('Test Document 1')
    expect(wrapper.vm.previewFile.id).toBe('doc1')
  })

  it('should handle double click to preview file with watermark', async () => {
    vi.useFakeTimers()
    const mockBlob = new Blob(['test'], { type: 'application/pdf' })

    vi.spyOn(clientApi.api, 'getNuxeoSharePrepareDownloadDocid').mockResolvedValue({
      data: 'YES'
    })
    vi.spyOn(clientApi.api, 'getWatermarkDocumentPreview').mockResolvedValue(mockBlob)

    const row = {
      id: 'doc2',
      name: 'Test Document 2',
      watermark: 'watermark-id'
    }

    const promise = wrapper.vm.handleDblclick(row)

    // Advance timer to trigger the interval
    await vi.advanceTimersByTimeAsync(1000)
    await promise

    expect(clientApi.api.getNuxeoSharePrepareDownloadDocid).toHaveBeenCalledWith('doc2')
    expect(clientApi.api.getWatermarkDocumentPreview).toHaveBeenCalledWith(
      {
        watermarkTemplateId: 'watermark-id',
        documentId: 'doc2'
      },
      { format: 'blob' }
    )

    vi.useRealTimers()
  })

  it('should validate email addresses correctly', async () => {
    wrapper.vm.FormRendererRef = {
      vFormRenderRef: {
        getWidgetRef: vi.fn(() => ({
          getOptionItems: vi.fn(() => [{ value: 'contact@example.com' }])
        }))
      },
      getFormData: vi.fn().mockResolvedValue({
        emailList: ['test@example.com', 'valid@test.com']
      })
    }
    const validEmails = ['test@example.com', 'valid@test.com']
    const result = wrapper.vm.isValidateEmail(validEmails)

    expect(result).toBe(true)
  })

  it('should reject invalid email addresses', async () => {
    wrapper.vm.FormRendererRef = {
      vFormRenderRef: {
        getWidgetRef: vi.fn(() => ({
          getOptionItems: vi.fn(() => [{ value: 'contact@example.com' }])
        }))
      },
      getFormData: vi.fn().mockResolvedValue({
        emailList: ['test@example.com', 'valid@test.com']
      })
    }
    const invalidEmails = ['invalid-email', 'test@']
    const result = wrapper.vm.isValidateEmail(invalidEmails)
    expect(result).toBe(false)
    expect(ElMessage.error).toHaveBeenCalled()
  })

  it('should submit share request successfully', async () => {
    // Spy on the API before any calls
    const postShareSpy = vi.spyOn(clientApi.api, 'postNuxeoShareNew').mockResolvedValue({
      data: { success: true }
    })

    wrapper.vm.state.minTypeShareList = [
      {
        id: 'doc1',
        name: 'Test Document',
        watermark: '',
        readOnly: false
      }
    ]

    // Ensure FormRenderer is properly set up
    await wrapper.vm.$nextTick()

    // Override getFormData to ensure it returns correct data
    const formRendererRef = wrapper.vm.$refs.FormRendererRef
    if (formRendererRef) {
      formRendererRef.getFormData = vi.fn(() =>
        Promise.resolve({
          emailList: ['test@example.com'],
          password: 'secure123',
          dueDate: new Date('2025-12-31')
        })
      )
    }

    await wrapper.vm.handleSubmit()
    expect(mockRouterProvider.message.success).toHaveBeenCalledWith('share_success')
    expect(postShareSpy).toHaveBeenCalled()
    expect(mockRouterProvider.back).toHaveBeenCalled()
  })

  it('should handle submit with password and due date', async () => {
    vi.spyOn(clientApi.api, 'postNuxeoShareNew').mockResolvedValue({
      data: { success: true }
    })

    const formRendererRef = wrapper.vm.$refs.FormRendererRef
    formRendererRef.getFormData = vi.fn(() =>
      Promise.resolve({
        emailList: ['test@example.com'],
        password: 'secure123',
        dueDate: new Date('2025-12-31')
      })
    )

    wrapper.vm.state.minTypeShareList = [
      {
        id: 'doc1',
        name: 'Test Document',
        watermark: 'watermark-id',
        readOnly: true
      }
    ]

    await wrapper.vm.handleSubmit()

    const callArgs = clientApi.api.postNuxeoShareNew.mock.calls[0][0]
    expect(callArgs.emailList).toContain('test@example.com')
    expect(callArgs.password).toBe('secure123')
    expect(callArgs.documentList[0].watermarkTemplateId).toBe('watermark-id')
  })

  it('should handle submit error', async () => {
    vi.spyOn(clientApi.api, 'postNuxeoShareNew').mockRejectedValue(new Error('Network error'))

    wrapper.vm.state.minTypeShareList = [
      {
        id: 'doc1',
        name: 'Test Document',
        watermark: '',
        readOnly: false
      }
    ]

    await wrapper.vm.handleSubmit()

    expect(mockRouterProvider.message.error).toHaveBeenCalled()
  })

  it('should delete row from share list', async () => {
    wrapper.vm.state.minTypeShareList = [
      { id: 'doc1', name: 'Doc 1' },
      { id: 'doc2', name: 'Doc 2' }
    ]

    const row = { id: 'doc1', name: 'Doc 1' }
    await wrapper.vm.handleDeleteRow(row)

    expect(wrapper.vm.state.minTypeShareList.length).toBe(1)
    expect(wrapper.vm.state.minTypeShareList[0].id).toBe('doc2')
  })

  it('should trigger discard when deleting last row', async () => {
    vi.mocked(ElMessageBox.confirm).mockResolvedValue('confirm' as any)

    wrapper.vm.state.minTypeShareList = [{ id: 'doc1', name: 'Doc 1' }]

    const row = { id: 'doc1', name: 'Doc 1' }
    await wrapper.vm.handleDeleteRow(row)

    expect(ElMessageBox.confirm).toHaveBeenCalled()
  })

  it('should handle discard action', async () => {
    vi.mocked(ElMessageBox.confirm).mockResolvedValue('confirm' as any)

    wrapper.vm.state.minTypeShareList = [
      { id: 'doc1', name: 'Doc 1' },
      { id: 'doc2', name: 'Doc 2' }
    ]

    const row = { id: 'doc1', name: 'Doc 1' }
    await wrapper.vm.handleDiscard(row)

    expect(mockRouterProvider.navigateTo).toHaveBeenCalled()
  })

  it('should cancel discard action', async () => {
    vi.mocked(ElMessageBox.confirm).mockRejectedValue('cancel')

    wrapper.vm.state.minTypeShareList = [{ id: 'doc1', name: 'Doc 1' }]

    const row = { id: 'doc1', name: 'Doc 1' }
    await wrapper.vm.handleDiscard(row)

    // List should remain unchanged
    expect(wrapper.vm.state.minTypeShareList.length).toBe(1)
  })

  it('should handle add more action', () => {
    wrapper.vm.handleAddMore()

    expect(mockRouterProvider.navigateTo).toHaveBeenCalled()
  })

  it('should clear interval on unmount', () => {
    vi.useFakeTimers()
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval')

    wrapper.vm.state.interval = setInterval(() => {}, 1000)
    wrapper.unmount()

    expect(clearIntervalSpy).toHaveBeenCalled()
    vi.useRealTimers()
  })

  it('should handle preview failure', async () => {
    vi.spyOn(clientApi.api, 'postNuxeoDocumentPreview').mockRejectedValue(new Error('Preview error'))

    const row = {
      id: 'doc1',
      name: 'Test Document',
      watermark: ''
    }

    await wrapper.vm.handleDblclick(row)

    expect(wrapper.vm.state.loadingFileFail).toBe(true)
    expect(wrapper.vm.previewFile.loading).toBe(false)
  })

  it('should show loading state while fetching preview', async () => {
    const mockBlob = new Blob(['test'], { type: 'application/pdf' })
    let resolvePreview: any
    const previewPromise = new Promise((resolve) => {
      resolvePreview = resolve
    })

    vi.spyOn(clientApi.api, 'postNuxeoDocumentPreview').mockReturnValue(previewPromise as any)

    const row = {
      id: 'doc1',
      name: 'Test Document',
      watermark: ''
    }

    const handlePromise = wrapper.vm.handleDblclick(row)

    // Check loading state is true
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.previewFile.loading).toBe(true)

    // Resolve the preview
    resolvePreview(mockBlob)
    await handlePromise

    // Check loading state is false
    expect(wrapper.vm.previewFile.loading).toBe(false)
  })

  it('should navigate back when share list is empty', async () => {
    mockGetMineTypeShareList.mockResolvedValue([])

    const newWrapper = mount(BrowseShare, {
      props: {
        backPath: '/browse'
      },
      global: {
        components: { VxeGrid, FormRenderer, Reader, BrowseShareTableSet },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        }
      }
    })

    await newWrapper.vm.$nextTick()

    expect(mockRouterProvider.navigateTo).toHaveBeenCalled()
    newWrapper.unmount()
  })

  it('should prepare watermark documents for download', async () => {
    mockGetUseWatermark.mockReturnValue(true)
    vi.spyOn(clientApi.api, 'postNuxeoSharePrepareDownload')

    mockGetMineTypeShareList.mockResolvedValue([
      {
        id: 'doc1',
        name: 'Test Document',
        watermark: 'watermark-id',
        mimeType: 'application/pdf'
      }
    ])

    const newWrapper = mount(BrowseShare, {
      props: {
        backPath: '/browse'
      },
      global: {
        components: { VxeGrid, FormRenderer, Reader, BrowseShareTableSet },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        }
      }
    })

    await newWrapper.vm.$nextTick()

    expect(clientApi.api.postNuxeoSharePrepareDownload).toHaveBeenCalled()
    newWrapper.unmount()
  })
})
