import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { BrowseDetail } from '#components'
import { clientApi } from './mock/api'
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

describe('[client-browse]BrowseDetail', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = shallowMount(BrowseDetail, {
      props: {
        idOrPath: 'some/path',
        showHeaderAction: true,
        showInfo: true,
        commentId: '123',
        home: {}
      },
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
  it('renders the component correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should mount the component and load document details', async () => {
    await wrapper.vm.getDetail()

    // 检查文档详情是否被正确加载
    expect(wrapper.vm.docDetail).toBeDefined()
  })

  it('should navigate to parent when goParent is called', async () => {
    wrapper.vm.docDetail = { parentRef: 'parent/path' }
    await wrapper.vm.goParent()

    expect(mockRouterProvider.navigateTo).toHaveBeenCalled()
  })

  it('should handle closePreview event', async () => {
    wrapper.vm.docDetail = { id: 'doc-id', parentRef: 'parent/path' }
    const eventDetail = { id: 'doc-id' }
    await wrapper.vm.closePreview({ detail: eventDetail })

    // 检查是否调用了 navigateTo
    expect(mockRouterProvider.navigateTo).toHaveBeenCalled()
  })
  it('should handle switch file', async () => {
    await wrapper.vm.switchFile()

    expect(mockRouterProvider.updateProps).toHaveBeenCalled()
  })
  it('should handle delete file', async () => {
    await wrapper.vm.itemDeleted()

    expect(mockRouterProvider.navigateTo).toHaveBeenCalled()
  })
})
