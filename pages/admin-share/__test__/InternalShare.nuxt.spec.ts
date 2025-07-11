import { shallowMount, mount } from '@vue/test-utils';
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest';
import { adminApi } from './mock/api';
import { VxeGrid, } from 'vxe-table';
import { mockRouterProvider } from './util';
import { InternalShareList, InternalShareListTable, ResponsiveFilter } from '#components';
import { ElMessageBox, ElNotification, ElMessage } from 'element-plus';
vi.mock('element-plus', () => ({
  ElMessageBox: {
    alert: vi.fn(),
    confirm: vi.fn(),
  },
  ElNotification: {
    success: vi.fn(),
  },
  ElMessage: {
    success: vi.fn(),
    warning: vi.fn()
  }
}));

const SvgIcon = {
  template: '<div class="SvgIcon">SvgIcon</div>',
  methods: {}
};
const Icon = {
  template: '<div class="Icon">Icon</div>',
  methods: {}
};
const FormRenderer = {
  template: '<div class="FormRenderer">FormRenderer</div>',
  methods: {
    setFormJson: vi.fn(),
    setFormData: vi.fn(),
  }
};
const VFormRender = {
  template: '<div class="FormRenderer">FormRenderer</div>',
  methods: {}
};
const ReaderDialog = {
  template: '<div class="FormRenderer">FormRenderer</div>',
  methods: {}
};

describe('[admin-share-internal]InternalShareList', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(InternalShareList, {
      props: {
        pageNum: 0,
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
    // const dialogRef = wrapper.vm.$refs.ExternalSharePageRef;
    // dialogRef.handleOpen = vi.fn();
    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.loadData = vi.fn();
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks() 
  })
  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.vm.filterData).toBeUndefined()
  })
  it('should handle filter form change', async () => {
    const formData = { documentName: 'test' }
    wrapper.vm.tableRef = {
      reload: vi.fn()
    }
    wrapper.vm.handleFilterFormChange(formData)

    expect(wrapper.vm.filterData).toEqual(formData)
    expect(wrapper.vm.tableRef.reload).toHaveBeenCalled()
  })
  it('should clear filter', async () => {
    wrapper.vm.filterData = { documentName: 'test' }
    wrapper.vm.tableRef = {
      reload: vi.fn()
    }
    await wrapper.vm.handleClearFilter()

    expect(wrapper.vm.filterData).toEqual({})
    expect(wrapper.vm.tableRef.reload).toHaveBeenCalled()
  })
  it('should delete action and call API', async () => {
    const row = { internalShareId: '123' }
    wrapper.vm.tableRef = { reload: vi.fn() }
    ElMessageBox.confirm.mockResolvedValue('confirm')
    await wrapper.vm.deleteAction(row)

    expect(ElMessageBox.confirm).toHaveBeenCalled()
    expect(wrapper.vm.tableRef.reload).toHaveBeenCalled()
  })
  it('should include filter data in params', async () => {
    wrapper.vm.filterData = { status: 'active', type: 'folder' }; 
    const params = { pageNum: 0, pageSize: 10 }
    wrapper.vm.getListApi(params)

    expect(mockRouterProvider.updateProps).toHaveBeenCalledWith({
      pageNum: 1,
      pageSize: 10,
      filters: { status: 'active', type: 'folder' },
    })
    expect(adminApi.api.postInternalsharePage).toHaveBeenCalledWith(params)
  })
  it('should handle empty filter data', async () => {
    wrapper.vm.filterData = null; 
    const params = { pageNum: 0, pageSize: 10 }
    wrapper.vm.getListApi(params)

    expect(mockRouterProvider.updateProps).toHaveBeenCalledWith({
      pageNum: 1,
      pageSize: 10,
      filters: undefined,
    })
    expect(adminApi.api.postInternalsharePage).toHaveBeenCalledWith(params)
  })
})

const ShareListProviderDetail = {
  getListApi: vi.fn(),
  deleteAction: vi.fn(),
  actionPermission: vi.fn()
}
describe('[admin-share-internal]InternalShareListTable', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(InternalShareListTable, {
      props: {
        pageNum: 0,
        pageSize: 20
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider,
          [InternalShareProviderKey]: ShareListProviderDetail
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
        }
      }
    })
    // const dialogRef = wrapper.vm.$refs.ExternalSharePageRef;
    // dialogRef.handleOpen = vi.fn();
    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.loadData = vi.fn();
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks() 
  })
  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.vm.tableRef).toBeDefined()
  })
  it('should handle JSON parsing error in formatter', async () => {
    const column = wrapper.vm.tableConfig.columns[3]
    const result = column.formatter({ cellValue: 'invalid json' })
    expect(result).toBe('invalid json')
  })
})
