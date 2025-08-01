import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { DocTypePermission, DocTypePermissionRuleDialog } from '#components'
import { ElMessage } from 'element-plus'

// Mock Element Plus components
vi.mock('element-plus', () => ({
  ElMessage: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

describe('[admin-document-type]DocTypePermission', () => {
  let wrapper: any

  beforeEach(() => {
    vi.clearAllMocks()
    
    wrapper = mount(DocTypePermission, {
      props: {
        modelValue: [],
        permissionType: 'read'
      },
      global: {
        components: { DocTypePermissionRuleDialog },
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
    it('should render the permission container correctly', () => {
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.find('.permission-container').exists()).toBe(true)
    })

    it('should render the section title with correct permission type', () => {
      const title = wrapper.find('.section-title')
      expect(title.exists()).toBe(true)
      expect(title.text()).toBe('docType.read')
    })

    it('should render the add rule button', () => {
      const addButton = wrapper.find('.add-rule-button')
      expect(addButton.exists()).toBe(true)
      expect(addButton.text()).toBe('docType.addRule')
    })

    it('should render the rule dialog component', () => {
      expect(wrapper.findComponent(DocTypePermissionRuleDialog).exists()).toBe(true)
    })
  })

  describe('Props Handling', () => {
    it('should display correct permission type in title', async () => {
      await wrapper.setProps({ permissionType: 'write' })
      const title = wrapper.find('.section-title')
      expect(title.text()).toBe('docType.write')
    })

    it('should handle empty rules list', () => {
      expect(wrapper.find('.rules-list .rule-item').exists()).toBe(false)
    })

    it('should display rules when modelValue has items', async () => {
      const rules = [
        { name: 'Rule 1' },
        { name: 'Rule 2' }
      ]
      await wrapper.setProps({ modelValue: rules })
      
      const ruleItems = wrapper.findAll('.rule-content')
      expect(ruleItems).toHaveLength(2)
      expect(ruleItems[0].find('.rule-text').text()).toBe('Rule 1')
      expect(ruleItems[1].find('.rule-text').text()).toBe('Rule 2')
    })
  })

  describe('handleOpen Method', () => {

    it('should call handleOpen with correct title prop', async () => {
      const ruleDialog = wrapper.findComponent(DocTypePermissionRuleDialog)
      expect(ruleDialog.props('title')).toBe('docType.read')
    })
  })

  describe('handleAdd Method', () => {
    it('should emit update:modelValue with new rule added', async () => {
      const existingRules = [{ name: 'Existing Rule' }]
      await wrapper.setProps({ modelValue: existingRules })
      
      const newRule = { name: 'New Rule' }
      await wrapper.vm.handleAdd(newRule)
      
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0][0]).toEqual([
        { name: 'Existing Rule' },
        { name: 'New Rule' }
      ])
    })

    it('should handle adding rule to empty list', async () => {
      const newRule = { name: 'First Rule' }
      await wrapper.vm.handleAdd(newRule)
      
      expect(wrapper.emitted('update:modelValue')[0][0]).toEqual([
        { name: 'First Rule' }
      ])
    })
  })

  describe('handleUpdate Method', () => {
    it('should emit update:modelValue with updated rule', async () => {
      const rules = [
        { name: 'Rule 1' },
        { name: 'Rule 2' }
      ]
      await wrapper.setProps({ modelValue: rules })
      
      const updatedRule = { name: 'Updated Rule 2' }
      await wrapper.vm.handleUpdate(updatedRule, 1)
      
      expect(wrapper.emitted('update:modelValue')[0][0]).toEqual([
        { name: 'Rule 1' },
        { name: 'Updated Rule 2' }
      ])
    })

    it('should emit update event with rule and index', async () => {
      const rules = [{ name: 'Rule 1' }]
      await wrapper.setProps({ modelValue: rules })
      
      const updatedRule = { name: 'Updated Rule' }
      await wrapper.vm.handleUpdate(updatedRule, 0)
      
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    })
  })

  describe('handleRemove Method', () => {
    it('should emit update:modelValue with rule removed', async () => {
      const rules = [
        { name: 'Rule 1' },
        { name: 'Rule 2' },
        { name: 'Rule 3' }
      ]
      await wrapper.setProps({ modelValue: rules })
      
      await wrapper.vm.handleRemove(1)
      
      expect(wrapper.emitted('update:modelValue')[0][0]).toEqual([
        { name: 'Rule 1' },
        { name: 'Rule 3' }
      ])
    })

    it('should handle removing last rule', async () => {
      const rules = [{ name: 'Last Rule' }]
      await wrapper.setProps({ modelValue: rules })
      
      await wrapper.vm.handleRemove(0)
      
      expect(wrapper.emitted('update:modelValue')[0][0]).toEqual([])
    })
  })

  describe('Rule Display', () => {
    it('should display edit button for each rule', async () => {
      const rules = [
        { name: 'Rule 1' },
        { name: 'Rule 2' }
      ]
      await wrapper.setProps({ modelValue: rules })
      
      const editButtons = wrapper.findAll('.edit-button')
      expect(editButtons).toHaveLength(2)
    })

    it('should display rule name correctly', async () => {
      const rules = [{ name: 'Test Rule Name' }]
      await wrapper.setProps({ modelValue: rules })
      
      const ruleText = wrapper.find('.rule-text')
      expect(ruleText.text()).toBe('Test Rule Name')
    })
  })

  describe('Event Handling', () => {
    it('should handle add event from rule dialog', async () => {
      const ruleDialog = wrapper.findComponent(DocTypePermissionRuleDialog)
      const newRule = { name: 'New Rule' }
      
      await ruleDialog.vm.$emit('add', newRule)
      
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0][0]).toEqual([newRule])
    })

    it('should handle remove event from rule dialog', async () => {
      const rules = [{ name: 'Rule 1' }, { name: 'Rule 2' }]
      await wrapper.setProps({ modelValue: rules })
      
      const ruleDialog = wrapper.findComponent(DocTypePermissionRuleDialog)
      await ruleDialog.vm.$emit('remove', 0)
      
      expect(wrapper.emitted('update:modelValue')[0][0]).toEqual([
        { name: 'Rule 2' }
      ])
    })

    it('should handle update event from rule dialog', async () => {
      const rules = [{ name: 'Original Rule' }]
      await wrapper.setProps({ modelValue: rules })
      
      const ruleDialog = wrapper.findComponent(DocTypePermissionRuleDialog)
      const updatedRule = { name: 'Updated Rule' }
      await ruleDialog.vm.$emit('update', updatedRule, 0)
      
      expect(wrapper.emitted('update:modelValue')[0][0]).toEqual([updatedRule])
    })
  })

  describe('Edge Cases', () => {
    it('should handle undefined modelValue', async () => {
      await wrapper.setProps({ modelValue: undefined })
      expect(wrapper.find('.rules-list .rule-item').exists()).toBe(false)
    })

    it('should handle null modelValue', async () => {
      await wrapper.setProps({ modelValue: null })
      expect(wrapper.find('.rules-list .rule-item').exists()).toBe(false)
    })

    it('should handle rules with missing name property', async () => {
      const rules = [{ name: undefined }, { name: null }, { name: '' }]
      await wrapper.setProps({ modelValue: rules })
      
      const ruleTexts = wrapper.findAll('.rule-text')
      expect(ruleTexts[0].text()).toBe('')
      expect(ruleTexts[1].text()).toBe('')
      expect(ruleTexts[2].text()).toBe('')
    })
  })

  describe('Component Integration', () => {
    it('should pass correct title to rule dialog based on permission type', async () => {
      await wrapper.setProps({ permissionType: 'manage' })
      const ruleDialog = wrapper.findComponent(DocTypePermissionRuleDialog)
      expect(ruleDialog.props('title')).toBe('docType.manage')
    })

    it('should maintain rule order after operations', async () => {
      const initialRules = [
        { name: 'First' },
        { name: 'Second' },
        { name: 'Third' }
      ]
      await wrapper.setProps({ modelValue: initialRules })
      
      // Update second rule
      await wrapper.vm.handleUpdate({ name: 'Updated Second' }, 1)
      expect(wrapper.emitted('update:modelValue')[0][0][1].name).toBe('Updated Second')
      
      // Remove first rule
      await wrapper.vm.handleRemove(0)
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    })
  })
}) 
