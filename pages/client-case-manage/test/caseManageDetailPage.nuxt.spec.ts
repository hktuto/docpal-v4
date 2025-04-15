import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { CaseDetail, ResponsiveFilter } from '#components'
import { VxeGrid } from 'vxe-table'
import { clientApi } from './mock/api'

describe('CaseManageDetailPage', () => {
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
          '}'
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
    wrapper.vm.initCondition()
    await wrapper.vm.$nextTick()
    expect(clientApi.api.getCaseTypesCasetypeidRecordsPageConditions).toHaveBeenCalled()
    expect(wrapper.vm.responsiveFilter.init).toHaveBeenCalled()
  })

  it('should render the sort or filter from', () => {
    const params = {
      orderBy: 'created_date',
      isDesc: true,
      pageNum: 0,
      pageSize: 20,
      q: 'ab',
      where: {
        file: '233'
      }
    }

    const extraParams = {
      q: 'ab',
      file: '233'
    }
    wrapper.vm.tableRef = {
      reload: vi.fn()
    }

    // wrapper.vm.handleFilterFormChange(extraParams)

    console.log(22,wrapper.vm.tableRef)
    expect(wrapper.vm.reload).toHaveBeenCalled()

    expect(clientApi.api.postCaseTypesCasetypeidRecordsPage).toHaveBeenCalled()
    expect(params.q).toBe('ab')
    expect(params.orderBy).toBe('created_date')
    expect(params.isDesc).toBe(true)
    expect(params.where.file).toBe('233')
  })

  it.skip('should render the Click dblClickAction', async () => {
    wrapper.vm.tableRef = {
      dblClickAction: vi.fn()
    }
    const row = { id: 112, name: 'Test' }
    await wrapper.vm.tableRef.dblClickAction(row)

    expect(wrapper.vm.tableRef.dblClickAction).toHaveBeenCalled()
  })


})
