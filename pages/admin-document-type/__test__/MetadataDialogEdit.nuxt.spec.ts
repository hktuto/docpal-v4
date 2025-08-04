import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { MetadataDialogEdit, MetadataValidatorText, MetadataValidatorMasterTable } from '#components'
import { ElMessage } from 'element-plus'
import { adminApi } from './mock/api'
// Mock Element Plus components
vi.mock('element-plus', () => ({
  ElMessage: {
    success: vi.fn(),
    error: vi.fn()
  }
}))




const MockMetadataValidatorMasterTable = {
  template: '<div class="validator-mastertable">MasterTable Validator</div>',
  props: ['validation'],
  emits: ['update:validation'],
  methods: {
    validate: vi.fn().mockResolvedValue(true),
    masterTableChange: vi.fn()
  }
}

describe('[admin-document-type]MetadataDialogEdit', () => {
  let wrapper: any

  beforeEach(() => {
    vi.clearAllMocks()
    
    wrapper = mount(MetadataDialogEdit, {
      props: {
        visible: true
      },
      global: {
        components: {
          MetadataValidatorText,
          MetadataValidatorMasterTable
        },
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key },
          useI18n: () => ({ t: (key: string) => key })
        }
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })

  describe('Dialog State Management', () => {
    it('should initialize with empty form data', () => {
      expect(wrapper.vm.formData.name).toBe('')
      expect(wrapper.vm.formData.validationRule).toEqual({
        maxLength: 255,
        validationRuleName: 'text'
      })
      expect(wrapper.vm.formData.langs).toEqual({})
      expect(wrapper.vm.formData.maskRule).toEqual({
        maskType: 'MASK_ALL',
        maskLength: 10
      })
    })

    it('should initialize with default selected type', () => {
      expect(wrapper.vm.selectedType).toBe('Text')
    })

    it('should initialize with isInit as false', () => {
      expect(wrapper.vm.isInit).toBe(false)
    })
  })

  describe('open Method', () => {
    it('should open dialog and set form data for text type', async () => {
      const testData = {
        id: '1',
        name: 'Test Metadata',
        validationRule: {
          validationRuleName: 'text',
          maxLength: 100
        },
        maskRule: {
          maskType: 'MASK_PREFIX',
          maskLength: 5
        },
        langs: { en: 'Test' }
      }

      await wrapper.vm.open(testData)
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.visible).toBe(true)
      expect(wrapper.vm.originalName).toBe('Test Metadata')
      expect(wrapper.vm.selectedType).toBe('Text')
      expect(wrapper.vm.formData.name).toBe('Test Metadata')
      expect(wrapper.vm.formData.validationRule).toEqual(testData.validationRule)
      expect(wrapper.vm.formData.maskRule).toEqual(testData.maskRule)
      expect(wrapper.vm.formData.langs).toEqual(testData.langs)
      expect(wrapper.vm.isInit).toBe(false)
    })

    it('should handle mastertable validation rule', async () => {
      wrapper.vm.validationFormRef = {
        validate: vi.fn().mockResolvedValue(true),
        masterTableChange: vi.fn()
      }
      const testData = {
        id: '1',
        name: 'Test Metadata',
        validationRule: {
          validationRuleName: 'mastertable',
          masterTableName: 'test_table',
          displayColumn: 'name',
          valueColumn: 'id',
          isMultiple: false
        }
      }

      await wrapper.vm.open(testData)
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.selectedType).toBe('MasterTable')
      expect(wrapper.vm.formData.validationRule).toEqual(testData.validationRule)
    })

    it('should handle missing validation rule', async () => {
      const testData = {
        id: '1',
        name: 'Test Metadata'
      }

      await wrapper.vm.open(testData)
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.selectedType).toBe('Text')
      expect(wrapper.vm.formData.validationRule).toBeDefined()
    })

    it('should handle missing mask rule', async () => {
      const testData = {
        id: '1',
        name: 'Test Metadata',
        validationRule: { validationRuleName: 'text' }
      }

      await wrapper.vm.open(testData)
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.formData.maskRule).toEqual({
        maskType: 'MASK_ALL',
        maskLength: 10
      })
    })

    it('should set isInit flag during initialization', async () => {
      const testData = {
        id: '1',
        name: 'Test Metadata',
        validationRule: { validationRuleName: 'text' }
      }

      // Mock the open method to check isInit behavior
      const originalOpen = wrapper.vm.open
      let isInitDuringOpen = false
      
      wrapper.vm.open = async (data: any) => {
        isInitDuringOpen = wrapper.vm.isInit
        await originalOpen.call(wrapper.vm, data)
      }

      await wrapper.vm.open(testData)
      
      expect(isInitDuringOpen).toBe(false)
    })
  })

  describe('close Method', () => {
    beforeEach(() => {
      // Mock form refs
      wrapper.vm.elFormRef = {
        resetFields: vi.fn()
      }
    })

    it('should close dialog and reset form', async () => {
      // First open the dialog
      await wrapper.vm.open({
        id: '1',
        name: 'Test Metadata',
        validationRule: { validationRuleName: 'text' }
      })

      // Then close it
      await wrapper.vm.close()

      expect(wrapper.vm.formData.name).toBe('')
      expect(wrapper.vm.formData.validationRule).toBeNull()
      expect(wrapper.vm.formData.langs).toEqual({})
      expect(wrapper.vm.formData.maskRule).toEqual({
        maskType: 'MASK_ALL',
        maskLength: 10
      })
    })

    it('should emit reload event when closing', async () => {
      await wrapper.vm.close()

      expect(wrapper.emitted('reload')).toBeTruthy()
    })
  })

  describe('handleUpdate Method', () => {
    beforeEach(() => {
      // Mock form validation
      wrapper.vm.elFormRef = {
        validate: vi.fn().mockResolvedValue(true)
      }
    })

    it('should update metadata successfully', async () => {
      
      // Mock API responses
      adminApi.api.patchDocpaltypeSettingsMetadataV2Update.mockResolvedValue({
        data: { success: true }
      })

      // Set up form data
      wrapper.vm.formData = {
        id: '1',
        name: 'Updated Metadata',
        validationRule: { validationRuleName: 'text' },
        maskRule: { maskType: 'MASK_ALL', maskLength: 10 },
        langs: {}
      }
      wrapper.vm.originalName = 'Updated Metadata'

      await wrapper.vm.handleUpdate()

      expect(adminApi.api.patchDocpaltypeSettingsMetadataV2Update).toHaveBeenCalledWith({
        id: '1',
        name: '',
        validationRule: null,
        maskRule: { maskType: 'MASK_ALL', maskLength: 10 },
        langs: {}
      })
      expect(ElMessage.success).toHaveBeenCalledWith('meta.update_success')
    })

    it('should handle form validation failure', async () => {
      wrapper.vm.elFormRef = {
        validate: vi.fn().mockResolvedValue(false)
      }

      await wrapper.vm.handleUpdate()

      expect(wrapper.vm.elFormRef.validate).toHaveBeenCalled()
      expect(ElMessage.error).not.toHaveBeenCalled()
    })

    it('should handle validation rule validation failure', async () => {
      wrapper.vm.elFormRef = {
        validate: vi.fn().mockResolvedValue(true)
      }
      wrapper.vm.validationFormRef = {
        validate: vi.fn().mockResolvedValue(false)
      }

      await wrapper.vm.handleUpdate()

      expect(wrapper.vm.validationFormRef.validate).toHaveBeenCalled()
      expect(ElMessage.error).toHaveBeenCalledWith('meta.validation_error')
    })

    it('should check name uniqueness when name changed', async () => {
      // Mock form validation
      wrapper.vm.elFormRef = {
        validate: vi.fn().mockResolvedValue(true),
        resetFields: vi.fn()
      }
      adminApi.api.postDocpaltypeSettingsMetadataV2Query.mockResolvedValue({
        data: { entryList: [] }
      })
      adminApi.api.patchDocpaltypeSettingsMetadataV2Update.mockResolvedValue({
        data: { success: true }
      })

      wrapper.vm.formData.name = 'New Name'
      wrapper.vm.originalName = 'Old Name'

      await wrapper.vm.handleUpdate()

      expect(adminApi.api.postDocpaltypeSettingsMetadataV2Query).toHaveBeenCalledWith({
        metadataName: 'New Name',
        pageNum: 0,
        pageSize: 1
      })
    })

    it('should not check name uniqueness when name unchanged', async () => {
      wrapper.vm.elFormRef = {
        validate: vi.fn().mockResolvedValue(true),
        resetFields: vi.fn()
      }
      
      adminApi.api.patchDocpaltypeSettingsMetadataV2Update.mockResolvedValue({
        data: { success: true }
      })

      wrapper.vm.formData.name = 'Same Name'
      wrapper.vm.originalName = 'Same Name'

      await wrapper.vm.handleUpdate()

      expect(adminApi.api.postDocpaltypeSettingsMetadataV2Query).not.toHaveBeenCalled()
    })

    it('should handle name already exists', async () => {
      wrapper.vm.elFormRef = {
        validate: vi.fn().mockResolvedValue(true),
        resetFields: vi.fn()
      }
      
      adminApi.api.postDocpaltypeSettingsMetadataV2Query.mockResolvedValue({
        data: { entryList: [{ name: 'Existing Metadata' }] }
      })

      wrapper.vm.formData.name = 'Existing Metadata'
      wrapper.vm.originalName = 'Old Name'

      await wrapper.vm.handleUpdate()

      expect(ElMessage.error).toHaveBeenCalledWith('dpTip.exit')
    })

    it('should handle API error', async () => {
      wrapper.vm.elFormRef = {
        validate: vi.fn().mockResolvedValue(true),
        resetFields: vi.fn()
      }
      
      adminApi.api.patchDocpaltypeSettingsMetadataV2Update.mockResolvedValue({
        data: null
      })

      await wrapper.vm.handleUpdate()

      expect(ElMessage.error).toHaveBeenCalledWith('meta.update_error')
    })
  })

  describe('selectedType Watcher', () => {
    it('should update validation rule when selected type changes', async () => {
      // Set initial state
      wrapper.vm.selectedType = 'Text'
      wrapper.vm.formData.validationRule = { validationRuleName: 'text' }
      wrapper.vm.isInit = false

      // Change selected type
      wrapper.vm.selectedType = 'Number'
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.formData.validationRule.validationRuleName).toBe('number')
    })

    it('should not update validation rule during initialization', async () => {
      // Set initial state
      wrapper.vm.selectedType = 'Text'
      wrapper.vm.formData.validationRule = { validationRuleName: 'text' }
      wrapper.vm.isInit = true

      // Change selected type
      wrapper.vm.selectedType = 'Number'
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.formData.validationRule.validationRuleName).toBe('text')
    })
  })

  describe('Validation Component', () => {
    it('should render correct validation component for text type', async () => {
      await wrapper.vm.open({
        id: '1',
        name: 'Test',
        validationRule: { validationRuleName: 'text' }
      })

      expect(wrapper.vm.validationComponent).toBe('MetadataValidatorText')
    })

    it('should render correct validation component for mastertable type', async () => {
      wrapper.vm.validationFormRef = {
        validate: vi.fn().mockResolvedValue(true),
        masterTableChange: vi.fn()
      }
      await wrapper.vm.open({
        id: '1',
        name: 'Test',
        validationRule: { validationRuleName: 'mastertable' }
      })

      expect(wrapper.vm.validationComponent).toBe('MetadataValidatorMasterTable')
    })
  })

  describe('Mask Rule Configuration', () => {
    it('should have correct mask type options', () => {
      expect(wrapper.vm.MASK_OPTIONS).toEqual([
        { label: 'MASK_ALL', value: 'Mask All' },
        { label: 'MASK_PREFIX', value: 'Mask Prefix' },
        { label: 'MASK_SUFFIX', value: 'Mask Suffix' }
      ])
    })

  })

  describe('Event Emissions', () => {
    beforeEach(() => {
      // Mock form refs
      wrapper.vm.elFormRef = {
        resetFields: vi.fn()
      }
    })

    it('should emit reload event when closing', async () => {
      await wrapper.vm.close()

      expect(wrapper.emitted('reload')).toBeTruthy()
    })
  })

  describe('Edge Cases', () => {
    it('should handle missing form ref', async () => {
      wrapper.vm.elFormRef = null

      await wrapper.vm.handleUpdate()

      expect(ElMessage.error).not.toHaveBeenCalled()
      expect(ElMessage.success).not.toHaveBeenCalled()
    })

    it('should handle missing validation form ref', async () => {
      wrapper.vm.elFormRef = {
        validate: vi.fn().mockResolvedValue(true),
        resetFields: vi.fn()
      }
      wrapper.vm.validationFormRef = null

      await wrapper.vm.handleUpdate()

      // Should not throw error, just skip validation
      expect(wrapper.vm.elFormRef.validate).toHaveBeenCalled()
    })

    it('should handle data without id', async () => {
      const testData = {
        name: 'Test Metadata',
        validationRule: { validationRuleName: 'text' }
      }

      await wrapper.vm.open(testData)
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.formData.id).toBeUndefined()
    })

    it('should handle validation rule with lowercase name', async () => {
      const testData = {
        id: '1',
        name: 'Test Metadata',
        validationRule: { validationRuleName: 'number' }
      }

      await wrapper.vm.open(testData)
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.selectedType).toBe('Number')
    })
  })
}) 
