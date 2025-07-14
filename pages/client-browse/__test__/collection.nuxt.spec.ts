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
describe('[client-browse-collection]CollectionAddCollectionDialog', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(CollectionAddCollectionDialog, {
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
  it('should render correctly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.vm.state.visible).toBe(false) // 默认不可见
  })
  it('should open the dialog', () => {
    wrapper.vm.handleOpen()
    expect(wrapper.vm.state.visible).toBe(true)
  })
  it('should submit the form successfully', async () => {
    const mockData = { name: 'New Collection' }
    const mockResponse = { data: { id: 'new-collection-id', name: mockData.name } }

    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue(mockData),
      vFormRenderRef: {
        resetForm: vi.fn()
      }
    }

    clientApi.api.postNuxeoCollectionCreate.mockResolvedValue(mockResponse)

    await wrapper.vm.handleSubmit()

    expect(clientApi.api.postNuxeoCollectionCreate).toHaveBeenCalledWith({
      name: mockData.name,
      description: null
    })
    expect(ElMessage.success).toHaveBeenCalledWith('tip_createdSuccessMsg')
    expect(wrapper.vm.state.visible).toBe(false)
    expect(wrapper.vm.FormRendererRef.vFormRenderRef.resetForm).toHaveBeenCalled()
  })
  it('should handle submit error', async () => {
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue({ name: 'Invalid Collection' })
    }
    wrapper.vm.state.visible = true
    clientApi.api.postNuxeoCollectionCreate.mockRejectedValue(new Error('Submission failed'))

    await wrapper.vm.handleSubmit()

    expect(ElMessage.success).not.toHaveBeenCalled() // 确保没有显示成功消息
    expect(wrapper.vm.state.visible).toBe(true) // 对话框仍然可见
  })
})
describe('[client-browse-collection]CollectionEditCollectionDialog', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(CollectionEditCollectionDialog, {
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
  it('should render correctly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.vm.state.visible).toBe(false) // 默认不可见
  })
  it('should open the dialog and set form data', async () => {
    const mockCollection = { id: '123', name: 'Existing Collection' }
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn(() => Promise.resolve({ name: '1111' })),
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn()
      }
    }
    wrapper.vm.handleOpen(mockCollection)

    // 等待下一个事件循环以确保 setFormData 被调用
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.state.visible).toBe(true)
  })
  it('should submit the form successfully', async () => {
    const mockData = { id: '123', name: 'Updated Collection' }
    const mockResponse = { data: { id: '123', name: mockData.name } }

    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue(mockData),
      vFormRenderRef: {
        resetForm: vi.fn()
      }
    }

    clientApi.api.patchNuxeoCollection.mockResolvedValue(mockResponse)

    await wrapper.vm.handleSubmit()

    expect(clientApi.api.patchNuxeoCollection).toHaveBeenCalledWith({
      idOrPath: mockData.id,
      name: mockData.name,
      description: null
    })
    expect(ElMessage.success).toHaveBeenCalledWith('tip_updateSuccessMsg')
    expect(wrapper.vm.state.visible).toBe(false)
    expect(wrapper.vm.FormRendererRef.vFormRenderRef.resetForm).toHaveBeenCalled()
    expect(wrapper.vm.state.data).toEqual(mockResponse.data) // 确保数据被更新
  })
  it('should handle submit error', async () => {
    wrapper.vm.state.visible = true
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue({ id: '123', name: 'Invalid Collection' })
    }

    clientApi.api.patchNuxeoCollection.mockRejectedValue(new Error('Submission failed'))

    await wrapper.vm.handleSubmit()

    expect(ElMessage.success).not.toHaveBeenCalled() // 确保没有显示成功消息
    expect(wrapper.vm.state.visible).toBe(true) // 对话框仍然可见
  })
})
