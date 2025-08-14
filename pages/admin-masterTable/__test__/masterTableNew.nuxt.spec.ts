import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'
import { MasterTableNewTable, ResponsiveFilter } from '#components'
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
const Icon = {
  template: '<div class="Icon">Icon</div>',
  methods: {}
}
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

describe('[admin-master-table]MasterTableNewTable', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(MasterTableNewTable, {
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog, Icon },
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
    const dialogRef = wrapper.vm.$refs.schemaDialogRef
    dialogRef.handleOpen = vi.fn()
    wrapper.vm.tableConfig.data = new Array(6).fill({}).map((_, i) => ({ fieldName: `field${i}`, dataType: 'varchar' }))

    // const MasterTableTabRecordsRef = wrapper.vm.$refs.MasterTableTabRecordsRef;
    // MasterTableTabRecordsRef.initTableColumns = vi.fn();
    // const logRef = wrapper.vm.$refs.logRef;
    // logRef.refresh = vi.fn();
  })

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('should not allow adding more than 6 columns', async () => {
    wrapper.vm.state.name = 'Test Table'
    wrapper.vm.state.dataTypeList.push({
      value: 'relation',
      label: 'marsterTable.type.relation',
      unique: false
    })
    await wrapper.vm.handleSubmit()
    expect(wrapper.vm.schemaDialogRef.handleOpen).toHaveBeenCalled()
    expect(mockRouterProvider.message.error).toHaveBeenCalledWith(expect.stringContaining('noValidData'))
  })
  it('should call handleSingleSchemaAdd with correct parameters', async () => {
    const row = { unique: true, value: 'varchar' }
    await wrapper.vm.handleSingleSchemaAdd(row)
    expect(wrapper.vm.schemaDialogRef.handleOpen).toHaveBeenCalledWith({ unique: true, dataType: 'varchar' }, { disabledUnique: false })
  })

  it('should delete a row and show confirmation', async () => {
    const row = { fieldName: 'field1' }
    await wrapper.vm.handleDelete(row)
    expect(wrapper.vm.tableConfig.data).not.toContain(row)
  })

  it('should handle adding a schema', async () => {
    const schema = { fieldName: 'newField', unique: false }
    await wrapper.vm.handleAddSchama(schema)
    expect(wrapper.vm.tableConfig.data).toContainEqual(expect.objectContaining(schema))
    expect(mockRouterProvider.message.success).toHaveBeenCalled()
  })
  it('should handle updating a schema', async () => {
    const schema = { fieldName: 'existingField', unique: false }
    wrapper.vm.tableConfig.data.push(schema)
    wrapper.vm.state.curRow = schema
    const updatedSchema = { ...schema, fieldName: 'updatedField' }
    await wrapper.vm.handleUpdateSchama(updatedSchema)
    expect(wrapper.vm.tableConfig.data).toContainEqual(expect.objectContaining(updatedSchema))
  })
  it('should check if a row is default', () => {
    const ignoreList = ['id', 'created_date', 'created_by', 'modified_date', 'modified_by', 'status']
    for (const id of ignoreList) {
      const row = { fieldName: id }
      expect(wrapper.vm.isDefault(row)).toBe(true)
    }
  })
})
