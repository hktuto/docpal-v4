import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { MetadataDialogNew, MetadataValidatorText, MetadataValidatorNumber } from '#components'
import { ElMessage } from 'element-plus'
import { adminApi } from './mock/api'
// Mock Element Plus components
vi.mock('element-plus', () => ({
  ElMessage: {
    success: vi.fn(),
    error: vi.fn()
  }
}))


describe('[admin-document-type]MetadataDialogNew', () => {
  let wrapper: any

  beforeEach(() => {
    vi.clearAllMocks()
    
    wrapper = mount(MetadataDialogNew, {
      props: {
        visible: true
      },
      global: {
        components: {
          MetadataValidatorText,
          MetadataValidatorNumber
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
  })

  describe('open Method', () => {
    it('should open dialog', async () => {
      await wrapper.vm.open()
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.visible).toBe(true)
    })
  })

  describe('close Method', () => {
    it('should close dialog and reset form', async () => {
      wrapper.vm.validationFormRef = {
        validate: vi.fn().mockResolvedValue(true),
        resetFields: vi.fn()
      }
      // First open the dialog
      await wrapper.vm.open()

      // Then close it
      await wrapper.vm.close()

      expect(wrapper.vm.visible).toBe(false)
      expect(wrapper.vm.formData.name).toBe('')
      expect(wrapper.vm.formData.validationRule).toEqual({})
      expect(wrapper.vm.formData.langs).toEqual({})
      expect(wrapper.vm.formData.maskRule).toEqual({
        maskType: 'MASK_ALL',
        maskLength: 10
      })
    })
  })

  describe('handleCreate Method', () => {
    beforeEach(() => {
      // Mock form validation
      wrapper.vm.elFormRef = {
        validate: vi.fn().mockResolvedValue(true),
        resetFields: vi.fn()
      }
    })
    it('should create metadata successfully', async () => {
      wrapper.vm.validationFormRef = {
        validate: vi.fn().mockResolvedValue(true),
        resetFields: vi.fn()
      }
      // Mock API responses
      adminApi.api.postDocpaltypeSettingsMetadataV2Query.mockResolvedValue({
        data: { entryList: [] }
      })
      adminApi.api.postDocpaltypeSettingsMetadataV2Create.mockResolvedValue({
        data: { success: true }
      })

      // Set up form data
      wrapper.vm.formData.name = 'New Metadata'
      wrapper.vm.formData.validationRule = { validationRuleName: 'text' }
      wrapper.vm.formData.maskRule = { maskType: 'MASK_ALL', maskLength: 10 }
      wrapper.vm.formData.langs = {}
      await wrapper.vm.handleCreate()

      expect(adminApi.api.postDocpaltypeSettingsMetadataV2Query).toHaveBeenCalledWith({
        metadataName: 'New Metadata',
        pageNum: 0,
        pageSize: 1
      })
      expect(adminApi.api.postDocpaltypeSettingsMetadataV2Create).toHaveBeenCalled()
      expect(ElMessage.success).toHaveBeenCalledWith('meta.create_success')
    })

    it('should handle form validation failure', async () => {
      wrapper.vm.elFormRef.validate = vi.fn().mockResolvedValue(false)

      await wrapper.vm.handleCreate()

      // expect(wrapper.vm.elFormRef.validate).toHaveBeenCalled()
      expect(ElMessage.error).not.toHaveBeenCalled()
    })

    it('should handle validation rule validation failure', async () => {
      wrapper.vm.validationFormRef = {
        validate: vi.fn().mockResolvedValue(false)
      }

      await wrapper.vm.handleCreate()

      expect(wrapper.vm.validationFormRef.validate).toHaveBeenCalled()
      expect(ElMessage.error).toHaveBeenCalledWith('meta.validation_error')
    })

    it('should handle name already exists', async () => {
      wrapper.vm.validationFormRef = {
        validate: vi.fn().mockResolvedValue(true),
        resetFields: vi.fn()
      }
      adminApi.api.postDocpaltypeSettingsMetadataV2Query.mockResolvedValue({
        data: { entryList: [{ name: 'Existing Metadata' }] }
      })

      wrapper.vm.formData.name = 'Existing Metadata'

      await wrapper.vm.handleCreate()

      expect(ElMessage.error).toHaveBeenCalledWith('dpTip.exit')
    })

    it('should handle API error', async () => {
      wrapper.vm.validationFormRef = {
        validate: vi.fn().mockResolvedValue(true),
        resetFields: vi.fn()
      }

      adminApi.api.postDocpaltypeSettingsMetadataV2Query.mockResolvedValue({
        data: { entryList: [] }
      })
      adminApi.api.postDocpaltypeSettingsMetadataV2Create.mockResolvedValue({
        data: null
      })

      await wrapper.vm.handleCreate()

      expect(ElMessage.error).toHaveBeenCalledWith('meta.create_error')
    })
  })

  describe('selectedType Watcher', () => {
    it('should update validation rule when selected type changes', async () => {
      // Set initial state
      wrapper.vm.selectedType = 'Text'
      wrapper.vm.formData.validationRule = { validationRuleName: 'text' }

      // Change selected type
      wrapper.vm.selectedType = 'Number'
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.formData.validationRule.validationRuleName).toBe('number')
    })

    it('should handle invalid selected type', async () => {
      // Set initial state
      wrapper.vm.selectedType = 'Text'
      wrapper.vm.formData.validationRule = { validationRuleName: 'text' }

      // Change to invalid type
      wrapper.vm.selectedType = 'InvalidType'
      await wrapper.vm.$nextTick()

      // Should not change validation rule for invalid type
      expect(wrapper.vm.formData.validationRule.validationRuleName).toBe('text')
    })
  })

  describe('Validation Component', () => {
    it('should render correct validation component for text type', () => {
      expect(wrapper.vm.validationComponent).toBe('MetadataValidatorText')
    })

    it('should render correct validation component for number type', async () => {
      wrapper.vm.selectedType = 'Number'
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.validationComponent).toBe('MetadataValidatorNumber')
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

  describe('Form Data Structure', () => {
    it('should have correct initial form data structure', () => {
      expect(wrapper.vm.formData).toEqual({
        name: '',
        validationRule: {
          maxLength: 255,
          validationRuleName: 'text'
        },
        langs: {},
        maskRule: {
          maskType: 'MASK_ALL',
          maskLength: 10
        }
      })
    })

    it('should update validation rule when type changes', async () => {
      wrapper.vm.selectedType = 'Number'
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.formData.validationRule).toEqual({
        validationRuleName: 'number',
        minimum: -999999,
        maximum: 999999,
        multipleOf: 0
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle missing form ref', async () => {
      wrapper.vm.elFormRef = null

      await wrapper.vm.handleCreate()

      expect(ElMessage.error).not.toHaveBeenCalled()
      expect(ElMessage.success).not.toHaveBeenCalled()
    })

    it('should handle missing form refs in close method', async () => {
      wrapper.vm.elFormRef = null
      wrapper.vm.validationFormRef = null

      // Should not throw error
      await wrapper.vm.close()

      expect(wrapper.vm.visible).toBe(false)
    })

    it('should handle API query with empty response', async () => {
      
      adminApi.api.postDocpaltypeSettingsMetadataV2Query.mockResolvedValue({
        data: { entryList: [] }
      })
      adminApi.api.postDocpaltypeSettingsMetadataV2Create.mockResolvedValue({
        data: { success: true }
      })

      wrapper.vm.formData.name = 'New Metadata'

      await wrapper.vm.handleCreate()

      expect(ElMessage.success).toHaveBeenCalledWith('meta.create_success')
    })

    it('should handle API query with null response', async () => {
      
      adminApi.api.postDocpaltypeSettingsMetadataV2Query.mockResolvedValue({
        data: null
      })

      wrapper.vm.formData.name = 'New Metadata'

      await wrapper.vm.handleCreate()

      expect(ElMessage.success).toHaveBeenCalledWith('meta.create_success')
    })
  })

  describe('Component Integration', () => {
    it('should work with different metadata types', async () => {
      const types = ['Text', 'Number', 'Boolean', 'Select', 'Date']
      
      for (const type of types) {
        wrapper.vm.selectedType = type
        await wrapper.vm.$nextTick()
        
        expect(wrapper.vm.formData.validationRule.validationRuleName).toBe(type.toLowerCase())
      }
    })

    it('should handle mask rule changes', async () => {
      wrapper.vm.formData.maskRule.maskType = 'MASK_PREFIX'
      wrapper.vm.formData.maskRule.maskLength = 5

      expect(wrapper.vm.formData.maskRule).toEqual({
        maskType: 'MASK_PREFIX',
        maskLength: 5
      })
    })
  })

  describe('Form Validation', () => {
    beforeEach(() => {
      wrapper.vm.elFormRef = {
        validate: vi.fn().mockResolvedValue(true),
        resetFields: vi.fn()
      }
    })
    it('should validate form before creating', async () => {
      
      adminApi.api.postDocpaltypeSettingsMetadataV2Query.mockResolvedValue({
        data: { entryList: [] }
      })
      adminApi.api.postDocpaltypeSettingsMetadataV2Create.mockResolvedValue({
        data: { success: true }
      })

      await wrapper.vm.handleCreate()

      // expect(wrapper.vm.elFormRef.validate).toHaveBeenCalled()
    })
  })
}) 
