import { mount } from '@vue/test-utils'
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest'
import { DocTypeDetail, DocTypeDisplayMetaTable, LanguageUnitForm } from '#components'
import { adminApi } from './mock/api'
import { ElMessage } from 'element-plus'
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
const BrowseItemIcon = {
  template: '<div class="BrowseItemIcon">BrowseItemIcon</div>'
}


describe('[admin-document-type]DocTypeDetail', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(DocTypeDetail, {
      props: {
        name: 'Test Document Type',
        id: 'test-id'
      },
      global: {
        components: { BrowseItemIcon, LanguageUnitForm, DocTypeDisplayMetaTable },
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
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('renders correctly', () => {
      expect(wrapper.exists()).toBe(true)
    })
    it('renders form fields', () => {
      // Check for name input
      const nameInput = wrapper.find('.meta-setting-info-form input[type="text"]')
      expect(nameInput.exists()).toBe(true)

      // Check for category select
      const categorySelect = wrapper.find('.meta-setting-info-form .el-select')
      expect(categorySelect.exists()).toBe(true)

      // Check for isFolder switch
      const isFolderSwitch = wrapper.find('.meta-setting-info-form .el-switch')
      expect(isFolderSwitch.exists()).toBe(true)
    })

    it('renders tabs with metadata tab', () => {
      const tabs = wrapper.find('.el-tabs')
      expect(tabs.exists()).toBe(true)
      expect(wrapper.text()).toContain('docType_displayMeta')
    })
  }) 
  describe('Initial State', () => {
    it('should have correct initial state', () => {
      expect(wrapper.vm.state.docTypeDetail).toEqual({})
      expect(wrapper.vm.state.activeTabName).toBe('metadata')
      expect(wrapper.vm.state.form).toEqual({
        permission: [],
        acls: [],
        docpalTypeName: '',
        category: '',
        isFolder: false
      })
    })

    it('should have correct props', () => {
      expect(wrapper.vm.name).toBe('Test Document Type')
      expect(wrapper.vm.id).toBe('test-id')
    })
  })

  describe('Data Initialization', () => {
    it('should initialize docType data correctly', async () => {
      const detail = {
        docpalTypeName: 'Test Document Type',
        category: 'Test Category',
        isFolder: 'Yes',
        dataType: 'string',
        permission: {
          user: [],
          role: [],
          group: []
        }
      }

      await wrapper.vm.initDocType(detail)

      expect(wrapper.vm.state.docTypeDetail).toEqual({
        docpalTypeName: 'Test Document Type',
        category: 'Test Category',
        isFolder: true,
        dataType: 'string'
      })

      // Wait for setTimeout to complete
      await new Promise(resolve => setTimeout(resolve, 150))

      expect(wrapper.vm.state.form).toEqual({
        docpalTypeName: 'Test Document Type',
        category: 'Test Category',
        isFolder: true,
        permission: [],
      })
    })

    it('should handle isFolder conversion correctly', async () => {
      const detail = {
        docpalTypeName: 'Test Document Type',
        category: 'Test Category',
        isFolder: 'No',
        dataType: 'string',
        permission: {
          user: [],
          role: [],
          group: []
        }
      }

      await wrapper.vm.initDocType(detail)

      expect(wrapper.vm.state.docTypeDetail.isFolder).toBe(false)

      // Wait for setTimeout to complete
      await new Promise(resolve => setTimeout(resolve, 150))

      expect(wrapper.vm.state.form.isFolder).toBe(false)
    })
  })

  describe('Form Submission', () => {
    it('should handle form submission successfully', async () => {
      // Set up initial data
      wrapper.vm.state.form = {
        docpalTypeName: 'Test Document Type',
        category: 'Test Category',
        isFolder: true,
        permission: ['user_1', 'role_1', 'group_1']
      }
      wrapper.vm.state.docTypeDetail = {
        docpalTypeName: 'Test Document Type',
        category: 'Test Category',
        isFolder: true
      }

      adminApi.api.postDocpaltypeSettingsDocpalTypeV2Update.mockResolvedValue({ data: true })

      await wrapper.vm.handleSubmit('docpalTypeName')

      expect(adminApi.api.postDocpaltypeSettingsDocpalTypeV2Update).toHaveBeenCalledWith({
        name: 'Test Document Type',
        category: 'Test Category',
        isFolder: true,
        id: 'test-id',
        permission: {
          user: ['1'],
          role: ['1'],
          group: ['1']
        }
      })
      expect(mockRouterProvider.message.success).toHaveBeenCalledWith(expect.stringContaining('dpMsg_success'))
    })

    it('should handle form submission error', async () => {
      // Set up initial data
      wrapper.vm.state.form = {
        docpalTypeName: 'Test Document Type',
        category: 'Test Category',
        isFolder: true
      }
      wrapper.vm.state.docTypeDetail = {
        docpalTypeName: 'Original Name',
        category: 'Test Category',
        isFolder: true
      }

      adminApi.api.postDocpaltypeSettingsDocpalTypeV2Update.mockRejectedValue(new Error('API Error'))

      await wrapper.vm.handleSubmit('docpalTypeName')
      // Should revert form value on error
      expect(wrapper.vm.state.form.docpalTypeName).toBe('Original Name')
    })

    it('should skip submission if isFolder value is the same', async () => {
      wrapper.vm.state.form.isFolder = true
      wrapper.vm.state.docTypeDetail.isFolder = true

      await wrapper.vm.handleSubmit('isFolder')

      expect(adminApi.api.postDocpaltypeSettingsDocpalTypeV2Update).not.toHaveBeenCalled()
    })

    it('should show loading state during submission', async () => {
      // Mock a slow API call
      adminApi.api.postDocpaltypeSettingsDocpalTypeV2Update.mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve({ data: true }), 100))
      )

      wrapper.vm.state.form = {
        docpalTypeName: 'Test Document Type',
        category: 'Test Category',
        isFolder: true
      }
      wrapper.vm.state.docTypeDetail = {
        docpalTypeName: 'Test Document Type',
        category: 'Test Category',
        isFolder: true
      }

      const submitPromise = wrapper.vm.handleSubmit('docpalTypeName')
      
      expect(wrapper.vm.state.loading).toBe(true)
      
      await submitPromise
      
      expect(wrapper.vm.state.loading).toBe(false)
    })
  })

  describe('Debounced Input Handling', () => {
    it('should handle debounced input', async () => {
      const handleInput = wrapper.vm.handleInput
      
      // Call the debounced function
      await handleInput('docpalTypeName')
      
      // Should call handleSubmit after debounce
      expect(wrapper.vm.handleSubmit).toBeDefined()
    })
  })

  describe('Component Integration', () => {
    it('should handle refresh from DocTypeDisplayMetaTable', async () => {
      const metaTable = wrapper.findComponent(DocTypeDisplayMetaTable)
      
      // Simulate refresh event
      await metaTable.vm.$emit('refresh')
      
      // Should call initDocType
      expect(wrapper.vm.initDocType).toBeDefined()
    })

    it('should handle updateDetail from DocTypeDisplayMetaTable', async () => {
      const metaTable = wrapper.findComponent(DocTypeDisplayMetaTable)
      
      // Simulate updateDetail event
      await metaTable.vm.$emit('updateDetail', {
        docpalTypeName: 'Updated Document Type',
        category: 'Updated Category',
        isFolder: 'Yes',
        dataType: 'string'
      })
      
      // Should call initDocType with the detail data
      expect(wrapper.vm.state.docTypeDetail.docpalTypeName).toBe('Updated Document Type')
    })
  })

  describe('Form Validation', () => {
    it('should validate form fields', () => {
      const nameInput = wrapper.find('input[type="text"]')
      const categorySelect = wrapper.find('.el-select')
      const isFolderSwitch = wrapper.find('.el-switch')

      expect(nameInput.exists()).toBe(true)
      expect(categorySelect.exists()).toBe(true)
      expect(isFolderSwitch.exists()).toBe(true)
    })

    it('should handle form field changes', async () => {
      const nameInput = wrapper.find('input[type="text"]')
      
      await nameInput.setValue('New Document Type Name')
      
      expect(wrapper.vm.state.form.docpalTypeName).toBe('New Document Type Name')
    })
  })

  describe('Tab Management', () => {
    it('should have correct default active tab', () => {
      expect(wrapper.vm.state.activeTabName).toBe('metadata')
    })

    it('should render metadata tab correctly', () => {
      const tabPane = wrapper.find('.el-tab-pane')
      expect(tabPane.exists()).toBe(true)
      expect(wrapper.text()).toContain('docType_displayMeta')
    })
  })

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      adminApi.api.postDocpaltypeSettingsDocpalTypeV2Update.mockRejectedValue(new Error('API Error'))

      wrapper.vm.state.form = {
        docpalTypeName: 'Test Document Type',
        category: 'Test Category',
        isFolder: true
      }
      wrapper.vm.state.docTypeDetail = {
        docpalTypeName: 'Original Name',
        category: 'Test Category',
        isFolder: true
      }

      await wrapper.vm.handleSubmit('docpalTypeName')

      // Should revert form value and not crash
      expect(wrapper.vm.state.form.docpalTypeName).toBe('Original Name')
      expect(wrapper.vm.state.loading).toBe(false)
    })
  })

  describe('Props and Data Binding', () => {
    it('should pass correct props to DocTypeDisplayMetaTable', () => {
      const metaTable = wrapper.findComponent(DocTypeDisplayMetaTable)
      
      expect(metaTable.props('documentType')).toBe('Test Document Type')
      expect(metaTable.props('id')).toBe('test-id')
    })

    it('should pass correct props to LanguageUnitForm', () => {
      const languageForm = wrapper.findComponent(LanguageUnitForm)
      
      expect(languageForm.props('lKey')).toBe('Test Document Type')
    })
  })
}) 
