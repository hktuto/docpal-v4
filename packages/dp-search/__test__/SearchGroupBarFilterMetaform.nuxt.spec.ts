import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { SearchGroupBarFilterMetaform } from '#components'

// Mock child components
const mockElSwitch = {
  template: '<div class="el-switch"><slot /></div>',
  props: ['model-value', 'size'],
  emits: ['update:model-value', 'change']
}

const mockElSelectV2 = {
  template: '<div class="el-select-v2"><slot /></div>',
  props: ['model-value', 'options', 'size'],
  emits: ['update:model-value', 'change']
}

const mockElDatePicker = {
  template: '<div class="el-date-picker"><slot /></div>',
  props: ['model-value', 'type', 'size', 'format', 'value-format'],
  emits: ['update:model-value', 'change']
}

const mockElInput = {
  template: '<div class="el-input"><slot /></div>',
  props: ['model-value', 'placeholder', 'clearable', 'size'],
  emits: ['update:model-value', 'change']
}

// Mock metadata functions
vi.mock('../../../../base/components/meta/metadata', () => ({
  getMasterTableOptions: vi.fn().mockResolvedValue([
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' }
  ]),
  getUserList: vi.fn().mockResolvedValue([
    { label: 'User 1', value: 'user1' },
    { label: 'User 2', value: 'user2' }
  ]),
  getUserGroupList: vi.fn().mockResolvedValue([
    { label: 'Group 1', value: 'group1' },
    { label: 'Group 2', value: 'group2' }
  ]),
  getRoleList: vi.fn().mockResolvedValue([
    { label: 'Role 1', value: 'role1' },
    { label: 'Role 2', value: 'role2' }
  ])
}))

describe('[dp-search]SearchGroupBarFilterMetaform', () => {
  let wrapper: any

  beforeEach(async () => {
    vi.clearAllMocks()

    const config = {
      dataType: 'string',
      validationRule: {
        options: ['Option 1', 'Option 2']
      }
    }

    wrapper = mount(SearchGroupBarFilterMetaform, {
      props: {
        config
      },
      global: {
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        },
        components: {
          ElSwitch: mockElSwitch,
          ElSelectV2: mockElSelectV2,
          ElDatePicker: mockElDatePicker,
          ElInput: mockElInput
        }
      }
    })

    await new Promise(resolve => setTimeout(resolve, 100))
  })

  it('should render correctly', () => {
    expect(wrapper.find('.el-input').exists()).toBe(true)
  })

  it('should render boolean switch when dataType is boolean', async () => {
    await wrapper.setProps({
      config: {
        dataType: 'boolean',
        validationRule: {}
      }
    })
    wrapper.vm.$nextTick()
    
    expect(wrapper.find('.el-switch').exists()).toBe(true)
  })

  it('should render select when dataType is select', async () => {
    await wrapper.setProps({
      config: {
        dataType: 'select',
        validationRule: {
          options: ['Option 1', 'Option 2']
        }
      }
    })
    wrapper.vm.$nextTick()
    
    expect(wrapper.find('.el-select-v2').exists()).toBe(true)
  })

  it('should render select when dataType is mastertable', async () => {
    await wrapper.setProps({
      config: {
        dataType: 'mastertable',
        validationRule: {
          masterTableName: 'test_table',
          displayColumn: 'name',
          valueColumn: 'id'
        }
      }
    })
    wrapper.vm.$nextTick()
    
    expect(wrapper.find('.el-select-v2').exists()).toBe(true)
  })

  it('should render select when dataType is user', async () => {
    await wrapper.setProps({
      config: {
        dataType: 'user',
        validationRule: {}
      }
    })
    wrapper.vm.$nextTick()
    
    expect(wrapper.find('.el-select-v2').exists()).toBe(true)
  })

  it('should render select when dataType is user_role_user_group', async () => {
    await wrapper.setProps({
      config: {
        dataType: 'user_role_user_group',
        validationRule: {
          allow: 'USER'
        }
      }
    })
    wrapper.vm.$nextTick()
    
    expect(wrapper.find('.el-select-v2').exists()).toBe(true)
  })

  it('should render date picker when dataType is date', async () => {
    await wrapper.setProps({
      config: {
        dataType: 'date',
        validationRule: {}
      }
    })
    wrapper.vm.$nextTick()
    
    expect(wrapper.find('.el-date-picker').exists()).toBe(true)
  })

  it('should render input for other data types', async () => {
    await wrapper.setProps({
      config: {
        dataType: 'string',
        validationRule: {}
      }
    })
    wrapper.vm.$nextTick()
    
    expect(wrapper.find('.el-input').exists()).toBe(true)
  })

  it('should handle change correctly for string value', () => {
    wrapper.vm.handleChange('test value')
    
    expect(wrapper.emitted('formChange')).toBeTruthy()
    expect(wrapper.emitted('formChange')[0][0]).toBe('test value')
  })

  it('should handle change correctly for date value', async () => {
    await wrapper.setProps({
      config: {
        dataType: 'date',
        validationRule: {}
      }
    })
    wrapper.vm.$nextTick()
    
    const dateRange = ['2023-01-01', '2023-01-31']
    wrapper.vm.handleChange(dateRange)
    
    expect(wrapper.emitted('formChange')).toBeTruthy()
    const emittedValue = wrapper.emitted('formChange')[0][0]
    expect(JSON.parse(emittedValue)).toEqual({
      type: 'dateRange',
      from: '2023-01-01',
      to: '2023-01-31'
    })
  })

  it('should set value correctly', () => {
    wrapper.vm.setValue('test value')
    
    expect(wrapper.vm.state.value).toBe('test value')
  })

  it('should expose correct methods', () => {
    expect(wrapper.vm.setValue).toBeDefined()
  })

  it('should get options for select type correctly', async () => {
    await wrapper.setProps({
      config: {
        dataType: 'select',
        validationRule: {
          options: ['Option 1', 'Option 2']
        }
      }
    })
    wrapper.vm.$nextTick()
    
    await wrapper.vm.getOptions('select')
    
    expect(wrapper.vm.state.options).toEqual([
      { label: 'Option 1', value: 'Option 1' },
      { label: 'Option 2', value: 'Option 2' }
    ])
  })

  it('should get options for mastertable type correctly', async () => {
    await wrapper.setProps({
      config: {
        dataType: 'mastertable',
        validationRule: {
          masterTableName: 'test_table',
          displayColumn: 'name',
          valueColumn: 'id'
        }
      }
    })
    wrapper.vm.$nextTick()
    
    await wrapper.vm.getOptions('mastertable')
    
    expect(wrapper.vm.state.options).toEqual([
      { label: 'test_table', value: 'test_table_id' }
    ])
  })

  it('should get options for user type correctly', async () => {
    await wrapper.setProps({
      config: {
        dataType: 'user',
        validationRule: {}
      }
    })
    wrapper.vm.$nextTick()
    
    await wrapper.vm.getOptions('user')
    
    expect(wrapper.vm.state.options).toEqual([
      { label: 'test_user', value: 'test_user_id' }
    ])
  })

  it('should get options for user_role_user_group type with USER_ROLE allowed', async () => {
    await wrapper.setProps({
      config: {
        dataType: 'user_role_user_group',
        validationRule: {
          allow: 'USER_ROLE'
        }
      }
    })
    wrapper.vm.$nextTick()
    
    await wrapper.vm.getOptions('user_role_user_group')
    
    expect(wrapper.vm.state.options).toEqual([
      { label: 'test_role', value: 'test_role_id', type: 'role' }
    ])
  })

  it('should get options for user_role_user_group type with USER_GROUP allowed', async () => {
    await wrapper.setProps({
      config: {
        dataType: 'user_role_user_group',
        validationRule: {
          allow: 'USER_GROUP'
        }
      }
    })
    wrapper.vm.$nextTick()
    
    await wrapper.vm.getOptions('user_role_user_group')
    
    expect(wrapper.vm.state.options).toEqual([
      { label: 'test_group', value: 'test_group_id', type: 'group' }
    ])
  })

  it('should get options for user_role_user_group type with both allowed', async () => {
    await wrapper.setProps({
      config: {
        dataType: 'user_role_user_group',
        validationRule: {
          allow: 'USER'
        }
      }
    })
    wrapper.vm.$nextTick()
    
    await wrapper.vm.getOptions('user_role_user_group')
    
    expect(wrapper.vm.state.options).toHaveLength(2)
    expect(wrapper.vm.state.options[0]).toEqual({
      label: 'user_role',
      value: 'role____',
      options: [
        { label: 'test_role', value: 'test_role_id', type: 'role' }
      ]
    })
    expect(wrapper.vm.state.options[1]).toEqual({
      label: 'user_groups',
      value: 'group____',
      options: [
        { label: 'test_group', value: 'test_group_id', type: 'group' }
      ]
    })
  })

  it('should handle boolean value change correctly', async () => {
    await wrapper.setProps({
      config: {
        dataType: 'boolean',
        validationRule: {}
      }
    })
    wrapper.vm.$nextTick()
    
    wrapper.vm.handleChange(true)
    
    expect(wrapper.emitted('formChange')).toBeTruthy()
    expect(wrapper.emitted('formChange')[0][0]).toBe(true)
  })

  it('should handle select value change correctly', async () => {
    await wrapper.setProps({
      config: {
        dataType: 'select',
        validationRule: {
          options: ['Option 1', 'Option 2']
        }
      }
    })
    wrapper.vm.$nextTick()
    
    wrapper.vm.handleChange('Option 1')
    
    expect(wrapper.emitted('formChange')).toBeTruthy()
    expect(wrapper.emitted('formChange')[0][0]).toBe('Option 1')
  })

  it('should initialize with correct value type for boolean', async () => {
    await wrapper.setProps({
      config: {
        dataType: 'boolean',
        validationRule: {}
      }
    })
    wrapper.vm.$nextTick()
    
    expect(wrapper.vm.state.value).toBe(false)
  })

})
