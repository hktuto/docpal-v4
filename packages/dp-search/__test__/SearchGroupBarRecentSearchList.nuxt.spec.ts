import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { SearchGroupBarRecentSearchList } from '#components'
import { globalApi,clientApi } from './mock/api'

// Mock mime-types module
vi.mock('mime-types', () => ({
  extension: vi.fn((type) => {
    if (type === 'application/pdf') return 'pdf'
    if (type === 'text/plain') return 'txt'
    return type
  })
}))

// Mock conditionDecorators
vi.mock('~/utils/searchFormHelper', () => ({
  conditionDecorators: vi.fn()
}))

describe('[dp-search]SearchGroupBarRecentSearchList', () => {
  let wrapper: any

  beforeEach(() => {
    vi.clearAllMocks()
    globalApi.api.postLogsRecentSearchPageV2 = vi.fn().mockResolvedValue({
      data: {
        entryList: [
          {
            searchRequest: {
              query: [
                {
                  matchs: [
                    { queryType: 'mimeTypes', value: 'application/pdf' },
                    { queryType: 'text', value: 'test' }
                  ],
                  condition: 'AND'
                }
              ],
              condition: 'OR'
            },
            totalSize: 10
          }
        ],
        totalSize: 1
      }
    })

    wrapper = mount(SearchGroupBarRecentSearchList, {
      global: {
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        }
      }
    })
  })
  afterEach(() => {
    vi.clearAllMocks()
  })
  it('should render the component correctly', () => {
    expect(wrapper.find('.list').exists()).toBe(true)
    expect(wrapper.find('.list-scroll').exists()).toBe(true)
  })

  it('should handle search correctly', async () => {
    const searchItem = {
      searchRequest: {
        query: [
          {
            matchs: [
              { queryType: 'text', value: 'test' }
            ],
            condition: 'AND'
          }
        ],
        condition: 'OR'
      }
    }

    await wrapper.vm.handleSearch(searchItem)

    expect(wrapper.emitted('search')).toBeTruthy()
  })

  it('should display mime types correctly', () => {
    const result = wrapper.vm.displayValueMap('mimeTypes', 'application/pdf')
    expect(result).toBe('pdf')
  })

  it('should display array mime types correctly', () => {
    const result = wrapper.vm.displayValueMap('mimeTypes', ['application/pdf', 'text/plain'])
    expect(result).toBe('pdf, txt')
  })

  it('should handle wildcard mime types correctly', () => {
    const result = wrapper.vm.displayValueMap('mimeTypes', 'application/*')
    expect(result).toBe('application/')
  })

  it('should return original value for non-mime types', () => {
    const result = wrapper.vm.displayValueMap('text', 'test value')
    expect(result).toBe('test value')
  })

  it('should get list correctly', async () => {
    console.log('getListcorrectly================');
    clientApi.api.postLogsRecentSearchPageV2.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          entryList: [
            { searchRequest: { query: [{ matchs: [{ queryType: 'text', value: 'test' }], condition: 'AND' }], condition: 'OR' } }
          ],
          totalSize: 1
        }
      })
    })
    await wrapper.vm.getList()
    expect(clientApi.api.postLogsRecentSearchPageV2).toHaveBeenCalled()
    expect(wrapper.vm.state.list).toHaveLength(1)
    expect(wrapper.vm.state.scrollNoMore).toBe(true)
  })

  it('should handle getList error correctly', async () => {
    globalApi.api.postLogsRecentSearchPageV2 = vi.fn().mockRejectedValue(new Error('API Error'))
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    await wrapper.vm.getList()

    expect(consoleSpy).toHaveBeenCalledWith('get recent error', expect.any(Error))
    expect(wrapper.vm.state.loading).toBe(false)

    consoleSpy.mockRestore()
  })

  it('should not call API when already loading', async () => {
    clientApi.api.postLogsRecentSearchPageV2 = vi.fn().mockResolvedValue({
      data: {
        entryList: [],
        totalSize: 0
      }
    })
    wrapper.vm.state.loading = true
    await wrapper.vm.getList()
    expect(clientApi.api.postLogsRecentSearchPageV2).not.toHaveBeenCalled()
  })

  it('should initialize list correctly', async () => {
    await wrapper.vm.initList()

    expect(wrapper.vm.state.list).toEqual([])
    expect(wrapper.vm.pageParams.pageNum).toBe(0)
    expect(clientApi.api.postLogsRecentSearchPageV2).toHaveBeenCalled()
  })

  it('should handle infinite scroll correctly', async () => {
    wrapper.vm.state.scrollNoMore = false
    wrapper.vm.state.loading = false

    await wrapper.vm.getList()

    expect(wrapper.vm.pageParams.pageNum).toBe(1)
  })

  it('should expose correct methods', () => {
    expect(wrapper.vm.initList).toBeDefined()
  })

  it('should handle no more data state correctly', async () => {
    wrapper.vm.state.scrollNoMore = true

    expect(wrapper.text()).toContain('dpTip.noMore')
  })
})
