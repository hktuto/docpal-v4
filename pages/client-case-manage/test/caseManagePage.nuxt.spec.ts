import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { CasePage, ResponsiveFilter } from '#components'
import { VxeGrid } from 'vxe-table'
import { clientApi } from './mock/api'

describe('[client-case]CaseManagePage', () => {
  let wrapper: any
  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(CasePage, {
      global: {
        components: { VxeGrid, ResponsiveFilter },
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        }
      }
    })
  })

  it('should render the component correctly', async () => {
    expect(wrapper.findComponent(VxeGrid).exists()).toBe(true)
    wrapper.vm.responsiveFilterRef = {
      init: vi.fn()
    }
    await wrapper.vm.$nextTick()
    wrapper.vm.getFilter()
    expect(wrapper.vm.responsiveFilterRef.init).toHaveBeenCalled()
  })

  it('should render the sort or filter from', () => {
    const extraParams = {
      name: 'CaseTemplate',
      orderBy: 'name',
      isDesc: false,
      pageNum: 0,
      pageSize: 20
    }

    wrapper.vm.handleFilterFormChange(extraParams)
    expect(clientApi.api.postCaseTypesPage).toHaveBeenCalledWith(extraParams)
    expect(extraParams.name).toBe('CaseTemplate')
    expect(extraParams.orderBy).toBe('name')
    expect(extraParams.isDesc).toBe(true)
  })

  it('should render the Click dblClickAction', async () => {
    wrapper.vm.tableRef = {
      dblClickAction: vi.fn()
    }
    const row = { id: 112, name: 'Test' }
    await wrapper.vm.tableRef.dblClickAction(row)

    expect(wrapper.vm.tableRef.dblClickAction).toHaveBeenCalled()
  })
})
