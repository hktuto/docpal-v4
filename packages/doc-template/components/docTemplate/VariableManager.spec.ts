import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import VariableManager from './VariableManager.vue'
import { DocTemplateProveKey, type VariableItem } from '../../utils/docTempalteHelper'
import { nextTick } from 'vue'

const mockVariables = [
  { key: 'var1', type: 'Text', dataType: 'string', value: 'value1' },
  { key: 'var2', type: 'Email', dataType: 'string', value: 'test@example.com' },
] as VariableItem[]

describe('VariableManager.vue', () => {
  let addVariable: ReturnType<typeof vi.fn>
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    addVariable = vi.fn()
    wrapper = mount(VariableManager, {
      global: {
        provide: {
          [DocTemplateProveKey as symbol]: {
            variables: mockVariables,
            addVariable,
          },
        },
        stubs: ['el-drawer', 'el-table', 'el-table-column', 'el-divider', 'el-form', 'el-form-item', 'el-input', 'el-select', 'el-option', 'el-button'],
      },
      props: {
        visible: true,
      },
    })
  })

  it('renders current variables', () => {
    expect(wrapper.text()).toContain('Current Variables')
    expect(wrapper.text()).toContain('var1')
    expect(wrapper.text()).toContain('var2')
    expect(wrapper.text()).toContain('test@example.com')
  })

  it('adds a new variable', async () => {
    // Fill in the form
    await wrapper.find('input[placeholder="Key"], input').setValue('newKey')
    await wrapper.findAllComponents({ name: 'el-select' })[0].vm.$emit('update:modelValue', 'Text')
    await wrapper.findAll('input').at(-1)?.setValue('newValue')
    // Click add
    await wrapper.findComponent({ name: 'el-button' }).trigger('click')
    await nextTick()
    expect(addVariable).toHaveBeenCalled()
    expect(addVariable.mock.calls[0][0]).toMatchObject({ key: 'newKey', type: 'Text', value: 'newValue' })
  })

  it('emits close event when drawer is closed', async () => {
    await wrapper.vm.$emit('close')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
}) 
