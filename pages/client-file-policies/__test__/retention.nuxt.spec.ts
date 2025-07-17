import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { RetentionDoneTable, RetentionPendingTable } from '#components'
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
describe('[client-file-policies-retention]RetentionDoneTable', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(RetentionDoneTable, {
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

  it('should call getFilter on mounted', async () => {
    // 模拟 API 返回的数据
    clientApi.api.getPolicyRetentionsDocumentPageConditions.mockResolvedValueOnce({
      data: [
        {
          key: 'retentionPolicyIds',
          options: [
            { label: 'Policy 1', value: 1 },
            { label: 'Policy 2', value: 2 }
          ]
        }
      ]
    })

    await nextTick() // 等待组件更新

    expect(clientApi.api.getPolicyRetentionsDocumentPageConditions).toHaveBeenCalled()
  })

  it('should navigate to detail page on double click', async () => {
    const row = { documentName: 'Test Document', documentId: 123 }
    await wrapper.vm.handleDblclick(row)

    expect(mockRouterProvider.navigateTo).toHaveBeenCalled()
  })
})
describe('[client-file-policies-retention]RetentionPendingTable', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(RetentionPendingTable, {
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
  it('should call patchPolicyRetentionsIdStatusStatus when confirm', async () => {
    vi.spyOn(ElMessageBox, 'confirm').mockResolvedValue('confirm') // 模拟确认对话框
    await wrapper.vm.handleApprove(true, { id: 'test' })
    expect(clientApi.api.patchPolicyRetentionsIdStatusStatus).toHaveBeenCalled() // 检查函数是否被调用
  })
  it('should call patchPolicyRetentionsIdStatusStatus when cancel', async () => {
    vi.spyOn(ElMessageBox, 'confirm').mockResolvedValue('cancel') // 模拟确认对话框
    await wrapper.vm.handleApprove(true, { id: 'test' })
    expect(clientApi.api.patchPolicyRetentionsIdStatusStatus).not.toHaveBeenCalled() // 检查函数是否被调用
  })
  it('should handle filter form change', async () => {
    await wrapper.vm.handleFilterFormChange({ orderBy: 'name' })
    expect(wrapper.vm.extraParams).toEqual({ orderBy: 'name' }) // 确保参数正确更新
    await wrapper.vm.reload() // 重新加载数据
  })
  it('should call patchPolicyRetentionsIdStatusStatus when confirm', async () => {
    vi.spyOn(ElMessageBox, 'confirm').mockResolvedValue('confirm') // 模拟确认对话框
    await wrapper.vm.handleEvent(111, { id: 'test' })
    expect(clientApi.api.postPolicyRetentionsSubmitevent).toHaveBeenCalled() // 检查函数是否被调用
  })
  it('should call patchPolicyRetentionsIdStatusStatus when cancel', async () => {
    vi.spyOn(ElMessageBox, 'confirm').mockResolvedValue('cancel') // 模拟确认对话框
    await wrapper.vm.handleEvent(111, { id: 'test' })
    expect(clientApi.api.postPolicyRetentionsSubmitevent).not.toHaveBeenCalled() // 检查函数是否被调用
  })
  it('should call patchPolicyRetentionsIdStatusStatus when cancel', async () => {
    clientApi.api.getPolicyRetentionsEvents.mockResolvedValue({ data: { id: '111' } })

    await wrapper.vm.getEvents()
    console.log(wrapper.vm.events)
    expect(clientApi.api.getPolicyRetentionsEvents).toHaveBeenCalled() // 检查函数是否被调用
    expect(wrapper.vm.events).toStrictEqual({ id: '111' }) // 检查函数是否被调用
  })
})
