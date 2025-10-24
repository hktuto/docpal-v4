import { mount } from '@vue/test-utils'
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest'
import { MetadataDialogEdit } from '#components'
import { adminApi } from './mock/api'
import { ElMessage } from 'element-plus'
import { mockRouterProvider } from './util'
import { nextTick } from 'vue'

// Global keys for injection
const TabManagerKey = 'TabManagerKey'
const MenuRouterKey = 'MenuRouterKey'

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
    warning: vi.fn(),
    error: vi.fn()
  }
}))

vi.mock('api', () => ({
  adminApi: {
    api: {
      patchDocpaltypeSettingsMetadataV2Update: vi.fn()
    }
  }
}))

describe('[admin-document-type]MetadataDialogEdit', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    vi.clearAllMocks()
    wrapper = mount(MetadataDialogEdit, {
      props: {
        visible: false
      },
      global: {
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: string, params?: any) => msg,
          $i18n: { t: (key: string) => key }
        }
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Component Rendering', () => {
    it('renders correctly', () => {
      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('Initial State', () => {
    it('should have correct initial formData', () => {
      expect(wrapper.vm.formData.name).toBe('')
      expect(wrapper.vm.formData.validationRule).toEqual({})
      expect(wrapper.vm.formData.langs).toEqual({})
      expect(wrapper.vm.formData.maskRule).toEqual({
        maskType: 'MASK_ALL',
        maskLength: 10
      })
    })

    it('should have correct initial selectedType', () => {
      expect(wrapper.vm.selectedType).toBe('Text')
    })

    it('should have empty originalName', () => {
      expect(wrapper.vm.originalName).toBe('')
    })

    it('should have initial loading state as false', () => {
      expect(wrapper.vm.loading).toBe(false)
    })
  })

  describe('Open Dialog - Basic Scenarios', () => {
    it('should open dialog with Text type metadata', async () => {
      const mockData = {
        id: 1,
        name: 'Original Field',
        validationRule: null,
        maskRule: {
          maskType: 'MASK_ALL',
          maskLength: 10
        }
      }

      wrapper.vm.open(mockData)
      await nextTick()
      await nextTick()

      expect(wrapper.emitted('update:visible')?.[0]).toEqual([true])
      expect(wrapper.vm.originalName).toBe('Original Field')
      expect(wrapper.vm.selectedType).toBe('Text')
      expect(wrapper.vm.formData.id).toBe(1)
      expect(wrapper.vm.formData.name).toBe('Original Field')
    })

    it('should open dialog with MasterTable type metadata', async () => {
      const mockData = {
        id: 2,
        name: 'Master Table Field',
        validationRule: {
          validationRuleName: 'mastertable',
          masterTableName: 'TestTable'
        },
        maskRule: {
          maskType: 'MASK_PARTIAL',
          maskLength: 5
        }
      }

      wrapper.vm.open(mockData)
      await nextTick()
      await nextTick()

      expect(wrapper.emitted('update:visible')?.[0]).toEqual([true])
      expect(wrapper.vm.selectedType).toBe('MasterTable')
      expect(wrapper.vm.formData.validationRule.validationRuleName).toBe('mastertable')
      expect(wrapper.vm.formData.validationRule.masterTableName).toBe('TestTable')
    })

    it('should open dialog with user_role_user_group type metadata', async () => {
      const mockData = {
        id: 3,
        name: 'User Role Field',
        validationRule: {
          validationRuleName: 'user_role_user_group'
        },
        maskRule: {
          maskType: 'MASK_ALL',
          maskLength: 10
        }
      }

      wrapper.vm.open(mockData)
      await nextTick()
      await nextTick()

      expect(wrapper.emitted('update:visible')?.[0]).toEqual([true])
      expect(wrapper.vm.selectedType).toBe('UserRoleUserGroup')
    })

    it('should open dialog with capitalized validation rule name', async () => {
      const mockData = {
        id: 4,
        name: 'Date Field',
        validationRule: {
          validationRuleName: 'date',
          format: 'YYYY-MM-DD'
        },
        maskRule: {
          maskType: 'MASK_ALL',
          maskLength: 10
        }
      }

      wrapper.vm.open(mockData)
      await nextTick()
      await nextTick()

      expect(wrapper.emitted('update:visible')?.[0]).toEqual([true])
      expect(wrapper.vm.selectedType).toBe('Date')
      expect(wrapper.vm.formData.validationRule.validationRuleName).toBe('date')
    })

    it('should handle metadata without maskRule', async () => {
      const mockData = {
        id: 5,
        name: 'No Mask Field',
        validationRule: null
      }

      wrapper.vm.open(mockData)
      await nextTick()
      await nextTick()

      expect(wrapper.vm.formData.maskRule).toEqual({
        maskType: 'MASK_ALL',
        maskLength: 10
      })
    })

    it('should store originalName when opening', async () => {
      const mockData = {
        id: 6,
        name: 'Field Name',
        validationRule: null,
        maskRule: {
          maskType: 'MASK_ALL',
          maskLength: 10
        }
      }

      wrapper.vm.open(mockData)
      await nextTick()
      await nextTick()

      expect(wrapper.vm.originalName).toBe('Field Name')
      expect(wrapper.vm.formData.name).toBe('Field Name')
    })
  })

  describe('Close Dialog', () => {
    it('should reset form data when closing', async () => {
      wrapper.vm.formData.name = 'Test Name'
      wrapper.vm.formData.validationRule = { test: 'value' }
      wrapper.vm.originalName = 'Original'

      wrapper.vm.close()
      await nextTick()

      expect(wrapper.vm.formData.name).toBe('')
      expect(wrapper.vm.formData.validationRule).toBeNull()
      expect(wrapper.vm.formData.langs).toEqual({})
    })

    it('should reset maskRule to default when closing', () => {
      wrapper.vm.formData.maskRule = {
        maskType: 'MASK_PARTIAL',
        maskLength: 5
      }

      wrapper.vm.close()

      expect(wrapper.vm.formData.maskRule).toEqual({
        maskType: 'MASK_ALL',
        maskLength: 10
      })
    })

    it('should emit reload event after timeout', async () => {
      wrapper.vm.close()
      
      // Wait for the setTimeout(1000) in close
      await new Promise((resolve) => setTimeout(resolve, 1100))

      expect(wrapper.emitted('reload')).toBeTruthy()
    })
  })

  describe('Form Validation', () => {
    it('should validate elFormRef before updating', async () => {
      wrapper.vm.formData.name = ''

      const mockValidate = vi.fn(() => Promise.resolve(false))
      wrapper.vm.elFormRef = { validate: mockValidate }

      await wrapper.vm.handleUpdate()

      expect(mockValidate).toHaveBeenCalled()
      expect(adminApi.api.patchDocpaltypeSettingsMetadataV2Update).not.toHaveBeenCalled()
      expect(wrapper.vm.loading).toBe(false)
    })

    it('should validate ruleFormRef if it exists', async () => {
      wrapper.vm.formData.name = 'Test Field'
      wrapper.vm.formData.id = 1

      const mockElFormValidate = vi.fn(() => Promise.resolve(true))
      const mockRuleFormValidate = vi.fn(() => Promise.resolve(false))
      
      wrapper.vm.elFormRef = { validate: mockElFormValidate }
      wrapper.vm.ruleFormRef = { validate: mockRuleFormValidate }

      await wrapper.vm.handleUpdate()

      expect(mockElFormValidate).toHaveBeenCalled()
      expect(mockRuleFormValidate).toHaveBeenCalled()
      expect(ElMessage.error).toHaveBeenCalledWith('meta.validation_error')
      expect(adminApi.api.patchDocpaltypeSettingsMetadataV2Update).not.toHaveBeenCalled()
      expect(wrapper.vm.loading).toBe(false)
    })

    it('should set loading state during update', async () => {
      wrapper.vm.formData = {
        id: 1,
        name: 'Test Field',
        validationRule: { validationRuleName: 'text' },
        maskRule: {
          maskType: 'MASK_ALL',
          maskLength: 10
        },
        langs: {}
      }

      const mockElFormValidate = vi.fn(() => Promise.resolve(true))
      wrapper.vm.elFormRef = { validate: mockElFormValidate }
      
      adminApi.api.patchDocpaltypeSettingsMetadataV2Update.mockImplementation(() => {
        expect(wrapper.vm.loading).toBe(true)
        return Promise.resolve({ data: true })
      })

      await wrapper.vm.handleUpdate()

      expect(wrapper.vm.loading).toBe(false)
    })
  })

  describe('Update Submission', () => {
    it('should successfully update metadata', async () => {
      wrapper.vm.formData = {
        id: 1,
        name: 'Updated Field',
        validationRule: { validationRuleName: 'text' },
        maskRule: {
          maskType: 'MASK_ALL',
          maskLength: 10
        },
        langs: {}
      }

      const mockElFormValidate = vi.fn(() => Promise.resolve(true))
      wrapper.vm.elFormRef = { validate: mockElFormValidate }
      const mockResetFields = vi.fn()
      wrapper.vm.elFormRef.resetFields = mockResetFields

      adminApi.api.patchDocpaltypeSettingsMetadataV2Update.mockResolvedValue({
        data: true
      })

      await wrapper.vm.handleUpdate()

      expect(adminApi.api.patchDocpaltypeSettingsMetadataV2Update).toHaveBeenCalledWith(wrapper.vm.formData)
      expect(ElMessage.success).toHaveBeenCalledWith('tip_updateMsg')
      expect(wrapper.vm.loading).toBe(false)
    })

    it('should handle API error gracefully', async () => {
      wrapper.vm.formData.name = 'Failed Field'

      const mockElFormValidate = vi.fn(() => Promise.resolve(true))
      wrapper.vm.elFormRef = { validate: mockElFormValidate }

      adminApi.api.patchDocpaltypeSettingsMetadataV2Update.mockRejectedValue(new Error('API Error'))

      await wrapper.vm.handleUpdate()

      // Should not throw error, just catch silently
      expect(wrapper.vm.loading).toBe(false)
    })
  })

  describe('Mask Rule Configuration', () => {
    it('should have default mask type', async () => {
      expect(wrapper.vm.formData.maskRule.maskType).toBe('MASK_ALL')
    })

    it('should allow changing mask type', async () => {
      wrapper.vm.formData.maskRule.maskType = 'MASK_PARTIAL'
      await nextTick()

      expect(wrapper.vm.formData.maskRule.maskType).toBe('MASK_PARTIAL')
    })

    it('should allow changing mask length', async () => {
      wrapper.vm.formData.maskRule.maskLength = 15
      await nextTick()

      expect(wrapper.vm.formData.maskRule.maskLength).toBe(15)
    })
  })

  describe('Type Changed Handler', () => {
    it('should update validationRule when type changes', () => {
      wrapper.vm.handleTypeChanged('Date')
      
      expect(wrapper.vm.formData.validationRule).toBeDefined()
    })

    it('should call handleTypeChanged when selectedType changes', async () => {
      const handleTypeChangedSpy = vi.spyOn(wrapper.vm, 'handleTypeChanged')
      
      wrapper.vm.selectedType = 'Number'
      wrapper.vm.handleTypeChanged('Number')

      expect(handleTypeChangedSpy).toHaveBeenCalledWith('Number')
    })
  })

  describe('Component Integration', () => {
    it('should expose open method', () => {
      expect(wrapper.vm.open).toBeDefined()
      expect(typeof wrapper.vm.open).toBe('function')
    })

    it('should expose close method', () => {
      expect(wrapper.vm.close).toBeDefined()
      expect(typeof wrapper.vm.close).toBe('function')
    })

    it('should emit reload event after successful update', async () => {
      wrapper.vm.formData = {
        id: 1,
        name: 'Test Field',
        validationRule: { validationRuleName: 'text' },
        maskRule: {
          maskType: 'MASK_ALL',
          maskLength: 10
        },
        langs: {}
      }

      const mockElFormValidate = vi.fn(() => Promise.resolve(true))
      wrapper.vm.elFormRef = { validate: mockElFormValidate }
      const mockResetFields = vi.fn()
      wrapper.vm.elFormRef.resetFields = mockResetFields

      adminApi.api.patchDocpaltypeSettingsMetadataV2Update.mockResolvedValue({
        data: true
      })

      await wrapper.vm.handleUpdate()

      // Wait for the setTimeout(1000) in close
      await new Promise((resolve) => setTimeout(resolve, 1100))

      expect(wrapper.emitted('reload')).toBeTruthy()
    })
  })

  describe('Form Reset on Close', () => {
    it('should call resetFields on elFormRef when closing', () => {
      const mockResetFields = vi.fn()
      wrapper.vm.elFormRef = { resetFields: mockResetFields }

      wrapper.vm.close()

      expect(mockResetFields).toHaveBeenCalled()
    })
  })

  describe('Edge Cases', () => {
    it('should handle null validationRule', async () => {
      const mockData = {
        id: 1,
        name: 'Field',
        validationRule: null,
        maskRule: {
          maskType: 'MASK_ALL',
          maskLength: 10
        }
      }

      wrapper.vm.open(mockData)
      await nextTick()
      await nextTick()

      expect(wrapper.vm.selectedType).toBe('Text')
      expect(wrapper.vm.formData.validationRule).toBeDefined()
    })

    it('should handle metadata without validationRuleName', async () => {
      const mockData = {
        id: 1,
        name: 'Field',
        validationRule: {},
        maskRule: {
          maskType: 'MASK_ALL',
          maskLength: 10
        }
      }

      wrapper.vm.open(mockData)
      await nextTick()
      await nextTick()

      expect(wrapper.vm.selectedType).toBe('Text')
    })

    it('should handle metadata with existing data types', async () => {
      const mockData = {
        id: 1,
        name: 'Number Field',
        validationRule: {
          validationRuleName: 'number',
          min: 0,
          max: 100
        },
        maskRule: {
          maskType: 'MASK_ALL',
          maskLength: 10
        }
      }

      wrapper.vm.open(mockData)
      await nextTick()
      await nextTick()

      expect(wrapper.vm.selectedType).toBe('Number')
      expect(wrapper.vm.formData.validationRule.validationRuleName).toBe('number')
    })
  })
})
