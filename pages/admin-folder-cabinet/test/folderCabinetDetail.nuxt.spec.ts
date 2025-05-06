import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'
import { FolderCabinetDetail, FolderCabinetSettingDetail, ResponsiveFilter } from '#components'
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
describe('[admin-folder-cabinet]FolderCabinetDetail', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = shallowMount(FolderCabinetDetail, {
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
describe('[admin-folder-cabinet]FolderCabinetSettingDetail', () => {
  let wrapper: any
  const mockTabProvider = {}
  const mockData = {
    id: 'test-id',
    label: 'Test Label',
    allow: true,
    multiple: false,
    repeatName: false,
    labelRule: JSON.stringify([{ metadata: 'fc:docTitle', dataType: 'string' }]),
  }
  beforeEach(async () => {
    wrapper = shallowMount(FolderCabinetSettingDetail, {
      props: {
        id: 'test-id',
        tree: { children: [] },
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog, Editorjs },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key },
        }
      }
    })
    await wrapper.vm.$nextTick()
    // const dialogRef = wrapper.vm.$refs.FolderCabinetAddChildDialogRef;
    // dialogRef.handleOpen = vi.fn();

    // const tableRef = wrapper.vm.$refs.detailRef;
    // tableRef.init = vi.fn();
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('renders correctly', async () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.detail-container').exists()).toBe(true);
    expect(wrapper.find('.file-icon').exists()).toBe(true);
  })
  it('handles document type change', async () => {
    const mockDocTypeChangeData = {
      value: 'docType1',
      metaList: [
        { metadata: 'meta1', metaDataType: 'string', dataType: 'select', options: JSON.stringify({ multiple: false }) },
        { metadata: 'meta2', metaDataType: 'date', dataType: 'string' },
      ],
    };
    wrapper.vm.FormVariablesRendererRef = {
      init: vi.fn()
    }
    await wrapper.vm.handleDocTypeChange(mockDocTypeChangeData);
    
    expect(wrapper.vm.state.curDocType).toBe('docType1');
    expect(wrapper.vm.state.dragList.length).toBeGreaterThan(0);
  });
  it('validates and saves correctly', async () => {
    wrapper.vm.form.labelRule = [{ metadata: 'fc:docTitle', dataType: 'string' }];
    wrapper.vm.FormRef = {
      validate: vi.fn().mockResolvedValue(true)
    };
    wrapper.vm.FormRendererRef = {
      vFormRenderRef: {
        getFormData: vi.fn(() => Promise.resolve({ name: '1111' })),
        resetForm: vi.fn(),
        setFormData: vi.fn()
      }
    }
    wrapper.vm.FormVariablesRendererRef = {
      init: vi.fn(),
      getData: vi.fn(),
    }
    await wrapper.vm.handleSave();

    expect(adminApi.api.patchCabinetTemplate).toHaveBeenCalledWith(expect.objectContaining({
      allow: wrapper.vm.form.allow,
      multiple: wrapper.vm.form.multiple,
      repeatName: wrapper.vm.form.repeatName,
      labelRule: JSON.stringify(wrapper.vm.form.labelRule),
    }));
  });
  it('handles delete confirmation', async () => {
    vi.spyOn(ElMessageBox, 'confirm').mockResolvedValue('confirm');
    wrapper.vm.state.setting = {
      id: 'test-id'
    }
    await wrapper.vm.handleDelete();

    expect(adminApi.api.deleteCabinetId).toHaveBeenCalledWith(mockData.id);
  });
  it('handles delete cancellation', async () => {
    vi.spyOn(ElMessageBox, 'confirm').mockResolvedValue('cancel');
    await expect(wrapper.vm.handleDelete()).rejects.toThrow('cancel');
  });
  it('checks for duplicate label', () => {
    const data = [
      { id: '1', parentId: 'parent1', label: 'Test Label' },
      { id: '2', parentId: 'parent1', label: 'Another Label' },
    ];
    const hasDuplicate = wrapper.vm.checkDuplicateLabel('parent1', 'test-id', 'Test Label', data);
    expect(hasDuplicate).toBe(true);
  });
})
