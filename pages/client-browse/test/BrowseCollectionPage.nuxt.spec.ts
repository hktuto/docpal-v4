import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { CollectionPage } from '#components'
import { VxeGrid } from 'vxe-table'

describe('CollectionAction', () => {
  let wrapper: any
  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(CollectionPage, {
      global: {
        components: { VxeGrid },
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        }
      },
      data() {
        return null
      }
    })
  })

  it('should render the component correctly', () => {
    expect(wrapper.findComponent(VxeGrid).exists()).toBe(true)

    expect(wrapper.find('#Collection_CreateNewCollection').exists()).toBe(true)

    const button = wrapper.findComponent({ name: 'ElButton' })
    expect(button.exists()).toBe(true)
    expect(button.attributes('id')).toBe('Collection_CreateNewCollection')
  })

})