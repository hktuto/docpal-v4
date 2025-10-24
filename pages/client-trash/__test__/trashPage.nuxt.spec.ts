import { describe, it, expect, vi, beforeEach, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { TrashPage } from '#components'
import { VxeGrid } from 'vxe-table'

const mockRouterProvider = {
  navigateTo: vi.fn()
}

describe('[client-trash]TrashEmptyTrash', () => {
  let wrapper: any
  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(TrashPage, {
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
    expect(wrapper.find('#Trash__EmptyTrash').exists()).toBe(true)
  })

  it('should select button component correctly', () => {
    const wrapper = mount(TrashPage, {
      global: {
        components: { VxeGrid },
      },
      data() {
        return {
          state: {
            selectList: [{ id: 1 }, { id: 2 }] // 有選中項目
          }
        }
      }
    })

    expect(wrapper.find('#Trash__RestoreSelected').exists()).toBe(true);
    expect(wrapper.find('#Trash__PermanentlyDeleteSelected').exists()).toBe(true);
  })

})
