import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'
import { LayoutTemplatePage, ResponsiveFilter } from '#components'
import { ElMessageBox, ElNotification, ElMessage } from 'element-plus'
import { mockQuery,mockTable } from './setup'
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
const SearchGroupTable = {
  template: '<div class="SearchGroupTable" ref="tableRef">SearchGroupTable</div>',
  methods: {
    initBar: vi.fn()
  }
}

describe('[admin-email-template]LayoutTemplatePage', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(LayoutTemplatePage, {
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog, SearchGroupTable },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
        }
      },
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
  it('renders correctly', async () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should open dialog on add button click', async () => {
    const dialogRef = wrapper.vm.$refs.EmailLayoutDialogRef
    dialogRef.handleOpen = vi.fn()
    wrapper.vm.handleAdd()
    expect(dialogRef.handleOpen).toHaveBeenCalled() // 确保 handleOpen 被调用
  })
  it('should handle filter form change', async () => {
    wrapper.vm.handleFilterFormChange({ name: 'test' })
    expect(wrapper.vm.extraParams).toEqual({ name: 'test' }) // 确保 extraParams 被更新
    expect(wrapper.vm.reload).toHaveBeenCalled() // 确保 reload 被调用
  })
  it('should confirm and delete template', async () => {
    const row = { id: 1, name: 'Test Template' }
    vi.spyOn(ElMessageBox, 'confirm').mockResolvedValue('confirm') // 模拟确认对话框

    await wrapper.vm.handleDeleteTemplate(row) // 调用删除方法

    expect(ElMessageBox.confirm).toHaveBeenCalled() // 确保确认对话框被调用
    expect(wrapper.vm.query).toHaveBeenCalled() // 确保 query 被调用
  })
})
