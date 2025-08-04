import { mount } from '@vue/test-utils'
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest'
import { DocTypeRelatedTypeTable } from '#components'
import { adminApi } from './mock/api'
import { ElMessage, ElMessageBox } from 'element-plus'
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
    warning: vi.fn()
  }
}))

// Mock components
const VxeGrid = {
  template: '<div class="VxeGrid">VxeGrid</div>',
  methods: {
    loadData: vi.fn()
  }
}

const ResponsiveFilter = {
  template: '<div class="ResponsiveFilter">ResponsiveFilter</div>',
  methods: {
    handleFilter: vi.fn()
  }
}

const DocTypeDialogAddRelatedType = {
  template: '<div class="DocTypeDialogAddRelatedType">DocTypeDialogAddRelatedType</div>',
  methods: {
    handleOpen: vi.fn()
  }
}

describe('[admin-document-type]DocTypeRelatedTypeTable', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(DocTypeRelatedTypeTable, {
      props: {
        docTypeDetail: {
          name: 'Test Document Type',
          category: 'Test Category'
        },
        name: 'Test Document Type'
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, DocTypeDialogAddRelatedType },
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

    // Mock table ref
    const tableRef = wrapper.vm.$refs.tableRef
    if (tableRef) {
      tableRef.loadData = vi.fn()
    }
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('renders correctly', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('renders VxeGrid component', () => {
      const vxeGrid = wrapper.findComponent(VxeGrid)
      expect(vxeGrid.exists()).toBe(true)
    })

    it('renders ResponsiveFilter component', () => {
      const responsiveFilter = wrapper.findComponent(ResponsiveFilter)
      expect(responsiveFilter.exists()).toBe(true)
    })

    it('renders add button', () => {
      const addButton = wrapper.find('#DocumentType__RelatedDocument__AddNewRelatedDocument')
      expect(addButton.exists()).toBe(true)
      expect(addButton.text()).toBe('docType_addRelatedMeta')
    })

    it('renders DocTypeDialogAddRelatedType component', () => {
      const dialog = wrapper.findComponent(DocTypeDialogAddRelatedType)
      expect(dialog.exists()).toBe(true)
    })
  })

  describe('Table Configuration', () => {
    it('should have correct table configuration', () => {
      const tableConfig = wrapper.vm.tableConfig
      expect(tableConfig.id).toBe('relatedType')
      expect(tableConfig.virtualScroll).toBe(true)
      expect(tableConfig.columns).toBeDefined()
      expect(tableConfig.bodyActions).toBeDefined()
      expect(tableConfig.dblClickAction).toBeDefined()
    })

    it('should have correct column configuration', () => {
      const columns = wrapper.vm.tableConfig.columns
      expect(columns).toHaveLength(2)
      expect(columns[0].field).toBe('rootDocPalType')
      expect(columns[0].title).toBe('dpTable_documentType')
      expect(columns[0].fixed).toBe('left')
      expect(columns[1].field).toBe('metaData')
      expect(columns[1].title).toBe('rightDetail_meta')
    })

    it('should have correct body actions', () => {
      const bodyActions = wrapper.vm.tableConfig.bodyActions[0]
      expect(bodyActions).toHaveLength(2)
      expect(bodyActions[0].code).toBe('edit')
      expect(bodyActions[0].name).toBe('documentType_relatedEdit')
      expect(bodyActions[1].code).toBe('delete')
      expect(bodyActions[1].name).toBe('documentType_relatedDelete')
    })

    it('should format rootDocPalType column correctly', () => {
      const rootDocPalTypeColumn = wrapper.vm.tableConfig.columns[0]
      const formatter = rootDocPalTypeColumn.formatter
      const result = formatter({ cellValue: 'test_doc_type' })
      expect(result).toBe('test_doc_type') // Mock translation returns the key
    })
  })

  describe('Data Loading', () => {
    it('should load related document types on mount', async () => {
      const mockData = [
        { id: 1, rootDocPalType: 'Type 1', metaData: 'Meta 1' },
        { id: 2, rootDocPalType: 'Type 2', metaData: 'Meta 2' }
      ]
      adminApi.api.getDocpaltypeSettingsNameNameRelated.mockResolvedValue({ data: mockData })

      await wrapper.vm.getList()

      expect(adminApi.api.getDocpaltypeSettingsNameNameRelated).toHaveBeenCalledWith('Test Document Type')
      expect(wrapper.vm._list).toEqual(mockData)
      expect(wrapper.vm.tableRef.loadData).toHaveBeenCalledWith(mockData)
    })

    it('should handle API error when loading data', async () => {
      adminApi.api.getDocpaltypeSettingsNameNameRelated.mockRejectedValue(new Error('API Error'))

      await wrapper.vm.getList()

      expect(wrapper.vm._list).toEqual([])
    })
  })

  describe('Delete Functionality', () => {
    it('should delete related document type successfully', async () => {
      const row = { id: 1, rootDocPalType: 'Test Type' }
      ElMessageBox.confirm.mockResolvedValue('confirm')
      adminApi.api.deleteDocpaltypeSettingsRelatedId.mockResolvedValue({ data: true })

      await wrapper.vm.handleDelete(row)

      expect(ElMessageBox.confirm).toHaveBeenCalledWith(
        expect.stringContaining('tip_deleteMsg'),
        expect.objectContaining({
          confirmButtonClass: 'el-button el-button--warning',
          confirmButtonText: 'common_confirmDelete'
        })
      )
      expect(adminApi.api.deleteDocpaltypeSettingsRelatedId).toHaveBeenCalledWith(1)
      expect(mockRouterProvider.message.success).toHaveBeenCalledWith(
        expect.stringContaining('tip_deleteSuccessMsg')
      )
      expect(wrapper.vm.getList).toHaveBeenCalled()
    })

    it('should not delete when user cancels confirmation', async () => {
      const row = { id: 1, rootDocPalType: 'Test Type' }
      ElMessageBox.confirm.mockResolvedValue('cancel')

      await wrapper.vm.handleDelete(row)

      expect(ElMessageBox.confirm).toHaveBeenCalled()
      expect(adminApi.api.deleteDocpaltypeSettingsRelatedId).not.toHaveBeenCalled()
      expect(wrapper.vm.getList).not.toHaveBeenCalled()
    })

    it('should handle delete API error', async () => {
      const row = { id: 1, rootDocPalType: 'Test Type' }
      ElMessageBox.confirm.mockResolvedValue('confirm')
      adminApi.api.deleteDocpaltypeSettingsRelatedId.mockRejectedValue(new Error('Delete failed'))

      await wrapper.vm.handleDelete(row)

      expect(ElMessageBox.confirm).toHaveBeenCalled()
      expect(adminApi.api.deleteDocpaltypeSettingsRelatedId).toHaveBeenCalledWith(1)
      // Should not call getList on error
      expect(wrapper.vm.getList).not.toHaveBeenCalled()
    })
  })

  describe('Dialog Management', () => {
    it('should open dialog for adding new related type', async () => {
      const dialogRef = wrapper.vm.$refs.DialogRef
      dialogRef.handleOpen = vi.fn()

      await wrapper.vm.handleDialogShow()

      expect(dialogRef.handleOpen).toHaveBeenCalledWith(wrapper.vm._list, {
        documentType: undefined,
        metadata: undefined
      })
    })

    it('should open dialog for editing existing related type', async () => {
      const dialogRef = wrapper.vm.$refs.DialogRef
      dialogRef.handleOpen = vi.fn()
      const rowData = { 
        id: 1, 
        rootDocPalType: 'Test Type', 
        metaData: 'Test Meta' 
      }

      await wrapper.vm.handleDialogShow(rowData)

      expect(dialogRef.handleOpen).toHaveBeenCalledWith(wrapper.vm._list, {
        id: 1,
        rootDocPalType: 'Test Type',
        metaData: 'Test Meta',
        documentType: 'Test Type',
        metadata: 'Test Meta'
      })
    })
  })

  describe('Filtering', () => {
    it('should filter data based on search query', async () => {
      // Set up initial data
      wrapper.vm._list = [
        { id: 1, rootDocPalType: 'Test Type 1', metaData: 'Meta 1' },
        { id: 2, rootDocPalType: 'Another Type', metaData: 'Meta 2' }
      ]
      const formModel = { name: 'Test' }

      await wrapper.vm.handleFilterFormChange(formModel)

      expect(wrapper.vm.tableRef.loadData).toHaveBeenCalledWith([
        { id: 1, rootDocPalType: 'Test Type 1', metaData: 'Meta 1' }
      ])
    })

    it('should filter data case-insensitively', async () => {
      wrapper.vm._list = [
        { id: 1, rootDocPalType: 'Test Type', metaData: 'Meta 1' },
        { id: 2, rootDocPalType: 'Another Type', metaData: 'Meta 2' }
      ]
      const formModel = { name: 'test' }

      await wrapper.vm.handleFilterFormChange(formModel)

      expect(wrapper.vm.tableRef.loadData).toHaveBeenCalledWith([
        { id: 1, rootDocPalType: 'Test Type', metaData: 'Meta 1' }
      ])
    })

    it('should return all data when no filter is applied', async () => {
      wrapper.vm._list = [
        { id: 1, rootDocPalType: 'Test Type 1', metaData: 'Meta 1' },
        { id: 2, rootDocPalType: 'Test Type 2', metaData: 'Meta 2' }
      ]
      const formModel = { name: '' }

      await wrapper.vm.handleFilterFormChange(formModel)

      expect(wrapper.vm.tableRef.loadData).toHaveBeenCalledWith(wrapper.vm._list)
    })

    it('should filter by translated document type name', async () => {
      wrapper.vm._list = [
        { id: 1, rootDocPalType: 'test_type', metaData: 'Meta 1' },
        { id: 2, rootDocPalType: 'another_type', metaData: 'Meta 2' }
      ]
      const formModel = { name: 'test_type' }

      await wrapper.vm.handleFilterFormChange(formModel)

      expect(wrapper.vm.tableRef.loadData).toHaveBeenCalledWith([
        { id: 1, rootDocPalType: 'test_type', metaData: 'Meta 1' }
      ])
    })
  })

  describe('Component Integration', () => {
    it('should handle refresh from dialog', async () => {
      const dialog = wrapper.findComponent(DocTypeDialogAddRelatedType)
      
      await dialog.vm.$emit('refresh')

      expect(wrapper.vm.getList).toHaveBeenCalled()
    })

    it('should handle double click on table row', async () => {
      const dblClickAction = wrapper.vm.tableConfig.dblClickAction
      const row = { id: 1, rootDocPalType: 'Test Type' }
      const dialogRef = wrapper.vm.$refs.DialogRef
      dialogRef.handleOpen = vi.fn()

      dblClickAction({ row })

      expect(dialogRef.handleOpen).toHaveBeenCalledWith(wrapper.vm._list, {
        id: 1,
        rootDocPalType: 'Test Type',
        documentType: 'Test Type',
        metadata: undefined
      })
    })

    it('should handle edit action from table', async () => {
      const editAction = wrapper.vm.tableConfig.bodyActions[0][0].action
      const row = { id: 1, rootDocPalType: 'Test Type' }
      const dialogRef = wrapper.vm.$refs.DialogRef
      dialogRef.handleOpen = vi.fn()

      editAction({ row })

      expect(dialogRef.handleOpen).toHaveBeenCalledWith(row)
    })

    it('should handle delete action from table', async () => {
      const deleteAction = wrapper.vm.tableConfig.bodyActions[0][1].action
      const row = { id: 1, rootDocPalType: 'Test Type' }
      ElMessageBox.confirm.mockResolvedValue('confirm')
      adminApi.api.deleteDocpaltypeSettingsRelatedId.mockResolvedValue({ data: true })

      await deleteAction({ row })

      expect(adminApi.api.deleteDocpaltypeSettingsRelatedId).toHaveBeenCalledWith(1)
    })
  })

  describe('Props Handling', () => {
    it('should have correct props', () => {
      expect(wrapper.vm.docTypeDetail).toEqual({
        name: 'Test Document Type',
        category: 'Test Category'
      })
      expect(wrapper.vm.name).toBe('Test Document Type')
    })

    it('should pass correct props to dialog', () => {
      const dialog = wrapper.findComponent(DocTypeDialogAddRelatedType)
      
      expect(dialog.props('docType')).toEqual({
        name: 'Test Document Type',
        category: 'Test Category'
      })
      expect(dialog.props('name')).toBe('Test Document Type')
    })
  })

  describe('Error Handling', () => {
    it('should handle missing routerProvider gracefully', async () => {
      // Test that component doesn't crash when routerProvider is missing
      const wrapperWithoutRouter = mount(DocTypeRelatedTypeTable, {
        props: {
          docTypeDetail: { name: 'Test Document Type' },
          name: 'Test Document Type'
        },
        global: {
          components: { VxeGrid, ResponsiveFilter, DocTypeDialogAddRelatedType },
          provide: {
            [TabManagerKey]: mockTabProvider
            // No MenuRouterKey provided
          },
          mocks: {
            $t: (msg: string) => msg,
            $i18n: { t: (key: string) => key }
          }
        }
      })

      expect(wrapperWithoutRouter.exists()).toBe(true)
      wrapperWithoutRouter.unmount()
    })

    it('should handle empty API response', async () => {
      adminApi.api.getDocpaltypeSettingsNameNameRelated.mockResolvedValue({ data: [] })

      await wrapper.vm.getList()

      expect(wrapper.vm._list).toEqual([])
      expect(wrapper.vm.tableRef.loadData).toHaveBeenCalledWith([])
    })
  })

  describe('Table Events', () => {
    it('should handle table events correctly', () => {
      const tableEvent = wrapper.vm.tableEvent
      expect(tableEvent).toBeDefined()
    })
  })

  describe('ResponsiveFilter Integration', () => {
    it('should call handleFilter on ResponsiveFilter', async () => {
      const responsiveFilterRef = wrapper.vm.$refs.ResponsiveFilterRef
      responsiveFilterRef.handleFilter = vi.fn()

      await wrapper.vm.getList()

      expect(responsiveFilterRef.handleFilter).toHaveBeenCalled()
    })
  })
}) 
