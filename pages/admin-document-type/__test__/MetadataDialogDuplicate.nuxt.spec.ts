import { mount } from '@vue/test-utils'
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest'
import { MetadataDialogDuplicate } from '#components'
import { adminApi } from './mock/api'
import { ElMessage } from 'element-plus'
import { mockRouterProvider } from './util'
import { nextTick } from 'vue'

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

describe('[admin-document-type]MetadataDialogDuplicate', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(MetadataDialogDuplicate, {
      global: {
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: string) => msg,
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

    it('dialog is initially hidden', () => {
      expect(wrapper.vm.visible).toBe(false)
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

      await wrapper.vm.open(mockData)
      await nextTick()

      expect(wrapper.vm.visible).toBe(true)
      expect(wrapper.vm.originalName).toBe('Original Field')
      expect(wrapper.vm.selectedType).toBe('Text')
      expect(wrapper.vm.formData.name).toBe('')
      expect(wrapper.vm.formData.id).toBe(1)
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

      await wrapper.vm.open(mockData)
      await nextTick()

      expect(wrapper.vm.visible).toBe(true)
      expect(wrapper.vm.selectedType).toBe('MasterTable')
      expect(wrapper.vm.formData.validationRule.validationRuleName).toBe('mastertable')
      expect(wrapper.vm.formData.validationRule.masterTableName).toBe('TestTable')
    })

    it('should open dialog with UserRoleUserGroup type metadata', async () => {
      const mockData = {
        id: 3,
        name: 'User Role Field',
        validationRule: {
          validationRuleName: 'userRoleUserGroup'
        },
        maskRule: {
          maskType: 'MASK_ALL',
          maskLength: 10
        }
      }

      await wrapper.vm.open(mockData)
      await nextTick()

      expect(wrapper.vm.visible).toBe(true)
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

      await wrapper.vm.open(mockData)
      await nextTick()

      expect(wrapper.vm.visible).toBe(true)
      expect(wrapper.vm.selectedType).toBe('Date')
    })

    it('should handle metadata without maskRule', async () => {
      const mockData = {
        id: 5,
        name: 'No Mask Field',
        validationRule: null
      }

      await wrapper.vm.open(mockData)
      await nextTick()

      expect(wrapper.vm.formData.maskRule).toEqual({
        maskType: 'MASK_ALL',
        maskLength: 10
      })
    })

    it('should clear name field when opening', async () => {
      const mockData = {
        id: 6,
        name: 'Field Name',
        validationRule: null,
        maskRule: {
          maskType: 'MASK_ALL',
          maskLength: 10
        }
      }

      await wrapper.vm.open(mockData)
      await nextTick()

      expect(wrapper.vm.formData.name).toBe('')
      expect(wrapper.vm.originalName).toBe('Field Name')
    })
  })

  describe('Close Dialog', () => {
    it('should reset form data when closing', async () => {
      wrapper.vm.formData.name = 'Test Name'
      wrapper.vm.formData.validationRule = { test: 'value' }
      wrapper.vm.originalName = 'Original'
      wrapper.vm.visible = true

      wrapper.vm.close()
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.formData.name).toBe('')
      expect(wrapper.vm.formData.validationRule).toBeNull()
      expect(wrapper.vm.formData.langs).toEqual({})
      expect(wrapper.vm.originalName).toBe('')
      expect(wrapper.vm.visible).toBe(false)
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
  })

  describe('Form Validation', () => {
    it('should validate form before duplicating', async () => {
      wrapper.vm.visible = true
      wrapper.vm.formData.name = ''

      const mockValidate = vi.fn(() => Promise.resolve(false))
      wrapper.vm.elFormRef = { validate: mockValidate }

      await wrapper.vm.handleDuplicate()

      expect(mockValidate).toHaveBeenCalled()
      expect(adminApi.api.postDocpaltypeSettingsMetadataV2Query).not.toHaveBeenCalled()
    })

  })

  describe('Name Duplication Check', () => {
    it('should check if name already exists', async () => {
      wrapper.vm.visible = true
      wrapper.vm.formData.name = 'Existing Field'

      const mockElFormValidate = vi.fn(() => Promise.resolve(true))
      wrapper.vm.elFormRef = { validate: mockElFormValidate }

      adminApi.api.postDocpaltypeSettingsMetadataV2Query.mockResolvedValue({
        data: {
          entryList: [{ id: 1, name: 'Existing Field' }]
        }
      })

      await wrapper.vm.handleDuplicate()

      expect(adminApi.api.postDocpaltypeSettingsMetadataV2Query).toHaveBeenCalledWith({
        metadataName: 'Existing Field',
        pageNum: 0,
        pageSize: 1
      })
      expect(ElMessage.error).toHaveBeenCalledWith(expect.stringContaining('dpTip.exit'))
    })

    it('should proceed if name does not exist', async () => {
      wrapper.vm.visible = true
      wrapper.vm.formData.name = 'New Unique Field'
      wrapper.vm.formData.id = 1

      const mockElFormValidate = vi.fn(() => Promise.resolve(true))
      wrapper.vm.elFormRef = { validate: mockElFormValidate }

      adminApi.api.postDocpaltypeSettingsMetadataV2Query.mockResolvedValue({
        data: {
          entryList: []
        }
      })

      adminApi.api.postDocpaltypeSettingsMetadataV2Duplicate.mockResolvedValue({
        data: true
      })

      await wrapper.vm.handleDuplicate()

      expect(adminApi.api.postDocpaltypeSettingsMetadataV2Duplicate).toHaveBeenCalledWith(wrapper.vm.formData)
    })
  })

  describe('Duplicate Submission', () => {
    it('should successfully duplicate metadata', async () => {
      wrapper.vm.visible = true
      wrapper.vm.formData = {
        id: 1,
        name: 'Duplicated Field',
        validationRule: { validationRuleName: 'text' },
        maskRule: {
          maskType: 'MASK_ALL',
          maskLength: 10
        },
        langs: {}
      }

      const mockElFormValidate = vi.fn(() => Promise.resolve(true))
      wrapper.vm.elFormRef = { validate: mockElFormValidate }

      adminApi.api.postDocpaltypeSettingsMetadataV2Query.mockResolvedValue({
        data: { entryList: [] }
      })

      adminApi.api.postDocpaltypeSettingsMetadataV2Duplicate.mockResolvedValue({
        data: true
      })

      await wrapper.vm.handleDuplicate()

      expect(ElMessage.success).toHaveBeenCalledWith('metadata.duplicate_success')
      expect(wrapper.vm.visible).toBe(false)
    })

    it('should handle duplicate API error', async () => {
      wrapper.vm.visible = true
      wrapper.vm.formData.name = 'Failed Field'

      const mockElFormValidate = vi.fn(() => Promise.resolve(true))
      wrapper.vm.elFormRef = { validate: mockElFormValidate }

      adminApi.api.postDocpaltypeSettingsMetadataV2Query.mockResolvedValue({
        data: { entryList: [] }
      })

      adminApi.api.postDocpaltypeSettingsMetadataV2Duplicate.mockResolvedValue({
        data: false
      })

      await wrapper.vm.handleDuplicate()

      expect(ElMessage.error).toHaveBeenCalledWith('metadata.duplicate_error')
      expect(wrapper.vm.visible).toBe(true)
      expect(wrapper.emitted('reload')).toBeFalsy()
    })

    it('should handle network error gracefully', async () => {
      wrapper.vm.visible = true
      wrapper.vm.formData.name = 'Network Error Field'

      const mockElFormValidate = vi.fn(() => Promise.resolve(true))
      wrapper.vm.elFormRef = { validate: mockElFormValidate }

      adminApi.api.postDocpaltypeSettingsMetadataV2Query.mockRejectedValue(new Error('Network Error'))

      await wrapper.vm.handleDuplicate()

      // Should not throw error, just catch silently
      expect(wrapper.vm.visible).toBe(true)
    })
  })

  describe('Mask Rule Configuration', () => {
    it('should display mask type select options', async () => {
      wrapper.vm.visible = true
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.formData.maskRule.maskType).toBe('MASK_ALL')
    })

    it('should allow changing mask type', async () => {
      wrapper.vm.visible = true
      wrapper.vm.formData.maskRule.maskType = 'MASK_PARTIAL'
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.formData.maskRule.maskType).toBe('MASK_PARTIAL')
    })

    it('should allow changing mask length', async () => {
      wrapper.vm.visible = true
      wrapper.vm.formData.maskRule.maskLength = 15
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.formData.maskRule.maskLength).toBe(15)
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

    it('should emit reload event after successful duplication', async () => {
      wrapper.vm.visible = true
      wrapper.vm.formData.name = 'Test Field'

      const mockElFormValidate = vi.fn(() => Promise.resolve(true))
      wrapper.vm.elFormRef = { validate: mockElFormValidate }

      adminApi.api.postDocpaltypeSettingsMetadataV2Query.mockResolvedValue({
        data: { entryList: [] }
      })

      adminApi.api.postDocpaltypeSettingsMetadataV2Duplicate.mockResolvedValue({
        data: true
      })

      await wrapper.vm.handleDuplicate()

      // Wait for the setTimeout(100) in handleDuplicate
      await new Promise((resolve) => setTimeout(resolve, 150))

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

      await wrapper.vm.open(mockData)
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

      await wrapper.vm.open(mockData)
      await nextTick()

      expect(wrapper.vm.selectedType).toBe('Text')
    })

    it('should handle empty entryList in name check', async () => {
      wrapper.vm.visible = true
      wrapper.vm.formData.name = 'Unique Field'

      const mockElFormValidate = vi.fn(() => Promise.resolve(true))
      wrapper.vm.elFormRef = { validate: mockElFormValidate }

      adminApi.api.postDocpaltypeSettingsMetadataV2Query.mockResolvedValue({
        data: null
      })

      adminApi.api.postDocpaltypeSettingsMetadataV2Duplicate.mockResolvedValue({
        data: true
      })

      await wrapper.vm.handleDuplicate()

      expect(adminApi.api.postDocpaltypeSettingsMetadataV2Duplicate).toHaveBeenCalled()
    })
  })
})
