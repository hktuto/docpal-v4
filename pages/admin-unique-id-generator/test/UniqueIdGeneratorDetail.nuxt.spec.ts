import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { UniqueIdGeneratorDetail } from '#components'
import { mockRouterProvider } from './util'
import { adminApi } from './mock/api'

describe('[admin-unique-id-generator]UniqueIdGenerator', () => {
  let wrapper: any
  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(UniqueIdGeneratorDetail, {
      global: {
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        },
        provide: {
          [MenuRouterKey]: mockRouterProvider
        }
      },
      props: {
        id: '71f73a02-886d-411c-8ec7-e4bdadc7fb26'
      }
    })
  })

  it('should inti the component correctly', async () => {
    const data = {
      id: '71f73a02-886d-411c-8ec7-e4bdadc7fb26',
      name: 'test3',
      idDigit: 2,
      startNumber: 100,
      lastIdValue: null,
      prefix: [
        {
          index: 0,
          expression: '{var(qwe)}',
          type: 'variable',
          value: 'ewq'
        },
        {
          index: 1,
          expression: '{date(yyyy-MM-dd HH:mm)}',
          type: 'date',
          value: 'yyyy-MM-dd HH:mm'
        }
      ],
      suffix: [],
      enabled: true,
      createdBy: 'Joshua',
      modifiedBy: 'Joshua',
      createdDate: '2025-04-25T01:42:53Z',
      modifiedDate: '2025-04-25T01:49:15Z',
      createdByName: 'Joshua',
      modifiedByName: 'Joshua'
    }
    vi.spyOn(adminApi.api, 'getIdTemplatesId').mockResolvedValue({ data: data })
    await wrapper.vm.init()
    await wrapper.vm.$nextTick()
    expect(adminApi.api.getIdTemplatesId).toHaveBeenCalled()
    expect(wrapper.vm.state.form).toEqual(data)
    expect(wrapper.vm.state.example).toEqual(data)
    expect(wrapper.vm.state.prefix).toEqual(['{var(qwe)}', '{date(yyyy-MM-dd HH:mm)}'])
    expect(wrapper.vm.state.suffix).toEqual([])
  })

  it('should example Label the component correctly', async () => {
    const testCases = [
      { type: 'string', value: 'test1', expected: 'string' },
      { type: 'date', value: '{date(yyyy-MM-dd)}', expected: 'Date(yyyy-MM-dd)' },
      { type: 'variable', value: '{var(qwe)}', expected: 'qwe' }
    ]

    for (const { type, value, expected } of testCases) {
      const result = await wrapper.vm.handleLabel(type, value)
      await wrapper.vm.$nextTick()
      expect(result).toBe(expected)
    }
  })

  it('should handleDataFormat the component correctly', async () => {
    const testCase = { value: '{var(qwe)}', expected: 'qwe' }
    const result = await wrapper.vm.handleDataFormat(testCase.value)
    await wrapper.vm.$nextTick()
    expect(result).toBe(testCase.expected)
  })

  it('should handleExampleData the component correctly', async () => {
    const testCases = [
      { type: 'string', value: 'test1', expected: 'test1' },
      { type: 'date', value: 'yyyy-MM-dd', expected: formatDate(new Date(), 'yyyy-MM-dd') },
      { type: 'variable', value: 'qwe', expected: 'qwe' }
    ]

    for (const { type, value, expected } of testCases) {
      const result = await wrapper.vm.handleExampleData(type, value)
      await wrapper.vm.$nextTick()
      expect(result).toBe(expected)
    }
  })
})
