import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'
import { EmailTemplatePage, EmailTemplateDetail, ResponsiveFilter } from '#components'
import { ElMessageBox, ElNotification, ElMessage } from 'element-plus'
import { mockQuery, mockTable } from './setup'
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

describe('[admin-email-template]EmailTemplatePage', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(EmailTemplatePage, {
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
  it('renders correctly', async () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should open dialog on add button click', async () => {
    wrapper.vm.handleAdd()
    expect(mockRouterProvider.navigateTo).toHaveBeenCalled()
  })
  it('should handle edit button click', async () => {
    wrapper.vm.handleDblclick({id: 'ssss'})
    expect(mockRouterProvider.navigateTo).toHaveBeenCalledWith(
      expect.anything(), 
      false
    ) 
  })
  it('should confirm and delete template', async () => {
    const row = { id: 1, label: 'Test Template' }
    vi.spyOn(ElMessageBox, 'confirm').mockResolvedValue('confirm') 

    await wrapper.vm.handleDeleteTemplate(row)

    expect(ElMessageBox.confirm).toHaveBeenCalled() 
    expect(mockRouterProvider.message.success).toHaveBeenCalledWith(
      expect.stringContaining('tip_deleteSuccessMsg')
    ) 
  })
  it('should not delete template if action is not confirm', async () => {
    const row = { id: 1, label: 'Test Template' }
    vi.spyOn(ElMessageBox, 'confirm').mockResolvedValue('cancel') 

    await wrapper.vm.handleDeleteTemplate(row) 

    expect(mockRouterProvider.message.success).not.toHaveBeenCalled() 
  })
  it('should handle filter form change', async () => {
    wrapper.vm.handleFilterFormChange({ name: 'test', isDesc: false })
    expect(wrapper.vm.extraParams).toEqual({ name: 'test', isDesc: true }) 
    expect(wrapper.vm.reload).toHaveBeenCalled()
  })
})
describe('[admin-email-template]EmailTemplateDetail', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = shallowMount(EmailTemplateDetail, {
      props: {
        id: 'new'
      },
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
  it('renders correctly', async () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('initializes with new template data', async () => {
    const data = await wrapper.vm.handleInit()
    expect(wrapper.vm.ready).toBe(true)
    expect(data).toEqual({
      subject: 'new template',
      body: '',
      emailLayoutId: '',
      emailTemplateJson: '',
      emailTemplateVariable: ''
    })
  })
})
