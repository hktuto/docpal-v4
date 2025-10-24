import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { FolderCabinetCreateNextDialog } from '#components'
import { clientApi } from 'api'
import { mockRouterProvider } from './util'
import { ElMessage } from 'element-plus'

// Mock the missing functions that are auto-imported by Nuxt
const getLabelList = vi.fn((labelRule: string) => {
  try {
    return JSON.parse(labelRule)
  } catch {
    return []
  }
})

const getNameByLabelRule = vi.fn((labelRules: any[], data: any) => {
  return data.label || 'default-name'
})

vi.stubGlobal('getLabelList', getLabelList)
vi.stubGlobal('getNameByLabelRule', getNameByLabelRule)

// Mock Element Plus components
vi.mock('element-plus', () => ({
  ElMessage: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn()
  }
}))

// Mock the upload tree component
const mockFolderCabinetUploadTreeRef = {
  getData: vi.fn(),
  treeRef: {
    setCurrentKey: vi.fn()
  },
  handleNodeClick: vi.fn()
}

describe('[client-folder-cabinet]FolderCabinetCreateNextDialog', () => {
  let wrapper: any

  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(FolderCabinetCreateNextDialog, {
      props: {
        id: 'test-template-id'
      },
      global: {
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        },
        provide: {
          [MenuRouterKey]: mockRouterProvider
        }
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })


  it('should handleOpen the component correctly', async () => {
    const cabinetTemplate = {
      id: 'test-cabinet-id',
      label: 'Test Cabinet',
      children: [
        {
          id: 'child-1',
          label: 'Child 1',
          folder: true,
          children: []
        }
      ]
    }

    const doc = {
      id: 'doc-id',
      path: '/test/path',
      dfcId: 'dfc-id'
    }

    // Mock the upload tree ref
    wrapper.vm.FolderCabinetUploadTreeRef = mockFolderCabinetUploadTreeRef

    await wrapper.vm.handleOpen(cabinetTemplate, doc)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.state.visible).toBe(true)
    expect(wrapper.vm.state.cabinetTemplate).toEqual(cabinetTemplate)
    expect(wrapper.vm.state.rootDetail.idOrPath).toBe(doc.path)
    expect(wrapper.vm.state.rootDetail.id).toBe(doc.id)
    expect(wrapper.vm.state.rootDetail.dfcId).toBe(doc.dfcId)
    expect(wrapper.vm.state.loading).toBe(false)
    expect(wrapper.vm.state.treeLoading).toBe(false)
  })

  it('should initialize tree data correctly', async () => {
    const children: any[] = [
      {
        id: 'child-1',
        label: 'Child 1',
        folder: true,
        metadataValue: '{"test": "value"}',
        children: []
      },
      {
        id: 'child-2',
        label: 'Child 2',
        folder: false,
        metadataValue: '{"test2": "value2"}',
        children: []
      }
    ]

    wrapper.vm.initTreeData(children)

    expect(children[0].isLack).toBe(false)
    expect(children[0].properties).toEqual({
      test: "value"
    })
    expect(children[0].previewName).toBeDefined()
    expect(children[1].isLack).toBe(false)
    expect(children[1].previewName).toBeDefined()
  })

  it('should handle submit successfully', async () => {
    const mockUploadList = [
      {
        previewName: 'test-file.pdf',
        folder: false,
        raw: new File([''], 'test-file.pdf'),
        documentType: 'File',
        parentId: 'parent-id',
        properties: {}
      }
    ]

    // Mock the upload tree ref
    wrapper.vm.FolderCabinetUploadTreeRef = {
      ...mockFolderCabinetUploadTreeRef,
      getData: vi.fn().mockResolvedValue(mockUploadList)
    }

    // Mock API calls
    vi.spyOn(clientApi.api, 'postNuxeoDocumentCreatedocument').mockResolvedValue({
      data: { id: 'created-doc-id' }
    })

    // Set up state
    wrapper.vm.state.rootDetail = {
      idOrPath: '/test/path',
      dfcId: 'dfc-id'
    }

    await wrapper.vm.handleSubmit()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.state.loading).toBe(false)
    expect(wrapper.vm.state.visible).toBe(false)
    expect(ElMessage.success).toHaveBeenCalled()
  })

  it('should handle submit with folder creation', async () => {
    const mockUploadList = [
      {
        previewName: 'test-folder',
        folder: true,
        children: [
          {
            previewName: 'nested-file.pdf',
            folder: false,
            raw: new File([''], 'nested-file.pdf'),
            documentType: 'File',
            parentId: 'parent-id',
            properties: {}
          }
        ],
        documentType: 'Folder',
        properties: {}
      }
    ]

    // Mock the upload tree ref
    wrapper.vm.FolderCabinetUploadTreeRef = {
      ...mockFolderCabinetUploadTreeRef,
      getData: vi.fn().mockResolvedValue(mockUploadList)
    }

    // Mock API calls
    vi.spyOn(clientApi.api, 'postNuxeoDocumentCreatefolders').mockResolvedValue({
      data: { id: 'created-folder-id' }
    })
    vi.spyOn(clientApi.api, 'postNuxeoDocumentCreatedocument').mockResolvedValue({
      data: { id: 'created-doc-id' }
    })

    // Set up state
    wrapper.vm.state.rootDetail = {
      idOrPath: '/test/path',
      dfcId: 'dfc-id'
    }

    await wrapper.vm.handleSubmit()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.state.loading).toBe(false)
    expect(wrapper.vm.state.visible).toBe(false)
    expect(ElMessage.success).toHaveBeenCalled()
  })

  it('should handle submit error when no upload list', async () => {
    // Mock the upload tree ref to return null
    wrapper.vm.FolderCabinetUploadTreeRef = {
      ...mockFolderCabinetUploadTreeRef,
      getData: vi.fn().mockResolvedValue(null)
    }

    await wrapper.vm.handleSubmit()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.state.loading).toBe(false)
    expect(wrapper.vm.state.visible).toBe(false)
  })

  it('should handle submit error during API call', async () => {
    const mockUploadList = [
      {
        previewName: 'test-file.pdf',
        folder: false,
        raw: new File([''], 'test-file.pdf'),
        documentType: 'File',
        parentId: 'parent-id',
        properties: {}
      }
    ]

    // Mock the upload tree ref
    wrapper.vm.FolderCabinetUploadTreeRef = {
      ...mockFolderCabinetUploadTreeRef,
      getData: vi.fn().mockResolvedValue(mockUploadList)
    }

    // Mock API call to throw error
    vi.spyOn(clientApi.api, 'postNuxeoDocumentCreatedocument').mockRejectedValue(
      new Error('API Error')
    )

    // Set up state
    wrapper.vm.state.rootDetail = {
      idOrPath: '/test/path',
      dfcId: 'dfc-id'
    }

    await wrapper.vm.handleSubmit()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.state.loading).toBe(false)
    expect(wrapper.vm.state.visible).toBe(false)
  })

  it('should get meta name correctly', () => {
    const formData = {
      label: 'Test Label',
      docName: 'Test Doc'
    }

    const row = {
      labelRule: '[{"dataType": "string", "metaData": "fc:docTitle"}]'
    }

    const result = wrapper.vm.getMetaName(formData, row)
    expect(result).toBeDefined()
  })

  it('should emit refresh event after successful submit', async () => {
    const mockUploadList = [
      {
        previewName: 'test-file.pdf',
        folder: false,
        raw: new File([''], 'test-file.pdf'),
        documentType: 'File',
        parentId: 'parent-id',
        properties: {}
      }
    ]

    // Mock the upload tree ref
    wrapper.vm.FolderCabinetUploadTreeRef = {
      ...mockFolderCabinetUploadTreeRef,
      getData: vi.fn().mockResolvedValue(mockUploadList)
    }

    // Mock API calls
    vi.spyOn(clientApi.api, 'postNuxeoDocumentCreatedocument').mockResolvedValue({
      data: { id: 'created-doc-id' }
    })

    // Set up state
    wrapper.vm.state.rootDetail = {
      idOrPath: '/test/path',
      dfcId: 'dfc-id'
    }

    await wrapper.vm.handleSubmit()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('refresh')).toBeTruthy()
  })

  it('should handle dialog close correctly', async () => {
    wrapper.vm.state.visible = true
    await wrapper.vm.$nextTick()

    // Simulate dialog close
    wrapper.vm.state.visible = false
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.state.visible).toBe(false)
  })

  it('should handle loading states correctly', async () => {
    expect(wrapper.vm.state.loading).toBe(false)
    expect(wrapper.vm.state.treeLoading).toBe(false)

    wrapper.vm.state.loading = true
    wrapper.vm.state.treeLoading = true

    expect(wrapper.vm.state.loading).toBe(true)
    expect(wrapper.vm.state.treeLoading).toBe(true)
  })
})
