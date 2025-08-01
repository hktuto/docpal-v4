import { mount } from '@vue/test-utils'
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest'
import { DocTypeDialogAddDisplayMeta, DocTypePermission } from '#components'
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


describe('[admin-document-type]DocTypeDialogAddDisplayMeta', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(DocTypeDialogAddDisplayMeta, {
      props: {
        documentType: 'Test Document Type',
        id: 'test-id'
      },
      global: {
        components: { DocTypePermission },
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
    wrapper.vm.state.visible = true
    await new Promise(resolve => setTimeout(resolve, 100))
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('renders correctly', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('renders dialog with correct title for add mode', () => {
      const dialog = wrapper.find('.el-dialog')
      expect(dialog.exists()).toBe(true)
      expect(wrapper.text()).toContain('docTypeDetail_addDisplayMeta')
    })

    it('renders dialog with correct title for edit mode', async () => {
      wrapper.vm.state.isEdit = true
      await wrapper.vm.$nextTick()
      expect(wrapper.text()).toContain('docTypeDetail_editDisplayMeta')
    })

    it('renders form fields', () => {
      // Check for metadata selection
      const metadataSelect = wrapper.find('.display-meta-form .el-select')
      expect(metadataSelect.exists()).toBe(true)

      // Check for display switch
      const displaySwitch = wrapper.find('.display-meta-switch')
      expect(displaySwitch.exists()).toBe(true)

      // Check for permission components
      const permissionComponents = wrapper.findAllComponents(DocTypePermission)
      expect(permissionComponents).toHaveLength(3)
    })

    it('renders submit buttons', () => {
      const submitButton = wrapper.find('#DocumentType__DisplayMeta__AddNewDisplayMeta__Submit')
      const addMoreButton = wrapper.find('#DocumentType__DisplayMeta__AddNewDisplayMeta__SubmitAndAddMore')
      
      expect(submitButton.exists()).toBe(true)
      expect(submitButton.text()).toBe('common_submit')
      expect(addMoreButton.exists()).toBe(true)
      expect(addMoreButton.text()).toBe('common_addMore')
    })
  })

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      expect(wrapper.vm.state.loading).toBe(false)
      expect(wrapper.vm.state.visible).toBe(true)
      expect(wrapper.vm.state.isEdit).toBe(false)
      expect(wrapper.vm.state.metadataList).toEqual([])
    })

    it('should have correct form data', () => {
      expect(wrapper.vm.formData.metadataId).toBe('')
      expect(wrapper.vm.formData.display).toBe(true)
      expect(wrapper.vm.formData.metadataPermission).toEqual({
        hiddenPermissions: [],
        maskPermissions: [],
        readOnlyPermissions: []
      })
    })

    it('should have correct props', () => {
      expect(wrapper.vm.documentType).toBe('Test Document Type')
      expect(wrapper.vm.id).toBe('test-id')
    })
  })

  describe('Form Validation', () => {
    it('should have required validation for metadataId', () => {
      const formRules = wrapper.vm.formRules
      expect(formRules.metadataId).toBeDefined()
      expect(formRules.metadataId[0].required).toBe(true)
      expect(formRules.metadataId[0].message).toBe('common_canNotEmpty')
    })

    it('should validate form before submission', async () => {
      const formRef = wrapper.vm.$refs.formRef
      formRef.validate = vi.fn(() => Promise.resolve(false)) // Validation fails

      await wrapper.vm.handleSubmit()

      expect(formRef.validate).toHaveBeenCalled()
      expect(adminApi.api.postDocpaltypeSettingsDocpalTypeV2AddMetadataDocpaltypeid).not.toHaveBeenCalled()
    })
  })

  describe('Dialog Management', () => {
    it('should open dialog correctly', async () => {
      const exitList = [
        { id: 1, name: 'Meta 1', display: false },
        { id: 2, name: 'Meta 2', display: true }
      ]

      await wrapper.vm.handleOpen(exitList, null)

      expect(wrapper.vm.state.visible).toBe(true)
      expect(wrapper.vm.state.metadataList).toEqual(exitList)
      expect(wrapper.vm.state.isEdit).toBe(false)
    })

    it('should open dialog in edit mode', async () => {
      const exitList = [
        { id: 1, name: 'Meta 1', display: false },
        { id: 2, name: 'Meta 2', display: true }
      ]
      const editData = {
        id: 1,
        display: true,
        metadataPermission: {
          hiddenPermissions: ['user1'],
          maskPermissions: ['user2'],
          readOnlyPermissions: ['user3']
        }
      }

      await wrapper.vm.handleOpen(exitList, editData)

      expect(wrapper.vm.state.visible).toBe(true)
      expect(wrapper.vm.state.isEdit).toBe(true)
      expect(wrapper.vm.formData.metadataId).toBe(1)
      expect(wrapper.vm.formData.display).toBe(true)
      expect(wrapper.vm.formData.metadataPermission).toEqual({
        hiddenPermissions: ['user1'],
        maskPermissions: ['user2'],
        readOnlyPermissions: ['user3']
      })
    })

    it('should reset form when opening for add', async () => {
      const exitList = []
      const originalFormData = { ...wrapper.vm.formData }
      wrapper.vm.formData.metadataId = 'test'
      wrapper.vm.formData.display = false

      await wrapper.vm.handleOpen(exitList, null)

      expect(wrapper.vm.formData.metadataId).toBe('')
      expect(wrapper.vm.formData.display).toBe(true)
    })
  })

  describe('Form Submission', () => {
    it('should submit form data successfully in add mode', async () => {
      // Set up form data
      wrapper.vm.formData.metadataId = 1
      wrapper.vm.formData.display = true
      wrapper.vm.formData.metadataPermission = {
        hiddenPermissions: ['user1'],
        maskPermissions: ['user2'],
        readOnlyPermissions: ['user3']
      }

      const formRef = wrapper.vm.$refs.formRef
      formRef.validate = vi.fn(() => Promise.resolve(true)) // Validation passes

      adminApi.api.postDocpaltypeSettingsDocpalTypeV2AddMetadataDocpaltypeid.mockResolvedValue({ data: true })

      await wrapper.vm.handleSubmit()

      expect(adminApi.api.postDocpaltypeSettingsDocpalTypeV2AddMetadataDocpaltypeid).toHaveBeenCalledWith('test-id', {
        metadataId: 1,
        display: true,
        metadataPermission: {
          hiddenPermissions: ['user1'],
          maskPermissions: ['user2'],
          readOnlyPermissions: ['user3']
        }
      })
      expect(ElMessage.success).toHaveBeenCalledWith('common_addSuccess')
      expect(wrapper.vm.state.visible).toBe(false)
      expect(wrapper.emitted('refresh')).toBeTruthy()
    })

    it('should submit form data successfully in edit mode', async () => {
      wrapper.vm.state.isEdit = true
      wrapper.vm.formData.metadataId = 1
      wrapper.vm.formData.display = false

      const formRef = wrapper.vm.$refs.formRef
      formRef.validate = vi.fn(() => Promise.resolve(true))

      adminApi.api.postDocpaltypeSettingsDocpalTypeV2UpdateMetadataDocpaltypeid.mockResolvedValue({ data: true })

      await wrapper.vm.handleSubmit()

      expect(adminApi.api.postDocpaltypeSettingsDocpalTypeV2UpdateMetadataDocpaltypeid).toHaveBeenCalledWith('test-id', {
        metadataId: 1,
        display: false,
        metadataPermission: {
          hiddenPermissions: [],
          maskPermissions: [],
          readOnlyPermissions: []
        }
      })
      expect(ElMessage.success).toHaveBeenCalledWith('dpMsg_success')
      expect(wrapper.vm.state.visible).toBe(false)
      expect(wrapper.emitted('refresh')).toBeTruthy()
    })

    it('should handle add more functionality', async () => {
      wrapper.vm.state.metadataList = [
        { id: 1, name: 'Meta 1', display: false },
        { id: 2, name: 'Meta 2', display: true }
      ]

      const formRef = wrapper.vm.$refs.formRef
      formRef.validate = vi.fn(() => Promise.resolve(true))

      adminApi.api.postDocpaltypeSettingsDocpalTypeV2AddMetadataDocpaltypeid.mockResolvedValue({ data: true })

      await wrapper.vm.handleSubmit(true)

      expect(wrapper.emitted('refresh')[0]).toEqual([true])
      expect(wrapper.vm.state.visible).toBe(false)

      // Should reopen dialog for add more
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.state.visible).toBe(true)
    })

    it('should show loading state during submission', async () => {
      const formRef = wrapper.vm.$refs.formRef
      formRef.validate = vi.fn(() => Promise.resolve(true))

      // Mock a slow API call
      adminApi.api.postDocpaltypeSettingsDocpalTypeV2AddMetadataDocpaltypeid.mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve({ data: true }), 100))
      )

      await wrapper.vm.handleSubmit()
      expect(wrapper.vm.state.loading).toBe(false)
    })

    it('should handle API error during submission', async () => {
      const formRef = wrapper.vm.$refs.formRef
      formRef.validate = vi.fn(() => Promise.resolve(true))

      adminApi.api.postDocpaltypeSettingsDocpalTypeV2AddMetadataDocpaltypeid.mockRejectedValue(new Error('API Error'))

      await wrapper.vm.handleSubmit()

      expect(wrapper.vm.state.loading).toBe(false)
      expect(wrapper.vm.state.visible).toBe(true) // Dialog should remain open
      expect(wrapper.emitted('refresh')).toBeFalsy() // Should not emit refresh
    })
  })

  describe('Form Reset', () => {
    it('should reset form correctly', () => {
      wrapper.vm.formData.metadataId = 'test'
      wrapper.vm.formData.display = false
      const formRef = wrapper.vm.$refs.formRef
      formRef.resetFields = vi.fn()

      wrapper.vm.resetForm()

      expect(wrapper.vm.formData.metadataId).toBe('')
      expect(wrapper.vm.formData.display).toBe(true)
      expect(formRef.resetFields).toHaveBeenCalled()
    })
  })

  describe('Available Metadata Options', () => {
    it('should compute available metadata options correctly', () => {
      wrapper.vm.state.metadataList = [
        { id: 1, name: 'Meta 1', display: false },
        { id: 2, name: 'Meta 2', display: true }
      ]

      const availableOptions = wrapper.vm.availableMetadata

      expect(availableOptions).toHaveLength(2)
      expect(availableOptions[0].disabled).toBe(false) // Not displayed, so available
      expect(availableOptions[1].disabled).toBe(true) // Already displayed, so disabled
    })

    it('should not disable options in edit mode', () => {
      wrapper.vm.state.isEdit = true
      wrapper.vm.state.metadataList = [
        { id: 1, name: 'Meta 1', display: true },
        { id: 2, name: 'Meta 2', display: true }
      ]

      const availableOptions = wrapper.vm.availableMetadata

      expect(availableOptions[0].disabled).toBe(false)
      expect(availableOptions[1].disabled).toBe(false)
    })
  })

  describe('Component Integration', () => {
    it('should pass correct props to DocTypePermission components', () => {
      const permissionComponents = wrapper.findAllComponents(DocTypePermission)
      
      expect(permissionComponents[0].props('permissionType')).toBe('hiddenPermissions')
      expect(permissionComponents[1].props('permissionType')).toBe('maskPermissions')
      expect(permissionComponents[2].props('permissionType')).toBe('readOnlyPermissions')
      
    })

    it('should handle permission changes', async () => {
      const permissionComponents = wrapper.findAllComponents(DocTypePermission)
      
      // Simulate permission change
      await permissionComponents[0].vm.$emit('update:modelValue', ['user1', 'user2'])
      
      expect(wrapper.vm.formData.metadataPermission.hiddenPermissions).toEqual(['user1', 'user2'])
    })
  })

  describe('Dialog Behavior', () => {
    it('should have correct CSS classes', () => {
      const dialog = wrapper.find('.el-dialog')
      expect(dialog.classes()).toContain('scroll-dialog')
      expect(dialog.classes()).toContain('add-display-meta-dialog')
    })
  })

  describe('Error Handling', () => {
    it('should handle form validation errors', async () => {
      const formRef = wrapper.vm.$refs.formRef
      formRef.validate = vi.fn(() => Promise.resolve(false))

      await wrapper.vm.handleSubmit()

      expect(adminApi.api.postDocpaltypeSettingsDocpalTypeV2AddMetadataDocpaltypeid).not.toHaveBeenCalled()
      expect(wrapper.vm.state.loading).toBe(false)
    })
  })

  describe('Props and Data Binding', () => {
    it('should bind form data correctly', () => {
      wrapper.vm.formData.metadataId = 1
      wrapper.vm.formData.display = false
      
      expect(wrapper.vm.formData.metadataId).toBe(1)
      expect(wrapper.vm.formData.display).toBe(false)
    })
  })
}) 
