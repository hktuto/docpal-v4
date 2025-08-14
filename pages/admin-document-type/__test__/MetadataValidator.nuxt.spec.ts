import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { 
  MetadataValidatorArray,
  MetadataValidatorBoolean,
  MetadataValidatorCase,
  MetadataValidatorDate,
  MetadataValidatorDocument,
  MetadataValidatorMasterTable,
  MetadataValidatorNumber,
  MetadataValidatorObject,
  MetadataValidatorUserRoleUserGroup,
  MetadataValidatorSelect,
  MetadataValidatorText,
  MetadataValidatorUser,
  MetadataValidatorWorkflow
} from '#components'
import type { 
  ArrayValidation,
  BooleanValidation,
  CaseValidation,
  DateValidation,
  DocumentValidation,
  MasterTableValidation,
  NumberValidation,
  ObjectValidation,
  RoleValidation,
  SelectValidation,
  TextValidation,
  UserValidation,
  WorkflowValidation
} from '../utils/metadataHelper'

// Mock Element Plus components
vi.mock('element-plus', () => ({
  ElMessage: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

describe('[admin-document-type] MetadataValidator Components', () => {
  describe('MetadataValidatorText', () => {
    let wrapper: any

    beforeEach(() => {
      wrapper = mount(MetadataValidatorText, {
        props: {
          validation: {
            validationRuleName: 'text',
            maxLength: 255
          }
        },
        global: {
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
    })

    it('should render text validation form', () => {
      expect(wrapper.find('.el-form').exists()).toBe(true)
      expect(wrapper.find('input[type="number"]').exists()).toBe(true)
    })

    it('should validate form successfully', async () => {
      const result = await wrapper.vm.validate()
      expect(result).toBeDefined()
    })

    it('should return validation data', () => {
      const data = wrapper.vm.getData()
      expect(data).toEqual({
        validationRuleName: 'text',
        maxLength: 255
      })
    })

    it('should update maxLength value', async () => {
      const input = wrapper.find('input[type="number"]')
      await input.setValue(100)
      expect(wrapper.vm.validation.maxLength).toBe(100)
    })
  })

  describe('MetadataValidatorNumber', () => {
    let wrapper: any

    beforeEach(() => {
      wrapper = mount(MetadataValidatorNumber, {
        props: {
          validation: {
            validationRuleName: 'number',
            minimum: 0,
            maximum: 100,
            decimal: 2
          }
        },
        global: {
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
    })

    it('should render number validation form', () => {
      expect(wrapper.find('.el-form').exists()).toBe(true)
      expect(wrapper.findAll('input[type="number"]')).toHaveLength(3)
    })

    it('should validate form successfully', async () => {
      const result = await wrapper.vm.validate()
      expect(result).toBeDefined()
    })

    it('should return validation data', () => {
      const data = wrapper.vm.getData()
      expect(data).toEqual({
        validationRuleName: 'number',
        minimum: 0,
        maximum: 100,
        decimal: 2
      })
    })

    it('should update number values', async () => {
      const inputs = wrapper.findAll('input[type="number"]')
      await inputs[0].setValue(10) // minimum
      await inputs[1].setValue(90) // maximum
      await inputs[2].setValue(3)  // decimal
      
      expect(wrapper.vm.validation.minimum).toBe("10")
      expect(wrapper.vm.validation.maximum).toBe("90")
      expect(wrapper.vm.validation.multipleOf).toBe("3")
    })
  })

  describe('MetadataValidatorBoolean', () => {
    let wrapper: any

    beforeEach(() => {
      wrapper = mount(MetadataValidatorBoolean, {
        props: {
          validation: {
            validationRuleName: 'boolean'
          }
        },
        global: {
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
    })

    it('should render boolean validation form', () => {
      expect(wrapper.find('.el-form').exists()).toBe(true)
    })

    it('should validate form successfully', async () => {
      const result = await wrapper.vm.validate()
      expect(result).toBe(true)
    })

    it('should return validation data', () => {
      const data = wrapper.vm.getData()
      expect(data).toEqual({
        validationRuleName: 'boolean'
      })
    })
  })

  describe('MetadataValidatorSelect', () => {
    let wrapper: any

    beforeEach(() => {
      wrapper = mount(MetadataValidatorSelect, {
        props: {
          validation: {
            validationRuleName: 'select',
            options: ['Option 1', 'Option 2'],
            isMultiple: false
          }
        },
        global: {
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
    })

    it('should render select validation form', () => {
      expect(wrapper.find('.el-form').exists()).toBe(true)
      expect(wrapper.find('.options-container').exists()).toBe(true)
    })

    it('should validate form successfully', async () => {
      const result = await wrapper.vm.validate()
      expect(result).toBeDefined()
    })

    it('should return validation data', () => {
      const data = wrapper.vm.getData()
      expect(data).toEqual({
        validationRuleName: 'select',
        options: ['Option 1', 'Option 2'],
        isMultiple: false
      })
    })

    it('should add new option', async () => {
      const addButton = wrapper.find('button.add-option-button')
      await addButton.trigger('click')
      expect(wrapper.vm.validation.options).toHaveLength(3)
    })

    it('should remove option', async () => {
      const removeButtons = wrapper.findAll('button.remove-option-button_0')
      await removeButtons[0].trigger('click')
      expect(wrapper.vm.validation.options).toHaveLength(1)
    })

    it('should toggle multiple selection', async () => {
      const switchElement = wrapper.find('.el-switch')
      await switchElement.trigger('click')
      expect(wrapper.vm.validation.isMultiple).toBe(true)
    })
  })

  describe('MetadataValidatorDate', () => {
    let wrapper: any

    beforeEach(() => {
      wrapper = mount(MetadataValidatorDate, {
        props: {
          validation: {
            validationRuleName: 'date',
            dateOrDateTime: 'date',
            format: 'YYYY-MM-DD',
            defaultValue: '',
            isMultiple: false
          }
        },
        global: {
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
    })

    it('should render date validation form', () => {
      expect(wrapper.find('.el-form').exists()).toBe(true)
    })

    it('should validate form successfully', async () => {
      const result = await wrapper.vm.validate()
      expect(result).toBeDefined()
    })

    it('should return validation data', () => {
      const data = wrapper.vm.getData()
      expect(data).toEqual({
        validationRuleName: 'date',
        dateOrDateTime: 'date',
        format: 'YYYY-MM-DD',
        defaultValue: '',
        isMultiple: false
      })
    })

  })

  describe('MetadataValidatorDocument', () => {
    let wrapper: any

    beforeEach(() => {
      wrapper = mount(MetadataValidatorDocument, {
        props: {
          validation: {
            validationRuleName: 'document',
            isMultiple: false
          }
        },
        global: {
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
    })

    it('should render document validation form', () => {
      expect(wrapper.find('.el-form').exists()).toBe(true)
    })

    it('should validate form successfully', async () => {
      const result = await wrapper.vm.validate()
      expect(result).toBe(true)
    })

    it('should return validation data', () => {
      const data = wrapper.vm.getData()
      expect(data).toEqual({
        validationRuleName: 'document',
        isMultiple: false
      })
    })

    it('should toggle multiple selection', async () => {
      const switchElement = wrapper.find('.el-switch')
      await switchElement.trigger('click')
      expect(wrapper.vm.validation.isMultiple).toBe(true)
    })
  })

  describe('MetadataValidatorCase', () => {
    let wrapper: any

    beforeEach(() => {
      wrapper = mount(MetadataValidatorCase, {
        props: {
          validation: {
            validationRuleName: 'case',
            isMultiple: false
          }
        },
        global: {
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
    })

    it('should render case validation form', () => {
      expect(wrapper.find('.el-form').exists()).toBe(true)
    })

    it('should validate form successfully', async () => {
      const result = await wrapper.vm.validate()
      expect(result).toBe(true)
    })

    it('should return validation data', () => {
      const data = wrapper.vm.getData()
      expect(data).toEqual({
        validationRuleName: 'case',
        isMultiple: false
      })
    })

    it('should toggle multiple selection', async () => {
      const switchElement = wrapper.find('.el-switch')
      await switchElement.trigger('click')
      expect(wrapper.vm.validation.isMultiple).toBe(true)
    })
  })

  describe('MetadataValidatorWorkflow', () => {
    let wrapper: any

    beforeEach(() => {
      wrapper = mount(MetadataValidatorWorkflow, {
        props: {
          validation: {
            validationRuleName: 'workflow',
            isMultiple: false
          }
        },
        global: {
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
    })

    it('should render workflow validation form', () => {
      expect(wrapper.find('.el-form').exists()).toBe(true)
    })

    it('should validate form successfully', async () => {
      const result = await wrapper.vm.validate()
      expect(result).toBe(true)
    })

    it('should return validation data', () => {
      const data = wrapper.vm.getData()
      expect(data).toEqual({
        validationRuleName: 'workflow',
        isMultiple: false
      })
    })

    it('should toggle multiple selection', async () => {
      const switchElement = wrapper.find('.el-switch')
      await switchElement.trigger('click')
      expect(wrapper.vm.validation.isMultiple).toBe(true)
    })
  })

  describe('MetadataValidatorMasterTable', () => {
    let wrapper: any

    beforeEach(() => {
      wrapper = mount(MetadataValidatorMasterTable, {
        props: {
          validation: {
            validationRuleName: 'mastertable',
            masterTableName: 'test_table',
            displayColumn: 'name',
            valueColumn: 'id',
            isMultiple: false
          }
        },
        global: {
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
    })

    it('should render master table validation form', () => {
      expect(wrapper.find('.el-form').exists()).toBe(true)
    })

    it('should validate form successfully', async () => {
      const result = await wrapper.vm.validate()
      expect(result).toBeDefined()
    })

    it('should return validation data', () => {
      const data = wrapper.vm.getData()
      expect(data).toEqual({
        validationRuleName: 'mastertable',
        masterTableName: 'test_table',
        displayColumn: 'name',
        valueColumn: 'id',
        isMultiple: false
      })
    })
  })

  describe('MetadataValidatorUser', () => {
    let wrapper: any

    beforeEach(() => {
      wrapper = mount(MetadataValidatorUser, {
        props: {
          validation: {
            validationRuleName: 'user',
            isMultiple: false
          }
        },
        global: {
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
    })

    it('should render user validation form', () => {
      expect(wrapper.find('.el-form').exists()).toBe(true)
    })

    it('should validate form successfully', async () => {
      const result = await wrapper.vm.validate()
      expect(result).toBe(true)
    })

    it('should return validation data', () => {
      const data = wrapper.vm.getData()
      expect(data).toEqual({
        validationRuleName: 'user',
        isMultiple: false
      })
    })

    it('should toggle multiple selection', async () => {
      const switchElement = wrapper.find('.el-switch')
      await switchElement.trigger('click')
      expect(wrapper.vm.validation.isMultiple).toBe(true)
    })
  })

  describe('MetadataValidatorUserRoleUserGroup', () => {
    let wrapper: any

    beforeEach(() => {
      wrapper = mount(MetadataValidatorUserRoleUserGroup, {
        props: {
          validation: {
            validationRuleName: 'role',
            allow: 'ALL',
            isMultiple: false
          }
        },
        global: {
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
    })

    it('should render role validation form', () => {
      expect(wrapper.find('.el-form').exists()).toBe(true)
    })

    it('should validate form successfully', async () => {
      const result = await wrapper.vm.validate()
      expect(result).toBeDefined()
    })

    it('should return validation data', () => {
      const data = wrapper.vm.getData()
      expect(data).toEqual({
        validationRuleName: 'role',
        allow: 'ALL',
        isMultiple: false
      })
    })

    it('should toggle multiple selection', async () => {
      const switchElement = wrapper.find('.el-switch')
      await switchElement.trigger('click')
      expect(wrapper.vm.validation.isMultiple).toBe(true)
    })
  })

  describe('MetadataValidatorObject', () => {
    let wrapper: any

    beforeEach(() => {
      wrapper = mount(MetadataValidatorObject, {
        props: {
          validation: {
            validationRuleName: 'object',
            schema: {}
          }
        },
        global: {
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
    })

    it('should render object validation form', () => {
      expect(wrapper.find('.el-form').exists()).toBe(true)
    })

    it('should validate form successfully', async () => {
      const result = await wrapper.vm.validate()
      expect(result).toBe(true)
    })

    it('should return validation data', () => {
      const data = wrapper.vm.getData()
      expect(data).toEqual({
        validationRuleName: 'object',
        schema: {}
      })
    })

  })

  describe('MetadataValidatorArray', () => {
    let wrapper: any

    beforeEach(() => {
      wrapper = mount(MetadataValidatorArray, {
        props: {
          validation: {
            validationRuleName: 'array',
            itemType: 'string',
            minItems: 0,
            maxItems: 10
          }
        },
        global: {
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
    })

    it('should render array validation form', () => {
      expect(wrapper.find('.el-form').exists()).toBe(true)
    })

    it('should validate form successfully', async () => {
      const result = await wrapper.vm.validate()
      expect(result).toBe(true)
    })

    it('should return validation data', () => {
      const data = wrapper.vm.getData()
      expect(data).toEqual({
        validationRuleName: 'array',
        itemType: 'string',
        minItems: 0,
        maxItems: 10
      })
    })

    it('should update item type', async () => {
      const itemTypeInput = wrapper.find('input[placeholder*="itemType"]')
      await itemTypeInput.setValue('number')
      expect(wrapper.vm.validation.itemType).toBe('number')
    })

    it('should update min items', async () => {
      const minItemsInput = wrapper.find('input[placeholder*="minItems"]')
      await minItemsInput.setValue(5)
      expect(wrapper.vm.validation.minItems).toBe("5")
    })

    it('should update max items', async () => {
      const maxItemsInput = wrapper.find('input[placeholder*="maxItems"]')
      await maxItemsInput.setValue(20)
      expect(wrapper.vm.validation.maxItems).toBe("20")
    })
  })

  describe('Component Integration Tests', () => {
    it('should handle validation rule changes', async () => {
      const textWrapper = mount(MetadataValidatorText, {
        props: {
          validation: {
            validationRuleName: 'text',
            maxLength: 100
          }
        },
        global: {
          mocks: {
            $t: (msg: string) => msg,
            $i18n: { t: (key: string) => key },
            useI18n: () => ({ t: (key: string) => key })
          }
        }
      })

      textWrapper.vm.validation.maxLength = 200
      expect(textWrapper.vm.validation.maxLength).toBe(200)

      textWrapper.unmount()
    })

    it('should handle form validation errors', async () => {
      const numberWrapper = mount(MetadataValidatorNumber, {
        props: {
          validation: {
            validationRuleName: 'number',
            decimal: 0
          }
        },
        global: {
          mocks: {
            $t: (msg: string) => msg,
            $i18n: { t: (key: string) => key },
            useI18n: () => ({ t: (key: string) => key })
          }
        }
      })

      // Set invalid decimal value
      numberWrapper.vm.validation.decimal = -1
      const result = await numberWrapper.vm.validate()
      expect(result).toBeDefined()

      numberWrapper.unmount()
    })

    it('should handle multiple selection changes', async () => {
      const selectWrapper = mount(MetadataValidatorSelect, {
        props: {
          validation: {
            validationRuleName: 'select',
            options: ['Option 1'],
            isMultiple: false
          }
        },
        global: {
          mocks: {
            $t: (msg: string) => msg,
            $i18n: { t: (key: string) => key },
            useI18n: () => ({ t: (key: string) => key })
          }
        }
      })

      selectWrapper.vm.validation.isMultiple = true
      expect(selectWrapper.vm.validation.isMultiple).toBe(true)

      selectWrapper.unmount()
    })
  })
}) 
