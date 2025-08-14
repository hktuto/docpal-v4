import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'
import { FolderCabinetSettingTree, ResponsiveFilter } from '#components'
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
    template: '<div><slot /></div>',
  },
  ElTree: {
    name: 'ElTree',
    props: ['data', 'node-key', 'props', 'default-expand-all', 'highlight-current'],
    template: '<div><slot /></div>',
  },
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
const handleAddChild = vi.fn()
describe('[admin-folder-cabinet]FolderCabinetSettingTree', () => {
  let wrapper: any
  const mockTabProvider = {}
  const mockData = [
    { id: 1, label: 'Folder 1', folder: true, children: [{ id: 1 - 2, label: 'File 1', folder: false }] },
    { id: 2, label: 'File 1', folder: false }
  ]
  beforeEach(async () => {
    wrapper = mount(FolderCabinetSettingTree, {
      props: {
        id: 'test-id',
        data: mockData
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog, Editorjs },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider,
          handleAddChild: handleAddChild
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key },
        }
      }
    })
    await wrapper.vm.$nextTick()
    // const dialogRef = wrapper.vm.$refs.FolderCabinetAddChildDialogRef
    // dialogRef.handleOpen = vi.fn()

    // const tableRef = wrapper.vm.$refs.detailRef
    // tableRef.init = vi.fn()
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('renders correctly', async () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.folder-tree').exists()).toBe(true)
  })
  it('emits current-change event on node change', async () => {
    wrapper.vm.handleCurrentChange(mockData[0], {})
    expect(wrapper.emitted()['current-change']).toBeTruthy()
    expect(wrapper.emitted()['current-change'][0]).toEqual([mockData[0], {}])
  })
})
