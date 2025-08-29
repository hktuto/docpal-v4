import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { SearchGroupBarAggregation } from '#components'

describe('[dp-search]SearchGroupBarAggregation', () => {
  let wrapper: any

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the component correctly', () => {
    const aggregation = {
      type: [
        { key: 'pdf', value: 'PDF', count: 10 },
        { key: 'doc', value: 'DOC', count: 5 }
      ],
      modified: [
        { key: 'today', value: 'today', count: 3 },
        { key: 'yesterday', value: 'yesterday', count: 2 }
      ]
    }

    wrapper = mount(SearchGroupBarAggregation, {
      global: {
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        }
      },
      props: {
        aggregation
      }
    })

    expect(wrapper.find('.check-list').exists()).toBe(true)
    expect(wrapper.text()).toContain('searchGroup.type')
    expect(wrapper.text()).toContain('searchGroup.modified')
  })

  it('should clear filters correctly', async () => {
    const aggregation = {
      type: [
        { key: 'pdf', value: 'PDF', count: 10 }
      ]
    }

    wrapper = mount(SearchGroupBarAggregation, {
      global: {
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        }
      },
      props: {
        aggregation
      }
    })

    await wrapper.vm.clear()
    expect(wrapper.vm.state.filters).toEqual({})
  })

  it('should get data correctly', async () => {
    const aggregation = {
      type: [
        { key: 'pdf', value: 'PDF', count: 10 },
        { key: 'doc', value: 'DOC', count: 5 }
      ],
      modified: [
        { key: 'today', value: 'today', count: 3 }
      ]
    }

    wrapper = mount(SearchGroupBarAggregation, {
      global: {
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        }
      },
      props: {
        aggregation
      }
    })

    // Set some filters
    wrapper.vm.state.filters = {
      type: ['pdf', 'doc'],
      modified: ['today']
    }

    const data = wrapper.vm.getData()
    expect(data).toEqual({
      type: ['pdf', 'doc'],
      modified: 'today'
    })
  })

  it('should set default filter correctly', async () => {
    const aggregation = {
      type: [
        { key: 'pdf', value: 'PDF', count: 10 }
      ]
    }

    wrapper = mount(SearchGroupBarAggregation, {
      global: {
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        }
      },
      props: {
        aggregation
      }
    })

    const defaultFilter = { type: ['pdf'] }
    wrapper.vm.setDefaultFilter(defaultFilter)
    expect(wrapper.vm.state.defaultFilter).toEqual(defaultFilter)
  })

  it('should handle single aggregation correctly', async () => {
    const aggregation = {
      modified: [
        { key: 'today', value: 'today', count: 3 },
        { key: 'yesterday', value: 'yesterday', count: 2 }
      ]
    }

    wrapper = mount(SearchGroupBarAggregation, {
      global: {
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        }
      },
      props: {
        aggregation
      }
    })

    wrapper.vm.state.filters = {
      modified: ['today', 'yesterday']
    }

    const data = wrapper.vm.getData()
    expect(data.modified).toBe('today') // Should only take first value for single aggregation
  })

  it('should not render empty aggregation groups', () => {
    const aggregation = {
      type: [],
      modified: [
        { key: 'today', value: 'today', count: 3 }
      ]
    }

    wrapper = mount(SearchGroupBarAggregation, {
      global: {
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        }
      },
      props: {
        aggregation
      }
    })

    expect(wrapper.text()).not.toContain('searchGroup.type')
    expect(wrapper.text()).toContain('searchGroup.modified')
  })
})
