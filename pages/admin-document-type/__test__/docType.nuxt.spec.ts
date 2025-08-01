import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import {
  DocTypePage,
  DocTypeDetail,
  DocTypeInfo,
  DocTypeRelatedTypeTable,
  DocTypeDisplayMetaTable,
  DocTypeDialogNew,
  DocTypeDialogDuplicate,
  DocTypeDialogAddDisplayMeta,
  DocTypeDialogAddRelatedType,
  ResponsiveFilter
} from '#components'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { ElMessageBox, ElMessage, ElLoading } from 'element-plus'
import { mockRouterProvider} from './util'
import { mockQuery, mockReload, mockCleanSelectedRows } from './setup'

// Mock the missing functions
const downloadBlob = vi.fn()
const formatDate = vi.fn((date) => date)
const routeDocDetail = vi.fn((row) => ({ name: 'doc-detail', params: { name: row.name } }))

// Mock global functions
vi.stubGlobal('downloadBlob', downloadBlob)
vi.stubGlobal('formatDate', formatDate)
vi.stubGlobal('routeDocDetail', routeDocDetail)

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
  },
  ElLoading: {
    service: vi.fn((options) => {
      return {
        close: vi.fn()
      }
    }),
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

describe('[admin-document-type]DocTypePage', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(DocTypePage, {
      props: {
        pageNum: 0,
        pageSize: 20
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog },
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
    const dialogRef = wrapper.vm.$refs.DocTypeDialogNewRef
    dialogRef.handleOpen = vi.fn()
    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.loadData = vi.fn();
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  describe('Event Handling', () => {
    it('should handle create new document type', async () => {
      await wrapper.vm.handleCreate()
      const dialogRef = wrapper.vm.$refs.DocTypeDialogNewRef
      expect(dialogRef.handleOpen).toHaveBeenCalled()
    })

    it('should handle duplicate document type', async () => {
      const row = { name: 'Test Document Type' }
      const dialogRef = wrapper.vm.$refs.DocTypeDialogDuplicateRef
      dialogRef.handleOpen = vi.fn()

      await wrapper.vm.handleDuplicate(row)

      expect(dialogRef.handleOpen).toHaveBeenCalledWith(row)
    })

    it('should handle filter form change with default values', async () => {
      const formModel = { isDesc: true, orderBy: 'name' }
      await wrapper.vm.handleFilterFormChange(formModel)
      expect(wrapper.vm.extraParams).toEqual(formModel)
      expect(mockReload).toHaveBeenCalled()
    })

    it('should handle filter form change with isDesc false', async () => {
      const formModel = { isDesc: false, orderBy: 'name' }
      await wrapper.vm.handleFilterFormChange(formModel)
      expect(wrapper.vm.extraParams.isDesc).toBe(true)
      expect(mockReload).toHaveBeenCalled()
    })

    it('should handle filter form change with orderBy enable', async () => {
      const formModel = { isDesc: true, orderBy: 'enable' }
      await wrapper.vm.handleFilterFormChange(formModel)
      expect(wrapper.vm.extraParams.isDesc).toBe(false)
      expect(mockReload).toHaveBeenCalled()
    })

    it('should handle filter form change with string isDesc', async () => {
      const formModel = { isDesc: 'false', orderBy: 'name' }
      await wrapper.vm.handleFilterFormChange(formModel)
      expect(wrapper.vm.extraParams.isDesc).toBe(false)
      expect(mockReload).toHaveBeenCalled()
    })

    it('should navigate to document detail on double click', async () => {
      const row = { name: 'Test Type' }
      await wrapper.vm.handleDblclick(row)
      expect(mockRouterProvider.navigateTo).toHaveBeenCalledWith(expect.anything(), false)
    })
  })

  describe('Document Type Activation', () => {
    it('should activate document type successfully', async () => {
      const row = { name: 'Test Type', active: 'Inactive' }
      adminApi.api.patchDocpaltypeSettingsActive.mockResolvedValue({ data: true })

      await wrapper.vm.handleActive(row, true)

      expect(adminApi.api.patchDocpaltypeSettingsActive).toHaveBeenCalledWith({
        name: 'Test Type',
        enable: true
      })
      expect(row.active).toBe('Active')
    })

    it('should deactivate document type successfully', async () => {
      const row = { name: 'Test Type', active: 'Active' }
      adminApi.api.patchDocpaltypeSettingsActive.mockResolvedValue({ data: true })

      await wrapper.vm.handleActive(row, false)

      expect(adminApi.api.patchDocpaltypeSettingsActive).toHaveBeenCalledWith({
        name: 'Test Type',
        enable: false
      })
      expect(row.active).toBe('Inactive')
    })

    it('should not update row status when API call fails', async () => {
      const row = { name: 'Test Type', active: 'Inactive' }
      adminApi.api.patchDocpaltypeSettingsActive.mockResolvedValue({ data: false })

      await wrapper.vm.handleActive(row, true)

      expect(adminApi.api.patchDocpaltypeSettingsActive).toHaveBeenCalledWith({
        name: 'Test Type',
        enable: true
      })
      expect(row.active).toBe('Inactive') // Should remain unchanged
    })

    it('should handle API error gracefully', async () => {
      const row = { name: 'Test Type', active: 'Inactive' }
      adminApi.api.patchDocpaltypeSettingsActive.mockRejectedValue(new Error('API Error'))

      await expect(wrapper.vm.handleActive(row, true)).rejects.toThrow('API Error')
      expect(row.active).toBe('Inactive') // Should remain unchanged
    })
  })

  describe('Export Functionality', () => {
    it('should handle export CSV successfully', async () => {
      const mockBlob = new Blob(['test data'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      adminApi.api.postDocpaltypeSettingsDocpalTypeV2ExportDocpalTypeCvs.mockResolvedValue(mockBlob)

      await wrapper.vm.handleExport()

      expect(adminApi.api.postDocpaltypeSettingsDocpalTypeV2ExportDocpalTypeCvs).toHaveBeenCalledWith(
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

    it('should handle export API error', async () => {
      adminApi.api.postDocpaltypeSettingsDocpalTypeV2ExportDocpalTypeCvs.mockRejectedValue(new Error('Export failed'))

      await expect(wrapper.vm.handleExport()).rejects.toThrow('Export failed')
    })
  })

  describe('Filter Initialization', () => {
    it('should initialize filters on mount', async () => {
      const mockFilters = [{ key: 'category', label: 'Category', type: 'select' }]
      adminApi.api.getDocpaltypeSettingsPageConditions.mockResolvedValue({ data: mockFilters })

      // Trigger onMounted
      await wrapper.vm.getFilter()

      expect(adminApi.api.getDocpaltypeSettingsPageConditions).toHaveBeenCalled()
      expect(wrapper.vm.extraParams.orderBy).toBe('name')
      expect(wrapper.vm.extraParams.isDesc).toBe(false)
      expect(mockReload).toHaveBeenCalled()
    })

    it('should handle filter initialization error', async () => {
      adminApi.api.getDocpaltypeSettingsPageConditions.mockRejectedValue(new Error('Filter init failed'))

      await expect(wrapper.vm.getFilter()).rejects.toThrow('Filter init failed')
    })
  })

  describe('Component Integration', () => {
    it('should emit refresh event from DocTypeDialogNew', async () => {
      const dialogNew = wrapper.findComponent({ ref: 'DocTypeDialogNewRef' })
      await dialogNew.vm.$emit('refresh')

      // The refresh should trigger query({})
      expect(mockQuery).toHaveBeenCalledWith({})
    })

    it('should emit refresh event from DocTypeDialogDuplicate', async () => {
      const dialogDuplicate = wrapper.findComponent({ ref: 'DocTypeDialogDuplicateRef' })
      await dialogDuplicate.vm.$emit('refresh')

      // The refresh should trigger query({})
      expect(wrapper.vm.query).toHaveBeenCalledWith({})
    })
  })
})
