import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'
import { AdminFolderCabinetDetail, FolderCabinetSettingDetail, ResponsiveFilter } from '#components'
import { ElMessageBox, ElNotification, ElMessage } from 'element-plus'

vi.mock('element-plus', () => ({
  ElMessageBox: {
    alert: vi.fn(),
    confirm: vi.fn()
  },
  ElNotification: vi.fn().mockReturnValue({
    close: vi.fn()
  }),
  ElMessage: {
    success: vi.fn(),
    warning: vi.fn()
  }
}))

const FormRenderer = {
  template: '<div class="FormRenderer">FormRenderer</div>',
  methods: {
    setFormJson: vi.fn(),
    setFormData: vi.fn()
  }
}
const VFormRender = {
  template: '<div class="VFormRender">VFormRender</div>',
  methods: {}
}
const ReaderDialog = {
  template: '<div class="ReaderDialog">ReaderDialog</div>',
  methods: {}
}

const Editorjs = {
  template: '<div class="Editorjs">Editorjs</div>',
  methods: {}
}
global.getIgnoreSchemas = () => {
  console.log('这是一个全局函数');
  return ['createDate']
};
describe('[admin-folder-cabinet]AdminFolderCabinetDetail', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = shallowMount(AdminFolderCabinetDetail, {
      props: {
        id: 'test-id'
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog, Editorjs },
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
    const dialogRef = wrapper.vm.$refs.FolderCabinetAddChildDialogRef
    dialogRef.handleOpen = vi.fn()

    const tableRef = wrapper.vm.$refs.detailRef
    tableRef.init = vi.fn()
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('renders correctly', async () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('fetches data on mount', async () => {
    await wrapper.vm.getData()
    expect(adminApi.api.getCabinetTemplateId).toHaveBeenCalledWith('test-id')
    expect(wrapper.vm.state.setting.folder).toBe(true)
  })
  it('handles current row change', async () => {
    const row = { id: 1 }

    await wrapper.vm.handleCurrentChange(row)

    expect(wrapper.vm.state.currentRow).toEqual(row)
    expect(wrapper.vm.detailRef.init).toHaveBeenCalledWith(row)
  })
  it('handles adding a child', async () => {
    const data = { id: 1, children: [] }
    const isFolder = true

    await wrapper.vm.handleAddChild(data, isFolder)

    expect(wrapper.vm.FolderCabinetAddChildDialogRef.handleOpen).toHaveBeenCalledWith(data, data.children, isFolder)
  })

  it('handles deleting a child', async () => {
    const setting = { id: 1, label: 'Test' }

    ElMessageBox.confirm.mockResolvedValue('confirm')
    await wrapper.vm.handleDeleteChild(setting)

    expect(ElMessageBox.confirm).toHaveBeenCalledWith(expect.any(String))
    expect(adminApi.api.deleteCabinetId).toHaveBeenCalledWith(1)
    expect(ElNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Success',
        message: 'Item deleted',
        type: 'success'
      })
    )
  })
  it('does not delete if confirmation is canceled', async () => {
    ElMessageBox.confirm.mockResolvedValueOnce('cancel')

    const setting = { id: 1 }

    await wrapper.vm.handleDeleteChild(setting)

    expect(adminApi.api.deleteCabinetId).not.toHaveBeenCalled()
  })

  it('handles errors during deletion', async () => {
    const setting = { id: 1, label: 'Test' }
    ElMessageBox.confirm.mockResolvedValue('confirm')
    adminApi.api.deleteCabinetId.mockRejectedValueOnce(new Error('Delete failed'))

    await wrapper.vm.handleDeleteChild(setting)

    expect(ElNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Error',
        message: 'Failed to delete item',
        type: 'error',
        duration: 2000
      })
    )
  })
})
