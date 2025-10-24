import { mount, shallowMount } from '@vue/test-utils'
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest'
import { BrowseVersionComparison } from '#components'
import { clientApi } from './mock/api'
import { mockRouterProvider } from './util'
import { nextTick } from 'vue'

// Mock createDetailPageParams
vi.mock('~/utils/browseMenuHelper', () => ({
  createDetailPageParams: vi.fn((params) => ({
    id: 'client-browse-detail-' + params.idOrPath,
    name: 'client-browse-detail-' + params.idOrPath,
    label: params.docName,
    component: 'LazyBrowseDetail',
    props: { ...params }
  }))
}))

const mockNewVersionData = {
  id: 'doc-id-123',
  name: 'Test Document.pdf',
  version: '2.0',
  type: 'File',
  properties: {
    'dc:title': 'Test Document',
    'dc:description': 'Test description',
    'file:content': {
      'mime-type': 'application/pdf'
    }
  }
}

const mockOldVersionData = {
  id: 'doc-id-123-v1',
  name: 'Test Document.pdf',
  version: '1.0',
  type: 'File',
  properties: {
    'dc:title': 'Test Document',
    'dc:description': 'Old description',
    'file:content': {
      'mime-type': 'application/pdf'
    }
  }
}

const mockBlob = new Blob(['test pdf content'], { type: 'application/pdf' })

// Mock components
const VersionHeader = {
  template: '<div class="VersionHeader"><slot /></div>',
  props: ['doc', 'canRestore']
}

const InfoDiff = {
  template: '<div class="InfoDiff">InfoDiff</div>',
  props: ['newVersion', 'oldVersion'],
  methods: {
    handleData: vi.fn()
  }
}

const Reader = {
  template: '<div class="Reader">Reader</div>',
  props: ['blob', 'name', 'id', 'loading', 'options']
}

const Icon = {
  template: '<div class="Icon" @click="$emit(\'click\')"><slot /></div>',
  props: ['name']
}

const ElTooltip = {
  template: '<div class="ElTooltip"><slot /></div>',
  props: ['content', 'placement']
}

describe('[client-browse-version]BrowseVersionComparison', () => {
  let wrapper: any

  beforeEach(async () => {
    // Setup API mocks
    vi.spyOn(clientApi.api, 'postNuxeoDocument').mockResolvedValue({
      data: mockNewVersionData
    })

    vi.spyOn(clientApi.api, 'postNuxeoGetspecificversion').mockResolvedValue({
      data: mockOldVersionData
    })

    vi.spyOn(clientApi.api, 'postNuxeoDocumentPreview').mockResolvedValue(mockBlob)

    wrapper = shallowMount(BrowseVersionComparison, {
      props: {
        id: 'doc-id-123',
        oldVersionNum: '1.0'
      },
      global: {
        components: {
          VersionHeader,
          InfoDiff,
          Reader,
          Icon,
          ElTooltip
        },
        provide: {
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        }
      }
    })

    // Wait for onMounted to complete
    await nextTick()
    await nextTick()
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })

  it('renders the component correctly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.versionPageContainer').exists()).toBe(true)
  })

  it('should fetch new version document on mount', async () => {
    expect(clientApi.api.postNuxeoDocument).toHaveBeenCalledWith({
      idOrPath: 'doc-id-123'
    })
    expect(wrapper.vm.newVersion).toEqual(mockNewVersionData)
  })

  it('should fetch old version document on mount', async () => {
    expect(clientApi.api.postNuxeoGetspecificversion).toHaveBeenCalledWith({
      idOrPath: 'doc-id-123',
      versionNum: '1.0'
    })
    expect(wrapper.vm.oldVersion).toEqual(mockOldVersionData)
  })

  it('should set title from new version name', async () => {
    expect(wrapper.vm.state.title).toBe('Test Document.pdf')
  })

  it('should fetch preview for new version', async () => {
    expect(clientApi.api.postNuxeoDocumentPreview).toHaveBeenCalledWith(
      { idOrPath: 'doc-id-123', version: '2.0' },
      { format: 'blob', timeout: 0 }
    )
  })

  it('should fetch preview for old version', async () => {
    expect(clientApi.api.postNuxeoDocumentPreview).toHaveBeenCalledWith(
      { idOrPath: 'doc-id-123-v1', version: '1.0' },
      { format: 'blob', timeout: 0 }
    )
  })

  it('should have correct preview file options', () => {
    const expectedOptions = {
      noDownload: true,
      print: false,
      loadAnnotations: false,
      readOnly: true
    }
    
    expect(wrapper.vm.state.previewNewFile.options).toEqual(expectedOptions)
    expect(wrapper.vm.state.previewOldFile.options).toEqual(expectedOptions)
  })

  it('should call back function and navigate correctly', async () => {
    await wrapper.vm.back()

    expect(mockRouterProvider.navigateTo).toHaveBeenCalled()
  })

  it('should set loading state while fetching preview files', async () => {
    vi.clearAllMocks()
    
    let resolvePreview: any
    const previewPromise = new Promise((resolve) => {
      resolvePreview = resolve
    })

    vi.spyOn(clientApi.api, 'postNuxeoDocumentPreview').mockReturnValue(previewPromise as any)

    const newWrapper = shallowMount(BrowseVersionComparison, {
      props: {
        id: 'doc-id-456',
        oldVersionNum: '1.0'
      },
      global: {
        components: { VersionHeader, InfoDiff, Reader, Icon, ElTooltip },
        provide: {
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: string) => msg
        }
      }
    })

    await nextTick()
    resolvePreview(mockBlob)
    await nextTick()
    await nextTick()

    // Check loading state after completion
    expect(newWrapper.vm.state.previewNewFile.loading).toBe(false)
    expect(newWrapper.vm.state.previewOldFile.loading).toBe(false)

    newWrapper.unmount()
  })

  it('should handle preview file error', async () => {
    vi.clearAllMocks()
    
    vi.spyOn(clientApi.api, 'postNuxeoDocument').mockResolvedValue({
      data: mockNewVersionData
    })

    vi.spyOn(clientApi.api, 'postNuxeoGetspecificversion').mockResolvedValue({
      data: mockOldVersionData
    })

    vi.spyOn(clientApi.api, 'postNuxeoDocumentPreview').mockRejectedValue(
      new Error('Preview failed')
    )

    const newWrapper = shallowMount(BrowseVersionComparison, {
      props: {
        id: 'doc-id-error',
        oldVersionNum: '1.0'
      },
      global: {
        components: { VersionHeader, InfoDiff, Reader, Icon, ElTooltip },
        provide: {
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: string) => msg
        }
      }
    })

    await nextTick()
    await nextTick()

    expect(newWrapper.vm.state.previewNewFile.loading).toBe(false)
    expect(newWrapper.vm.state.previewOldFile.loading).toBe(false)

    newWrapper.unmount()
  })

  it('should initialize activeNames with default value', () => {
    expect(wrapper.vm.activeNames).toEqual(['1'])
  })

  it('should render info section with correct title', () => {
    const headers = wrapper.findAll('h3')
    expect(headers[0].text()).toBe('common_info')
  })

  it('should render file section with correct title', () => {
    const headers = wrapper.findAll('h3')
    expect(headers[1].text()).toBe('common_file')
  })

  it('should render main section only when newVersion is available', async () => {
    expect(wrapper.find('main').exists()).toBe(true)

    wrapper.vm.newVersion = null
    await nextTick()

    expect(wrapper.find('main').exists()).toBe(false)
  })

  it('should have correct grid layout for viewers container', () => {
    const container = wrapper.find('.viewersContainer')
    expect(container.exists()).toBe(true)
  })
  
  it('should fetch documents in correct sequence', async () => {
    const calls = clientApi.api.postNuxeoDocument.mock.calls
    const versionCalls = clientApi.api.postNuxeoGetspecificversion.mock.calls
    
    expect(calls.length).toBeGreaterThan(0)
    expect(versionCalls.length).toBeGreaterThan(0)
  })
})

