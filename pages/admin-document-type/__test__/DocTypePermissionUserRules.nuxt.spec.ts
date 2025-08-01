import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { DocTypePermissionUserRules, FormLogicalSelector } from '#components'
describe('[admin-document-type]DocTypePermissionUserRules', () => {
  let wrapper: any

  beforeEach(() => {
    vi.clearAllMocks()
    
    wrapper = mount(DocTypePermissionUserRules, {
      props: {
        targetOptions: [
          {
            label: 'user_role',
            value: 'userRole',
            type: 'select',
            options: [
              { label: 'Finance Manager', value: 'financeManager' },
              { label: 'Admin', value: 'admin' }
            ]
          },
          {
            label: 'user_groups',
            value: 'userGroup',
            type: 'select',
            options: [
              { label: 'Finance', value: 'finance' },
              { label: 'IT', value: 'it' }
            ]
          }
        ]
      },
      global: {
        components: { FormLogicalSelector },
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
    it('should render the component correctly', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('should render the section title', () => {
      const title = wrapper.find('h3')
      expect(title.exists()).toBe(true)
      expect(title.text()).toBe('user_role')
    })

    it('should render the FormLogicalSelector component', () => {
      expect(wrapper.findComponent(FormLogicalSelector).exists()).toBe(true)
    })

    it('should pass correct props to FormLogicalSelector', () => {
      const formSelector = wrapper.findComponent(FormLogicalSelector)
      expect(formSelector.props('formData')).toBeDefined()
      expect(formSelector.props('resourceAttributes')).toEqual(wrapper.props('targetOptions'))
      expect(formSelector.props('isOr')).toBe(true)
    })
  })

  describe('setFormData Method', () => {
    it('should set default form data when no data is provided', async () => {
      await wrapper.vm.setFormData(null)
      
      const formData = wrapper.vm.formData
      expect(formData.condition).toBe('or')
      expect(formData.resourceRules.length).toBe(1)
      expect(formData.resourceRules[0]).toEqual({
        attribute: '',
        value: [],
        condition: 'eq',
        type: 'string'
      })
    })

    it('should set default form data when undefined is provided', async () => {
      await wrapper.vm.setFormData(undefined)
      
      const formData = wrapper.vm.formData
      expect(formData.condition).toBe('or')
      expect(formData.resourceRules.length).toBe(1)
    })

    it('should transform input data to form data structure', async () => {
      const inputData = [
        {
          attribute: 'userRole',
          value: 'financeManager',
          condition: 'equal'
        },
        {
          attribute: 'userGroup',
          value: 'finance',
          condition: 'not_equal'
        }
      ]
      
      await wrapper.vm.setFormData(inputData)
      
      const formData = wrapper.vm.formData
      expect(formData.condition).toBe('or')
      expect(formData.resourceRules.length).toBe(2)
      expect(formData.resourceRules[0]).toEqual({
        attribute: 'userRole',
        value: ['financeManager'],
        condition: 'eq',
        type: 'select'
      })
      expect(formData.resourceRules[1]).toEqual({
        attribute: 'userGroup',
        value: ['finance'],
        condition: 'neq',
        type: 'select'
      })
    })
    it('should handle condition mapping correctly', async () => {
      const inputData = [
        {
          attribute: 'userRole',
          value: 'admin',
          condition: 'equal'
        },
        {
          attribute: 'userGroup',
          value: 'it',
          condition: 'not_equal'
        }
      ]
      
      await wrapper.vm.setFormData(inputData)
      
      const formData = wrapper.vm.formData
      expect(formData.resourceRules[0].condition).toBe('eq')
      expect(formData.resourceRules[1].condition).toBe('neq')
    })

    it('should handle unknown attribute type', async () => {
      const inputData = [
        {
          attribute: 'unknownAttribute',
          value: 'test',
          condition: 'equal'
        }
      ]
      
      await wrapper.vm.setFormData(inputData)
      
      const formData = wrapper.vm.formData
      expect(formData.resourceRules[0].type).toBeUndefined()
    })
  })

  describe('getFormData Method', () => {
    it('should transform form data back to rule format', () => {
      // Set up form data
      wrapper.vm.formData = {
        condition: 'or',
        resourceRules: [
          {
            attribute: 'userRole',
            value: ['financeManager'],
            condition: 'eq',
            type: 'select'
          },
          {
            attribute: 'userGroup',
            value: ['finance'],
            condition: 'neq',
            type: 'select'
          }
        ]
      }
      
      const result = wrapper.vm.getFormData()
      
      expect(result).toEqual([
        {
          attribute: 'userRole',
          value: 'financeManager',
          condition: 'equal'
        },
        {
          attribute: 'userGroup',
          value: 'finance',
          condition: 'not_equal'
        }
      ])
    })

    it('should handle empty resourceRules', () => {
      wrapper.vm.formData = {
        condition: 'or',
        resourceRules: []
      }
      
      const result = wrapper.vm.getFormData()
      expect(result).toEqual([])
    })

    it('should handle condition mapping in reverse', () => {
      wrapper.vm.formData = {
        condition: 'or',
        resourceRules: [
          {
            attribute: 'userRole',
            value: ['admin'],
            condition: 'eq',
            type: 'select'
          },
          {
            attribute: 'userGroup',
            value: ['it'],
            condition: 'neq',
            type: 'select'
          }
        ]
      }
      
      const result = wrapper.vm.getFormData()
      expect(result[0].condition).toBe('equal')
      expect(result[1].condition).toBe('not_equal')
    })

    it('should handle single value in array', () => {
      wrapper.vm.formData = {
        condition: 'or',
        resourceRules: [
          {
            attribute: 'userRole',
            value: ['singleValue'],
            condition: 'eq',
            type: 'select'
          }
        ]
      }
      
      const result = wrapper.vm.getFormData()
      expect(result[0].value).toBe('singleValue')
    })

    it('should handle multiple values in array', () => {
      wrapper.vm.formData = {
        condition: 'or',
        resourceRules: [
          {
            attribute: 'userRole',
            value: ['value888'],
            condition: 'eq',
            type: 'select'
          }
        ]
      }
      
      const result = wrapper.vm.getFormData()
      expect(result[0].value).toEqual('value888')
    })
  })

  describe('Component Exposed Methods', () => {
    it('should expose setFormData method', () => {
      expect(wrapper.vm.setFormData).toBeDefined()
      expect(typeof wrapper.vm.setFormData).toBe('function')
    })

    it('should expose getFormData method', () => {
      expect(wrapper.vm.getFormData).toBeDefined()
      expect(typeof wrapper.vm.getFormData).toBe('function')
    })
  })

  describe('Props Handling', () => {
    it('should handle empty targetOptions', async () => {
      await wrapper.setProps({ targetOptions: [] })
      
      const formSelector = wrapper.findComponent(FormLogicalSelector)
      expect(formSelector.props('resourceAttributes')).toEqual([])
    })

    it('should handle targetOptions with different types', async () => {
      const targetOptions = [
        {
          label: 'string_field',
          value: 'stringField',
          type: 'string'
        },
        {
          label: 'number_field',
          value: 'numberField',
          type: 'number'
        }
      ]
      
      await wrapper.setProps({ targetOptions })
      
      const inputData = [
        {
          attribute: 'stringField',
          value: 'test',
          condition: 'equal'
        },
        {
          attribute: 'numberField',
          value: 123,
          condition: 'not_equal'
        }
      ]
      
      await wrapper.vm.setFormData(inputData)
      
      const formData = wrapper.vm.formData
      expect(formData.resourceRules[0].type).toBe('string')
      expect(formData.resourceRules[1].type).toBe('number')
    })
  })

  describe('Data Transformation Edge Cases', () => {
    it('should handle null values in input data', async () => {
      const inputData = [
        {
          attribute: 'userRole',
          value: null,
          condition: 'equal'
        }
      ]
      
      await wrapper.vm.setFormData(inputData)
      
      const formData = wrapper.vm.formData
      expect(formData.resourceRules[0].value).toEqual([null])
    })

    it('should handle undefined values in input data', async () => {
      const inputData = [
        {
          attribute: 'userRole',
          value: undefined,
          condition: 'equal'
        }
      ]
      
      await wrapper.vm.setFormData(inputData)
      
      const formData = wrapper.vm.formData
      expect(formData.resourceRules[0].value).toEqual([undefined])
    })

    it('should handle missing condition in input data', async () => {
      const inputData = [
        {
          attribute: 'userRole',
          value: 'admin'
        }
      ]
      
      await wrapper.vm.setFormData(inputData)
      
      const formData = wrapper.vm.formData
      expect(formData.resourceRules[0].condition).toBe('neq')
    })

    it('should handle missing attribute in input data', async () => {
      const inputData = [
        {
          value: 'admin',
          condition: 'equal'
        }
      ]
      
      await wrapper.vm.setFormData(inputData)
      
      const formData = wrapper.vm.formData
      expect(formData.resourceRules[0].attribute).toBe(undefined)
    })
  })

  describe('Form Data Reactivity', () => {
    it('should update form data reactively', async () => {
      const initialFormData = wrapper.vm.formData
      
      await wrapper.vm.setFormData([
        { attribute: 'userRole', value: 'admin', condition: 'equal' }
      ])
      
      const updatedFormData = wrapper.vm.formData
      expect(updatedFormData.resourceRules.length).toBe(1)
      expect(updatedFormData.resourceRules[0].attribute).toBe('userRole')
    })

    it('should maintain form data structure consistency', async () => {
      const inputData = [
        { attribute: 'userRole', value: 'admin', condition: 'equal' }
      ]
      
      await wrapper.vm.setFormData(inputData)
      const formData = wrapper.vm.getFormData()
      
      expect(formData).toEqual([
        { attribute: 'userRole', value: 'admin', condition: 'equal' }
      ])
    })
  })

  describe('Integration with FormLogicalSelector', () => {
    it('should pass form data to FormLogicalSelector', () => {
      const formSelector = wrapper.findComponent(FormLogicalSelector)
      expect(formSelector.props('formData')).toBe(wrapper.vm.formData)
    })

    it('should handle form data updates from FormLogicalSelector', async () => {
      const formSelector = wrapper.findComponent(FormLogicalSelector)
      const updatedFormData = {
        condition: 'and',
        resourceRules: [
          {
            attribute: 'userRole',
            value: ['admin'],
            condition: 'eq',
            type: 'select'
          }
        ]
      }
      
      await formSelector.vm.$emit('update:formData', updatedFormData)
      
      expect(wrapper.vm.formData).toEqual(updatedFormData)
    })
  })
}) 
