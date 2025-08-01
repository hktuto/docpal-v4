import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { MetadataDialogDuplicate, MetadataValidatorText, MetadataValidatorMasterTable } from '#components'
import { ElMessage } from 'element-plus'

// Mock Element Plus components
vi.mock('element-plus', () => ({
  ElMessage: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

// Mock API
vi.mock('api', () => ({
  adminApi: {
    api: {
      postDocpaltypeSettingsMetadataV2Query: vi.fn(),
      postDocpaltypeSettingsMetadataV2Duplicate: vi.fn()
    }
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

describe('[admin-document-type]MetadataDialogDuplicate', () => {
  let wrapper: any

  beforeEach(async () => {
    vi.clearAllMocks()
    
    wrapper = mount(MetadataDialogDuplicate, {
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
    await new Promise(resolve => setTimeout(resolve, 100))
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })

  describe('Dialog State Management', () => {
    it('should initialize with empty form data', () => {
      expect(wrapper.vm.formData.name).toBe('')
      expect(wrapper.vm.formData.validationRule).toEqual({})
      expect(wrapper.vm.formData.langs).toEqual({})
      expect(wrapper.vm.formData.maskRule).toEqual({
        maskType: 'MASK_ALL',
        maskLength: 10
      })
    })

    it('should initialize with default selected type', () => {
      expect(wrapper.vm.selectedType).toBe('Text')
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
      expect(wrapper.vm.formData.name).toBe('')
      expect(wrapper.vm.formData.validationRule).toEqual(testData.validationRule)
      expect(wrapper.vm.formData.maskRule).toEqual(testData.maskRule)
      expect(wrapper.vm.formData.langs).toEqual(testData.langs)
    })

    it('should handle mastertable validation rule', async () => {
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
      wrapper.vm.validationFormRef = {
        validate: vi.fn().mockResolvedValue(true),
        masterTableChange: vi.fn()
      }
      await wrapper.vm.open(testData)
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.selectedType).toBe('MasterTable')
      expect(wrapper.vm.formData.validationRule).toEqual(testData.validationRule)
    })

    it('should handle missing validation rule', async () => {
      const testData = {
        id: '1',
        name: 'Test Metadata',
        validationRule: {
          validationRuleName: 'text'
        }
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
  })

  describe('close Method', () => {
    it('should close dialog and reset form', async () => {
      // First open the dialog
      await wrapper.vm.open({
        id: '1',
        name: 'Test Metadata',
        validationRule: { validationRuleName: 'text' }
      })

      // Then close it
      await wrapper.vm.close()

      expect(wrapper.vm.visible).toBe(false)
      expect(wrapper.vm.formData.name).toBe('')
      expect(wrapper.vm.formData.validationRule).toBeNull()
      expect(wrapper.vm.formData.langs).toEqual({})
      expect(wrapper.vm.formData.maskRule).toEqual({
        maskType: 'MASK_ALL',
        maskLength: 10
      })
      expect(wrapper.vm.originalName).toBe('')
    })
  })

  describe('handleDuplicate Method', () => {
    beforeEach(() => {
      // Mock form validation
      wrapper.vm.elFormRef = {
        validate: vi.fn().mockResolvedValue(true)
      }
    })

    it('should duplicate metadata successfully', async () => {
      const { adminApi } = await import('api')
      
      // Mock API responses
      adminApi.api.postDocpaltypeSettingsMetadataV2Query.mockResolvedValue({
        data: { entryList: [] }
      })
      adminApi.api.postDocpaltypeSettingsMetadataV2Duplicate.mockResolvedValue({
        data: { success: true }
      })

      // Set up form data
      wrapper.vm.formData = {
        name: 'New Metadata',
        validationRule: { validationRuleName: 'text' },
        maskRule: { maskType: 'MASK_ALL', maskLength: 10 },
        langs: {}
      }

      await wrapper.vm.handleDuplicate()

      expect(adminApi.api.postDocpaltypeSettingsMetadataV2Query).toHaveBeenCalledWith({
        metadataName: 'New Metadata',
        pageNum: 0,
        pageSize: 1
      })
      expect(adminApi.api.postDocpaltypeSettingsMetadataV2Duplicate).toHaveBeenCalledWith({
        name: 'New Metadata',
        validationRule: { validationRuleName: 'text' },
        maskRule: { maskType: 'MASK_ALL', maskLength: 10 },
        langs: {}
      })
      expect(ElMessage.success).toHaveBeenCalledWith('metadata.duplicate_success')
    })

    it('should handle form validation failure', async () => {
      wrapper.vm.elFormRef.validate = vi.fn().mockResolvedValue(false)

      await wrapper.vm.handleDuplicate()

      expect(wrapper.vm.elFormRef.validate).toHaveBeenCalled()
      expect(ElMessage.error).not.toHaveBeenCalled()
    })

    it('should handle validation rule validation failure', async () => {
      const { adminApi } = await import('api')
      
      wrapper.vm.validationFormRef = {
        validate: vi.fn().mockResolvedValue(false)
      }

      await wrapper.vm.handleDuplicate()

      expect(wrapper.vm.validationFormRef.validate).toHaveBeenCalled()
      expect(ElMessage.error).toHaveBeenCalledWith('meta.validation_error')
    })

    it('should handle name already exists', async () => {
      const { adminApi } = await import('api')
      
      adminApi.api.postDocpaltypeSettingsMetadataV2Query.mockResolvedValue({
        data: { entryList: [{ name: 'Existing Metadata' }] }
      })

      wrapper.vm.formData.name = 'Existing Metadata'

      await wrapper.vm.handleDuplicate()

      expect(ElMessage.error).toHaveBeenCalledWith('dpTip.exit', { name: 'Existing Metadata' })
    })

    it('should handle API error', async () => {
      const { adminApi } = await import('api')
      
      adminApi.api.postDocpaltypeSettingsMetadataV2Query.mockResolvedValue({
        data: { entryList: [] }
      })
      adminApi.api.postDocpaltypeSettingsMetadataV2Duplicate.mockResolvedValue({
        data: null
      })

      await wrapper.vm.handleDuplicate()

      expect(ElMessage.error).toHaveBeenCalledWith('metadata.duplicate_error')
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

    it('should have correct mask length constraints', () => {
      const maskLengthInput = wrapper.find('.el-input-number')
      expect(maskLengthInput.attributes('min')).toBe('1')
      expect(maskLengthInput.attributes('max')).toBe('24')
    })
  })

  describe('Event Emissions', () => {
    it('should emit reload event after successful duplication', async () => {
      const { adminApi } = await import('api')
      
      adminApi.api.postDocpaltypeSettingsMetadataV2Query.mockResolvedValue({
        data: { entryList: [] }
      })
      adminApi.api.postDocpaltypeSettingsMetadataV2Duplicate.mockResolvedValue({
        data: { success: true }
      })

      wrapper.vm.formData.name = 'New Metadata'

      await wrapper.vm.handleDuplicate()

      // Wait for the setTimeout
      await new Promise(resolve => setTimeout(resolve, 100))

      expect(wrapper.emitted('reload')).toBeTruthy()
    })
  })

  describe('Edge Cases', () => {
    it('should handle missing form ref', async () => {
      wrapper.vm.elFormRef = null

      await wrapper.vm.handleDuplicate()

      expect(ElMessage.error).not.toHaveBeenCalled()
      expect(ElMessage.success).not.toHaveBeenCalled()
    })

    it('should handle missing validation form ref', async () => {
      wrapper.vm.validationFormRef = null

      await wrapper.vm.handleDuplicate()

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
  })
}) 
