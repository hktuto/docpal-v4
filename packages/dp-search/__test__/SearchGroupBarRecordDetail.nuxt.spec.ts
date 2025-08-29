import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { SearchGroupBarRecordDetail } from '#components'
import { globalApi, clientApi } from './mock/api'

const mockSearchGroupBarFilter = {
  template: '<div>SearchGroupBarFilter</div>',
  methods: {
    getData: vi.fn().mockResolvedValue({ docId: 'test-doc', query: ['test'] }),
    initForm: vi.fn()
  }
}

const mockSearchGroupBarAggregation = {
  template: '<div>SearchGroupBarAggregation</div>',
  methods: {
    setDefaultFilter: vi.fn()
  }
}

const SvgIcon = {
  template: '<div class="svg-icon"></div>'
}

describe('[dp-search]SearchGroupBarRecordDetail', () => {
  let wrapper: any
  let initFormSpy: any
  let setDefaultFilterSpy: any

  beforeEach(async () => {
    vi.clearAllMocks()
    globalApi.api.postNuxeoSearchSaveNestedSearchLog = vi.fn().mockResolvedValue({})
    
    initFormSpy = vi.fn()
    setDefaultFilterSpy = vi.fn()
    
    wrapper = mount(SearchGroupBarRecordDetail, {
      global: {
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        },
        components: {
          SearchGroupBarFilter: mockSearchGroupBarFilter,
          SearchGroupBarAggregation: mockSearchGroupBarAggregation,
          SvgIcon
        }
      },
      props: {
        query: { docId: 'test-doc', query: ['test'] },
        aggregation: {
          type: [{ key: 'pdf', value: 'PDF', count: 10 }]
        }
      }
    })
    await new Promise(resolve => setTimeout(resolve, 100))
    wrapper.vm.filterRef = {
      initForm: initFormSpy,
      getData: vi.fn().mockResolvedValue({ docId: 'test-doc', query: ['test'] })
    }
    wrapper.vm.aggRef = {
      setDefaultFilter: setDefaultFilterSpy
    }
  })

  it('should render the component correctly', () => {
    expect(wrapper.find('.search-bar-detail').exists()).toBe(true)
    expect(wrapper.text()).toContain('dpSearch.recordDetailTitle')
  })

  it('should handle mode change correctly', async () => {
    const filterIcon = wrapper.find('.svg-icon')
    await filterIcon.trigger('click')
    
    expect(wrapper.vm.mode).toBe('recordDetailAgg')
  })

  it('should initialize correctly', async () => {
    const record = {
      id: 1,
      label: 'Test Record',
      query: { docId: 'test-doc', query: ['test'] }
    }
    
    await wrapper.vm.init(record)
    expect(wrapper.vm.recordData.id).toBe(1)
    expect(wrapper.vm.recordData.label).toBe('Test Record')
    expect(initFormSpy).toHaveBeenCalledWith(record.query)
    expect(setDefaultFilterSpy).toHaveBeenCalledWith({})
  })

  it('should set default filter when query has filter', async () => {
    const record = {
      id: 1,
      label: 'Test Record',
      query: { 
        docId: 'test-doc', 
        query: ['test'],
        filter: { type: ['pdf'] }
      }
    }
    
    await wrapper.vm.init(record)
    
    expect(setDefaultFilterSpy).toHaveBeenCalledWith({ type: ['pdf'] })
  })

  it('should set empty default filter when query has no filter', async () => {
    const record = {
      id: 1,
      label: 'Test Record',
      query: { docId: 'test-doc', query: ['test'] }
    }
    
    await wrapper.vm.init(record)
    
    expect(setDefaultFilterSpy).toHaveBeenCalledWith({})
  })

  it('should handle save correctly', async () => {
    wrapper.vm.aggRef.getData = vi.fn().mockResolvedValue({ type: ['pdf'] })
    wrapper.vm.recordData.id = 1
    wrapper.vm.recordData.label = 'Test Label'
    
    await wrapper.vm.handleSave()
    
    expect(clientApi.api.postNuxeoSearchSaveNestedSearchLog).toHaveBeenCalled()
  })

  it('should show warning when no conditions for save', async () => {
    wrapper.vm.filterRef.getData = vi.fn().mockResolvedValue({ docId: '', query: [] })
    
    await wrapper.vm.handleSave()
    
    expect(globalApi.api.postNuxeoSearchSaveNestedSearchLog).not.toHaveBeenCalled()
  })

  it('should handle save with no aggregation data', async () => {
    wrapper.vm.aggRef.getData = vi.fn().mockResolvedValue({})
    
    await wrapper.vm.handleSave()
    
    expect(clientApi.api.postNuxeoSearchSaveNestedSearchLog).toHaveBeenCalled()
  })
  it('should expose correct methods', () => {
    expect(wrapper.vm.filterRef).toBeDefined()
    expect(wrapper.vm.init).toBeDefined()
  })

  it('should render cancel and submit buttons correctly', () => {
    expect(wrapper.find('#Search__Save__Edit__Cancel').exists()).toBe(true)
    expect(wrapper.find('#Search__Save__Edit__Submit').exists()).toBe(true)
    expect(wrapper.text()).toContain('cancelText')
    expect(wrapper.text()).toContain('common_submit')
  })

})
