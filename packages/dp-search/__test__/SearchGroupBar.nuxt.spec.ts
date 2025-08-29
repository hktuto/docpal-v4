import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { SearchGroupBar } from '#components'
import { mockRouterProvider } from './util'
import { globalApi,clientApi } from './mock/api'

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
    clear: vi.fn(),
    setDefaultFilter: vi.fn()
  }
}

const mockSearchGroupBarRecord = {
  template: '<div>SearchGroupBarRecord</div>',
  methods: {
    getList: vi.fn()
  }
}

const mockSearchGroupBarRecordDetail = {
  template: '<div>SearchGroupBarRecordDetail</div>',
  methods: {
    init: vi.fn()
  }
}

const mockSearchGroupBarRecentSearch = {
  template: '<div>SearchGroupBarRecentSearch</div>',
  methods: {}
}

const SvgIcon = {
  template: '<div class="svg-icon"></div>'
}

describe('[dp-search]SearchGroupBar', () => {
  let wrapper: any

  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(SearchGroupBar, {
      global: {
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        },
        provide: {
          MenuRouterKey: mockRouterProvider
        },
        components: {
          SearchGroupBarFilter: mockSearchGroupBarFilter,
          SearchGroupBarAggregation: mockSearchGroupBarAggregation,
          SearchGroupBarRecord: mockSearchGroupBarRecord,
          SearchGroupBarRecordDetail: mockSearchGroupBarRecordDetail,
          SearchGroupBarRecentSearch: mockSearchGroupBarRecentSearch,
          SvgIcon
        }
      },
      props: {
        aggregation: {
          type: [{ key: 'pdf', value: 'PDF', count: 10 }]
        }
      }
    })
  })

  it('should render the component correctly', () => {
    expect(wrapper.find('.search-group-bar').exists()).toBe(true)
    expect(wrapper.text()).toContain('file_search')
  })

  it('should handle mode change correctly', async () => {
    const filterIcon = wrapper.find('#Search__Filter')
    await filterIcon.trigger('click')
    
    expect(wrapper.vm.mode).toBe('agg')
  })

  it('should handle search correctly', async () => {
    wrapper.vm.isHistory = false
    wrapper.vm.filterRef = {
      getData: vi.fn().mockResolvedValue({ docId: 'test-doc', query: ['test'] })
    }
    wrapper.vm.aggRef = {
      clear: vi.fn()
    }
    await wrapper.vm.handleSearch()
    
    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.vm.aggRef.clear).toHaveBeenCalled()
  })

  it('should not emit search when no conditions', async () => {
    wrapper.vm.filterRef.getData = vi.fn().mockResolvedValue({ docId: '', query: [] })
    
    await wrapper.vm.handleSearch()
    
    expect(wrapper.emitted('search')).toBeFalsy()
  })

  it('should handle aggregation search correctly', async () => {
    const aggData = { filter: { type: ['pdf'] } }
    await wrapper.vm.handleAgg(aggData)
    
    expect(wrapper.emitted('aggSearch')).toBeTruthy()
    expect(wrapper.emitted('aggSearch')[0]).toEqual([aggData])
  })

  it('should handle log search correctly', async () => {
    const query = { docId: 'test-doc', query: ['test'] }
    wrapper.vm.aggRef = {
      clear: vi.fn()
    }
    wrapper.vm.filterRef = {
      initForm: vi.fn()
    }
    await wrapper.vm.handleLogSearch(query)
    
    expect(wrapper.vm.isHistory).toBe(true)
    expect(wrapper.vm.aggRef.clear).toHaveBeenCalled()
    expect(wrapper.vm.filterRef.initForm).toHaveBeenCalledWith(query)
    expect(wrapper.emitted('searchLog')).toBeTruthy()
  })

  it('should handle save correctly', async () => {
    const saveData = { label: 'Test Save', includeFilter: true }
    wrapper.vm.aggRef.getData = vi.fn().mockResolvedValue({ type: ['pdf'] })
    clientApi.api.postNuxeoSearchSaveNestedSearchLog = vi.fn().mockResolvedValue({})
    wrapper.vm.filterRef = {
      getData: vi.fn().mockResolvedValue({ docId: 'test-doc', query: ['test'] })
    }
    wrapper.vm.recordRef = {
      getList: vi.fn()
    }
    await wrapper.vm.handleSave(saveData)
    
    expect(clientApi.api.postNuxeoSearchSaveNestedSearchLog).toHaveBeenCalled()
    expect(wrapper.vm.recordRef.getList).toHaveBeenCalled()
  })

  it('should show warning when no conditions for save', async () => {
    wrapper.vm.filterRef.getData = vi.fn().mockResolvedValue({ docId: '', query: [] })
    const saveData = { label: 'Test Save', includeFilter: false }
    
    await wrapper.vm.handleSave(saveData)
    
    expect(clientApi.api.postNuxeoSearchSaveNestedSearchLog).not.toHaveBeenCalled()
  })

  it('should handle edit record correctly', async () => {
    const record = {
      id: 1,
      label: 'Test Record',
      query: { docId: 'test-doc', query: ['test'] }
    }
    wrapper.vm.recordRef = {
      getList: vi.fn()
    }
    wrapper.vm.recordDetailRef = {
      init: vi.fn()
    }
    wrapper.vm.recordDetailData = {
      id: 1,
      label: 'Test Record',
      query: { docId: 'test-doc', query: ['test'] }
    }
    wrapper.vm.aggRef = {
      clear: vi.fn()
    }
    wrapper.vm.filterRef = {
      initForm: vi.fn()
    }
    await wrapper.vm.handleEditRecord(record)
    
    expect(wrapper.vm.mode).toBe('recordDetail')
    expect(wrapper.vm.recordDetailData).toEqual(record)
  })

  it('should update save record correctly', async () => {
    wrapper.vm.recordRef = {
      getList: vi.fn()
    }
    await wrapper.vm.updateSaveRecord()
    
    expect(wrapper.vm.recordRef.getList).toHaveBeenCalled()
  })

  it('should set query correctly', async () => {
    const query = { docId: 'test-doc', query: ['test'] }
    wrapper.vm.filterRef = {
      initForm: vi.fn()
    }
    wrapper.vm.setQuery(query)
    
    expect(wrapper.vm.filterRef.initForm).toHaveBeenCalledWith(query)
  })

  it('should handle mode change with record mode correctly', async () => {
    wrapper.vm.mode = 'record'
    
    await wrapper.vm.handleMode('agg')
    
    expect(wrapper.vm.mode).toBe('filter')
  })

  it('should expose correct methods', () => {
    expect(wrapper.vm.setQuery).toBeDefined()
    expect(wrapper.vm.aggRef).toBeDefined()
  })

  it('should initialize with filter mode on mount', () => {
    expect(wrapper.vm.mode).toBe('filter')
  })
})
