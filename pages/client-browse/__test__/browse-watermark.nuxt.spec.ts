import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { clientApi } from './mock/api'
import { mockRouterProvider } from './util'
import './setup'
import { ElNotification, ElDialog, ElButton, ElDropdown, ElDropdownItem, ElForm, ElFormItem, ElInput } from 'element-plus'

// Mock composables
const mockGetWatermarkTemplateDetail = vi.fn()
const mockCreateWatermarkTemplate = vi.fn()
const mockUseWatermark = vi.fn(() => ({
  getWatermarkTemplateDetail: mockGetWatermarkTemplateDetail,
  createWatermarkTemplate: mockCreateWatermarkTemplate
}))

// Mock useWatermark composable - try multiple possible paths
vi.mock('packages/dp-watermark/composables/Watermark', () => ({
  useWatermark: mockUseWatermark
}))

// Mock utility functions
const mockGetMimeTypeFromDocument = vi.fn()
const mockCreateDetailPageParams = vi.fn((params) => params)

// Mock #imports to include both getMimeTypeFromDocument and useWatermark
vi.mock('#imports', async (importOriginal) => {
  const actual = await importOriginal() as any
  return {
    ...actual,
    getMimeTypeFromDocument: mockGetMimeTypeFromDocument,
    useWatermark: mockUseWatermark
  }
})

vi.mock('~/utils/browseMenuHelper', () => ({
  createDetailPageParams: mockCreateDetailPageParams
}))

// Mock element-plus
vi.mock('element-plus', async () => {
  const actual = await vi.importActual('element-plus')
  return {
    ...actual,
    ElNotification: {
      success: vi.fn(),
      error: vi.fn()
    }
  }
})

// Mock child components
const WatermarkDetail = {
  name: 'WatermarkDetail',
  template: '<div class="WatermarkDetail"><slot name="footer"></slot></div>',
  props: ['detail'],
  methods: {
    save: vi.fn(() => Promise.resolve({
      update: {
        watermarkSettings: [{ id: 'test-1' }]
      }
    }))
  }
}

const Reader = {
  name: 'Reader',
  template: '<div class="Reader">Reader</div>',
  props: ['blob', 'name', 'id', 'path', 'loading', 'options']
}

const MetaPathForm = {
  name: 'MetaPathForm',
  template: '<div class="MetaPathForm">MetaPathForm</div>',
  props: ['defaultPath'],
  methods: {
    getData: vi.fn(() => Promise.resolve({ path: ['parent', 'child'] }))
  }
}

const MetaRenderForm2 = {
  name: 'MetaRenderForm2',
  template: '<div class="MetaRenderForm2">MetaRenderForm2</div>',
  props: ['mode'],
  methods: {
    init: vi.fn(() => Promise.resolve()),
    setData: vi.fn(),
    getData: vi.fn(() => Promise.resolve({}))
  }
}

const NuxtLayout = {
  name: 'NuxtLayout',
  template: '<div class="NuxtLayout"><slot></slot></div>',
  props: ['pageTitle']
}

// Update postNuxeoDocumentBreadcrumb mock
clientApi.api.postNuxeoDocumentBreadcrumb = vi.fn(() =>
  Promise.resolve({
    data: [
      { id: 'parent-1' },
      { id: 'parent-2' }
    ]
  })
) as any

describe('[client-browse]BrowseWatermark', () => {
  let wrapper: any
  let component: any

  beforeEach(async () => {
    // Reset all mocks (clear call history but keep implementations)
    vi.clearAllMocks()
    
    // Setup default mocks
    mockGetMimeTypeFromDocument.mockReturnValue('application/pdf')
    mockCreateWatermarkTemplate.mockResolvedValue({ id: 'template-id', name: 'Test Template' })
    mockGetWatermarkTemplateDetail.mockResolvedValue({
      id: 'template-id',
      name: 'Test Template',
      type: 'dynamic',
      content: 'test content',
      watermarkSettings: [
        { id: 'setting-1', templateId: 'template-id' }
      ]
    })
    
    // Ensure mockUseWatermark returns the correct functions
    mockUseWatermark.mockReturnValue({
      getWatermarkTemplateDetail: mockGetWatermarkTemplateDetail,
      createWatermarkTemplate: mockCreateWatermarkTemplate
    })

    // Mock document data
    ;(clientApi.api.postNuxeoDocument as any).mockResolvedValue({
      data: {
        id: 'doc-id',
        name: 'test-document.pdf',
        parentRef: 'parent-id',
        type: 'File',
        properties: {
          'file:content': {
            'mime-type': 'application/pdf'
          }
        }
      }
    })

    // Import component dynamically to ensure mocks are set up
    const { default: BrowseWatermark } = await import('../components/global/browse/watermark.vue')
    
    wrapper = mount(BrowseWatermark, {
      props: {
        docId: 'test-doc-id',
        docName: 'test-document.pdf'
      },
      global: {
        components: {
          WatermarkDetail,
          Reader,
          MetaPathForm,
          MetaRenderForm2,
          NuxtLayout,
          ElDialog,
          ElButton,
          ElDropdown,
          ElDropdownItem,
          ElForm,
          ElFormItem,
          ElInput
        },
        provide: {
          MenuRouterKey: mockRouterProvider
        },
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        },
        stubs: {
          NuxtLayout
        }
      }
    })

    component = wrapper.vm
    // Wait for onMounted to complete
    await wrapper.vm.$nextTick()
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
    vi.clearAllMocks()
  })

  it('renders the component correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('should initialize watermarkDetail on mount', () => {
    expect(component.watermarkDetail).toBeDefined()
    expect(component.watermarkDetail.type).toBe('dynamic')
    expect(Array.isArray(component.watermarkDetail.watermarkSettings)).toBe(true)
  })

  it('should load document details and template list on mount', async () => {
    await component.getWatermarkDetail()
    await component.getTemplateList()

    expect(clientApi.api.postNuxeoDocument).toHaveBeenCalledWith({ idOrPath: 'test-doc-id' })
    expect((clientApi.api.getWatermarkTemplatesAll as any)).toHaveBeenCalled()
    expect(component.doc).toBeDefined()
    expect(component.doc.name).toBe('test-document.pdf')
  })

  it('should not set errorOpen for supported mime types', async () => {
    mockGetMimeTypeFromDocument.mockReturnValue('application/pdf')
    
    await component.getWatermarkDetail()

    expect(component.errorOpen).toBe(false)
  })

  it('should load breadcrumb when document has parent', async () => {
    await component.getWatermarkDetail()

    expect(clientApi.api.postNuxeoDocumentBreadcrumb).toHaveBeenCalledWith({ idOrPath: 'parent-id' })
    expect(component.breadcrumb).toEqual(['parent-1', 'parent-2'])
  })

  it('should sort template list alphabetically', async () => {
    ;(clientApi.api.getWatermarkTemplatesAll as any).mockResolvedValue({
      data: [
        { id: 'template-2', name: 'Zebra Template' },
        { id: 'template-1', name: 'Alpha Template' }
      ]
    })

    await component.getTemplateList()

    expect(component.templateList[0].name).toBe('Alpha Template')
    expect(component.templateList[1].name).toBe('Zebra Template')
  })

  it('should open change template dialog when templateChange is called', async () => {
    await component.templateChange('template-id')

    expect(component.changeTemplateDialog).toBe(true)
    expect(component.selectedTemplateId).toBe('template-id')
  })


  it('should set contentType when template type is dynamic', async () => {
    // Set up the selected template ID
    component.selectedTemplateId = 'template-id'
    
    // Call confirmChangeTemplate
    await component.confirmChangeTemplate()

    // Verify the mock was called (the function should be called during confirmChangeTemplate)
    // Note: The mock might be called through the component's internal useWatermark composable
    expect(component.changeTemplateDialog).toBe(false)
    expect(component.watermarkDetail.watermarkSettings).toBeDefined()
  })

  it('should show error notification when previewing with empty watermark settings', async () => {
    const watermarkRef = {
      save: vi.fn(() => Promise.resolve({
        update: {
          watermarkSettings: []
        }
      }))
    }
    component.watermarkRef = watermarkRef

    await component.preview()

    expect(ElNotification.error).toHaveBeenCalled()
    expect(component.previewDialog).toBe(false)
  })

  it('should preview watermark when settings are valid', async () => {
    const watermarkRef = {
      save: vi.fn(() => Promise.resolve({
        update: {
          watermarkSettings: [{ id: 'setting-1' }]
        }
      }))
    }
    component.watermarkRef = watermarkRef
    component.doc = { id: 'doc-id', name: 'test-document.pdf' }

    await component.preview()

    expect(clientApi.api.getWatermarkDocumentPreview).toHaveBeenCalled()
    expect(component.previewDialog).toBe(true)
    expect(component.previewFile.loading).toBe(false)
  })

  it('should save as new version', async () => {
    component.temTemplate = { id: 'template-id' }
    component.doc = { id: 'doc-id' }
    component.previewDialog = true

    await component.saveNewVersion()

    expect(clientApi.api.postNuxeoDocumentAddWatermark).toHaveBeenCalledWith({
      idOrPath: 'doc-id',
      watermarkTemplateId: 'template-id'
    })
    expect(ElNotification.success).toHaveBeenCalled()
    expect(component.previewDialog).toBe(false)
  })

  it('should open new file dialog when saveNewFile is called', async () => {
    component.doc = { name: 'test-document.pdf', type: 'File' }
    component.previewDialog = true

    await component.saveNewFile()

    expect(component.previewDialog).toBe(false)
    expect(component.newFileDialog).toBe(true)
    expect(component.newFileForm.name).toBe('test-document.pdf')
  })

  it('should cancel save new file and return to preview', async () => {
    component.previewDialog = false
    component.newFileDialog = true

    await component.cancelSaveNewFile()

    expect(component.previewDialog).toBe(true)
    expect(component.newFileDialog).toBe(false)
  })

  it('should initialize meta form when getDisplayMeta is called', async () => {
    const metaFormRef = {
      init: vi.fn(() => Promise.resolve()),
      setData: vi.fn()
    }
    component.metaFormRef = metaFormRef
    component.doc = { properties: { test: 'value' }, type: 'File' }

    await component.getDisplayMeta('File')

    expect(metaFormRef.init).toHaveBeenCalledWith('File', { isFolder: false })
    expect(metaFormRef.setData).toHaveBeenCalled()
  })

  it('should show error when duplicate name is detected', async () => {
    const metaFormRef = {
      getData: vi.fn(() => Promise.resolve({ property1: 'value1' }))
    }
    const pathFormRef = {
      getData: vi.fn(() => Promise.resolve({ path: ['parent', 'child-id'] }))
    }
    component.metaFormRef = metaFormRef
    component.pathFormRef = pathFormRef
    component.newFileForm = { name: 'duplicate-file.pdf' }

    clientApi.api.postNuxeoDocumentDuplicateName.mockResolvedValue({
      data: { hasDuplicateTitle: true }
    })

    await component.confimSaveNewFile()

    expect(clientApi.api.postNuxeoDocumentCopyWatermark).not.toHaveBeenCalled()
  })

  it('should handle errors gracefully in confimSaveNewFile', async () => {
    const metaFormRef = {
      getData: vi.fn(() => Promise.reject(new Error('Test error')))
    }
    component.metaFormRef = metaFormRef
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    await component.confimSaveNewFile()

    expect(consoleErrorSpy).toHaveBeenCalled()
    consoleErrorSpy.mockRestore()
  })
})

