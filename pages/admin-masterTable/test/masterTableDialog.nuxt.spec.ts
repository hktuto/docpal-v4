import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'
import { MasterTableDialog, MasterTableNewSchemaDialog, ResponsiveFilter } from '#components'
import { ElMessageBox, ElNotification, ElMessage } from 'element-plus'
import { mockQuery, mockTable } from './setup'
vi.mock('element-plus', () => ({
  ElMessageBox: {
    alert: vi.fn(),
    confirm: vi.fn()
  },
  ElNotification: vi.fn(),
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

describe('[admin-master-table]MasterTableDialog', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = shallowMount(MasterTableDialog, {
      props: {
        id: 'test-id'
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
    // const MasterTableTabRecordsRef = wrapper.vm.$refs.MasterTableTabRecordsRef;
    // MasterTableTabRecordsRef.initTableColumns = vi.fn();
    // const logRef = wrapper.vm.$refs.logRef;
    // logRef.refresh = vi.fn();
  })

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('opens dialog and sets form data', async () => {
    const data = { name: 'Test Table' };

    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn(() => Promise.resolve({ name: '1111' })),
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn()
      }
    }
    await wrapper.vm.handleOpen(data);

    expect(wrapper.vm.state.visible).toBe(true);
    expect(wrapper.vm.FormRendererRef.vFormRenderRef.setFormData).toHaveBeenCalledWith(data);
  });
  it('submits form data correctly', async () => {
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn(() => Promise.resolve({ name: 'Test Table' })),
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn()
      }
    }
    await wrapper.vm.handleSubmit();

    expect(wrapper.emitted().confirm).toBeTruthy();
    expect(wrapper.emitted().confirm[0][0]).toEqual({ name: 'Test Table' });
    expect(wrapper.vm.state.visible).toBe(false);
  });
})
describe('[admin-master-table]MasterTableNewSchemaDialog', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = shallowMount(MasterTableNewSchemaDialog, {
      props: {
        id: 'test-id'
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
    // const MasterTableTabRecordsRef = wrapper.vm.$refs.MasterTableTabRecordsRef;
    // MasterTableTabRecordsRef.initTableColumns = vi.fn();
    // const logRef = wrapper.vm.$refs.logRef;
    // logRef.refresh = vi.fn();
  })

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should toggle unique switch', async () => {
    wrapper.vm.setUnique(true);
    expect(wrapper.vm.state.options.disabledRequired).toBe(false);
  });
  it('should handle form change', async () => {
    const newValue = { fieldName: 'dataType', newValue: 'varchar:255' };
    await wrapper.vm.handleFormChange(newValue);
    expect(wrapper.vm.state.options.disabledUnique).toBe(false);
  });
  it('should confirm and emit add event', async () => {
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn(() => Promise.resolve({ name: '1111' })),
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn()
      }
    }
    wrapper.vm.state.options.edit = false
    await wrapper.vm.handleConfirm()
    expect(wrapper.vm.FormRendererRef.getFormData).toHaveBeenCalled();
    expect(wrapper.emitted().add).toBeTruthy();
  });
  it('should handle opening the dialog', async () => {
    await wrapper.vm.handleOpen({ dataType: 'varchar:255', unique: true });
    expect(wrapper.vm.state.visible).toBe(true);
    expect(wrapper.vm.state.form.unique).toBe(true);
  });

  it('should set required field correctly', async () => {
    wrapper.vm.state.form.required = true
    await wrapper.vm.setFieldRequired(true);
    expect(wrapper.vm.state.curDefaultField.required).toBe(true);
  });
})
