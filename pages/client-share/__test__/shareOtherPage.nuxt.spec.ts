import { describe, it, expect, vi, beforeEach, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { mockRouterProvider } from './util'
import { InternalShareOtherPage } from '#components'
import { VxeGrid } from 'vxe-table'
import { clientApi } from './mock/api'

describe('[client-share-internal]ShareOtherPage', () => {
  let wrapper: any
  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(InternalShareOtherPage, {
      global: {
        components: { VxeGrid },
        provide: {
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        }
      }
    })
  })

  it('should render the component correctly', () => {
    expect(wrapper.findComponent(VxeGrid).exists()).toBe(true)
  })

  it('should handleDblclick the component correctly', async () => {
    const row = {
      isFolder: true,
      documentIds: '111111',
      documentNames: 'test1'
    }

    await wrapper.vm.handleDblclick(row)
    await wrapper.vm.$nextTick()
    expect(mockRouterProvider.navigateTo).toHaveBeenCalled()
  })

  it('should handleFilterFormChange the component correctly', async () => {
    const filterModel = { isDesc: false }
    await wrapper.vm.handleFilterFormChange(filterModel)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.extraParams).toEqual(filterModel)
    expect(clientApi.api.postInternalshareOthers).toHaveBeenCalled()
  })

})
