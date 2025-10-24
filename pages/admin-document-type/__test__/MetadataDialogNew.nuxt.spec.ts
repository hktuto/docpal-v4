import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { MetadataDialogNew } from '#components'
import { ElMessage } from 'element-plus'
import { adminApi } from './mock/api'

// Mock Element Plus components
vi.mock('element-plus', () => ({
  ElMessage: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

// Mock getDefaultByType helper
vi.mock('../../../../../../packages/dp-datatype/utils/globalDataTypeHelper', () => ({
  mapDataType: {
    Text: 'MetadataValidatorText',
    Number: 'MetadataValidatorNumber'
  },
  getDefaultByType: vi.fn((type: string) => {
    const defaults: Record<string, any> = {
      Text: {
        maxLength: 255,
        validationRuleName: 'text'
      },
      Number: {
        validationRuleName: 'number',
        minimum: -999999,
        maximum: 999999,
        multipleOf: 0
      }
    }
    return defaults[type] || { validationRuleName: type.toLowerCase() }
  })
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
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key },
          useI18n: () => ({ t: (key: string) => key })
        },
        stubs: {
          MetadataValidatorText: true,
          MetadataValidatorNumber: true
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
      wrapper.vm.elFormRef = {
        validate: vi.fn().mockResolvedValue(true),
        resetFields: vi.fn()
      }
      // First open the dialog
      await wrapper.vm.open()

      // Set some data
      wrapper.vm.formData.name = 'Test'

      // Then close it
      await wrapper.vm.close()

      expect(wrapper.vm.visible).toBe(false)
      expect(wrapper.vm.formData.name).toBe('')
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
      wrapper.vm.ruleFormRef = {
        validate: vi.fn().mockResolvedValue(true),
        resetFields: vi.fn()
      }
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should create metadata successfully', async () => {
      // Mock API response
      const mockResult = { id: '123', success: true }
      adminApi.api.postDocpaltypeSettingsMetadataV2Create.mockResolvedValue({
        data: mockResult
      })

      // Set up form data
      wrapper.vm.formData.name = 'New Metadata'
      wrapper.vm.formData.validationRule = { validationRuleName: 'text' }
      wrapper.vm.formData.maskRule = { maskType: 'MASK_ALL', maskLength: 10 }
      wrapper.vm.formData.langs = {}

      await wrapper.vm.handleCreate()

      expect(adminApi.api.postDocpaltypeSettingsMetadataV2Create).toHaveBeenCalledWith(wrapper.vm.formData)
      expect(ElMessage.success).toHaveBeenCalled()
      expect(wrapper.vm.visible).toBe(false)
      expect(wrapper.vm.loading).toBe(false)

      // Advance timers to trigger reload event
      vi.advanceTimersByTime(1000)
      expect(wrapper.emitted('reload')).toBeTruthy()
      expect(wrapper.emitted('reload')[0]).toEqual([mockResult])
    })

    it('should handle form validation failure', async () => {
      wrapper.vm.elFormRef.validate = vi.fn().mockResolvedValue(false)

      await wrapper.vm.handleCreate()

      expect(adminApi.api.postDocpaltypeSettingsMetadataV2Create).not.toHaveBeenCalled()
      expect(ElMessage.error).not.toHaveBeenCalled()
      expect(wrapper.vm.loading).toBe(false)
    })

    it('should handle validation rule validation failure', async () => {
      wrapper.vm.ruleFormRef.validate = vi.fn().mockResolvedValue(false)

      await wrapper.vm.handleCreate()

      expect(adminApi.api.postDocpaltypeSettingsMetadataV2Create).not.toHaveBeenCalled()
      expect(wrapper.vm.loading).toBe(false)
    })

    it('should handle API error', async () => {
      adminApi.api.postDocpaltypeSettingsMetadataV2Create.mockResolvedValue({
        data: null
      })

      wrapper.vm.formData.name = 'New Metadata'

      await wrapper.vm.handleCreate()

      expect(ElMessage.error).toHaveBeenCalled()
      expect(wrapper.vm.loading).toBe(false)
    })

    it('should set loading state during creation', async () => {
      adminApi.api.postDocpaltypeSettingsMetadataV2Create.mockResolvedValue({
        data: { success: true }
      })

      const createPromise = wrapper.vm.handleCreate()
      
      expect(wrapper.vm.loading).toBe(true)
      
      await createPromise
      
      expect(wrapper.vm.loading).toBe(false)
    })
  })

  describe('handleTypeChanged Method', () => {
    it('should update validation rule when type changes to Number', async () => {
      wrapper.vm.handleTypeChanged('Number')
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.formData.validationRule).toEqual({
        validationRuleName: 'number',
        minimum: -999999,
        maximum: 999999,
        multipleOf: 0
      })
    })

    it('should update validation rule when type changes to Text', async () => {
      wrapper.vm.handleTypeChanged('Text')
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.formData.validationRule).toEqual({
        maxLength: 255,
        validationRuleName: 'text'
      })
    })

    it('should handle other types', async () => {
      wrapper.vm.handleTypeChanged('Boolean')
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.formData.validationRule.validationRuleName).toBe('boolean')
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

    it('should update validation rule when handleTypeChanged is called', async () => {
      wrapper.vm.handleTypeChanged('Number')
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
    it('should handle missing elFormRef', async () => {
      wrapper.vm.elFormRef = null

      await wrapper.vm.handleCreate()

      expect(ElMessage.error).not.toHaveBeenCalled()
      expect(ElMessage.success).not.toHaveBeenCalled()
    })

    it('should handle missing form refs in close method', async () => {
      wrapper.vm.elFormRef = null

      // Should not throw error
      await wrapper.vm.close()

      expect(wrapper.vm.visible).toBe(false)
    })

    it('should handle API exception', async () => {
      wrapper.vm.elFormRef = {
        validate: vi.fn().mockResolvedValue(true),
        resetFields: vi.fn()
      }
      wrapper.vm.ruleFormRef = {
        validate: vi.fn().mockResolvedValue(true),
        resetFields: vi.fn()
      }

      adminApi.api.postDocpaltypeSettingsMetadataV2Create.mockRejectedValue(
        new Error('API Error')
      )

      await wrapper.vm.handleCreate()

      expect(wrapper.vm.loading).toBe(false)
    })
  })

  describe('Component Integration', () => {
    it('should work with different metadata types', async () => {
      const types = ['Text', 'Number', 'Boolean', 'Select', 'Date']
      
      for (const type of types) {
        wrapper.vm.handleTypeChanged(type)
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
      wrapper.vm.ruleFormRef = {
        validate: vi.fn().mockResolvedValue(true),
        resetFields: vi.fn()
      }
    })

    it('should not proceed if elFormRef validation fails', async () => {
      wrapper.vm.elFormRef.validate = vi.fn().mockResolvedValue(false)

      await wrapper.vm.handleCreate()

      expect(wrapper.vm.ruleFormRef.validate).not.toHaveBeenCalled()
      expect(adminApi.api.postDocpaltypeSettingsMetadataV2Create).not.toHaveBeenCalled()
    })

    it('should not proceed if ruleFormRef validation fails', async () => {
      wrapper.vm.ruleFormRef.validate = vi.fn().mockResolvedValue(false)

      await wrapper.vm.handleCreate()

      expect(adminApi.api.postDocpaltypeSettingsMetadataV2Create).not.toHaveBeenCalled()
    })
  })

  describe('Loading State', () => {
    beforeEach(() => {
      wrapper.vm.elFormRef = {
        validate: vi.fn().mockResolvedValue(true),
        resetFields: vi.fn()
      }
      wrapper.vm.ruleFormRef = {
        validate: vi.fn().mockResolvedValue(true),
        resetFields: vi.fn()
      }
    })

    it('should initialize with loading false', () => {
      expect(wrapper.vm.loading).toBe(false)
    })

    it('should set loading to true during API call', async () => {
      adminApi.api.postDocpaltypeSettingsMetadataV2Create.mockImplementation(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: { success: true } })
          }, 100)
        })
      })

      const createPromise = wrapper.vm.handleCreate()
      expect(wrapper.vm.loading).toBe(true)

      await createPromise
      expect(wrapper.vm.loading).toBe(false)
    })
  })
}) 
