import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { SearchGroupBarFilter } from '#components'
import { globalApi } from './mock/api'

// Mock child components
const mockSearchGroupBarFilterCondition = {
  template: '<div>SearchGroupBarFilterCondition</div>',
  methods: {
    getData: vi.fn().mockResolvedValue([
      {
        queryType: 'keyword',
        value: 'test',
        option: {
          matchCase: false,
          fullMatch: false,
          synonyms: false,
          includeLanguages: []
        }
      }
    ])
  }
}

const mockElDivider = {
  template: '<div class="el-divider"></div>'
}

const mockElDropdown = {
  template: '<div class="el-dropdown"><slot /><slot name="dropdown" /></div>',
  props: ['class', 'size', 'split-button'],
  emits: ['click', 'command']
}

const mockElDropdownMenu = {
  template: '<div class="el-dropdown-menu"><slot /></div>'
}

const mockElDropdownItem = {
  template: '<div class="el-dropdown-item"></div>',
  props: ['command']
}

// Mock utility functions
vi.mock('~/utils/searchFormHelper', () => ({
  getUniqueId: vi.fn((prefix: string) => `${prefix}-${Date.now()}`)
}))

vi.mock('~/utils/formOptions', () => ({
  conditionType: [
    { label: 'Keyword', value: 'keyword' },
    { label: 'Document Types', value: 'documentTypes' }
  ],
  getMetadataOptions: vi.fn().mockResolvedValue([
    { label: 'Title', value: 'title' },
    { label: 'Description', value: 'description' }
  ]),
  languages: [
    { label: 'English', value: 'en' },
    { label: 'Chinese', value: 'zh' }
  ],
  mimeTypes: [
    { label: 'PDF', value: 'application/pdf' },
    { label: 'Word', value: 'application/msword' }
  ],
  getGroupList: vi.fn().mockResolvedValue([
    { label: 'Group 1', value: 'group1' },
    { label: 'Group 2', value: 'group2' }
  ]),
  sizes: [
    { label: 'Small', value: 'small' },
    { label: 'Large', value: 'large' }
  ],
  sortListWithI18n: vi.fn((list: any[]) => list)
}))

describe('[dp-search]SearchGroupBarFilter', () => {
  let wrapper: any
  let getDataSpy: any

  beforeEach(async () => {
    vi.clearAllMocks()
    
    getDataSpy = vi.fn().mockResolvedValue([
      {
        queryType: 'keyword',
        value: 'test',
        option: {
          matchCase: false,
          fullMatch: false,
          synonyms: false,
          includeLanguages: []
        }
      }
    ])

    // Mock API responses
    globalApi.api.getTypesActive = vi.fn().mockResolvedValue({
      data: [
        { name: 'PDF' },
        { name: 'DOC' }
      ]
    })
    globalApi.api.postNuxeoIdentityGetkeycloakallusers = vi.fn().mockResolvedValue({
      data: [
        { username: 'User 1', userId: 'user1' },
        { username: 'User 2', userId: 'user2' }
      ]
    })
    globalApi.api.getNuxeoCollection = vi.fn().mockResolvedValue({
      data: {
        entryList: [
          { id: 'col1', name: 'Collection 1', createdBy: 'user1' },
          { id: 'col2', name: 'Collection 2', createdBy: 'user2' }
        ]
      }
    })
    globalApi.api.postNuxeoTagsGetalltags = vi.fn().mockResolvedValue({
      data: ['Tag 1', 'Tag 2']
    })

    wrapper = mount(SearchGroupBarFilter, {
      props: {
        id: 'test-id'
      },
      global: {
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        },
        components: {
          SearchGroupBarFilterCondition: mockSearchGroupBarFilterCondition,
          ElDivider: mockElDivider,
          ElDropdown: mockElDropdown,
          ElDropdownMenu: mockElDropdownMenu,
          ElDropdownItem: mockElDropdownItem
        }
      }
    })

    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Mock BarFilterRef
    wrapper.vm.BarFilterRef = {
      'query-1': {
        getData: getDataSpy
      }
    }
  })

  it('should render correctly', () => {
    expect(wrapper.find('.el-dropdown').exists()).toBe(true)
  })

  it('should handle add filter correctly', () => {
    const initialLength = wrapper.vm.filters.query.length
    
    wrapper.vm.handleAddFilter()
    
    expect(wrapper.vm.filters.query.length).toBe(initialLength + 1)
    expect(wrapper.vm.filters.query[initialLength].condition).toBe('and')
    expect(wrapper.vm.filters.query[initialLength].matchs).toHaveLength(1)
  })

  it('should handle add query filter correctly', () => {
    const qItem = {
      id: 'test-query',
      matchs: []
    }
    
    wrapper.vm.handleAddQueryFilter(qItem)
    
    expect(qItem.matchs).toHaveLength(1)
    expect(qItem.matchs[0].queryType).toBe('keyword')
  })

  it('should handle delete filter correctly', () => {
    const filters = [
      { id: 'filter-1' },
      { id: 'filter-2' }
    ]
    
    wrapper.vm.handleDeleteFilter('filter-1', filters)
    
    expect(filters).toHaveLength(1)
    expect(filters[0].id).toBe('filter-2')
    expect(wrapper.emitted('search')).toBeTruthy()
  })

  it('should handle command correctly', () => {
    const item = { condition: 'and' }
    
    wrapper.vm.handleCommand('or', item)
    
    expect(item.condition).toBe('or')
    expect(wrapper.emitted('search')).toBeTruthy()
  })

  it('should handle update correctly', () => {
    const item = {
      matchs: [
        { id: 'match-1' },
        { id: 'match-2' }
      ]
    }
    const data = [
      { queryType: 'keyword', value: 'test1' },
      { queryType: 'documentTypes', value: ['pdf'] }
    ]
    
    wrapper.vm.handleUpdate(data, item)
    
    expect(item.matchs[0].id).toBe('match-1')
    expect(item.matchs[1].id).toBe('match-2')
    expect(item.matchs[0].queryType).toBe('keyword')
    expect(item.matchs[1].queryType).toBe('documentTypes')
  })

  it('should get filters data correctly', async () => {
    const item = {
      id: 'query-1',
      condition: 'and'
    }
    
    const result = await wrapper.vm.getFiltersData(item)
    
    expect(getDataSpy).toHaveBeenCalled()
    expect(result).toEqual({
      condition: 'and',
      matchs: [
        {
          queryType: 'keyword',
          value: 'test',
          option: {
            matchCase: false,
            fullMatch: false,
            synonyms: false,
            includeLanguages: []
          }
        }
      ]
    })
  })

  it('should initialize form correctly', () => {
    const query = {
      condition: 'or',
      docId: 'test-doc',
      query: [
        {
          id: 'query-1',
          condition: 'and',
          matchs: []
        }
      ]
    }
    
    wrapper.vm.initForm(query)
    
    expect(wrapper.vm.filters.condition).toBe('or')
    expect(wrapper.vm.filters.docId).toBe('test-doc')
    expect(wrapper.vm.filters.query).toHaveLength(1)
  })

  it('should clear filters correctly', () => {
    wrapper.vm.filters.query = [
      { id: 'query-1' },
      { id: 'query-2' }
    ]
    
    wrapper.vm.clear()
    
    expect(wrapper.vm.filters.query).toHaveLength(1)
  })

  it('should expose correct methods', () => {
    expect(wrapper.vm.getData).toBeDefined()
    expect(wrapper.vm.initForm).toBeDefined()
    expect(wrapper.vm.clear).toBeDefined()
  })

  it('should get options correctly', async () => {
    await wrapper.vm.getOptions()
    
    expect(globalApi.api.getTypesActive).toHaveBeenCalled()
    expect(globalApi.api.postNuxeoIdentityGetkeycloakallusers).toHaveBeenCalled()
    expect(globalApi.api.getNuxeoCollection).toHaveBeenCalled()
    expect(globalApi.api.postNuxeoTagsGetalltags).toHaveBeenCalled()
    
  })

  it('should handle search params from session storage', () => {
    const searchParams = {
      condition: 'or',
      docId: 'test-doc',
      query: []
    }
    
    // Mock sessionStorage
    Object.defineProperty(window, 'sessionStorage', {
      value: {
        getItem: vi.fn().mockReturnValue(JSON.stringify(searchParams)),
        setItem: vi.fn()
      },
      writable: true
    })
    
    wrapper.vm.getSearchParams()
    
    expect(wrapper.vm.filters.condition).toBe('or')
    expect(wrapper.vm.filters.docId).toBe('test-doc')
  })

  it('should handle empty search params', () => {
    // Mock sessionStorage
    Object.defineProperty(window, 'sessionStorage', {
      value: {
        getItem: vi.fn().mockReturnValue(null),
        setItem: vi.fn()
      },
      writable: true
    })
    
    wrapper.vm.filters.query = []
    wrapper.vm.getSearchParams()
    
    expect(wrapper.vm.filters.query).toHaveLength(1)
  })

  it('should handle multiple filters in getData', async () => {
    wrapper.vm.filters.query = [
      {
        id: 'query-1',
        condition: 'and'
      },
      {
        id: 'query-2',
        condition: 'or'
      }
    ]
    
    wrapper.vm.BarFilterRef = {
      'query-1': {
        getData: vi.fn().mockResolvedValue([
          { queryType: 'keyword', value: 'test1' }
        ])
      },
      'query-2': {
        getData: vi.fn().mockResolvedValue([
          { queryType: 'documentTypes', value: ['pdf'] }
        ])
      }
    }
    
    const result = await wrapper.vm.getData()
    
    expect(result.query).toHaveLength(2)
    expect(result.query[0].condition).toBe('and')
    expect(result.query[1].condition).toBe('or')
  })

  it('should handle loading state correctly', () => {
    expect(wrapper.vm.state.loading).toBe(false)
    
    wrapper.vm.state.loading = true
    
    expect(wrapper.vm.state.loading).toBe(true)
  })

  it('should not render divider for single filter', () => {
    wrapper.vm.filters.query = [{ id: 'query-1' }]
    wrapper.vm.$nextTick()
    
    const dividers = wrapper.findAll('.el-divider')
    expect(dividers).toHaveLength(0)
  })


  it('should initialize with default filter on mount', async () => {
    // Mock sessionStorage to return null
    Object.defineProperty(window, 'sessionStorage', {
      value: {
        getItem: vi.fn().mockReturnValue(null),
        setItem: vi.fn()
      },
      writable: true
    })
    
    const newWrapper = mount(SearchGroupBarFilter, {
      props: { id: 'test-id' },
      global: {
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        },
        components: {
          SearchGroupBarFilterCondition: mockSearchGroupBarFilterCondition,
          ElDivider: mockElDivider,
          ElDropdown: mockElDropdown,
          ElDropdownMenu: mockElDropdownMenu,
          ElDropdownItem: mockElDropdownItem
        }
      }
    })
    
    await new Promise(resolve => setTimeout(resolve, 100))
    
    expect(newWrapper.vm.filters.query).toHaveLength(1)
  })
})
