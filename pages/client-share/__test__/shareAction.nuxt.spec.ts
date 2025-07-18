import { describe, it, expect, vi, beforeEach, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { SharePage, ShareDialog } from '#components'
import { VxeGrid } from 'vxe-table'
import { clientApi } from './mock/api'
import { ElMessageBox } from 'element-plus'
import { mockRouterProvider } from './util'

// 模擬 Element Plus
vi.mock('element-plus', () => ({
  ElMessageBox: {
    confirm: vi.fn(() => Promise.resolve('confirm'))
  },
  ElMessage: {
    success: vi.fn()
  }
}))

describe('[client-share-external]ShareAction', () => {
  let shareInfoDialogRef: any
  let wrapper: any
  beforeEach(() => {
    vi.clearAllMocks()
    shareInfoDialogRef = ref({
      handleOpen: vi.fn()
    })

    wrapper = mount(SharePage, {
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

  it('should call handleDblclick with the correct', async () => {
    const mockOpen = vi.fn()
    wrapper.vm.shareInfoDialogRef = { handleOpen: mockOpen }
    const handleOpenSpy = vi.spyOn(wrapper.vm.shareInfoDialogRef, 'handleOpen')
    await wrapper.vm.handleDblclick()
    expect(handleOpenSpy).toHaveBeenCalled()
  })

  it('should call handleDisabled with the correct', async () => {
    const row = { id: 1, shareID: 1 }
    await wrapper.vm.handleDisabled(row)
    expect(ElMessageBox.confirm).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Object)
    )

    expect(clientApi.api.deleteNuxeoShare).toHaveBeenCalled()

    await new Promise((resolve) => setTimeout(resolve, 2000))

    expect(mockRouterProvider.message.success).toHaveBeenCalled()
  })

})
