import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { MetadataList } from '#components'
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'

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

// Mock API
vi.mock('api', () => ({
  adminApi: {
    api: {
      postDocpaltypeSettingsMetadataV2Query: vi.fn(),
      deleteDocpaltypeSettingsMetadataV2DeleteMetadataid: vi.fn(),
      postDocpaltypeSettingsMetadataV2ExportMetadataCvs: vi.fn()
    }
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

// Mock dialog components
const MockMetadataDialogNew = {
  template: '<div class="dialog-new">New Dialog</div>',
  emits: ['reload'],
  methods: {
    open: vi.fn()
  }
}

const MockMetadataDialogEdit = {
  template: '<div class="dialog-edit">Edit Dialog</div>',
  emits: ['reload'],
  methods: {
    open: vi.fn()
  }
}

const MockMetadataDialogDuplicate = {
  template: '<div class="dialog-duplicate">Duplicate Dialog</div>',
  emits: ['reload'],
  methods: {
    open: vi.fn()
  }
}

// Mock useVxeTable composable
const mockTableRef = {
  value: {
    loadData: vi.fn(),
    initBar: vi.fn()
  }
}

const mockReload = vi.fn()
const mockQuery = vi.fn()
const mockCleanSelectedRows = vi.fn()

vi.mock('../../../packages/base/composables/useVxeTable', () => ({
  useVxeTable: vi.fn(() => ({
    tableConfig: {
      id: 'metadataList',
      columns: [
        { field: 'name', title: 'table_name', fixed: 'left' },
        { field: 'dataType', title: 'meta.dataTypeText' },
        { field: 'lastModifiedDate', title: 'table_last_update' }
      ],
      bodyActions: [
        [
          { code: 'edit', name: 'common_edit', visible: true, disabled: false },
          { code: 'duplicate', name: 'actions.duplicate', visible: true, disabled: false },
          { code: 'remove', name: 'common_remove', visible: true, disabled: false }
        ]
      ]
    },
    tableEvent: {},
    tableRef: mockTableRef,
    reload: mockReload,
    cleanSelectedRows: mockCleanSelectedRows,
    query: mockQuery
  }))
}))

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

  beforeEach(() => {
    vi.clearAllMocks()
    
    wrapper = mount(MetadataList, {
      global: {
        components: {
          VxeGrid: MockVxeGrid,
          ResponsiveFilter: MockResponsiveFilter,
          MetadataDialogNew: MockMetadataDialogNew,
          MetadataDialogEdit: MockMetadataDialogEdit,
          MetadataDialogDuplicate: MockMetadataDialogDuplicate
        },
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key },
          useI18n: () => ({ t: (key: string) => key }),
          MenuRouterKey: 'MenuRouterKey'
        },
        provide: {
          MenuRouterKey: 'MenuRouterKey'
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

    it('should render the ResponsiveFilter component', () => {
      expect(wrapper.findComponent(MockResponsiveFilter).exists()).toBe(true)
    })

    it('should render the action buttons', () => {
      const buttons = wrapper.findAll('button')
      expect(buttons.length).toBeGreaterThan(0)
      
      const newButton = wrapper.find('button[type="primary"]')
      expect(newButton.exists()).toBe(true)
      expect(newButton.text()).toBe('metadata.new')
    })

    it('should render the export button', () => {
      const buttons = wrapper.findAll('button[type="primary"]')
      expect(buttons.length).toBe(2) // New and Export buttons
    })

    it('should render all dialog components', () => {
      expect(wrapper.findComponent(MockMetadataDialogNew).exists()).toBe(true)
      expect(wrapper.findComponent(MockMetadataDialogEdit).exists()).toBe(true)
      expect(wrapper.findComponent(MockMetadataDialogDuplicate).exists()).toBe(true)
    })
  })

  describe('Table Configuration', () => {
    it('should have correct table columns', () => {
      const { useVxeTable } = require('../../../packages/base/composables/useVxeTable')
      const mockUseVxeTable = useVxeTable()
      
      expect(mockUseVxeTable.tableConfig.columns).toEqual([
        { field: 'name', title: 'table_name', fixed: 'left' },
        { field: 'dataType', title: 'meta.dataTypeText' },
        { field: 'lastModifiedDate', title: 'table_last_update' }
      ])
    })

    it('should have correct body actions', () => {
      const { useVxeTable } = require('../../../packages/base/composables/useVxeTable')
      const mockUseVxeTable = useVxeTable()
      
      expect(mockUseVxeTable.tableConfig.bodyActions[0]).toEqual([
        { code: 'edit', name: 'common_edit', visible: true, disabled: false },
        { code: 'duplicate', name: 'actions.duplicate', visible: true, disabled: false },
        { code: 'remove', name: 'common_remove', visible: true, disabled: false }
      ])
    })
  })

  describe('handleCreate Method', () => {
    it('should open the new metadata dialog', () => {
      wrapper.vm.handleCreate()

      expect(wrapper.vm.metadataDialogNewRef.open).toHaveBeenCalled()
    })
  })

  describe('handleExport Method', () => {
    it('should export metadata successfully', async () => {
      const { adminApi } = await import('api')
      
      // Mock API response
      const mockBlob = new Blob(['test'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      adminApi.api.postDocpaltypeSettingsMetadataV2ExportMetadataCvs.mockResolvedValue(mockBlob)

      await wrapper.vm.handleExport()

      expect(ElLoading.service).toHaveBeenCalledWith({
        lock: true,
        text: 'metadata.export_loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      expect(adminApi.api.postDocpaltypeSettingsMetadataV2ExportMetadataCvs).toHaveBeenCalledWith({
        pageNum: 0,
        pageSize: 1000
      }, {
        format: 'blob',
        timeout: 0
      })
      expect(mockDownloadBlob).toHaveBeenCalledWith(
        mockBlob,
        'metadata.xlsx',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      )
    })

    it('should close loading after export', async () => {
      const { adminApi } = await import('api')
      
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
      const { adminApi } = await import('api')
      
      // Mock confirmation dialog
      ElMessageBox.confirm.mockResolvedValue('confirm')
      
      // Mock API response
      adminApi.api.deleteDocpaltypeSettingsMetadataV2DeleteMetadataid.mockResolvedValue(true)

      const testRow = { id: '1', name: 'Test Metadata' }

      await wrapper.vm.handleRemove(testRow)

      expect(ElMessageBox.confirm).toHaveBeenCalledWith(
        'metadata.confirm_delete',
        'metadata.confirm_delete_title',
        {
          confirmButtonText: 'common_confirm',
          cancelButtonText: 'common_cancel',
          type: 'warning'
        }
      )
      expect(adminApi.api.deleteDocpaltypeSettingsMetadataV2DeleteMetadataid).toHaveBeenCalledWith('1')
      expect(ElMessage.success).toHaveBeenCalledWith('metadata.remove_success')
      expect(mockReload).toHaveBeenCalled()
    })

    it('should handle user cancellation', async () => {
      // Mock confirmation dialog - user cancels
      ElMessageBox.confirm.mockResolvedValue('cancel')

      const testRow = { id: '1', name: 'Test Metadata' }

      await wrapper.vm.handleRemove(testRow)

      expect(ElMessageBox.confirm).toHaveBeenCalled()
      expect(ElMessage.success).not.toHaveBeenCalled()
      expect(mockReload).not.toHaveBeenCalled()
    })

    it('should handle API error', async () => {
      const { adminApi } = await import('api')
      
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
      await new Promise(resolve => setTimeout(resolve, 600))

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

  describe('API Integration', () => {
    it('should use correct API for querying metadata', async () => {
      const { useVxeTable } = require('../../../packages/base/composables/useVxeTable')
      const mockUseVxeTable = useVxeTable()
      
      const testParams = { pageNum: 0, pageSize: 10 }
      const extraParams = { metadataName: 'test' }
      wrapper.vm.extraParams = extraParams

      await mockUseVxeTable.api(testParams)

      const { adminApi } = await import('api')
      expect(adminApi.api.postDocpaltypeSettingsMetadataV2Query).toHaveBeenCalledWith({
        ...testParams,
        ...extraParams
      })
    })
  })

  describe('Event Handling', () => {
    it('should handle reload events from dialogs', () => {
      const newDialog = wrapper.findComponent(MockMetadataDialogNew)
      const editDialog = wrapper.findComponent(MockMetadataDialogEdit)
      const duplicateDialog = wrapper.findComponent(MockMetadataDialogDuplicate)

      newDialog.vm.$emit('reload')
      editDialog.vm.$emit('reload')
      duplicateDialog.vm.$emit('reload')

      expect(mockReload).toHaveBeenCalledTimes(3)
    })

    it('should handle form change events from filter', async () => {
      const filter = wrapper.findComponent(MockResponsiveFilter)
      const formModel = { metadataName: 'test' }

      filter.vm.$emit('form-change', formModel)

      // Wait for debounce
      await new Promise(resolve => setTimeout(resolve, 600))

      expect(wrapper.vm.extraParams).toEqual(formModel)
      expect(mockReload).toHaveBeenCalled()
    })
  })

  describe('Table Actions', () => {
    it('should handle edit action from table', () => {
      const { useVxeTable } = require('../../../packages/base/composables/useVxeTable')
      const mockUseVxeTable = useVxeTable()
      
      const testRow = { id: '1', name: 'Test' }
      const editAction = mockUseVxeTable.tableConfig.bodyActions[0][0]
      
      editAction.action({ row: testRow })

      expect(wrapper.vm.metadataDialogEditRef.open).toHaveBeenCalled()
    })

    it('should handle duplicate action from table', () => {
      const { useVxeTable } = require('../../../packages/base/composables/useVxeTable')
      const mockUseVxeTable = useVxeTable()
      
      const testRow = { id: '1', name: 'Test' }
      const duplicateAction = mockUseVxeTable.tableConfig.bodyActions[0][1]
      
      duplicateAction.action({ row: testRow })

      expect(wrapper.vm.metadataDialogDuplicateRef.open).toHaveBeenCalled()
    })

    it('should handle remove action from table', async () => {
      const { useVxeTable } = require('../../../packages/base/composables/useVxeTable')
      const mockUseVxeTable = useVxeTable()
      
      const testRow = { id: '1', name: 'Test' }
      const removeAction = mockUseVxeTable.tableConfig.bodyActions[0][2]
      
      ElMessageBox.confirm.mockResolvedValue('confirm')
      const { adminApi } = await import('api')
      adminApi.api.deleteDocpaltypeSettingsMetadataV2DeleteMetadataid.mockResolvedValue(true)
      
      await removeAction.action({ row: testRow })

      expect(ElMessageBox.confirm).toHaveBeenCalled()
    })
  })

  describe('Edge Cases', () => {
    it('should handle missing MenuRouterKey', () => {
      const wrapperWithoutRouter = mount(MetadataList, {
        global: {
          components: {
            VxeGrid: MockVxeGrid,
            ResponsiveFilter: MockResponsiveFilter,
            MetadataDialogNew: MockMetadataDialogNew,
            MetadataDialogEdit: MockMetadataDialogEdit,
            MetadataDialogDuplicate: MockMetadataDialogDuplicate
          },
          mocks: {
            $t: (msg: string) => msg,
            $i18n: { t: (key: string) => key },
            useI18n: () => ({ t: (key: string) => key })
          }
        }
      })

      // Should not throw error, just not have router functionality
      expect(wrapperWithoutRouter.exists()).toBe(true)
    })

    it('should handle API errors gracefully', async () => {
      const { adminApi } = await import('api')
      
      adminApi.api.postDocpaltypeSettingsMetadataV2ExportMetadataCvs.mockRejectedValue(new Error('API Error'))

      await wrapper.vm.handleExport()

      // Should not throw error, loading should still be closed
      const mockLoading = ElLoading.service.mock.results[0].value
      expect(mockLoading.close).toHaveBeenCalled()
    })

    it('should handle empty row data in actions', () => {
      const emptyRow = {}

      wrapper.vm.handleEdit(emptyRow)
      wrapper.vm.handleDuplicate(emptyRow)

      expect(wrapper.vm.metadataDialogEditRef.open).toHaveBeenCalledWith({
        id: undefined,
        name: undefined,
        validationRule: null,
        maskRule: null,
        langs: {}
      })
    })
  })

  describe('Component Styling', () => {
    it('should have correct CSS classes', () => {
      expect(wrapper.find('.pageContainer--padding').exists()).toBe(true)
      expect(wrapper.find('.tableContainer').exists()).toBe(true)
    })

    it('should have responsive filter container', () => {
      expect(wrapper.find('.actionsButtonsContainer').exists()).toBe(true)
    })
  })
}) 
