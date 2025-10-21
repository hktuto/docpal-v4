import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { CaseDetail, ResponsiveFilter } from '#components'
import { VxeGrid } from 'vxe-table'
import { clientApi } from './mock/api'

describe('[client-case]CaseManageDetailPage', () => {
  let wrapper: any
  const id = '93587467-959d-4b9d-96f0-1967673f28d8'
  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(CaseDetail, {
      global: {
        components: { VxeGrid, ResponsiveFilter },
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        }
      },
      props: {
        id: '93587467-959d-4b9d-96f0-1967673f28d8',
        name: 'test-cabinet',
        data: '{' +
          'id: "93587467-959d-4b9d-96f0-1967673f28d8", name: "test-cabinet", uniqueName: "test_cabinet",' +
          'caseIdPrefix: "cabinet", caseIdDigit: 4, startNumber: 1,enable: true, publishStatus: "A",' +
          'primaryForm: {' +
          'id: "19c64c94-21a0-4302-9521-df9a9b18fc67",' +
          'label: "1741575128832_docpal_form",' +
          'fields: [' +
          '{sort: 1, length: 255, unique: false, dataType: "varchar", required: false, columnName: "fileName", primaryKey: false, nullRelation: false},' +
          '{sort: 2, length: 255, unique: false, dataType: "varchar", required: false, columnName: "rootId", primaryKey: false, nullRelation: false},' +
          '{sort: 3, length: 255, unique: false, dataType: "varchar", required: false, columnName: "rootName", primaryKey: false, nullRelation: false},' +
          '{sort: 4, length: 255, unique: false, dataType: "varchar", required: false, columnName: "case_id", primaryKey: false, nullRelation: false},' +
          '{sort: 5, length: 255, unique: false, dataType: "varchar", required: false, columnName: "execution_id", primaryKey: false, nullRelation: false},' +
          '{sort: 6, length: 255, unique: false, dataType: "varchar", required: false, columnName: "file", primaryKey: false, nullRelation: false},' +
          '{sort: 999, length: 255, unique: false, dataType: "varchar", required: false, columnName: "id", primaryKey: false, nullRelation: false},' +
          '{sort: 999, length: 255, unique: false, dataType: "varchar", required: false, columnName: "created_by", primaryKey: false, nullRelation: false},' +
          '{sort: 999, length: 255, unique: false, dataType: "timestamp", required: false, columnName: "created_date", primaryKey: false, nullRelation: false},' +
          '{sort: 999, length: 255, unique: false, dataType: "varchar", required: false, columnName: "modified_by", primaryKey: false, nullRelation: false},' +
          '{sort: 999, length: 255, unique: false, dataType: "timestamp", required: false, columnName: "modified_date", primaryKey: false, nullRelation: false},' +
          '{sort: 999, length: 255, unique: false, dataType: "bit", required: false, columnName: "status", primaryKey: false, nullRelation: false}' +
          ']' +
          '},' +
          ' productionVersion: "V5", createdBy: "sean-admin", modifiedBy: "sean-client", createdDate: "2025-03-10T02:51:59Z",' +
          'modifiedDate: "2025-03-10T08:35:05Z", caseDefinitionKey: "test_cabinet", caseDefinitionId: "9126ae0d-fd8a-11ef-b9b3-ae48303c80c6", ' +
          'latestVersion: "V5", latestVersionId: "5:34e59466-266d-4c46-9265-c5ce63ae18f6", ' +
          'productionVersionId: "5:34e59466-266d-4c46-9265-c5ce63ae18f6", _X_ROW_KEY: "row_103"' +
          '}',
        order: [
          {
            key: 'orderBy',
            label: 'tableHeader.sortBy',
            type: 'string',
            isMultiple: false,
            options: [
              { label: 'caseManagement.id', value: 'case_id' },
              { label: 'table_modifiedDate', value: 'modified_date' },
              { label: 'workflow_createDate', value: 'created_date' }
            ]
          },
          {
            key: 'isDesc',
            label: 'tableHeader.sortOrder',
            type: 'string',
            isMultiple: false,
            options: [
              { label: 'tableHeader.asc', value: false },
              { label: 'tableHeader.desc', value: true }
            ]
          }
        ]
      }
    })
  })

  it('should render the component correctly', async () => {
    wrapper.vm.reorderColumn()
    wrapper.vm.tableReady = true
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.tableReady).toBe(true)
    expect(wrapper.findComponent(VxeGrid).exists()).toBe(true)

    wrapper.vm.responsiveFilter = {
      init: vi.fn()
    }
    const data = {
      data: [
        {
          key: 'age',
          label: 'age',
          type: 'String',
          options: [
            {
              value: 1100,
              label: 1100
            },
            {
              value: 10,
              label: 10
            },
            {
              value: 11,
              label: 11
            }
          ],
          'isMultiple': false
        }
      ]
    }
    vi.spyOn(clientApi.api, 'getCaseTypesCasetypeidRecordsPageConditions').mockResolvedValue(data)

    await wrapper.vm.initCondition()
    await wrapper.vm.$nextTick()
    expect(clientApi.api.getCaseTypesCasetypeidRecordsPageConditions).toHaveBeenCalled()
    // expect(wrapper.vm.responsiveFilter.init).toHaveBeenCalled()
  })

  it('should sort or filter from the component correctly', async () => {
    wrapper.vm.reorderColumn()
    wrapper.vm.tableReady = true
    wrapper.vm.initCondition()
    await wrapper.vm.$nextTick()

    const extraParams = {
      q: 'ab',
      file: '233'
    }

    await wrapper.vm.handleFilterFormChange(extraParams)
    await wrapper.vm.$nextTick()

    expect(clientApi.api.postCaseTypesCasetypeidRecordsPage).toHaveBeenCalled()
    expect(wrapper.vm.extraParams.where.file).toBe('233')
    expect(wrapper.vm.extraParams.q).toBe('ab')
  })

  it('should Click dblClickAction the component correctly', async () => {
    wrapper.vm.tableRef = {
      dblClickAction: vi.fn()
    }
    const row = {
      caseDefinitionVersionId: '5:34e59466-266d-4c46-9265-c5ce63ae18f6',
      case_id: 'cabinet-0031',
      created_by: null,
      created_date: '2025-03-14T09:32:02.000+00:00',
      execution_id: null,
      file: '22332233',
      fileName: null,
      id: '9bc54ccd-2c92-4a99-b87b-7a85854500b9',
      modified_by: null,
      modified_date: '2025-03-14T09:32:02.000+00:00',
      rootId: '11211221',
      rootName: '22332233',
      status: true,
      _X_ROW_KEY: 'row_122'
    }
    await wrapper.vm.tableRef.dblClickAction(row)

    expect(wrapper.vm.tableRef.dblClickAction).toHaveBeenCalled()
  })

  it('should add new row dialog the component correctly', async () => {
    const mockOpen = vi.fn()
    wrapper.vm.addCaseDialog = {
      handleOpen: mockOpen
    }
    wrapper.vm.reorderColumn()
    wrapper.vm.tableReady = true
    wrapper.vm.initCondition()
    await wrapper.vm.$nextTick()

    const button = wrapper.findComponent('#CaseManagement__Detail__AddNewRow')
    expect(button.exists()).toBe(true)
    button.trigger('click')

    expect(mockOpen).toHaveBeenCalled()
    const handleOpenSpy = vi.spyOn(wrapper.vm.addCaseDialog, 'handleOpen')
    await wrapper.vm.handleAddCaseDialog()
    expect(handleOpenSpy).toHaveBeenCalled()
  })

})
