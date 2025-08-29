import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { SearchGroupTable } from '#components'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'
import { globalApi } from './mock/api'

// Mock components
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

describe('[dp-search]SearchGroupTable', () => {
  let wrapper: any

  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(SearchGroupTable, {
      global: {
        components: { 
          VxeGrid,
          FormRenderer,
          VFormRender
        },
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        },
        provide: {
          [MenuRouterKey]: mockRouterProvider
        }
      },
      props: {
        tableId: 'test-table-id',
        showCheckbox: true
      }
    })
  })

  it('should render the component correctly', () => {
    expect(wrapper.findComponent(VxeGrid).exists()).toBe(true)
    expect(wrapper.find('.tableContainer').exists()).toBe(true)
  })

  it('should initialize with props correctly', () => {
    expect(wrapper.vm.tableId).toBe('test-table-id')
    expect(wrapper.vm.showCheckbox).toBe(true)
  })

  it('should initialize bar parameters correctly', async () => {
    const barParams = { docId: 'test-doc', query: ['test query'] }
    
    await wrapper.vm.initBar(barParams)
    
    expect(wrapper.vm.state.barParams).toEqual(barParams)
  })

  it('should initialize search parameters correctly', async () => {
    const searchParams = { docId: 'test-doc', query: ['test query'] }
    
    await wrapper.vm.initSearch(searchParams)
    
    expect(wrapper.vm.state.barParams).toEqual(searchParams)
  })

  it('should initialize aggregation correctly', async () => {
    const aggParams = { filter: { field: 'test' } }
    
    await wrapper.vm.initAgg(aggParams)
    
    expect(wrapper.vm.state.aggParams).toEqual(aggParams)
  })

})
