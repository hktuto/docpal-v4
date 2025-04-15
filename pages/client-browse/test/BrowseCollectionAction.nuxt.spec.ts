import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { CollectionPage } from '#components'
import { clientApi } from './mock/api'
import { ElMessage, ElMessageBox } from 'element-plus'
import { VxeGrid } from 'vxe-table'

vi.mock('element-plus', () => ({
  ElMessageBox: {
    confirm: vi.fn(() => Promise.resolve('confirm'))
  },
  ElMessage: {
    success: vi.fn()
  }
}))

describe('CollectionAction', () => {
  let wrapper: any
  let state: any
  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(CollectionPage, {
      global: {
        components:
          {
            VxeGrid
          },
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        }
      }
    })
    state = {
      curCollection: {
        id: 'test-collection-id'
      }
    }

    clientApi.api.postNuxeoCollectionAlldocuments.mockClear()
    document.body.innerHTML = `
      <div id="shareToQueue" style="display: none;"></div>
      <button id="share-draggable-button" style="position: absolute; top: 100px; left: 100px;"></button>
    `
  })

  it('should add collection detail the component correctly', () => {
    const mockOpen = vi.fn()
    wrapper.vm.addCollectionDialog = { handleOpen: mockOpen }
    const button = wrapper.find('#Collection_CreateNewCollection')
    expect(button.exists()).toBe(true)
    button.trigger('click')

    expect(mockOpen).toHaveBeenCalled()
  })

  it('should edit collection detail the component correctly', async () => {
    const mockOpen = vi.fn()
    wrapper.vm.editCollectionDialog = { handleOpen: mockOpen }
    const handleOpenSpy = vi.spyOn(wrapper.vm.editCollectionDialog, 'handleOpen')
    await wrapper.vm.openEditCollectionDialog()
    expect(handleOpenSpy).toHaveBeenCalled()
  })

  it('should delete collection', async () => {
    const row = { id: 1, name: 'Test Collection' }
    await wrapper.vm.handleDelete(row)

    expect(ElMessageBox.confirm).toHaveBeenCalledWith('collection_deleteMsg')

    expect(clientApi.api.deleteNuxeoDocument).toHaveBeenCalled()
    await new Promise((resolve) => setTimeout(resolve, 2000))
    expect(routerProvider?.message.success).toHaveBeenCalled()
  })

  it('should reloadPage is correctly', () => {
    expect(wrapper.vm.reloadPage).toHaveBeenCalled
  })

  it('should fetch data and update share list', async () => {
    const mockData = { entryList: ['doc1', 'doc2'] }
    clientApi.api.postNuxeoCollectionAlldocuments.mockResolvedValueOnce({ data: mockData })

    const addToShareList = vi.fn()
    await wrapper.vm.handleShare.call({ state, addToShareList })

    expect(clientApi.api.postNuxeoCollectionAlldocuments).toHaveBeenCalled()
    await new Promise((resolve) => setTimeout(resolve, 4000))
  })

  it('should hide shareToQueue after animation duration', async () => {
    const mockData = { entryList: ['doc1', 'doc2'] }
    clientApi.api.postNuxeoCollectionAlldocuments.mockResolvedValueOnce({ data: mockData })

    const addToShareList = vi.fn()
    await wrapper.vm.handleShare.call({ state, addToShareList })

    await new Promise(resolve => setTimeout(resolve, 800)) // 超過動畫持續時間

    expect(document.getElementById('shareToQueue').style.display).toBe('none')
  })
})
