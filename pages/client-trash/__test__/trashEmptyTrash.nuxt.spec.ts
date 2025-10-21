import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { TrashPage } from '#components'
import { clientApi } from './mock/api'
import { ElMessageBox } from 'element-plus'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'

vi.mock('element-plus', () => ({
  ElMessageBox: {
    confirm: vi.fn(() => Promise.resolve('confirm'))
  }
}))

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
      },
      data() {
        return {
          state: {
            selectList: []
          }
        }
      }
    })
  })

  it('empty all trash', async () => {
    expect(wrapper.find('#Trash__EmptyTrash').exists()).toBe(true)

    const deleteButton = wrapper.find('#Trash__EmptyTrash')
    await deleteButton.trigger('click')

    // 檢查提示窗是否出現
    expect(ElMessageBox.confirm).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Object)
    )

    expect(clientApi.api.deleteNuxeoDocumentPurge).toHaveBeenCalled()

    await new Promise((resolve) => setTimeout(resolve, 2000))

    expect(mockRouterProvider.message.success).toHaveBeenCalled()
  })

  it('selected restore', async () => {
    const wrapper = mount(TrashPage, {
      global: {
        components: { VxeGrid },
        provide: {
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: string) => msg,// Mock translation function
          $i18n: { t: (key: string) => key }
        }
      },
      data() {
        return {
          state: {
            selectList: [{ id: 1 }, { id: 2 }]
          }
        }
      }
    })

    const spyOn = vi.spyOn(clientApi.api,'postNuxeoDocumentRestore')

    const deleteButton = wrapper.find('#Trash__RestoreSelected')
    expect(deleteButton.exists()).toBe(true)
    await deleteButton.trigger('click')

    wrapper.vm.handleBathRestore(true,wrapper.vm.state.selectList)

    await new Promise((resolve) => setTimeout(resolve, 2000))
    expect(mockRouterProvider.message.success).toHaveBeenCalled()
  })

  it('selected delete', async () => {
    wrapper.vm.state.selectList = [{ id: 1 }, { id: 2 }]

    const deleteButton = wrapper.find('#Trash__PermanentlyDeleteSelected')
    expect(deleteButton.exists()).toBe(true)
    await deleteButton.trigger('click')
    expect(ElMessageBox.confirm).toHaveBeenCalled()

    expect(ElMessageBox.confirm).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Object)
    )

    const row = [{ id: '111', name: 'abc' }]
    wrapper.vm.handleBathDelete(row)
    expect(clientApi.api.deleteNuxeoDocument).toHaveBeenCalled()

    await new Promise((resolve) => setTimeout(resolve, 4000))

    expect(mockRouterProvider.message.success).toHaveBeenCalled()
  })
})
