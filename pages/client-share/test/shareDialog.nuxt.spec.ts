import { describe, it, expect, vi, beforeEach, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { ShareDialog } from '#components'

describe('[client-external-share]ShareDialog', () => {
  let wrapper: any
  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(ShareDialog, {
      global: {
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        }
      }
    })
  })

  it('should call handleSubmit with the correct', async () => {
    wrapper.vm.formRef = {
      validate: vi.fn().mockReturnValue(true)
    }

    await wrapper.vm.handleSubmit()

    expect(wrapper.vm.dialogVisible).toEqual(false)
  })

})
