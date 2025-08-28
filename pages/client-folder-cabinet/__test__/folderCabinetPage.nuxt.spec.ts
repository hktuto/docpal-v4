import { describe, it, expect, vi, beforeEach, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { FolderCabinetPage } from '#components'
import { clientApi } from './mock/api'
import { ElMessageBox } from 'element-plus'
import { mockRouterProvider } from './util'

describe('[client-folder-cabinet]FolderCabinetPage', () => {
  let wrapper: any
  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(FolderCabinetPage, {
      global: {
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

  it('should tabChange the component correctly', async () => {
    wrapper.vm.state.tabList = [
      {
        'id': '411a32c8-2598-4f72-be00-da8195ad88e7',
        'rootId': '96f025c5-cd3d-4ee3-934c-83f44529a5b0',
        'parentId': '41cec595-9381-422e-b060-44d4e7344c5b',
        'label': 'Allow Other Files Cabinet123',
        'documentType': 'Customer',
        'documentPath': '/default-domain/AAATest',
        'pathIds': 'root,allow_other_files_cabinet',
        'folder': true,
        'allow': true,
        'multiple': false,
        'createdBy': 'ikki_cheng',
        'modifiedBy': 'Administrator',
        'createdDate': '2023-12-07T09:50:51Z',
        'modifiedDate': '2025-04-30T06:46:40Z',
        'binds': [],
        'metadata': [],
        'labelRule': '[{"dataType": "string", "metaData": "fc:docTitle", "metadata": "fc:docTitle", "noDelete": true}]',
        'metadataValue': '{"dpa:receiptNo":"aasaf","dpa:remark":"fsafs","dpa:contractNo":"fasf","dpa:country":"saf","dpa:paymentDate":"","dpa:customerCode":"","dpa:customerName":"","dpa:expiryDate":"","dpa:contractNature":"","dpa:parentContractId":"","dpa:contractStatus":"","dpa:invoiceNo":"","dpa:crNumber":"","dpa:date":"","dpa:solutionOffering":"","dpa:status":"","dpa:prospectId":"","dpa:startDate":"","dpa:approver":"","dpa:caseId":"","dpa:prospectName":""}',
        'repeatName': true,
        'acls': [
          {
            'id': 'Cost_Model_Approval_Approvers:Everything:true:ooyy::',
            'userId': 'Cost_Model_Approval_Approvers',
            'permission': 'Everything',
            'grarntedBy': 'ooyy',
            'startDate': null,
            'endDate': null,
            'print': false
          },
          {
            'id': 'administrators:Everything:true:Joshua::',
            'userId': 'administrators',
            'permission': 'Everything',
            'grarntedBy': 'Administrator',
            'startDate': '2025-04-16T00:00:00.000+08:00',
            'endDate': '2025-05-20T23:59:00.000+08:00',
            'print': false
          },
          {
            'id': 'Contract_Approval_Approvers:Everything:true:ooyy::',
            'userId': 'Contract_Approval_Approvers',
            'permission': 'Everything',
            'grarntedBy': 'Administrator',
            'startDate': '2025-04-02T00:00:00.000+08:00',
            'endDate': '2025-04-26T23:59:00.000+08:00',
            'print': false
          }
        ]
      },
      {
        'id': '01bfa67a-35af-4006-a706-c40a825c919f',
        'rootId': '6545e624-6b1a-42dc-a713-0e2eeaa65cc4',
        'parentId': '41cec595-9381-422e-b060-44d4e7344c5b',
        'label': 'Personal Files',
        'documentType': 'Folder',
        'documentPath': '/default-domain/workspaces/Personal Document',
        'pathIds': 'root,personal_files',
        'folder': true,
        'allow': true,
        'multiple': false,
        'createdBy': 'Administrator',
        'modifiedBy': 'Lyle',
        'createdDate': '2023-12-08T01:41:12Z',
        'modifiedDate': '2025-02-26T06:01:11Z',
        'binds': [],
        'metadata': [],
        'labelRule': '[{"dataType": "string", "metaData": "fc:docTitle", "noDelete": true}, {"dataType": "string", "metaData": "fc:label"}]',
        'repeatName': true
      }
    ]
    const tab = '01bfa67a-35af-4006-a706-c40a825c919f'

    await wrapper.vm.tabChange(tab)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.state.activeTab).toBe(tab)
    const activeFCSetting = {
      'id': '01bfa67a-35af-4006-a706-c40a825c919f',
      'rootId': '6545e624-6b1a-42dc-a713-0e2eeaa65cc4',
      'parentId': '41cec595-9381-422e-b060-44d4e7344c5b',
      'pathIds': 'root,personal_files',
      'createdBy': 'Administrator',
      'createdDate': '2023-12-08T01:41:12Z',
      'documentPath': '/default-domain/workspaces/Personal Document',
      'documentType': 'Folder',
      'label': 'Personal Files',
      'labelRule': '[{"dataType": "string", "metaData": "fc:docTitle", "noDelete": true}, {"dataType": "string", "metaData": "fc:label"}]',
      'folder': true,
      'allow': true,
      'multiple': false,
      'modifiedBy': 'Lyle',
      'modifiedDate': '2025-02-26T06:01:11Z',
      'binds': [],
      'metadata': [],
      'repeatName': true
    }
    expect(wrapper.vm.state.activeFCSetting).toEqual(activeFCSetting)
  })

  it('should init the component correctly', async () => {
    const tabList = [
      {
        'id': '411a32c8-2598-4f72-be00-da8195ad88e7',
        'rootId': '96f025c5-cd3d-4ee3-934c-83f44529a5b0',
        'parentId': '41cec595-9381-422e-b060-44d4e7344c5b',
        'label': 'Allow Other Files Cabinet123',
        'documentType': 'Customer',
        'documentPath': '/default-domain/AAATest',
        'pathIds': 'root,allow_other_files_cabinet',
        'folder': true,
        'allow': true,
        'multiple': false,
        'createdBy': 'ikki_cheng',
        'modifiedBy': 'Administrator',
        'createdDate': '2023-12-07T09:50:51Z',
        'modifiedDate': '2025-04-30T06:46:40Z',
        'binds': [],
        'metadata': [],
        'labelRule': '[{"dataType": "string", "metaData": "fc:docTitle", "metadata": "fc:docTitle", "noDelete": true}]',
        'metadataValue': '{"dpa:receiptNo":"aasaf","dpa:remark":"fsafs","dpa:contractNo":"fasf","dpa:country":"saf","dpa:paymentDate":"","dpa:customerCode":"","dpa:customerName":"","dpa:expiryDate":"","dpa:contractNature":"","dpa:parentContractId":"","dpa:contractStatus":"","dpa:invoiceNo":"","dpa:crNumber":"","dpa:date":"","dpa:solutionOffering":"","dpa:status":"","dpa:prospectId":"","dpa:startDate":"","dpa:approver":"","dpa:caseId":"","dpa:prospectName":""}',
        'repeatName': true,
        'acls': [
          {
            'id': 'Cost_Model_Approval_Approvers:Everything:true:ooyy::',
            'userId': 'Cost_Model_Approval_Approvers',
            'permission': 'Everything',
            'grarntedBy': 'ooyy',
            'startDate': null,
            'endDate': null,
            'print': false
          },
          {
            'id': 'administrators:Everything:true:Joshua::',
            'userId': 'administrators',
            'permission': 'Everything',
            'grarntedBy': 'Administrator',
            'startDate': '2025-04-16T00:00:00.000+08:00',
            'endDate': '2025-05-20T23:59:00.000+08:00',
            'print': false
          },
          {
            'id': 'Contract_Approval_Approvers:Everything:true:ooyy::',
            'userId': 'Contract_Approval_Approvers',
            'permission': 'Everything',
            'grarntedBy': 'Administrator',
            'startDate': '2025-04-02T00:00:00.000+08:00',
            'endDate': '2025-04-26T23:59:00.000+08:00',
            'print': false
          }
        ]
      },
      {
        'id': '01bfa67a-35af-4006-a706-c40a825c919f',
        'rootId': '6545e624-6b1a-42dc-a713-0e2eeaa65cc4',
        'parentId': '41cec595-9381-422e-b060-44d4e7344c5b',
        'label': 'Personal Files',
        'documentType': 'Folder',
        'documentPath': '/default-domain/workspaces/Personal Document',
        'pathIds': 'root,personal_files',
        'folder': true,
        'allow': true,
        'multiple': false,
        'createdBy': 'Administrator',
        'modifiedBy': 'Lyle',
        'createdDate': '2023-12-08T01:41:12Z',
        'modifiedDate': '2025-02-26T06:01:11Z',
        'binds': [],
        'metadata': [],
        'labelRule': '[{"dataType": "string", "metaData": "fc:docTitle", "noDelete": true}, {"dataType": "string", "metaData": "fc:label"}]',
        'repeatName': true
      }
    ]
    vi.spyOn(clientApi.api, 'getCabinetLoginuserList').mockResolvedValue({ data: tabList })

    await wrapper.vm.init()
    await wrapper.vm.$nextTick()

    expect(clientApi.api.getCabinetLoginuserList).toHaveBeenCalled()
    expect(wrapper.vm.state.tabList).toEqual(tabList)
    expect(wrapper.vm.state.loading).toBe(false)
  })

  it('should handleRowClick the component correctly', async () => {
    const row = {
      allow: true,
      documentType: 'Customer',
      multiple: false,
      label: 'Peng',
      templateId: '411a32c8-2598-4f72-be00-da8195ad88e7',
      documentPath: '/default-domain/AAATest/Peng',
      parentId: '15f48b87-0ae4-4735-a69e-d58bc0ad90de',
      createdBy: 'Lyle',
      modifiedDate: '2025-04-11T04:00:01Z',
      documentId: 'de4ba83f-efe4-4f5f-9b59-a3dab2050541',
      id: 'c2069b92-178e-4275-beaa-b1a63374000c',
      state: 'delay',
      complete: false,
      deadline: '2025-04-11T07:37:47.134164Z',
      '_X_ROW_KEY': 'row_95'
    }
    wrapper.vm.state.activeTab = '411a32c8-2598-4f72-be00-da8195ad88e7'
    const initSpy = vi.spyOn(wrapper.vm.MatchingResultRef, 'init')
    const handleOpenSpy = vi.spyOn(wrapper.vm.InteractDrawerRef, 'handleOpen')

    await wrapper.vm.handleRowClick(row)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.state.curFolderCabinet).toEqual(row)
    expect(initSpy).toHaveBeenCalled()
    expect(handleOpenSpy).toHaveBeenCalled()
  })

})
