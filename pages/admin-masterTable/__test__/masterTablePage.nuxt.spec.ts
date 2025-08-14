import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'
import { AdminMasterTablePage, ResponsiveFilter } from '#components'
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

describe('[admin-master-table]AdminMasterTablePage', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(AdminMasterTablePage, {
      props: {
        id: 1
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider,
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
        }
      }
    })
    await wrapper.vm.$nextTick()
    // const dialogRef = wrapper.vm.$refs.FolderCabinetSettingAddDialogRef;
    // dialogRef.handleOpen = vi.fn();
    const tableRef = wrapper.vm.$refs.MasterTableTabRecordsRef;
    tableRef.reload = vi.fn();
    const logRef = wrapper.vm.$refs.logRef;
    logRef.refresh = vi.fn();
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('opens new item correctly', async () => {
    await wrapper.vm.openNew();
    expect(mockRouterProvider.navigateTo).toHaveBeenCalled();
  });
  it('handles table filter changes correctly', async () => {
    const formModel = { status: 'ACTIVE' };

    await wrapper.vm.handleTableFilterChange(formModel);

    expect(wrapper.vm.state.tableFilter).toEqual(formModel);
    expect(wrapper.vm.MasterTableTabRecordsRef.reload).toHaveBeenCalled();
  });
  it('handles log filter changes correctly', async () => {
    const formModel = { logLevel: 'ERROR' };

    await wrapper.vm.handleLogFilterChange(formModel);

    expect(wrapper.vm.state.logFilter).toEqual(formModel);
    expect(wrapper.vm.logRef.refresh).toHaveBeenCalled();
  });

})
