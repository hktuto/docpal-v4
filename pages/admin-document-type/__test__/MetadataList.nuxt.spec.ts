import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { MetadataList, MetadataDialogNew, MetadataDialogEdit, MetadataDialogDuplicate } from '#components'
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'
import { adminApi } from './mock/api'
import { mockRouterProvider } from './util'
import { mockReload } from './setup'
// Mock Element Plus components
vi.mock('element-plus', () => ({
  ElMessage: {
    success: vi.fn(),
    error: vi.fn()
  },
  ElMessageBox: {
    confirm: vi.fn()
  },
  ElLoading: {
    service: vi.fn(() => ({
      close: vi.fn()
    }))
  }
}))

// Mock VxeGrid component
const MockVxeGrid = {
  template: '<div class="vxe-grid">VxeGrid</div>',
  props: ['tableConfig', 'tableEvent'],
  emits: ['reload']
}

// Mock ResponsiveFilter component
const MockResponsiveFilter = {
  template: '<div class="responsive-filter">ResponsiveFilter</div>',
  props: ['inputKey', 'inputPlaceHolder'],
  emits: ['form-change']
}

// Mock downloadBlob utility
const mockDownloadBlob = vi.fn()
vi.mock('~/utils/downloadBlob', () => ({
  downloadBlob: mockDownloadBlob
}))

// Mock formatDate utility
const mockFormatDate = vi.fn((date) => `formatted-${date}`)
vi.mock('~/utils/formatDate', () => ({
  formatDate: mockFormatDate
}))

describe('[admin-document-type]MetadataList', () => {
  let wrapper: any

  const mockTabProvider = {}
  beforeEach(() => {
    vi.clearAllMocks()

    wrapper = mount(MetadataList, {
      global: {
        components: {
          VxeGrid: MockVxeGrid,
          ResponsiveFilter: MockResponsiveFilter,
          MetadataDialogNew,
          MetadataDialogEdit,
          MetadataDialogDuplicate
        },
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key },
          useI18n: () => ({ t: (key: string) => key }),
        },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider
        }
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  describe('Component Rendering', () => {
    it('should render the component correctly', () => {
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.find('.pageContainer--padding').exists()).toBe(true)
      expect(wrapper.find('.tableContainer').exists()).toBe(true)
    })

    it('should render the VxeGrid component', () => {
      expect(wrapper.findComponent(MockVxeGrid).exists()).toBe(true)
    })

    it('should render all dialog components', () => {
      expect(wrapper.findComponent(MetadataDialogNew).exists()).toBe(true)
      expect(wrapper.findComponent(MetadataDialogEdit).exists()).toBe(true)
      expect(wrapper.findComponent(MetadataDialogDuplicate).exists()).toBe(true)
    })
  })

  describe('handleCreate Method', () => {
    it('should open the new metadata dialog', () => {
      wrapper.vm.metadataDialogNewRef = {
        open: vi.fn()
      }
      wrapper.vm.handleCreate()

      expect(wrapper.vm.metadataDialogNewRef.open).toHaveBeenCalled()
    })
  })

  describe('handleExport Method', () => {
    it('should export metadata successfully', async () => {
      // Mock API response
      const mockBlob = new Blob(['test'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      adminApi.api.postDocpaltypeSettingsMetadataV2ExportMetadataCvs.mockResolvedValue(mockBlob)

      await wrapper.vm.handleExport()

      expect(ElLoading.service).toHaveBeenCalledWith({
        lock: true,
        text: 'metadata.export_loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      expect(adminApi.api.postDocpaltypeSettingsMetadataV2ExportMetadataCvs).toHaveBeenCalledWith(
        {
          pageNum: 0,
          pageSize: 1000
        },
        {
          format: 'blob',
          timeout: 0
        }
      )
    })

    it('should close loading after export', async () => {
      const mockLoading = { close: vi.fn() }
      ElLoading.service.mockReturnValue(mockLoading)

      const mockBlob = new Blob(['test'])
      adminApi.api.postDocpaltypeSettingsMetadataV2ExportMetadataCvs.mockResolvedValue(mockBlob)

      await wrapper.vm.handleExport()

      expect(mockLoading.close).toHaveBeenCalled()
    })
  })

  describe('handleEdit Method', () => {
    it('should open edit dialog with correct data', () => {
      wrapper.vm.metadataDialogEditRef = {
        open: vi.fn()
      }
      const testRow = {
        id: '1',
        name: 'Test Metadata',
        validationRule: { validationRuleName: 'text' },
        maskRule: { maskType: 'MASK_ALL' },
        langs: { en: 'Test' }
      }

      wrapper.vm.handleEdit(testRow)

      expect(wrapper.vm.metadataDialogEditRef.open).toHaveBeenCalledWith({
        id: '1',
        name: 'Test Metadata',
        validationRule: { validationRuleName: 'text' },
        maskRule: { maskType: 'MASK_ALL' },
        langs: { en: 'Test' }
      })
    })

    it('should handle row with missing properties', () => {
      wrapper.vm.metadataDialogEditRef = {
        open: vi.fn()
      }
      const testRow = {
        id: '1',
        name: 'Test Metadata'
      }

      wrapper.vm.handleEdit(testRow)

      expect(wrapper.vm.metadataDialogEditRef.open).toHaveBeenCalledWith({
        id: '1',
        name: 'Test Metadata',
        validationRule: null,
        maskRule: null,
        langs: {}
      })
    })
  })

  describe('handleDuplicate Method', () => {
    it('should open duplicate dialog with correct data', () => {
      wrapper.vm.metadataDialogDuplicateRef = {
        open: vi.fn()
      }
      const testRow = {
        id: '1',
        name: 'Test Metadata',
        validationRule: { validationRuleName: 'text' },
        maskRule: { maskType: 'MASK_ALL' },
        langs: { en: 'Test' }
      }

      wrapper.vm.handleDuplicate(testRow)

      expect(wrapper.vm.metadataDialogDuplicateRef.open).toHaveBeenCalledWith({
        id: '1',
        name: 'Test Metadata',
        validationRule: { validationRuleName: 'text' },
        maskRule: { maskType: 'MASK_ALL' },
        langs: { en: 'Test' }
      })
    })
  })

  describe('handleRemove Method', () => {
    it('should remove metadata successfully', async () => {
      ElMessageBox.confirm.mockResolvedValue('confirm')

      adminApi.api.deleteDocpaltypeSettingsMetadataV2DeleteMetadataid.mockResolvedValue(true)

      const testRow = { id: '1', name: 'Test Metadata' }

      await wrapper.vm.handleRemove(testRow)

      expect(ElMessageBox.confirm).toHaveBeenCalledWith('tip_deleteMsg', {
        confirmButtonText: 'common_confirmDelete',
        confirmButtonClass: 'el-button el-button--warning',
      })
      expect(adminApi.api.deleteDocpaltypeSettingsMetadataV2DeleteMetadataid).toHaveBeenCalledWith('1')
      expect(ElMessage.success).toHaveBeenCalledWith('metadata.remove_success')
      expect(mockReload).toHaveBeenCalled()
    })

    it('should handle user cancellation', async () => {
      ElMessageBox.confirm.mockResolvedValue('cancel')

      const testRow = { id: '1', name: 'Test Metadata' }

      await wrapper.vm.handleRemove(testRow)

      expect(ElMessageBox.confirm).toHaveBeenCalled()
      expect(ElMessage.success).not.toHaveBeenCalled()
      expect(mockReload).not.toHaveBeenCalled()
    })

    it('should handle API error', async () => {
      ElMessageBox.confirm.mockResolvedValue('confirm')
      adminApi.api.deleteDocpaltypeSettingsMetadataV2DeleteMetadataid.mockResolvedValue(false)

      const testRow = { id: '1', name: 'Test Metadata' }

      await wrapper.vm.handleRemove(testRow)

      expect(ElMessage.error).toHaveBeenCalledWith('metadata.remove_error')
      expect(mockReload).not.toHaveBeenCalled()
    })
  })

  describe('handleFilterFormChange Method', () => {
    it('should update extra params and reload', async () => {
      const formModel = { metadataName: 'test' }

      await wrapper.vm.handleFilterFormChange(formModel)

      expect(wrapper.vm.extraParams).toEqual(formModel)
      expect(mockReload).toHaveBeenCalled()
    })

    it('should debounce the filter change', async () => {
      const formModel = { metadataName: 'test' }

      // Call multiple times quickly
      wrapper.vm.handleFilterFormChange(formModel)
      wrapper.vm.handleFilterFormChange({ metadataName: 'test2' })
      wrapper.vm.handleFilterFormChange({ metadataName: 'test3' })

      // Wait for debounce
      await new Promise((resolve) => setTimeout(resolve, 600))

      expect(mockReload).toHaveBeenCalledTimes(1)
      expect(wrapper.vm.extraParams).toEqual({ metadataName: 'test3' })
    })
  })

  describe('reload Method', () => {
    it('should call the reload function from useVxeTable', () => {
      wrapper.vm.reload()

      expect(mockReload).toHaveBeenCalled()
    })
  })

  describe('Component Styling', () => {
    it('should have correct CSS classes', () => {
      expect(wrapper.find('.pageContainer--padding').exists()).toBe(true)
      expect(wrapper.find('.tableContainer').exists()).toBe(true)
    })

  })
})
