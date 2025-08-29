import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { SearchGroup } from '#components'
import { mockRouterProvider } from './util'
import { globalApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
const mockSearchGroupBar = {
  template: '<div>SearchGroupBar</div>',
  methods: {
    setQuery: vi.fn()
  }
}
const mockSearchGroupTable = {
  template: '<div>SearchGroupTable</div>',
  methods: {
    initBar: vi.fn(),
    initSearch: vi.fn(),
    initAgg: vi.fn()
  }
}
const FormRenderer = {
  template: '<div class="FormRenderer">FormRenderer</div>',
  methods: {
    setFormJson: vi.fn(),
    setFormData: vi.fn()
  }
}
const VFormRender = {
  template: '<div class="VFormRender">VFormRender</div>',
  methods: {}
}
// Define MenuRouterKey since it's stubbed globally
const MenuRouterKey = 'MenuRouterKey'
describe('[dp-search]SearchGroup', () => {
  let wrapper: any

  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(SearchGroup, {
      global: {
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        },
        provide: {
          [MenuRouterKey]: mockRouterProvider
        },
        components: {
          SearchGroupBar: mockSearchGroupBar,
          SearchGroupTable: mockSearchGroupTable,
          FormRenderer,
          VFormRender,
          VxeGrid
        }
      },
      props: {
        tableId: 'test-table-id',
        searchParams: {
          docId: 'test-doc-id',
          query: ['test query']
        }
      }
    })
  })

  it('should render the component correctly', () => {
    console.log('wrapper', wrapper.html())
    expect(wrapper.find('.search-container').exists()).toBe(true)
  })

  it('should handle search event correctly', async () => {
    const searchParams = { docId: 'test-doc', query: ['test'] }
    await wrapper.vm.handleSearch(searchParams)

    expect(wrapper.vm.searchState).toBe('firstSearch')
  })

  it('should handle search log event correctly', async () => {
    const searchParams = { docId: 'test-doc', query: ['test'] }
    await wrapper.vm.handleSearchLog(searchParams)

    expect(wrapper.vm.searchState).toBe('firstSearch')
  })

  it('should handle aggregation search event correctly', async () => {
    const aggParams = { filter: { field: 'test' } }
    await wrapper.vm.handleAggSearch(aggParams)
  })

  it('should handle update aggregation correctly', async () => {
    wrapper.vm.BarRef = {
      aggRef: {
        setDefaultFilter: vi.fn()
      }
    }
    const aggregation = { field: 'test' }
    const aggParams = { filter: { field: 'test' } }

    await wrapper.vm.handleUpdateAgg(aggregation, aggParams)

    expect(wrapper.vm.state.aggregation).toEqual(aggregation)
  })

})
