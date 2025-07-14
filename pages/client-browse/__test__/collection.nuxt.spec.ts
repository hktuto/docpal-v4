import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { CollectionPage, CollectionAddCollectionDialog, CollectionEditCollectionDialog } from '#components'
import { adminApi, clientApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { ElMessageBox, ElMessage, ElSwitch } from 'element-plus'
import { mockRouterProvider } from './util'
import { mockQuery } from './setup'
vi.mock('element-plus', () => ({
  ElMessageBox: {
    alert: vi.fn(),
    confirm: vi.fn()
  },
  ElNotification: {
    success: vi.fn()
  },
  ElMessage: {
    success: vi.fn(),
    warning: vi.fn(),
    error: vi.fn()
  }
}))

const mockReload = vi.fn()
const mockCleanSelectedRows = vi.fn()
const mockTable = {
  value: {
    loadData: vi.fn()
  }
}
vi.mock('../../../packages/base/composables/useVxeTable', () => ({
  useVxeTable: vi.fn(() => ({
    tableConfig: {},
    tableEvent: {},
    tableRef: mockTable,
    reload: mockReload,
    cleanSelectedRows: mockCleanSelectedRows
  }))
}))
const FormRenderer = {
  template: '<div class="FormRenderer">FormRenderer</div>',
  methods: {
    setFormJson: vi.fn(),
    setFormData: vi.fn()
  }
}
const VFormRender = {
  template: '<div class="FormRenderer">FormRenderer</div>',
  methods: {}
}
const ReaderDialog = {
  template: '<div class="FormRenderer">FormRenderer</div>',
  methods: {}
}

describe('[client-browse-collection]CollectionPage', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(CollectionPage, {
      global: {
        components: { VxeGrid, FormRenderer, VFormRender, ReaderDialog },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
        }
      }
    })
    // const dialogRef = wrapper.vm.$refs.DocTypeDialogNewRef
    // dialogRef.handleOpen = vi.fn()
    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.loadData = vi.fn();
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('should render correctly with initial state', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.vm.state.collectionList).toEqual([])
    expect(wrapper.vm.state.curCollection).toEqual('')
  })

  it('should load collection list on mount', async () => {
    const mockData = {
      entryList: [
        { id: 'collection1', name: 'Collection 1' },
        { id: 'collection2', name: 'Collection 2' }
      ]
    }
    clientApi.api.getNuxeoCollection.mockResolvedValue({ data: mockData })

    await wrapper.vm.getCollectionList()

    expect(wrapper.vm.state.collectionList).toEqual(mockData.entryList)
    expect(wrapper.vm.state.curCollection).toEqual(mockData.entryList[0]) // 默认选择第一个集合
  })
  it('should handle adding a collection', async () => {
    const newCollection = { id: 'collection1', name: 'Collection 1' }
    wrapper.vm.handleAddCollection(newCollection)
    const item = wrapper.vm.state.collectionList.find((item: any) => item.id === 'collection1')
    expect(item.id).toBe('collection1')
  })

  it('should handle tab click and set current collection', async () => {
    const collection = { id: 'collection1', name: 'Collection 1' }
    wrapper.vm.handleTabClick(collection)

    expect(wrapper.vm.state.curCollection).toEqual(collection)
  })

  it('should confirm and delete a collection', async () => {
    const collectionToDelete = { id: 'collection1', name: 'Collection 1' }
    wrapper.vm.state.collectionList.push(collectionToDelete)

    ElMessageBox.confirm.mockResolvedValue('confirm') // 模拟用户确认删除

    await wrapper.vm.handleDelete(collectionToDelete)

    expect(clientApi.api.deleteNuxeoCollectionDeleteCollectionCollectionid).toHaveBeenCalledWith(collectionToDelete.id)
    expect(wrapper.vm.state.collectionList).not.toContain(collectionToDelete)
  })
  it('should not delete a collection if user cancels', async () => {
    const collectionToDelete = { id: 'collection1', name: 'Collection 1' }
    wrapper.vm.state.collectionList.push(collectionToDelete)

    ElMessageBox.confirm.mockResolvedValue('cancel') // 模拟用户取消删除

    await wrapper.vm.handleDelete(collectionToDelete)

    expect(clientApi.api.deleteNuxeoCollectionDeleteCollectionCollectionid).not.toHaveBeenCalled()
    const item = wrapper.vm.state.collectionList.find((item: any) => item.id === 'collection1')
    expect(item.id).toBe('collection1')
  })
  it('should handle document delete correctly', async () => {
    const docToDelete = { id: 'doc1', name: 'Document 1' }
    await wrapper.vm.handleDocDelete(docToDelete)

    // 模拟用户确认删除
    ElMessageBox.confirm.mockResolvedValue('confirm')
    await wrapper.vm.handleDocDelete(docToDelete)

    expect(clientApi.api.deleteNuxeoCollectionRemove).toHaveBeenCalled()
  })

  it('should open dialogs correctly', () => {
    wrapper.vm.addCollectionDialog = {
      handleOpen: vi.fn()
    }
    wrapper.vm.editCollectionDialog = {
      handleOpen: vi.fn()
    }
    wrapper.vm.openAddCollectionDialog()
    expect(wrapper.vm.addCollectionDialog.handleOpen).toHaveBeenCalled()

    wrapper.vm.openEditCollectionDialog()
    expect(wrapper.vm.editCollectionDialog.handleOpen).toHaveBeenCalledWith(wrapper.vm.state.curCollection)
  })

  it('should collapse and expand the collection list', async () => {
    const initialCollapseState = wrapper.vm.style.collapse
    wrapper.vm.handleCollapse()
    expect(wrapper.vm.style.collapse).toBe(!initialCollapseState)
  })
})
