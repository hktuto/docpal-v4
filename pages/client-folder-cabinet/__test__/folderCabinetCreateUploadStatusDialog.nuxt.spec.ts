import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { FolderCabinetCreateUploadStatusDialog } from '#components'
import { mockRouterProvider } from './util'
import { VxeGrid } from 'vxe-table'

describe('[client-folder-cabinet]FolderCabinetCreateUploadStatusDialog', () => {
  let wrapper: any
  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(FolderCabinetCreateUploadStatusDialog, {
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

  it('should handleConfirm the component correctly', async () => {
    wrapper.vm.visible = true

    await wrapper.vm.handleConfirm()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.state.visible).toBe(false)
  })

  it('should handleOpen the component correctly', async () => {
    wrapper.vm.visible = false

    const uploadList = {}
    await wrapper.vm.handleOpen(uploadList)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.state.visible).toBe(true)
    expect(wrapper.vm.state.uploadList).toEqual(uploadList)
  })
})
