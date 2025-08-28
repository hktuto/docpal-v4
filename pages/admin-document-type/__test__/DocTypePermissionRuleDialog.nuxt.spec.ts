import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { DocTypePermissionRuleDialog, DocTypePermissionUserRules } from '#components'
import { ElMessage } from 'element-plus'

// Mock Element Plus components
vi.mock('element-plus', () => ({
  ElMessage: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

// Mock useDocumentTypeOptioins composable
vi.mock('~/composables/useDocumentTypeOptioins', () => ({
  userRulesOpts: {
    value: [
      {
        label: 'user_role',
        value: 'userRole',
        type: 'select',
        options: [
          { label: 'Finance Manager', value: 'financeManager' },
          { label: 'Admin', value: 'admin' }
        ]
      }
    ]
  },
  initUserRulesOpts: vi.fn(() => Promise.resolve())
}))

describe('[admin-document-type]DocTypePermissionRuleDialog', () => {
  let wrapper: any

  beforeEach(async () => {
    vi.clearAllMocks()

    wrapper = mount(DocTypePermissionRuleDialog, {
      props: {
        title: 'Test Permission'
      },
      global: {
        components: { DocTypePermissionUserRules },
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key },
          useI18n: () => ({ t: (key: string) => key })
        }
      }
    })
    wrapper.vm.visible = true
    await new Promise((resolve) => setTimeout(resolve, 100))
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('should render the dialog component correctly', () => {
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.find('.el-dialog').exists()).toBe(true)
    })

    it('should render the dialog title correctly', () => {
      const title = wrapper.find('.el-dialog .el-dialog__title')
      console.log(title, 'title')
      console.log(wrapper.html(), 'htsssml')
      expect(wrapper.text()).toContain('docType.ruleTitle')
    })

    it('should render the form with rule name field', () => {
      expect(wrapper.find('form').exists()).toBe(true)
      expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    })

    it('should render the user rules component', () => {
      expect(wrapper.findComponent(DocTypePermissionUserRules).exists()).toBe(true)
    })

    it('should render footer buttons', () => {
      const buttons = wrapper.findAll('button')
      expect(buttons.length).toBeGreaterThan(0)
    })
  })

  describe('Dialog State Management', () => {
    it('should initialize with isEdit as false', () => {
      expect(wrapper.vm.isEdit).toBe(false)
    })

    it('should initialize with selectedIndex as -1', () => {
      expect(wrapper.vm.selectedIndex).toBe(-1)
    })

    it('should initialize with empty form data', () => {
      expect(wrapper.vm.formData.name).toBe('')
      expect(wrapper.vm.formData.conditions).toEqual([
        {
          attribute: 'userRole',
          condition: 'not_equal',
          value: 'financeManager'
        }
      ])
    })
  })

  describe('handleOpen Method', () => {
    it('should open dialog and set form data for new rule', async () => {
      await wrapper.vm.handleOpen()

      expect(wrapper.vm.visible).toBe(true)
      expect(wrapper.vm.selectedIndex).toBe(-1)
      expect(wrapper.vm.isEdit).toBe(false)
    })

    it('should open dialog and set form data for existing rule', async () => {
      const ruleData = {
        name: 'Test Rule',
        conditions: [
          {
            attribute: 'userRole',
            condition: 'equal',
            value: 'admin'
          }
        ]
      }

      await wrapper.vm.handleOpen(ruleData, 1)

      expect(wrapper.vm.visible).toBe(true)
      expect(wrapper.vm.selectedIndex).toBe(1)
      await new Promise((resolve) => setTimeout(resolve, 200))

      // Wait for setTimeout to execute

      expect(wrapper.vm.formData.name).toBe('Test Rule')
    })

    it('should handle rule data without name', async () => {
      const ruleData = { conditions: [] }

      await wrapper.vm.handleOpen(ruleData, 0)

      // Wait for setTimeout to execute
      await new Promise((resolve) => setTimeout(resolve, 100))

      expect(wrapper.vm.formData.name).toBe('')
    })
  })

  describe('handleClose Method', () => {
    it('should close the dialog', async () => {
      wrapper.vm.visible = true
      await wrapper.vm.handleClose()

      expect(wrapper.vm.visible).toBe(false)
    })
  })

  describe('handleSave Method', () => {
    beforeEach(() => {
      // Mock form validation
      wrapper.vm.ruleFormRef = {
        validate: vi.fn().mockResolvedValue(true)
      }
    })

    it('should save new rule successfully', async () => {
      wrapper.vm.formData.name = 'New Rule'
      wrapper.vm.selectedIndex = -1

      await wrapper.vm.handleSave()

      expect(wrapper.emitted('add')).toBeTruthy()

      expect(ElMessage.success).toHaveBeenCalledWith('保存成功')
      expect(wrapper.vm.visible).toBe(false)
    })

    it('should update existing rule successfully', async () => {
      wrapper.vm.formData.name = 'Updated Rule'
      wrapper.vm.selectedIndex = 1

      await wrapper.vm.handleSave()

      expect(wrapper.emitted('update')).toBeTruthy()
      expect(wrapper.emitted('update')[0][0]).toEqual({
        name: 'Updated Rule',
        conditions: []
      })
      expect(wrapper.emitted('update')[0][1]).toBe(1)
    })

    it('should handle form validation failure', async () => {
      wrapper.vm.ruleFormRef.validate = vi.fn().mockRejectedValue(new Error('Validation failed'))

      await wrapper.vm.handleSave()

      expect(wrapper.vm.ruleFormRef.validate).toHaveBeenCalled()
      expect(ElMessage.error).toHaveBeenCalledWith('请检查表单信息')
      expect(wrapper.vm.visible).toBe(true) // Dialog should remain open
    })

    it('should handle missing form ref', async () => {
      wrapper.vm.ruleFormRef = null

      await wrapper.vm.handleSave()

      expect(wrapper.emitted('add')).toBeFalsy()
      expect(wrapper.emitted('update')).toBeFalsy()
    })
  })

  describe('handleRemove Method', () => {
    it('should emit remove event and close dialog', async () => {
      wrapper.vm.selectedIndex = 2

      await wrapper.vm.handleRemove()

      expect(wrapper.emitted('remove')).toBeTruthy()
      expect(wrapper.emitted('remove')[0][0]).toBe(2)
      expect(ElMessage.success).toHaveBeenCalledWith('删除成功')
      expect(wrapper.vm.visible).toBe(false)
    })
  })

  describe('Form Validation', () => {
    it('should have required validation for name field', () => {
      const rules = wrapper.vm.rules
      expect(rules.name).toBeDefined()
      expect(rules.name[0].required).toBe(true)
      expect(rules.name[0].trigger).toBe('blur')
    })

    it('should validate name field with custom message', () => {
      const rules = wrapper.vm.rules
      expect(rules.name[0].message).toBe('render.hint.fieldRequired')
    })
  })

  describe('Component Exposed Methods', () => {
    it('should expose handleOpen method', () => {
      expect(wrapper.vm.handleOpen).toBeDefined()
      expect(typeof wrapper.vm.handleOpen).toBe('function')
    })
  })

  describe('Event Emissions', () => {
    it('should emit add event for new rules', async () => {
      wrapper.vm.ruleFormRef = {
        validate: vi.fn().mockResolvedValue(true)
      }
      wrapper.vm.formData.name = 'New Rule'
      wrapper.vm.selectedIndex = -1

      await wrapper.vm.handleSave()

      expect(wrapper.emitted('add')).toBeTruthy()
      expect(wrapper.emitted('add')).toHaveLength(1)
    })

    it('should emit update event for existing rules', async () => {
      wrapper.vm.ruleFormRef = {
        validate: vi.fn().mockResolvedValue(true)
      }
      wrapper.vm.formData.name = 'Updated Rule'
      wrapper.vm.selectedIndex = 1

      await wrapper.vm.handleSave()

      expect(wrapper.emitted('update')).toBeTruthy()
      expect(wrapper.emitted('update')).toHaveLength(1)
    })

    it('should emit remove event', async () => {
      wrapper.vm.selectedIndex = 0

      await wrapper.vm.handleRemove()

      expect(wrapper.emitted('remove')).toBeTruthy()
      expect(wrapper.emitted('remove')).toHaveLength(1)
    })
  })

  describe('Dialog Configuration', () => {
    it('should have scroll-dialog class', () => {
      const dialog = wrapper.find('.el-dialog')
      expect(dialog.classes()).toContain('scroll-dialog')
    })
  })

  describe('Form Data Handling', () => {
    it('should handle form data with conditions', async () => {
      const ruleData = {
        name: 'Test Rule',
        conditions: [
          {
            attribute: 'userRole',
            condition: 'equal',
            value: 'admin'
          },
          {
            attribute: 'userGroup',
            condition: 'not_equal',
            value: 'finance'
          }
        ]
      }

      await wrapper.vm.handleOpen(ruleData, 0)

    })

    it('should handle empty rule data', async () => {
      await wrapper.vm.handleOpen(null, -1)

      expect(wrapper.vm.formData.name).toBe('')
    })
  })

  describe('Edge Cases', () => {
    it('should handle missing UserRulesRef', async () => {
      wrapper.vm.UserRulesRef = null

      await wrapper.vm.handleSave()

      expect(wrapper.emitted('add')).toBeFalsy()
      expect(wrapper.emitted('update')).toBeFalsy()
    })

    it('should handle UserRulesRef without setFormData method', async () => {
      wrapper.vm.UserRulesRef = {}
      const ruleData = { name: 'Test' }

      await wrapper.vm.handleOpen(ruleData, 0)
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Should not throw error, just not call setFormData
      expect(wrapper.vm.formData.name).toBe('Test')
    })
  })
})
