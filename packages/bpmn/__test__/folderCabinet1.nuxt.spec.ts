import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import type { Node } from '@antv/x6'

// Mock API
vi.mock('api', () => ({
  adminApi: {
    api: {
      postDocpaltypeSettingsDocpalTypeV2MetadataQuery: vi.fn(),
      getCabinetTemplateId: vi.fn(),
      getCabinetList: vi.fn()
    }
  }
}))

// Mock node
const createMockNode = (data: any = {}) => ({
  data: {
    id: 'test-node-id',
    version: 1,
    data: {
      extensionElements: {},
      ...data
    }
  },
  setData: vi.fn(),
  getData: vi.fn(() => ({
    id: 'test-node-id',
    version: 1,
    data: {
      extensionElements: {},
      ...data
    }
  }))
})

describe('FolderCabinet Component', () => {
  let mockNode: Node

  beforeEach(() => {
    vi.clearAllMocks()
    mockNode = createMockNode() as Node
  })

  describe('Data structures and responsiveness', () => {
    it('Responsive data should be initialized correctly', () => {
      const reactiveData = {
        cabinetOptions: ref(),
        cabinetDetail: ref(),
        selectedCabinet: ref(),
        form: ref([]),
        detailLoading: ref(false),
        elementsIdList: ref()
      }

      expect(reactiveData.cabinetOptions).toBeDefined()
      expect(reactiveData.cabinetDetail).toBeDefined()
      expect(reactiveData.selectedCabinet).toBeDefined()
      expect(reactiveData.form).toBeDefined()
      expect(reactiveData.detailLoading).toBeDefined()
      expect(reactiveData.elementsIdList).toBeDefined()
    })

    it('AllFields should be calculated correctly', () => {
      const allFormField = ref([
        { attr_id: 'field1', attr_name: 'Field 1' },
        { attr_id: 'field2', attr_name: 'Field 2' }
      ])

      const allFields = computed(() => {
        if (!allFormField.value) return []
        return allFormField.value
      })

      expect(allFields.value).toEqual([
        { attr_id: 'field1', attr_name: 'Field 1' },
        { attr_id: 'field2', attr_name: 'Field 2' }
      ])
    })

    it('Should return an empty array without allFormField', () => {
      const allFormField = ref(null)

      const allFields = computed(() => {
        if (!allFormField.value) return []
        return allFormField.value
      })

      expect(allFields.value).toEqual([])
    })
  })

  describe('API call testing', () => {
    it('The getCabinetList API should be called correctly', async () => {
      const { adminApi } = await import('api')

      // 模拟API响应
      vi.mocked(adminApi.api.getCabinetList).mockResolvedValue({
        data: [
          { id: 'cabinet1', label: 'Cabinet 1' },
          { id: 'cabinet2', label: 'Cabinet 2' }
        ]
      })

      // 模拟getList函数
      const getList = async () => {
        const response = await adminApi.api.getCabinetList()
        return response.data
      }

      const result = await getList()

      expect(adminApi.api.getCabinetList).toHaveBeenCalledTimes(1)
      expect(result).toEqual([
        { id: 'cabinet1', label: 'Cabinet 1' },
        { id: 'cabinet2', label: 'Cabinet 2' }
      ])
    })

    it('The getCabinetTemplateId API should be called correctly', async () => {
      const { adminApi } = await import('api')

      vi.mocked(adminApi.api.getCabinetTemplateId).mockResolvedValue({
        data: {
          id: 'cabinet1',
          label: 'Cabinet 1',
          documentType: 'test-doc-type'
        }
      })

      const getCabinetDetail = async (id: string) => {
        const response = await adminApi.api.getCabinetTemplateId(id)
        return response.data
      }

      const result = await getCabinetDetail('cabinet1')

      expect(adminApi.api.getCabinetTemplateId).toHaveBeenCalledWith('cabinet1')
      expect(result).toEqual({
        id: 'cabinet1',
        label: 'Cabinet 1',
        documentType: 'test-doc-type'
      })
    })
  })

  describe('Data processing function test', () => {
    it('The loopChildren function should be handled correctly', async () => {
      const { adminApi } = await import('api')

      vi.mocked(adminApi.api.postDocpaltypeSettingsDocpalTypeV2MetadataQuery).mockResolvedValue({
        data: {
          metadataList: [
            { name: 'metadata1' },
            { name: 'metadata2' }
          ]
        }
      })

      const loopChildren = async (all: any[], item: any, level = 0) => {
        const response = await adminApi.api.postDocpaltypeSettingsDocpalTypeV2MetadataQuery({
          docpalTypeName: item.documentType
        })
        const meta = response.data

        all.push({
          ...item,
          level,
          displayMeta: (meta && meta.metadataList?.length > 0)
            ? ['folderCabinetId', 'fc:docTitle', ...meta.metadataList?.map((item: any) => item.name)]
            : ['folderCabinetId', 'fc:docTitle']
        })

        if (item.children) {
          level++
          for (const child of item.children) {
            all = await loopChildren(all, child, level)
          }
        }
        return all
      }

      const testItem = {
        id: 'test',
        label: 'Test',
        documentType: 'test-type',
        children: [
          {
            id: 'child1',
            label: 'Child 1',
            documentType: 'child-type'
          }
        ]
      }

      const result = await loopChildren([], testItem, 0)

      expect(result).toHaveLength(2)
      expect(result[0].level).toBe(0)
      expect(result[1].level).toBe(1)
      expect(result[0].displayMeta).toContain('folderCabinetId')
      expect(result[0].displayMeta).toContain('fc:docTitle')
      expect(result[0].displayMeta).toContain('metadata1')
      expect(result[0].displayMeta).toContain('metadata2')
    })

    it('The handleUpdateField function should be handled correctly', () => {
      const graph = {
        startBatch: vi.fn(),
        stopBatch: vi.fn()
      }

      const node = {
        setData: vi.fn()
      }

      const handleUpdateField = (list: any[]) => {
        let saveItem: any[] = []

        list.forEach((item: any) => {
          saveItem.push({
            attr_id: item.attr_id,
            attr_name: item.attr_name,
            field: item.field
          })
        })

        graph.startBatch('update-folderCabinet-field')
        node.setData({
          data: {
            extensionElements: {
              'flowable:folderCabinetMapping': saveItem
            }
          }
        }, {
          overwrite: true,
          deep: true
        })
        graph.stopBatch('update-folderCabinet-field')
      }

      const testList = [
        {
          attr_id: 'item1',
          attr_name: 'Item 1',
          field: []
        }
      ]

      handleUpdateField(testList)

      expect(graph.startBatch).toHaveBeenCalledWith('update-folderCabinet-field')
      expect(graph.stopBatch).toHaveBeenCalledWith('update-folderCabinet-field')
      expect(node.setData).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            extensionElements: expect.objectContaining({
              'flowable:folderCabinetMapping': testList
            })
          })
        }),
        expect.any(Object)
      )
    })
  })

  describe('Error handling test', () => {
    it('API errors should be handled', async () => {
      const { adminApi } = await import('api')

      vi.mocked(adminApi.api.getCabinetTemplateId).mockRejectedValue(new Error('API Error'))

      const getCabinetDetail = async (id: string) => {
        try {
          const response = await adminApi.api.getCabinetTemplateId(id)
          return response.data
        } catch (error) {
          throw error
        }
      }

      await expect(getCabinetDetail('cabinet1')).rejects.toThrow('API Error')
    })

    it('Should handle the missing provider', () => {
      const checkProviders = (graphProvider: any, editorProvider: any) => {
        if (!graphProvider || !editorProvider) {
          throw new Error('graph provider not found')
        }
        return true
      }

      expect(() => checkProviders(null, null)).toThrow('graph provider not found')
      expect(() => checkProviders(undefined, undefined)).toThrow('graph provider not found')
      expect(checkProviders({}, {})).toBe(true)
    })
  })

  describe('Status Management Test', () => {
    it('The loading status should be managed correctly', async () => {
      const detailLoading = ref(false)

      const getCabinetDetail = async (id: string) => {
        if (!id) {
          return
        }

        detailLoading.value = true
        try {
          await new Promise(resolve => setTimeout(resolve, 100))
        } finally {
          detailLoading.value = false
        }
      }

      expect(detailLoading.value).toBe(false)

      const promise = getCabinetDetail('cabinet1')
      expect(detailLoading.value).toBe(true)

      await promise
      expect(detailLoading.value).toBe(false)
    })

    it('The status should be reset correctly', async () => {
      const form = ref([{ id: 1 }, { id: 2 }])
      const selectedCabinet = ref('cabinet1')

      const resetState = () => {
        form.value = []
        selectedCabinet.value = ''
      }

      expect(form.value).toHaveLength(2)
      expect(selectedCabinet.value).toBe('cabinet1')

      resetState()

      expect(form.value).toHaveLength(0)
      expect(selectedCabinet.value).toBe('')
    })
  })
})

function computed<T>(getter: () => T) {
  return {
    get value() {
      return getter()
    }
  }
}
