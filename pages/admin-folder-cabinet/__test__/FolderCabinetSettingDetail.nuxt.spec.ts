import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'
import { FolderCabinetSettingDetail, ResponsiveFilter } from '#components'
import { ElMessageBox, ElNotification, ElMessage } from 'element-plus'
import { mockQuery, mockTable } from './setup'
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
  },
  ElDropdown: {
    name: 'ElDropdown',
    props: ['trigger'],
    template: '<div><slot /></div>'
  },
  ElTree: {
    name: 'ElTree',
    props: ['data', 'node-key', 'props', 'default-expand-all', 'highlight-current'],
    template: '<div><slot /></div>'
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
const MasterTableVariableForm = {
  template: '<div class="MasterTableVariableForm">MasterTableVariableForm</div>',
  methods: {}
}
const WorkflowDialog = {
  template: '<div class="WorkflowDialog">WorkflowDialog</div>',
  methods: {}
}
const Editorjs = {
  template: '<div class="Editorjs">Editorjs</div>',
  methods: {}
}
describe('[admin-folder-cabinet]FolderCabinetSettingDetail', () => {
  let wrapper: any
  const mockTabProvider = {}
  const mockData = {
    id: 'test-id',
    label: 'Test Label',
    allow: true,
    multiple: false,
    repeatName: false,
    labelRule: JSON.stringify([{ metadata: 'fc:docTitle', dataType: 'string' }])
  }
  beforeEach(async () => {
    globalThis.getIgnoreSchemas = () => {
      return ['schema1', 'schema2'] // 返回需要忽略的模式
    }
    wrapper = shallowMount(FolderCabinetSettingDetail, {
      props: {
        data: mockData,
        isRoot: true,
        id: 'test-id',
        tree: { children: [] }
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog, Editorjs, WorkflowDialog, MasterTableVariableForm },
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
    // const tableRef = wrapper.vm.$refs.detailRef
    // tableRef.init = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })
  it('renders correctly', async () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h3').text()).toBe('folderCabinet.defaultMetadataValue')
  })
  it('handles document type change', async () => {
    const mockDocTypeData = [{ metadata: 'fc:docTitle', metaDataType: 'string', dataType: 'string', options: { validationType: 'string' } }]
    wrapper.vm.MetaFormRef = {
      init: vi.fn().mockResolvedValue(mockDocTypeData)
    }
    await wrapper.vm.handleDocTypeChange('newDocType')

    expect(wrapper.vm.state.curDocType).toBe('newDocType')
    expect(wrapper.vm.state.dragList.length).toBeGreaterThan(0)
  })
  it('validates and saves data', async () => {
    const mockValidData = {
      label: 'New Label',
      allow: true,
      multiple: false,
      repeatName: false
    }
    wrapper.vm.FormRef = {
      validate: vi.fn().mockReturnValue(true)
    }
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue(mockValidData),
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn().mockReturnValue(true)
      }
    }
    wrapper.vm.MetaFormRef = {
      getData: vi.fn().mockResolvedValue(mockValidData)
    }
    await wrapper.vm.handleSave()

    expect(adminApi.api.postCabinetTemplateDuplicateName).toHaveBeenCalled()

    expect(adminApi.api.patchCabinetTemplate).toHaveBeenCalled()
    expect(mockRouterProvider.message.success).toHaveBeenCalled()
  })

  it('handles save validation failure', async () => {
    wrapper.vm.FormRef = {
      validate: vi.fn().mockReturnValue(false)
    }
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue({}),
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn().mockReturnValue(true)
      }
    }
    await wrapper.vm.handleSave()

    expect(adminApi.api.patchCabinetTemplate).not.toHaveBeenCalled()
  })
  it('deletes the cabinet and confirms deletion', async () => {
    wrapper.vm.state.setting = {
      id: 'test-id'
    }
    vi.spyOn(ElMessageBox, 'confirm').mockResolvedValue('confirm')

    await wrapper.vm.handleDelete()

    expect(adminApi.api.deleteCabinetId).toHaveBeenCalledWith(mockData.id)
    expect(mockRouterProvider.message.success).toHaveBeenCalled()
  })
  it('cancels deletion', async () => {
    vi.spyOn(ElMessageBox, 'confirm').mockResolvedValue('cancel')

    await wrapper.vm.handleDelete()

    expect(adminApi.api.deleteCabinetId).not.toHaveBeenCalled()
  })
})
