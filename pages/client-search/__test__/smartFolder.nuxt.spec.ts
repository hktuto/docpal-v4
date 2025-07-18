import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { SmartFolderDetail, SmartFolderPage, SmartFolderBreadCrumb } from '#components'
import { adminApi, clientApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { ElMessageBox, ElMessage, ElSwitch } from 'element-plus'
import { mockRouterProvider, ReaderDialog, VFormRender, FormRenderer } from './util'
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
describe('[client-search-smartFolder]SmartFolderPage', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(SmartFolderPage, {
      props: {
        pageNum: 0,
        pageSize: 20
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
  it('should render correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('should navigate to correct route on double click', async () => {
    await wrapper.vm.handleDblclick({ row: { id: 1 } }) // 模拟双击事件
    expect(mockRouterProvider.navigateTo).toHaveBeenCalled() // 检查函数是否被调用
  })
})
describe('[client-search-smartFolder]SmartFolderDetail', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(SmartFolderDetail, {
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
    expect(wrapper.find('.pageContainer--padding').exists()).toBe(true)
  })
  it('should parse session storage correctly', async () => {
    sessionStorage.setItem('smartFolder', JSON.stringify({ id: '1', name: 'Test Folder', json_value: '{}' }))
    await wrapper.vm.getSfolder() // 调用获取 smart folder 的方法
    expect(wrapper.vm.state.breadcrumbs[1].name).toBe('Test Folder') // 检查面包屑名称
  })
})
describe('[client-search-smartFolder]SmartFolderBreadCrumb', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(SmartFolderBreadCrumb, {
      props: {
        breadcrumbs: ['/a', '/a/b', '/a/b/c']
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
  it('should render correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should navigateTo when use goRoute', async () => {
    await wrapper.vm.goRoute({ path: '/a/b' }) // 调用获取 smart folder 的方法
    expect(mockRouterProvider.navigateTo).toHaveBeenCalled() // 检查面包屑名称
  })
})
