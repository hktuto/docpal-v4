import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { SearchGroupBarFilterForm } from '#components'
import { globalApi } from './mock/api'

// Mock child components
const mockSearchGroupBarFilterMetaform = {
  template: '<div>SearchGroupBarFilterMetaform</div>',
  methods: {
    setValue: vi.fn()
  }
}

const mockElForm = {
  template: '<div class="el-form"><slot /></div>',
  props: ['model', 'label-position']
}

const mockElFormItem = {
  template: '<div class="el-form-item"><slot /></div>',
  props: ['label']
}

const mockElSelectV2 = {
  template: '<div class="el-select-v2"><slot /></div>',
  props: ['model-value', 'options', 'placeholder', 'size', 'clearable', 'filterable', 'default-first-option', 'multiple'],
  emits: ['update:model-value', 'clear', 'change']
}

const mockElInput = {
  template: '<div class="el-input"><slot /></div>',
  props: ['model-value', 'placeholder', 'clearable', 'size', 'suffix-icon'],
  emits: ['update:model-value', 'change']
}

const mockElSwitch = {
  template: '<div class="el-switch"><slot /></div>',
  props: ['model-value', 'size'],
  emits: ['update:model-value', 'change']
}

const mockElDatePicker = {
  template: '<div class="el-date-picker"><slot /></div>',
  props: ['model-value', 'type', 'size'],
  emits: ['update:model-value', 'change']
}

const mockElCascader = {
  template: '<div class="el-cascader"><slot /></div>',
  props: ['model-value', 'props', 'size'],
  emits: ['update:model-value', 'change']
}

describe('[dp-search]SearchGroupBarFilterForm', () => {
  let wrapper: any
  let setValueSpy: any

  beforeEach(async () => {
    vi.clearAllMocks()
    
    setValueSpy = vi.fn()

    const form = {
      id: 'test-form',
      queryType: 'keyword',
      keyword: 'test',
      synonyms: false,
      includeLanguages: []
    }

    const searchOptions = {
      conditionType: [
        { label: 'Keyword', value: 'keyword' },
        { label: 'Document Types', value: 'documentTypes' },
        { label: 'Metadata', value: 'metadata' }
      ],
      metadata: [
        { label: 'Title', value: 'title' },
        { label: 'Description', value: 'description' }
      ],
      languages: [
        { label: 'English', value: 'en' },
        { label: 'Chinese', value: 'zh' }
      ],
      docType: [
        { label: 'PDF', value: 'pdf' },
        { label: 'DOC', value: 'doc' }
      ],
      mimeTypes: [
        { label: 'PDF', value: 'application/pdf' },
        { label: 'Word', value: 'application/msword' }
      ],
      users: [
        { label: 'User 1', value: 'user1' },
        { label: 'User 2', value: 'user2' }
      ],
      collections: [
        { label: 'Collection 1', value: 'col1' },
        { label: 'Collection 2', value: 'col2' }
      ],
      tags: [
        { label: 'Tag 1', value: 'tag1' },
        { label: 'Tag 2', value: 'tag2' }
      ],
      groupList: [
        { label: 'Group 1', value: 'group1' },
        { label: 'Group 2', value: 'group2' }
      ],
      sizes: [
        { label: 'Small', value: 'small' },
        { label: 'Large', value: 'large' }
      ]
    }

    wrapper = mount(SearchGroupBarFilterForm, {
      props: {
        form,
        id: 'test-id'
      },
      global: {
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        },
        provide: {
          searchOptions: { value: searchOptions }
        },
        components: {
          SearchGroupBarFilterMetaform: mockSearchGroupBarFilterMetaform,
          ElForm: mockElForm,
          ElFormItem: mockElFormItem,
          ElSelectV2: mockElSelectV2,
          ElInput: mockElInput,
          ElSwitch: mockElSwitch,
          ElDatePicker: mockElDatePicker,
          ElCascader: mockElCascader
        }
      }
    })

    await new Promise(resolve => setTimeout(resolve, 100))
    
    wrapper.vm.metaForm = {
      setValue: setValueSpy
    }
  })

  it('should handle query type change correctly', () => {
    wrapper.vm.handleChangeQueryType('documentTypes')
    
    expect(wrapper.vm.state.form.queryType).toBe('documentTypes')
  })

  it('should handle input change correctly', () => {
    wrapper.vm.handleChange()
    
    expect(wrapper.emitted('formChange')).toBeTruthy()
  })

  it('should handle keyword change correctly', () => {
    wrapper.vm.state.form.keyword = 'test keyword'
    wrapper.vm.handleChangeKeyword()
    
    expect(wrapper.emitted('formChange')).toBeTruthy()
  })

  it('should handle metadata change correctly', async () => {
    await wrapper.setProps({
      form: {
        queryType: 'metadata'
      }
    })
    await wrapper.vm.handleMetaChange('title')
    
    expect(wrapper.vm.state.metadataType).toBeDefined()
  })

  it('should handle metadata value change correctly', () => {
    wrapper.vm.handleMetaValueChange('test value')
    
    expect(wrapper.vm.state.form.metadataValue).toBe('test value')
    expect(wrapper.emitted('formChange')).toBeTruthy()
  })

  it('should handle path change correctly', () => {
    wrapper.vm.handleChange('path')
    
    expect(wrapper.emitted('formChange')).toBeTruthy()
  })

  it('should get form data correctly', () => {
    const result = wrapper.vm.getFormData()
    
    expect(result).toEqual({
      id: 'test-form',
      queryType: 'keyword',
      keyword: 'test',
      synonyms: false,
      includeLanguages: []
    })
  })

  it('should expose correct methods', () => {
    expect(wrapper.vm.getFormData).toBeDefined()
  })

  it('should handle path echo correctly', async () => {
    const q = {
      value: '/path/to/document'
    }
    
    await wrapper.vm.handlePath(q.value)
    
    expect(wrapper.vm.state._path).toEqual(['/path/', '/path/to/', '/path/to/document/'])
  })

  it('should handle select clear correctly', () => {
    wrapper.vm.$emit('selectClear')
    
    expect(wrapper.emitted('selectClear')).toBeTruthy()
  })


  it('should handle form prop changes correctly', async () => {
    const newForm = {
      queryType: 'documentTypes',
      documentTypes: ['pdf', 'doc']
    }
    
    await wrapper.setProps({ form: newForm })
    
    expect(wrapper.vm.state.form.queryType).toBe('documentTypes')
    expect(wrapper.vm.state.form.documentTypes).toEqual(['pdf', 'doc'])
  })

  it('should handle path form prop changes correctly', async () => {
    const newForm = {
      queryType: 'path',
      value: '/path/to/document'
    }
    
    await wrapper.setProps({ form: newForm })
    
    expect(wrapper.vm.state.form.queryType).toBe('path')
  })
})
