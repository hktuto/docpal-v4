import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { HoldPage } from '#components'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { ElMessageBox, ElMessage, ElSwitch } from 'element-plus'
import { mockRouterProvider, ReaderDialog, VFormRender, FormRenderer } from './util'

describe('[client-file-policies-hold]HoldPage', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(HoldPage, {
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
  it('should handle filter form change', async () => {
    await wrapper.vm.handleFilterFormChange({ orderBy: 'name' })
    expect(wrapper.vm.extraParams).toEqual({ orderBy: 'name' }) // 确保参数正确更新
    await wrapper.vm.reload() // 重新加载数据
  })
  it('should call navigateTo', async () => {
    await wrapper.vm.handleDblclick({ id: '111' })
    expect(mockRouterProvider.navigateTo).toHaveBeenCalled()
  })
})
