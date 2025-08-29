import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { SearchGroupBarRecentSearch } from '#components'

const mockSearchGroupBarRecentSearchList = {
  template: '<div>SearchGroupBarRecentSearchList</div>',
  methods: {
    initList: vi.fn()
  }
}

const SvgIcon = {
  template: '<div class="svg-icon"></div>'
}

describe('[dp-search]SearchGroupBarRecentSearch', () => {
  let wrapper: any

  beforeEach(async () => {
    vi.clearAllMocks()
    wrapper = mount(SearchGroupBarRecentSearch, {
      global: {
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        },
        components: {
          SearchGroupBarRecentSearchList: mockSearchGroupBarRecentSearchList,
          SvgIcon
        }
      }
    })
    await new Promise(resolve => setTimeout(resolve, 100))
    wrapper.vm.popoverRef = {
      hide: vi.fn()
    }
    wrapper.vm.listRef = {
      initList: vi.fn()
    }
  })

  it('should render the component correctly', () => {
    expect(wrapper.find('#Search__Recent').exists()).toBe(true)
  })

  it('should handle search correctly', async () => {
    const searchData = {  }

    const agg = {type:[{key:'pdf',value:'pdf',count:10}]}
    
    await wrapper.vm.handleSearch(searchData)
    
    expect(wrapper.vm.popoverRef.hide).toHaveBeenCalled()
  })

  it('should hide popover correctly', () => {
    
    wrapper.vm.hidePopover()
    
    expect(wrapper.vm.popoverRef.hide).toHaveBeenCalled()
  })

  it('should initialize list correctly', () => {
    wrapper.vm.initList()
    
    expect(wrapper.vm.listRef.initList).toHaveBeenCalled()
  })

  it('should expose correct methods', () => {
    expect(wrapper.vm.initList).toBeDefined()
  })

})
