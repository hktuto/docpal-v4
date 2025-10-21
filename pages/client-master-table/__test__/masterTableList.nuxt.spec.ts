import { describe, it, expect, vi, beforeEach, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { ClientMasterTableList, MasterTableRecords } from '#components'
import { VxeGrid } from 'vxe-table'
import { clientApi } from '~/test/mock/api'
import { ElMessageBox } from 'element-plus'
import { mockRouterProvider } from './util'

describe('[client-master-table]MasterTableList', () => {
  let wrapper: any
  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(ClientMasterTableList, {
      global: {
        components: { VxeGrid },
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        },
        provide: {
          [MenuRouterKey]: mockRouterProvider
        }
      }
    })
  })

  it('should handleClick the component correctly', async () => {
    const item = {
      id: '12680d28-df8b-452f-854e-af70b1749eb2',
      name: 'Region',
      status: 'A',
      createdBy: 'Administrator',
      modifiedBy: 'ikki_cheng',
      createdDate: '2024-03-21T05:07:52Z',
      modifiedDate: '2024-03-28T05:54:00Z',
      userId: 'Joshua',
      aces: 'MT_EDIT,MT_READ',
      read: true,
      edit: true,
      create: false,
      enable: false
    }

    await wrapper.vm.handleClick(item)
    await wrapper.vm.$nextTick()

    const active = '12680d28-df8b-452f-854e-af70b1749eb2'
    expect(wrapper.vm.state.active).toBe(active)
  })

  it('should setActive the component correctly', async () => {
    const activeName = '12680d28-df8b-452f-854e-af70b1749eb2'

    await wrapper.vm.setActive(activeName)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.state.active).toBe(activeName)
  })

})
