import { describe, it, expect, vi, beforeEach, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { MasterTablePage, MasterTableRecords } from '#components'
import { VxeGrid } from 'vxe-table'
import { clientApi } from '~/test/mock/api'
import { ElMessageBox } from 'element-plus'
import { mockRouterProvider } from './util'

describe('[client-master-table]MasterTablePage', () => {
  let wrapper: any
  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(MasterTablePage, {
      global: {
        components: { VxeGrid },
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        },
        provide: {
          [MenuRouterKey]: mockRouterProvider
        }
      }
    })
  })

  it('should render the component correctly', async () => {
    expect(wrapper.findComponent(VxeGrid).exists()).toBe(true)
  })

  it('should init the component correctly', async () => {
    const wrapper2 = mount(MasterTableRecords, {
      global: {
        components: { VxeGrid },
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        },
        provide: {
          [MenuRouterKey]: mockRouterProvider
        }
      }
    })
    wrapper2.vm.isSuperAdmin = false

    const masterTables = [
      {
        'id': '12680d28-df8b-452f-854e-af70b1749eb2',
        'name': 'Region',
        'status': 'A',
        'createdBy': 'Administrator',
        'modifiedBy': 'ikki_cheng',
        'createdDate': '2024-03-21T05:07:52Z',
        'modifiedDate': '2024-03-28T05:54:00Z',
        'userId': 'Joshua',
        'aces': 'MT_EDIT,MT_READ',
        'read': true,
        'edit': true,
        'create': false,
        'enable': false
      },
      {
        'id': '24ead113-dcd0-4a29-84df-b4a14a03f06d',
        'name': 'asd',
        'status': 'A',
        'createdBy': 'Joshua',
        'modifiedBy': 'Joshua',
        'createdDate': '2025-03-21T03:59:52Z',
        'modifiedDate': '2025-03-21T03:59:52Z',
        'userId': 'Joshua',
        'aces': 'MT_ENABLE_RECORD,MT_MANAGE,MT_EDIT,MT_READ',
        'read': true,
        'edit': true,
        'create': true,
        'enable': true
      },
      {
        'id': '5b345bc9-3678-43cf-a9de-48fee7ee5a0a',
        'name': 'Test_Band',
        'status': 'A',
        'createdBy': 'Administrator',
        'modifiedBy': 'Administrator',
        'createdDate': '2024-03-21T06:03:48Z',
        'modifiedDate': '2024-03-21T06:03:48Z',
        'userId': 'Joshua',
        'aces': 'MT_READ,MT_EDIT,MT_ENABLE_RECORD,MT_MANAGE',
        'read': true,
        'edit': true,
        'create': true,
        'enable': true
      },
      {
        'id': 'c47e3deb-272d-43ed-b66f-99b1efa1b755',
        'name': 'table_audit_logs',
        'status': 'A',
        'createdBy': 'Administrator',
        'modifiedBy': 'Administrator',
        'createdDate': '2024-08-12T04:48:42Z',
        'modifiedDate': '2024-08-12T04:48:42Z',
        'userId': 'Joshua',
        'aces': 'MT_EDIT,MT_READ,MT_MANAGE,MT_ENABLE_RECORD',
        'read': true,
        'edit': true,
        'create': true,
        'enable': true
      }
    ]
    vi.spyOn(clientApi.api, 'getMasterTablesFindAllByUser').mockResolvedValue({ data: masterTables })

    await wrapper.vm.init()
    await wrapper.vm.$nextTick()

    expect(clientApi.api.getMasterTablesFindAllByUser).toHaveBeenCalled()
    expect(wrapper.vm.state.masterTables).toEqual(masterTables)
  })

  it('should initColumns the component correctly', async () => {
    const res = {
      id: '12680d28-df8b-452f-854e-af70b1749eb2',
      name: 'Region',
      status: 'A',
      createdBy: 'Administrator',
      modifiedBy: 'ikki_cheng',
      createdDate: '2024-03-21T05:07:52Z',
      modifiedDate: '2024-03-28T05:54:00Z',
      fields: [
        {
          columnName: 'created_date',
          dataType: 'timestamp',
          primaryKey: false,
          required: true,
          unique: false
        },
        {
          columnName: 'id',
          dataType: 'varchar',
          length: 255,
          primaryKey: true,
          required: true,
          unique: true
        },
        {
          columnName: 'modified_date',
          dataType: 'timestamp',
          primaryKey: false,
          required: true,
          unique: false
        },
        {
          columnName: 'modified_by',
          dataType: 'varchar',
          length: 255,
          primaryKey: false,
          required: true,
          unique: false
        },
        {
          columnName: 'created_by',
          dataType: 'varchar',
          length: 255,
          primaryKey: false,
          required: true,
          unique: false
        },
        {
          columnName: 'Region_Code',
          dataType: 'varchar',
          length: 255,
          primaryKey: false,
          required: true,
          unique: true
        },
        {
          columnName: 'Region_Name',
          dataType: 'varchar',
          length: 255,
          primaryKey: false,
          required: true,
          unique: false
        },
        {
          columnName: 'Language',
          dataType: 'varchar',
          length: 255,
          primaryKey: false,
          required: false,
          unique: false
        },
        {
          columnName: 'status',
          dataType: 'bit',
          primaryKey: false,
          required: false,
          unique: false
        }
      ],
      userId: 'Joshua',
      aces: 'MT_EDIT,MT_READ',
      read: true,
      edit: true,
      create: false,
      enable: false
    }
    vi.spyOn(clientApi.api, 'getMasterTablesId').mockResolvedValue({ data: res })

    wrapper.vm.MasterTableTabRecordsRef = {
      initTableColumns: vi.fn()
    }

    const id = '12680d28-df8b-452f-854e-af70b1749eb2'
    await wrapper.vm.initColumns(id)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.state.curTable.columnLoading).toBe(false)
  })

  it('should handleClick the component correctly', async () => {
    const id = '12680d28-df8b-452f-854e-af70b1749eb2'
    const permission = {
      id: '12680d28-df8b-452f-854e-af70b1749eb2',
      name: 'Region',
      status: 'A',
      createdBy: 'Administrator',
      modifiedBy: 'ikki_cheng',
      createdDate: '2024-03-21T05:07:52Z',
      modifiedDate: '2024-03-28T05:54:00Z',
      userId: 'Joshua',
      aces: 'MT_EDIT,MT_READ',
      read: true,
      edit: true,
      create: false,
      enable: false
    }
    await wrapper.vm.handleClick(id, permission)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.state.curTable.id).toBe(id)
    expect(wrapper.vm.state.permission).toEqual(permission)
  })

})
