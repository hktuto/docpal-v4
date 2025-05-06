import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'
import { AuditPage,AuditTable, ResponsiveFilter } from '#components'
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
const mockAuditProvider = {
  getListApi: vi.fn(),
  goClientPath: vi.fn(),
};
const mockResponsiveFilter = {
  template: '<div><slot /></div>',
  methods: {
    init: vi.fn(),
  },
};
describe('[admin-audit]AuditPage', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = shallowMount(AuditPage, {
      props: {
        page: 1,
        pageSize: 20
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
    // const dialogRef = wrapper.vm.$refs.FolderCabinetSettingAddDialogRef;
    // dialogRef.handleOpen = vi.fn();
    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.initBar = vi.fn();
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('handles form change correctly', async () => {
    const formChangeData = {
      formModel: {
        auditTemplate: ['category1', 'event1'],
        dates: ['2025-05-01T00:00:00.000Z', '2025-05-05T00:00:00.000Z'],
        path: ['document1', 'document2']
      }
    }
    wrapper.vm.tableRef = {
      reload: vi.fn()
    }
    await wrapper.vm.handleFormChange(formChangeData)

    expect(wrapper.vm.formData).toEqual({
      eventCategory: 'category1',
      eventId: 'event1',
      eventDateFrom: '2025-05-01T00:00:00.000Z',
      eventDateTo: '2025-05-05T00:00:00.000Z',
      documentId: 'document2'
    })
  })

  it('reloads the table', async () => {
    wrapper.vm.tableRef = {
      reload: vi.fn()
    }
    await wrapper.vm.reload()

    expect(wrapper.vm.tableRef.reload).toHaveBeenCalled()
  })
})
describe('[admin-audit]AuditTable', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(AuditTable, {
      props: {
        page: 1,
        pageSize: 20
      },
      global: {
        components: { VxeGrid, ResponsiveFilter: mockResponsiveFilter, FormRenderer, VFormRender, ReaderDialog },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider,
          [AuditProviderKey]: mockAuditProvider,
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
    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.initBar = vi.fn();
  })

  afterEach(() => {
    vi.clearAllMocks()
  })
  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('handles filter form change correctly', async () => {
    const formModel = {
      orderBy: 'eventDate',
      isDesc: 'false',
    };

    await wrapper.vm.handleFilterFormChange(formModel);
    
    expect(wrapper.vm.reload).toHaveBeenCalled();
  });
})
