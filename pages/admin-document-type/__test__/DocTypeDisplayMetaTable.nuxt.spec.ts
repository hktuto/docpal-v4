import { mount } from '@vue/test-utils'
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest'
import { DocTypeDisplayMetaTable } from '#components'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { ElMessageBox, ElMessage } from 'element-plus'
import { mockRouterProvider } from './util'
import { mockReload, mockQuery } from './setup'

// Mock the missing functions
const formatDate = vi.fn((date) => date)

// Mock global functions
vi.stubGlobal('formatDate', formatDate)

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

const mockTable = {
  value: {
    loadData: vi.fn()
  }
}

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

describe('[admin-document-type]DocTypeDisplayMetaTable', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(DocTypeDisplayMetaTable, {
      props: {
        documentType: 'Test Document Type',
        id: 'test-id'
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
    
    // Mock the dialog ref
    const dialogRef = wrapper.vm.$refs.MetaDisplayMetaDialogRef
    if (dialogRef) {
      dialogRef.handleOpen = vi.fn()
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
      expect(wrapper.findComponent(VxeGrid).exists()).toBe(true)
    })

    it('renders DocTypeDialogAddDisplayMeta component', () => {
      expect(wrapper.findComponent({ ref: 'MetaDisplayMetaDialogRef' }).exists()).toBe(true)
    })
  })

  describe('Data Loading', () => {
    it('should load metadata list on mount', async () => {
      const mockData = {
        metadataList: [
          { id: 1, name: 'Test Meta 1', dataType: 'string', display: true },
          { id: 2, name: 'Test Meta 2', dataType: 'number', display: false }
        ]
      }
      adminApi.api.postDocpaltypeSettingsDocpalTypeV2MetadataQuery.mockResolvedValue({ data: mockData })

      await wrapper.vm.getList()

      expect(adminApi.api.postDocpaltypeSettingsDocpalTypeV2MetadataQuery).toHaveBeenCalledWith({
        docpalTypeName: 'Test Document Type'
      })
      expect(wrapper.vm.tableData).toHaveLength(2)
      expect(wrapper.vm.tableData[0].display).toBe(true)
      expect(wrapper.vm.tableData[1].display).toBe(false)
    })

    it('should emit updateDetail event when loading data', async () => {
      const mockData = {
        metadataList: [{ id: 1, name: 'Test Meta', dataType: 'string', display: true }]
      }
      adminApi.api.postDocpaltypeSettingsDocpalTypeV2MetadataQuery.mockResolvedValue({ data: mockData })

      await wrapper.vm.getList()

      expect(wrapper.emitted('updateDetail')).toBeTruthy()
      expect(wrapper.emitted('updateDetail')[0]).toEqual([mockData])
    })
  })

  describe('Filtering', () => {
    it('should filter data based on search query', async () => {
      // Set up initial data
      wrapper.vm.tableData = [
        { id: 1, name: 'Test Meta 1', dataType: 'string', display: true },
        { id: 2, name: 'Another Meta', dataType: 'number', display: false }
      ]
      wrapper.vm.extraParams = { q: 'Test' }
      wrapper.vm.isFilter = true
      const result = await wrapper.vm.getList()

      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Test Meta 1')
    })

    it('should handle filter form change', async () => {
      const formModel = { q: 'test query' }
      
      await wrapper.vm.handleFilterFormChange(formModel)

      expect(wrapper.vm.isFilter).toBe(true)
      expect(wrapper.vm.extraParams).toEqual(formModel)
      expect(mockReload).toHaveBeenCalled()
    })

    it('should return all data when no filter is applied', async () => {
      wrapper.vm.tableData = [
        { id: 1, name: 'Test Meta 1', dataType: 'string', display: true },
        { id: 2, name: 'Test Meta 2', dataType: 'number', display: false }
      ]
      wrapper.vm.extraParams = {}
      wrapper.vm.isFilter = true
      const result = await wrapper.vm.getList()

      expect(result).toHaveLength(2)
    })
  })

  describe('Delete Functionality', () => {
    it('should delete metadata successfully', async () => {
      const row = { id: 1, name: 'Test Meta' }
      ElMessageBox.confirm.mockResolvedValue('confirm')
      adminApi.api.deleteDocpaltypeSettingsDocpalTypeV2DeleteMetadataDocpaltypeid.mockResolvedValue({ data: true })

      await wrapper.vm.handleDelete(row)

      expect(ElMessageBox.confirm).toHaveBeenCalled()
      expect(adminApi.api.deleteDocpaltypeSettingsDocpalTypeV2DeleteMetadataDocpaltypeid).toHaveBeenCalledWith('test-id', {
        metadataId: 1
      })
      expect(mockRouterProvider.message.success).toHaveBeenCalled()
      expect(mockReload).toHaveBeenCalled()
    })

    it('should not delete when user cancels confirmation', async () => {
      const row = { id: 1, name: 'Test Meta' }
      ElMessageBox.confirm.mockResolvedValue('cancel')

      await wrapper.vm.handleDelete(row)

      expect(ElMessageBox.confirm).toHaveBeenCalled()
      expect(adminApi.api.deleteDocpaltypeSettingsDocpalTypeV2DeleteMetadataDocpaltypeid).not.toHaveBeenCalled()
      expect(mockReload).not.toHaveBeenCalled()
    })
  })

  describe('Move Functionality', () => {
    it('should move metadata up successfully', async () => {
      const row = { id: 1, name: 'Test Meta' }
      adminApi.api.postDocpaltypeSettingsDocpalTypeV2MoveMetadata.mockResolvedValue({ data: true })

      await wrapper.vm.handleMove(row, 1)

      expect(adminApi.api.postDocpaltypeSettingsDocpalTypeV2MoveMetadata).toHaveBeenCalledWith({
        docpalTypeId: 'test-id',
        metadataId: 1,
        moveIndex: 1
      })
      expect(mockReload).toHaveBeenCalled()
    })

    it('should move metadata down successfully', async () => {
      const row = { id: 1, name: 'Test Meta' }
      adminApi.api.postDocpaltypeSettingsDocpalTypeV2MoveMetadata.mockResolvedValue({ data: true })

      await wrapper.vm.handleMove(row, -1)

      expect(adminApi.api.postDocpaltypeSettingsDocpalTypeV2MoveMetadata).toHaveBeenCalledWith({
        docpalTypeId: 'test-id',
        metadataId: 1,
        moveIndex: -1
      })
      expect(mockReload).toHaveBeenCalled()
    })

    it('should handle move API error', async () => {
      const row = { id: 1, name: 'Test Meta' }
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      adminApi.api.postDocpaltypeSettingsDocpalTypeV2MoveMetadata.mockRejectedValue(new Error('Move failed'))

      await wrapper.vm.handleMove(row, 1)

      expect(consoleSpy).toHaveBeenCalled()
      expect(mockReload).toHaveBeenCalled()
    })
  })

  describe('Display Change', () => {
    it('should update display status successfully', async () => {
      const row: any = { 
        id: 1, 
        name: 'Test Meta', 
        display: true,
        metadataPermission: {
          hiddenPermissions: [],
          maskPermissions: [],
          readOnlyPermissions: []
        }
      }
      adminApi.api.postDocpaltypeSettingsDocpalTypeV2UpdateMetadataDocpaltypeid.mockResolvedValue({ data: true })

      await wrapper.vm.handleDisplayChange(row)

      expect(row.loading).toBe(true)
      expect(adminApi.api.postDocpaltypeSettingsDocpalTypeV2UpdateMetadataDocpaltypeid).toHaveBeenCalledWith('test-id', {
        metadataId: 1,
        display: true,
        metadataPermission: {
          hiddenPermissions: [],
          maskPermissions: [],
          readOnlyPermissions: []
        }
      })

      // Wait for the timeout to complete
      await new Promise(resolve => setTimeout(resolve, 600))
      expect(row.loading).toBe(false)
    })

    it('should handle display change API error', async () => {
      const row: any = { 
        id: 1, 
        name: 'Test Meta', 
        display: true,
        metadataPermission: {
          hiddenPermissions: [],
          maskPermissions: [],
          readOnlyPermissions: []
        }
      }
      adminApi.api.postDocpaltypeSettingsDocpalTypeV2UpdateMetadataDocpaltypeid.mockRejectedValue(new Error('Update failed'))

      await wrapper.vm.handleDisplayChange(row)

      expect(row.display).toBe(false) // Should revert to previous state
      expect(row.loading).toBe(true)

      // Wait for the timeout to complete
      await new Promise(resolve => setTimeout(resolve, 600))
      expect(row.loading).toBe(false)
    })

    it('should use default metadataPermission when not provided', async () => {
      const row: any = { id: 1, name: 'Test Meta', display: true }
      adminApi.api.postDocpaltypeSettingsDocpalTypeV2UpdateMetadataDocpaltypeid.mockResolvedValue({ data: true })

      await wrapper.vm.handleDisplayChange(row)

      expect(adminApi.api.postDocpaltypeSettingsDocpalTypeV2UpdateMetadataDocpaltypeid).toHaveBeenCalledWith('test-id', {
        metadataId: 1,
        display: true,
        metadataPermission: {
          hiddenPermissions: [],
          maskPermissions: [],
          readOnlyPermissions: []
        }
      })
    })
  })

  describe('Dialog Management', () => {
    it('should open dialog for adding new metadata', async () => {
      const dialogRef = wrapper.vm.$refs.MetaDisplayMetaDialogRef
      dialogRef.handleOpen = vi.fn()

      await wrapper.vm.handleDialogShow()

      expect(dialogRef.handleOpen).toHaveBeenCalledWith(wrapper.vm.tableData, undefined)
    })

    it('should open dialog for editing existing metadata', async () => {
      const dialogRef = wrapper.vm.$refs.MetaDisplayMetaDialogRef
      dialogRef.handleOpen = vi.fn()
      const rowData = { id: 1, name: 'Test Meta' }

      await wrapper.vm.handleDialogShow(rowData)

      expect(dialogRef.handleOpen).toHaveBeenCalledWith(wrapper.vm.tableData, rowData)
    })
  })

  describe('Refresh Functionality', () => {
    it('should handle refresh without opening dialog', async () => {
      await wrapper.vm.handleRefresh()

      expect(mockReload).toHaveBeenCalled()
    })

    it('should handle refresh and open dialog when addMore is true', async () => {
      const dialogRef = wrapper.vm.$refs.MetaDisplayMetaDialogRef
      dialogRef.handleOpen = vi.fn()

      await wrapper.vm.handleRefresh(true)

      expect(dialogRef.handleOpen).toHaveBeenCalled()
      expect(mockReload).toHaveBeenCalled()
    })
  })

  describe('Component Integration', () => {
    it('should emit refresh event from dialog', async () => {
      const dialog = wrapper.findComponent({ ref: 'MetaDisplayMetaDialogRef' })
      await dialog.vm.$emit('refresh')

      expect(mockReload).toHaveBeenCalled()
    })
  })

  describe('Error Handling', () => {
    it('should handle missing routerProvider gracefully', async () => {
      // Test that component doesn't crash when routerProvider is missing
      const wrapperWithoutRouter = mount(DocTypeDisplayMetaTable, {
        props: {
          documentType: 'Test Document Type',
          id: 'test-id'
        },
        global: {
          components: { VxeGrid, FormRenderer, VFormRender, ReaderDialog },
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
  })
}) 
