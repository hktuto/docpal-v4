import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import {
  ResponsiveFilter,
  ExternalStorageDetail,

} from '#components'
import { ElMessageBox, ElNotification, ElMessage } from 'element-plus'
import { mockQuery, mockTable, mockReload } from './setup'
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
    warning: vi.fn()
  }
}))
const mockTabProvider = {}

describe('[admin-external-storage]ExternalStorageDetail', () => {
  let wrapper: any
  const mockRow = { id: 1, status: 'A' }
  beforeEach(async () => {
    wrapper = shallowMount(ExternalStorageDetail, {
      props: {
        id: 1
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        }
      }
    })
    await wrapper.vm.$nextTick()
  })
  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('should render', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should open new dialog when add button clicked', async () => {
    wrapper.vm.NewDialogRef = { handleOpen: vi.fn() }
    await wrapper.vm.handleAdd()
    expect(wrapper.vm.NewDialogRef.handleOpen).toHaveBeenCalled()
  })
  it('should call handleEdit on edit', () => {
    wrapper.vm.DialogRef = { handleEdit: vi.fn() }
    wrapper.vm.detail = { id: 1, name: 'test' }
    wrapper.vm.handleEdit()
    expect(wrapper.vm.DialogRef.handleEdit).toHaveBeenCalledWith(wrapper.vm.detail)
  })
  it('should call routerProvider.navigateTo on double click', () => {
    wrapper.vm.handleDblclick(mockRow)
    expect(mockRouterProvider.navigateTo).toHaveBeenCalled()
  })
  it('should call reload on filter form change', () => {
    wrapper.vm.reload = mockReload
    wrapper.vm.handleFilterFormChange({ isDesc: true })
    expect(mockReload).toHaveBeenCalled()
  })
  it('should call API and update status on handleActive', async () => {
    adminApi.api.patchExternalstorageIdProfilesProfileidStatus.mockResolvedValue({ data: true })
    mockRow.status = 'A'
    await wrapper.vm.handleActive(mockRow, 'D')
    expect(mockRow.status).toBe('D')
  })
  it('should call delete API on handleDelete', async () => {
    ElMessageBox.confirm = vi.fn().mockResolvedValue('confirm')
    adminApi.api.deleteExternalstorageIdProfilesProfileid.mockResolvedValue({})
    wrapper.vm.reload = mockReload
    await wrapper.vm.handleDelete(mockRow)
    expect(adminApi.api.deleteExternalstorageIdProfilesProfileid).toHaveBeenCalledWith(1, 1)
    expect(mockReload).toHaveBeenCalled()
  })
  it('should call getExternalstorageId on getDetail', async () => {
    adminApi.api.getExternalstorageId.mockResolvedValue({ data: { id: 1, name: 'test' } })
    await wrapper.vm.getDetail()
    expect(adminApi.api.getExternalstorageId).toHaveBeenCalledWith(1)
    expect(wrapper.vm.detail).toEqual({ id: 1, name: 'test' })
  })
  it('should call ResponsiveFilterRef.init on getFilter', () => {
    const init = vi.fn()
    wrapper.vm.ResponsiveFilterRef = { init }
    wrapper.vm.getFilter()
    expect(init).toHaveBeenCalled()
  })
})
