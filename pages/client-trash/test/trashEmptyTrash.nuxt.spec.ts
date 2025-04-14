import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { TrashPage } from '#components' // 替換為你的組件路徑
import { clientApi } from './mock/api' // 替換為你的 API 路徑
import { ElMessageBox, ElMessage } from 'element-plus'
import { VxeGrid } from 'vxe-table'

// 模擬 Element Plus
vi.mock('element-plus', () => ({
  ElMessageBox: {
    confirm: vi.fn(() => Promise.resolve('confirm'))
  },
  ElMessage: {
    success: vi.fn()
  }
}))

describe('TrashEmptyTrash', () => {
  let wrapper: any
  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(TrashPage, {
      global: {
        components: { VxeGrid },
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
    // 點擊 Trash__EmptyTrash 按鈕
    const deleteButton = wrapper.find('#Trash__EmptyTrash')
    await deleteButton.trigger('click')

    // 檢查提示窗是否出現
    expect(ElMessageBox.confirm).toHaveBeenCalledWith(
      expect.any(String), // 檢查提示信息
      expect.any(Object)  // 檢查選項
    )

    // 確保 API 被調用
    expect(clientApi.api.deleteNuxeoDocumentPurge).toHaveBeenCalled()

    // 模擬延遲以等待 loading 狀態結束
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // 檢查成功提示
    expect(ElMessage.success).toHaveBeenCalledWith('trash_emptyTrashSuccessMsg')
  })

  it('selected restore', async () => {
    const wrapper = mount(TrashPage, {
      global: {
        components: { VxeGrid },
        mocks: {
          $t: (msg: string) => msg,// Mock translation function
          $i18n: { t: (key: string) => key }
        }
      },
      data() {
        return {
          state: {
            selectList: [{ id: 1 }, { id: 2 }] // 有選中項目
          }
        }
      }
    })

    const deleteButton = wrapper.find('#Trash__RestoreSelected')
    // 檢查恢復是否存在
    expect(deleteButton.exists()).toBe(true)
    await deleteButton.trigger('click')

    // 確保 API 被調用
    expect(clientApi.api.postNuxeoDocumentRestore).toHaveBeenCalled()

    // 模擬延遲以等待 loading 狀態結束
    await new Promise((resolve) => setTimeout(resolve, 2000))
    // 檢查成功提示
    expect(ElMessage.success).toHaveBeenCalled('trash_restoredSelectedSuccessMsg')
  })

  it('selected delete', async () => {
    const wrapper = mount(TrashPage, {
      global: {
        components: { VxeGrid },
        mocks: {
          $t: (msg: string) => msg,// Mock translation function
          $i18n: { t: (key: string) => key }
        }
      },
      data() {
        return {
          state: {
            selectList: [{ id: 1 }, { id: 2 }] // 有選中項目
          }
        }
      }
    })

    const deleteButton = wrapper.find('#Trash__PermanentlyDeleteSelected')
    // 檢查恢復按鈕是否存在
    expect(deleteButton.exists()).toBe(true)
    await deleteButton.trigger('click')
    expect(ElMessageBox.confirm).toHaveBeenCalled();

    // 檢查提示窗是否出現
    expect(ElMessageBox.confirm).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Object)
    )

    expect(clientApi.api.deleteNuxeoDocument).toHaveBeenCalled()

    // 模擬延遲以等待 loading 狀態結束
    await new Promise((resolve) => setTimeout(resolve, 4000))

    // 檢查成功提示
    expect(ElMessage.success).toHaveBeenCalled('trash_deleteSuccessMsg')
  });
})
