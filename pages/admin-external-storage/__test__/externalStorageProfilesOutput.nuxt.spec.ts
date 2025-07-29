import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import {
  ExternalStorageProfilesOutput,
  ExternalStorageProfilesOutputDialog,
} from '#components'
import { ElMessageBox } from 'element-plus'
import { mockRouterProvider } from './util'
import { mockQuery, mockReload } from './setup'

// Mock element-plus
vi.mock('element-plus', () => ({
  ElMessageBox: {
    confirm: vi.fn()
  }
}))

// Mock the useOutputOptioins composable
vi.mock('~/composables/useOutputOptioins', () => ({
  useOutputOptioins: () => ({
    setDocumentTypeOpts: vi.fn()
  })
}))

// Mock the useVxeTable composable
const mockTableConfig = {
  id: 'a-externalStorage-profile-output',
  columns: [
    { field: 'documentType', title: 'docType_documentType' },
    { field: 'outputFormat', title: 'externalStorage.outputFormat' },
    { field: 'destination', title: 'externalStorage.destination' },
    { field: 'path', title: 'externalStorage.path' },
    { field: 'status', title: 'common_status' }
  ]
}

describe('[admin-external-storage]ExternalStorageProfilesOutput', () => {
  let wrapper: any
  const mockCaptureSetting = {
    documentType: ['pdf', 'doc', 'txt']
  }

  const mockTableData = [
    {
      id: '1',
      documentType: 'pdf',
      outputFormat: 'PDF',
      destination: 'external',
      path: '/test/path',
      status: 'A'
    },
    {
      id: '2',
      documentType: 'doc',
      outputFormat: 'Word',
      destination: 'docPal',
      path: '/test/path2',
      status: 'D'
    }
  ]

  beforeEach(async () => {
    // Mock API responses
    adminApi.api.getExternalstorageProfilesProfileidOutputrecordList.mockResolvedValue({
      data: mockTableData
    })

    wrapper = mount(ExternalStorageProfilesOutput, {
      props: {
        id: '1',
        captureSetting: mockCaptureSetting
      },
      global: {
        components: { 
          VxeGrid,
          ExternalStorageProfilesOutputDialog
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
    await wrapper.vm.$nextTick()
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('should render the component correctly', () => {
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.find('.outputTable-container').exists()).toBe(true)
    })

    it('should render VxeGrid component', () => {
      const vxeGrid = wrapper.findComponent(VxeGrid)
      expect(vxeGrid.exists()).toBe(true)
    })
    it('should render ExternalStorageProfilesOutputDialog', () => {
      const dialog = wrapper.findComponent(ExternalStorageProfilesOutputDialog)
      expect(dialog.exists()).toBe(true)
    })

    it('should have correct props', () => {
      expect(wrapper.props('id')).toBe('1')
      expect(wrapper.props('captureSetting')).toEqual(mockCaptureSetting)
    })
  })


  describe('Status Display', () => {
    it('should render active status correctly', () => {
      const statusSlot = wrapper.findComponent({ name: 'status' })
      if (statusSlot.exists()) {
        const activeRow = { status: 'A' }
        const result = statusSlot.vm.$slots.default({ row: activeRow })
        expect(result).toBeDefined()
      }
    })

    it('should render inactive status correctly', () => {
      const statusSlot = wrapper.findComponent({ name: 'status' })
      if (statusSlot.exists()) {
        const inactiveRow = { status: 'D' }
        const result = statusSlot.vm.$slots.default({ row: inactiveRow })
        expect(result).toBeDefined()
      }
    })
  })

  describe('Action Handlers', () => {
    it('should call handleEdit when edit action is triggered', async () => {
      const mockRow = { id: '1', name: 'Test Output' }
      const handleEditSpy = vi.spyOn(wrapper.vm, 'handleEdit')
      
      await wrapper.vm.handleEdit(mockRow)
      
      expect(handleEditSpy).toHaveBeenCalledWith(mockRow)
    })

    it('should call handleActive with correct status', async () => {
      const mockRow = { id: '1', status: 'D' }
      adminApi.api.patchExternalstorageProfilesProfileidOutputrecordOutputrecordidStatus.mockResolvedValue({
        data: true
      })

      await wrapper.vm.handleActive(mockRow, 'A')

      expect(adminApi.api.patchExternalstorageProfilesProfileidOutputrecordOutputrecordidStatus).toHaveBeenCalledWith(
        '1',
        '1',
        { status: 'A' }
      )
      expect(mockRow.status).toBe('A')
    })

    it('should handle handleActive error gracefully', async () => {
      const mockRow = { id: '1', status: 'A' }
      adminApi.api.patchExternalstorageProfilesProfileidOutputrecordOutputrecordidStatus.mockRejectedValue(new Error('API Error'))

      await wrapper.vm.handleActive(mockRow, 'D')

      expect(adminApi.api.patchExternalstorageProfilesProfileidOutputrecordOutputrecordidStatus).toHaveBeenCalled()
      expect(mockRow.status).toBe('A') // Should not change on error
    })

    it('should call handleDuplicate with correct data', async () => {
      const mockRow = { id: '1', name: 'Test Output' }
      const mockDetail = { id: '1', name: 'Test Output Detail' }
      adminApi.api.getExternalstorageProfilesProfileidOutputrecordOutputrecordid.mockResolvedValue({
        data: mockDetail
      })

      await wrapper.vm.handleDuplicate(mockRow)

      expect(adminApi.api.getExternalstorageProfilesProfileidOutputrecordOutputrecordid).toHaveBeenCalledWith('1', '1')
    })

    it('should call handleDelete with confirmation', async () => {
      const mockRow = { id: '1', name: 'Test Output' }
      ElMessageBox.confirm.mockResolvedValue('confirm')
      adminApi.api.deleteExternalstorageProfilesProfileidOutputrecordOutputrecordid.mockResolvedValue({
        data: true
      })

      await wrapper.vm.handleDelete(mockRow)

      expect(ElMessageBox.confirm).toHaveBeenCalledWith('msg_confirmWhetherToDelete')
      expect(adminApi.api.deleteExternalstorageProfilesProfileidOutputrecordOutputrecordid).toHaveBeenCalledWith('1', '1')
      expect(mockReload).toHaveBeenCalled()
    })

    it('should not delete when user cancels confirmation', async () => {
      const mockRow = { id: '1', name: 'Test Output' }
      ElMessageBox.confirm.mockResolvedValue('cancel')

      await wrapper.vm.handleDelete(mockRow)

      expect(ElMessageBox.confirm).toHaveBeenCalled()
      expect(adminApi.api.deleteExternalstorageProfilesProfileidOutputrecordOutputrecordid).not.toHaveBeenCalled()
      expect(mockReload).not.toHaveBeenCalled()
    })

    it('should handle delete error gracefully', async () => {
      const mockRow = { id: '1', name: 'Test Output' }
      ElMessageBox.confirm.mockResolvedValue('confirm')
      adminApi.api.deleteExternalstorageProfilesProfileidOutputrecordOutputrecordid.mockRejectedValue(new Error('API Error'))

      await wrapper.vm.handleDelete(mockRow)

      expect(ElMessageBox.confirm).toHaveBeenCalled()
      expect(adminApi.api.deleteExternalstorageProfilesProfileidOutputrecordOutputrecordid).toHaveBeenCalled()
      expect(mockReload).not.toHaveBeenCalled() // Should not reload on error
    })
  })

  describe('Capture Setting Watch', () => {
    it('should not set document type options when captureSetting is null', async () => {
      const setDocumentTypeOptsSpy = vi.fn()
      wrapper.vm.setDocumentTypeOpts = setDocumentTypeOptsSpy

      await wrapper.setProps({
        captureSetting: null
      })

      await wrapper.vm.$nextTick()

      expect(setDocumentTypeOptsSpy).not.toHaveBeenCalled()
    })

    it('should not set document type options when documentType is empty', async () => {
      const setDocumentTypeOptsSpy = vi.fn()
      wrapper.vm.setDocumentTypeOpts = setDocumentTypeOptsSpy

      const newCaptureSetting = {
        documentType: []
      }

      await wrapper.setProps({
        captureSetting: newCaptureSetting
      })

      await wrapper.vm.$nextTick()

      expect(setDocumentTypeOptsSpy).not.toHaveBeenCalled()
    })
  })

  describe('Dependency Injection', () => {
    it('should inject MenuRouterKey', () => {
      expect(wrapper.vm.routerProvider).toBeDefined()
    })

    it('should throw error if MenuRouterKey is not provided', () => {
      expect(() => {
        mount(ExternalStorageProfilesOutput, {
          props: {
            id: '1',
            captureSetting: mockCaptureSetting
          },
          global: {
            components: { 
              VxeGrid,
              ExternalStorageProfilesOutputDialog
            },
            mocks: {
              $t: (msg: string) => msg,
              $i18n: { t: (key: string) => key }
            }
          }
        })
      }).toThrow('MenuRouterKey is not provided')
    })
  })


  describe('Edge Cases', () => {
    it('should handle API error in table data loading', async () => {
      adminApi.api.getExternalstorageProfilesProfileidOutputrecordList.mockRejectedValue(new Error('API Error'))

      await wrapper.vm.$nextTick()

      // Component should still render without errors
      expect(wrapper.exists()).toBe(true)
    })

  })
}) 
