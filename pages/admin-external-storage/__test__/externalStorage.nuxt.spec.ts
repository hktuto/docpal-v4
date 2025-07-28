import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import {
  ResponsiveFilter,
  ExternalStoragePage,
  ExternalStorageNewDialog,
  WorkflowVariableMapping
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
describe('[admin-external-storage]ExternalStoragePage', () => {
  let wrapper: any
  const mockRow = { id: 1, status: 'A' }
  beforeEach(async () => {
    wrapper = shallowMount(ExternalStoragePage, {
      props: {
        page: 1,
        pageSize: 10
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog },
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
    await wrapper.vm.$nextTick()
    // const dialogRef = wrapper.vm.$refs.SmartFolderInfoDialogRef;
    // dialogRef.handleOpen = vi.fn();
    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.initBar = vi.fn();
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('should render', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should open dialog when add button clicked', async () => {
    wrapper.vm.DialogRef = { handleOpen: vi.fn() }
    await wrapper.vm.handleAdd()
    expect(wrapper.vm.DialogRef.handleOpen).toHaveBeenCalled()
  })
  it('should call handleEdit on edit', () => {
    wrapper.vm.DialogRef = { handleEdit: vi.fn() }
    wrapper.vm.handleEdit(mockRow)
    expect(wrapper.vm.DialogRef.handleEdit).toHaveBeenCalledWith(mockRow)
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
    adminApi.api.patchExternalstorageIdStatus.mockResolvedValue({ data: true })
    mockRow.status = 'A'
    await wrapper.vm.handleActive(mockRow, 'D')
    expect(mockRow.status).toBe('D')
  })
})
describe('[admin-external-storage]ExternalStorageNewDialog', () => {
  let wrapper: any
  beforeEach(async () => {
    wrapper = shallowMount(ExternalStorageNewDialog, {
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog },
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
  })
  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('should render', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should open dialog and reset form on handleOpen', async () => {
    wrapper.vm.FormRendererRef = {
      vFormRenderRef: { resetForm: vi.fn() }
    }
    await wrapper.vm.handleOpen()
    expect(wrapper.vm.state.visible).toBe(true)
    expect(wrapper.vm.state.isEdit).toBe(false)
  })
  it('should open dialog and set form data on handleEdit', async () => {
    const data = {
      id: 1,
      name: 'test',
      connectionType: 'type',
      path: '/test',
      status: 'A',
      workGroup: 'wg',
      credentials: { password: 'p', secret: 's', username: 'u', port: 22 },
      platform: 'p'
    }
    const setFormData = vi.fn()
    wrapper.vm.FormRendererRef = {
      vFormRenderRef: { resetForm: vi.fn(), setFormData }
    }
    await wrapper.vm.handleEdit(data)
    expect(wrapper.vm.state.visible).toBe(true)
    expect(wrapper.vm.state.isEdit).toBe(true)
    expect(wrapper.vm.state.setting).toEqual(data)
  })
  it('should submit and emit refresh (create)', async () => {
    const getFormData = vi.fn().mockResolvedValue({
      name: 'test', connectionType: 'type', path: '/test', status: true, workGroup: 'wg', platform: 'p', port: 22, password: 'p', secret: 's', username: 'u'
    })
    wrapper.vm.FormRendererRef = { getFormData, vFormRenderRef: { resetForm: vi.fn() } }
    wrapper.vm.state.isEdit = false
    adminApi.api.postExternalstorage = vi.fn().mockResolvedValue({})
    await wrapper.vm.handleSubmit()
    expect(adminApi.api.postExternalstorage).toHaveBeenCalled()
    expect(wrapper.vm.state.visible).toBe(false)
    // 等待 setTimeout
    await new Promise(r => setTimeout(r, 600))
    expect(wrapper.emitted('refresh')).toBeTruthy()
  })
  it('should submit and emit refresh (edit)', async () => {
    const getFormData = vi.fn().mockResolvedValue({
      name: 'test', connectionType: 'type', path: '/test', status: true, workGroup: 'wg', platform: 'p', port: 22, password: 'p', secret: 's', username: 'u'
    })
    wrapper.vm.FormRendererRef = { getFormData, vFormRenderRef: { resetForm: vi.fn() } }
    wrapper.vm.state.isEdit = true
    wrapper.vm.state.setting = { id: 1 }
    adminApi.api.putExternalstorageId = vi.fn().mockResolvedValue({})
    await wrapper.vm.handleSubmit()
    expect(adminApi.api.putExternalstorageId).toHaveBeenCalled()
    expect(wrapper.vm.state.visible).toBe(false)
    await new Promise(r => setTimeout(r, 600))
    expect(wrapper.emitted('refresh')).toBeTruthy()
  })
})

describe('[admin-external-storage]WorkflowVariableMapping', () => {
  let wrapper: any
  const mockVarList = [
    { label: 'Variable 1', value: 'var1' },
    { label: 'Variable 2', value: 'var2' }
  ]
  beforeEach(async () => {
    wrapper = shallowMount(WorkflowVariableMapping, {
      props: {
        workflow: 'test-workflow',
        varList: mockVarList
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
  it('should return correct target label when found in varList', () => {
    const result = wrapper.vm.getTargetLabel('Variable 1')
    expect(result).toBe('Variable 1')
  })
  it('should return original value when not found in varList', () => {
    const result = wrapper.vm.getTargetLabel('Unknown Variable')
    expect(result).toBe('Unknown Variable')
  })
  it('should call API and return mapped data on getWorkflowProps', async () => {
    const mockApiResponse = [
      { name: 'Property 1', id: 'prop1' },
      { name: 'Property 2', id: 'prop2' }
    ]
    adminApi.api.postWorkflowProperties.mockResolvedValue({ data: mockApiResponse })
    const result = await wrapper.vm.getWorkflowProps('test-workflow')
    expect(adminApi.api.postWorkflowProperties).toHaveBeenCalledWith({ processKey: 'test-workflow' })
    expect(result).toEqual([
      { label: 'Property 1', value: 'prop1' },
      { label: 'Property 2', value: 'prop2' }
    ])
  })
  it('should handle API error in getWorkflowProps', async () => {
    adminApi.api.postWorkflowProperties.mockRejectedValue(new Error('API Error'))
    const result = await wrapper.vm.getWorkflowProps('test-workflow')
    expect(result).toEqual([])
  })

})

