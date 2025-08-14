import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'
import { FolderCabinetSettingAddChildDialog, FolderCabinetSettingAddDialog, FolderCabinetSettingWorkflowDialog,ResponsiveFilter } from '#components'
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
    warning: vi.fn(),
    error: vi.fn()
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

describe('[admin-folder-cabinet]FolderCabinetSettingAddChildDialog', () => {
  let wrapper: any
  const mockTabProvider = {}
  const mockSetting = { id: 1, label: 'Test Folder' }
  const mockFormJson = {}
  beforeEach(async () => {
    wrapper = shallowMount(FolderCabinetSettingAddChildDialog, {
      props: {
        formJson: mockFormJson
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
    expect(wrapper.exists()).toBe(true)
  })
  it('opens dialog and sets title correctly', async () => {
    await wrapper.vm.handleOpen(mockSetting, [], true)
    expect(wrapper.vm.state.visible).toBe(true)
    expect(wrapper.vm.state.title).toBe('folderCabinet.addFolder')
  })
  it('submits form data correctly when creating a new folder', async () => {
    wrapper.vm.state.setting = mockSetting
    wrapper.vm.state.isFolder = true
    wrapper.vm.state.loading = false
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn(() => Promise.resolve({ name: '1111' })),
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn()
      }
    }
    const formData = { folder: true, label: 'New Folder' }
    wrapper.vm.FormRendererRef.getFormData = vi.fn().mockResolvedValue(formData)

    await wrapper.vm.handleSubmit()

    expect(wrapper.vm.FormRendererRef.getFormData).toHaveBeenCalled()
    expect(wrapper.vm.state.visible).toBe(false)
    expect(ElMessage.success).toHaveBeenCalled()
  })
  it('handles error during submission', async () => {
    wrapper.vm.state.setting = mockSetting
    wrapper.vm.state.isFolder = true
    wrapper.vm.state.loading = false
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn(() => Promise.resolve({ name: '1111' })),
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn()
      }
    }
    const formData = { folder: true, label: 'New Folder' }
    wrapper.vm.FormRendererRef.vFormRenderRef.getFormData = vi.fn().mockResolvedValue(formData)
    adminApi.api.postCabinetTemplate.mockRejectedValue(new Error('API Error'))

    await wrapper.vm.handleSubmit()

    expect(adminApi.api.postCabinetTemplate).toHaveBeenCalled()
    expect(wrapper.vm.state.loading).toBe(false)
  })
})

describe('[admin-folder-cabinet]FolderCabinetSettingAddDialog', () => {
  let wrapper: any
  const mockTabProvider = {}
  const mockSetting = { id: 1, label: 'Test Folder' }
  const mockFormJson = {}
  beforeEach(async () => {
    wrapper = shallowMount(FolderCabinetSettingAddDialog, {
      props: {
        formJson: mockFormJson
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
    expect(wrapper.exists()).toBe(true)
  })
  it('opens dialog and sets data correctly for editing', async () => {
    await wrapper.vm.handleOpen(mockSetting)
    expect(wrapper.vm.state.visible).toBe(true)
    expect(wrapper.vm.state.isEdit).toBe(true)
    expect(wrapper.vm.state.setting).toEqual(mockSetting)
  })
  it('submits form data correctly when creating a new folder', async () => {
    wrapper.vm.state.isEdit = false
    wrapper.vm.state.loading = false
    const formData = { label: 'New Folder', userGroups: ['type1&&&&id1'], cabinetRoot: ['123', '456'] }

    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn(() => Promise.resolve(formData)),
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn()
      }
    }
    adminApi.api.postCabinetTemplateDuplicateName.mockResolvedValue({ data: false })

    adminApi.api.postCabinetTemplate.mockResolvedValue({ data: { id: 2 } })

    await wrapper.vm.handleSubmit()

    expect(adminApi.api.postCabinetTemplateDuplicateName).toHaveBeenCalledWith({ label: formData.label })
    expect(adminApi.api.postCabinetTemplate).toHaveBeenCalled()
    expect(wrapper.vm.FormRendererRef.vFormRenderRef.resetForm).toHaveBeenCalled()
    expect(wrapper.vm.state.visible).toBe(false)
    expect(ElMessage.success).toHaveBeenCalled()
  })
  it('handles error during submission with duplicate name', async () => {
    const formData = { label: 'New Folder', userGroups: ['type1&&&&id1'] }
    wrapper.vm.state.isEdit = false
    wrapper.vm.state.loading = false
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn(() => Promise.resolve(formData)),
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn()
      }
    }

    adminApi.api.postCabinetTemplateDuplicateName.mockResolvedValue({ data: true })

    await wrapper.vm.handleSubmit()

    expect(ElMessage.error).toHaveBeenCalledWith('common_nameExists')
  })
  it('handles error during submission', async () => {
    wrapper.vm.state.isEdit = false
    wrapper.vm.state.loading = false

    // 模拟表单数据
    const formData = { label: 'New Folder', userGroups: ['type1&&&&id1'], cabinetRoot: ['123', '456'] }
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn(() => Promise.resolve(formData)),
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn()
      }
    }
    adminApi.api.postCabinetTemplateDuplicateName.mockResolvedValue({ data: false })

    adminApi.api.postCabinetTemplate.mockRejectedValue(new Error('API Error'))

    await wrapper.vm.handleSubmit()

    expect(wrapper.vm.state.loading).toBe(false)
    expect(ElMessage.success).not.toHaveBeenCalled()
  })
})
describe('[admin-folder-cabinet]FolderCabinetSettingWorkflowDialog', () => {
  let wrapper: any
  const mockTabProvider = {}
  const mockData = {
    id: 'test-id',
    label: 'Test Label',
    allow: true,
    multiple: false,
    repeatName: false,
    labelRule: JSON.stringify([{ metadata: 'fc:docTitle', dataType: 'string' }]),
  };

  beforeEach(async () => {
    wrapper = mount(FolderCabinetSettingWorkflowDialog, {
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
    expect(wrapper.exists()).toBe(true)
  })
  it('closes dialog on confirm button click', async () => {
    await wrapper.vm.handleOpen();
    await new Promise(resolve => setTimeout(resolve, 1000))
    expect(wrapper.vm.state.visible).toBe(true); 

    await wrapper.find('#FolderCabinetSetting__Info__Save__Confirm').trigger('click'); 
    expect(wrapper.vm.state.visible).toBe(false); 
  });
  it('fetches data and opens dialog', async () => {
    const mockResponse = [{ id: '1', name: 'Test Item 1' }, { id: '2', name: 'Test Item 2' }];
    adminApi.api.getCabinetIdUseWorkflow.mockResolvedValueOnce({ data: mockResponse });

    await wrapper.vm.handleCheck(); 

    expect(adminApi.api.getCabinetIdUseWorkflow).toHaveBeenCalledWith(mockData.id); 
    expect(wrapper.vm.state.list).toEqual(mockResponse); 
    expect(wrapper.vm.state.visible).toBe(true); 
  });
  it('does not open dialog if list is empty', async () => {
    adminApi.api.getCabinetIdUseWorkflow.mockResolvedValueOnce({ data: [] });

    await wrapper.vm.handleCheck(); 

    expect(wrapper.vm.state.list).toEqual([]); 
    expect(wrapper.vm.state.visible).toBe(false); 
  });
})
