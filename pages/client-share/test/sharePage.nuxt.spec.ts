import { describe, it, expect, vi, beforeEach, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { SharePage } from '#components'
import { VxeGrid } from 'vxe-table'

describe('SharePage', () => {
  let wrapper: any
  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(SharePage, {
      global: {
        components: { VxeGrid },
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
})
