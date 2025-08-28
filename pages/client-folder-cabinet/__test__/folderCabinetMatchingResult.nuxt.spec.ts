import { describe, it, expect, vi, beforeEach, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { FolderCabinetMatchingResult } from '#components'
import { clientApi } from './mock/api'
import { ElMessageBox } from 'element-plus'
import { mockRouterProvider } from './util'
import { VxeGrid } from 'vxe-table'

vi.mock('element-plus', () => ({
  ElMessageBox: {
    confirm: vi.fn()
  }
}))

describe('[client-folder-cabinet]MatchingResult', () => {
  let wrapper: any
  global.createDetailPageParams = vi.fn()
  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(FolderCabinetMatchingResult, {
      global: {
        components: { VxeGrid },
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        },
        provide: {
          [MenuRouterKey]: mockRouterProvider
        }
      },
      props: {
        id: '411a32c8-2598-4f72-be00-da8195ad88e7'
      }
    })
  })

  it('should init the component correctly', async () => {
    const data = {
      "id": "46ff0c1f-c263-4e88-9d95-670faae5ade0",
      "rootId": "62b95cc1-0d3c-4379-943b-efedf1426fbf",
      "parentId": "15f48b87-0ae4-4735-a69e-d58bc0ad90de",
      "templateId": "411a32c8-2598-4f72-be00-da8195ad88e7",
      "label": "tesy",
      "documentType": "Customer",
      "documentPath": "/default-domain/AAATest/tesy",
      "folder": true,
      "allow": true,
      "multiple": false,
      "createdBy": "Administrator",
      "modifiedBy": "Administrator",
      "createdDate": "2025-05-06T05:12:45Z",
      "modifiedDate": "2025-05-07T04:00:01Z",
      "deadline": "2025-05-07T05:12:45.150413Z",
      "state": "delay",
      "labelRule": "[{\"dataType\": \"string\", \"metaData\": \"fc:docTitle\", \"metadata\": \"fc:docTitle\", \"noDelete\": true}]",
      "metadataValue": "{\"dpa:receiptNo\":\"aasaf\",\"dpa:remark\":\"fsafs\",\"dpa:contractNo\":\"fasf\",\"dpa:country\":\"saf\",\"dpa:paymentDate\":\"\",\"dpa:customerCode\":\"\",\"dpa:customerName\":\"\",\"dpa:expiryDate\":\"\",\"dpa:contractNature\":\"\",\"dpa:parentContractId\":\"\",\"dpa:contractStatus\":\"\",\"dpa:invoiceNo\":\"\",\"dpa:crNumber\":\"\",\"dpa:date\":\"\",\"dpa:solutionOffering\":\"\",\"dpa:status\":\"\",\"dpa:prospectId\":\"\",\"dpa:startDate\":\"\",\"dpa:approver\":\"\",\"dpa:caseId\":\"\",\"dpa:prospectName\":\"\"}",
      "repeatName": true,
      "complete": false,
      "binds": [
        {
          "id": 418330,
          "folderCabinetId": "46ff0c1f-c263-4e88-9d95-670faae5ade0",
          "bindId": "Administrator",
          "type": "user"
        },
        {
          "id": 418331,
          "folderCabinetId": "46ff0c1f-c263-4e88-9d95-670faae5ade0",
          "bindId": "administrators",
          "type": "group"
        }
      ],
      "children": [
        {
          "id": "dcadf042-600a-4e46-b941-795748d21f2f",
          "rootId": "42716a43-be74-4439-9d89-2a35597bd30c",
          "parentId": "46ff0c1f-c263-4e88-9d95-670faae5ade0",
          "templateId": "411a32c8-2598-4f72-be00-da8195ad88e7",
          "label": "Contract",
          "documentType": "ContractFolder",
          "documentPath": "/default-domain/AAATest/tesy/Contract",
          "folder": true,
          "allow": true,
          "multiple": false,
          "createdBy": "Administrator",
          "modifiedBy": "Administrator",
          "createdDate": "2025-05-06T05:12:48Z",
          "modifiedDate": "2025-05-06T05:14:33Z",
          "state": "false",
          "labelRule": "[{\"name\": \"fc:createDate\", \"dataType\": \"date\", \"metadata\": \"fc:createDate\"}, {\"name\": \"fc:label\", \"dataType\": \"string\", \"metadata\": \"fc:label\"}]",
          "metadataValue": "{\"dpa:prospectName\":\"\",\"dpa:customerCode\":\"\",\"dpa:date\":\"\",\"dpa:country\":\"\",\"dpb:currency\":\"\",\"dpd:contractValue\":\"\",\"dpa:contractNature\":\"\",\"dpa:contractNo\":\"\",\"dpa:paymentDate\":\"\",\"dpc:contractExpirationDate\":\"\",\"dpc:contractEffectiveDate\":\"\",\"dpa:expiryDate\":\"\",\"dpa:receiptNo\":\"\",\"dpg:contractID\":\"\",\"dpa:prospectId\":\"\",\"dpa:startDate\":\"\",\"dpa:customerName\":\"\",\"dpa:solutionOffering\":\"\",\"dpe:approvalStatus\":\"\",\"dpa:status\":\"\",\"dpa:contractStatus\":\"\",\"dpa:invoiceNo\":\"\",\"dpa:parentContractId\":\"\",\"dpc:contractRenewalDate\":\"\",\"dpa:crNumber\":\"\",\"dpg:contractScope\":\"\",\"dpg:contractParties\":\"\",\"dpa:caseId\":\"\",\"dpa:approver\":\"\",\"dpg:contractTerms\":\"\",\"dpb:contractAttachments\":\"\",\"dpa:remark\":\"\",\"dpg:contractType\":\"\"}",
          "repeatName": true,
          "complete": false,
          "binds": [],
          "children": [
            {
              "id": "4dea22f4-aced-4c17-a1d2-e33006250d2c",
              "rootId": "2ac5b8eb-dfab-46f3-98d2-100a94dae2ec",
              "parentId": "dcadf042-600a-4e46-b941-795748d21f2f",
              "templateId": "411a32c8-2598-4f72-be00-da8195ad88e7",
              "label": "Contract22",
              "documentType": "Contract",
              "documentPath": "/default-domain/AAATest/tesy/Contract/Contract22",
              "folder": true,
              "allow": true,
              "multiple": false,
              "createdBy": "Administrator",
              "modifiedBy": "Administrator",
              "createdDate": "2025-05-06T05:12:50Z",
              "modifiedDate": "2025-05-06T05:14:32Z",
              "state": "true",
              "labelRule": "[{\"dataType\": \"string\", \"metaData\": \"fc:docTitle\", \"metadata\": \"fc:docTitle\", \"noDelete\": true}]",
              "metadataValue": "{\"dpc:contractEffectiveDate\":\"\",\"dpa:prospectId\":\"\",\"dpa:contractPhone\":\"\",\"dpg:contractScope\":\"\",\"dpe:approvalStatus\":\"\",\"dpd:contractValue\":\"\",\"dpg:contractID\":\"\",\"dpa:contractNature\":\"\",\"dpa:contractStartDate\":\"\",\"dpc:contractRenewalDate\":\"\",\"dpb:currency\":\"\",\"dpg:contractType\":\"\",\"dpg:contractTerms\":\"\",\"dpa:crNumber\":\"\",\"dpa:parentContractId\":\"\",\"dpb:contractAttachments\":\"\",\"dpa:creation_date\":\"\",\"dpg:contractParties\":\"\",\"dpc:contractExpirationDate\":\"\"}",
              "repeatName": false,
              "complete": true,
              "binds": [],
              "children": [
                {
                  "id": "d2c8fc9b-c93a-46cf-8a73-5f2ca4d8e6c0",
                  "rootId": "b673e2e1-5bd4-4159-8ec5-a35523d190da",
                  "parentId": "4dea22f4-aced-4c17-a1d2-e33006250d2c",
                  "templateId": "411a32c8-2598-4f72-be00-da8195ad88e7",
                  "label": "Contract",
                  "documentType": "Prospects",
                  "documentPath": "/default-domain/AAATest/tesy/Contract/Contract22/Contract",
                  "folder": true,
                  "allow": true,
                  "multiple": false,
                  "createdBy": "Administrator",
                  "modifiedBy": "Administrator",
                  "createdDate": "2025-05-06T05:12:53Z",
                  "modifiedDate": "2025-05-06T05:14:32Z",
                  "state": "true",
                  "labelRule": "[{\"dataType\": \"string\", \"metaData\": \"fc:docTitle\", \"metadata\": \"fc:docTitle\", \"noDelete\": true}]",
                  "metadataValue": "{\"dpa:contractStatus\":\"\",\"dpa:date\":\"\",\"dpa:customerName\":\"\",\"dpa:country\":\"\",\"dpa:crNumber\":\"\",\"dpa:status\":\"\",\"dpa:approver\":\"\",\"dpa:prospectName\":\"\",\"dpa:paymentDate\":\"\",\"dpa:solutionOffering\":\"\",\"dpa:customerCode\":\"\",\"dpa:prospectId\":\"\",\"dpa:remark\":\"\",\"dpa:caseId\":\"\",\"dpa:startDate\":\"\",\"dpa:receiptNo\":\"\",\"dpa:contractNature\":\"\",\"dpa:contractNo\":\"\",\"dpa:parentContractId\":\"\",\"dpa:expiryDate\":\"\",\"dpa:invoiceNo\":\"\"}",
                  "repeatName": false,
                  "complete": true,
                  "binds": [],
                  "documents": [
                    {
                      "id": "b673e2e1-5bd4-4159-8ec5-a35523d190da",
                      "name": "Contract",
                      "description": null,
                      "path": "/default-domain/AAATest/tesy/Contract/Contract22/Contract",
                      "type": "Prospects",
                      "version": "0.0",
                      "createdBy": "Administrator",
                      "createdDate": "2025-05-06T05:13:27.690Z",
                      "modifiedDate": "2025-05-06T05:13:27.992Z",
                      "isFolder": true,
                      "isCheckedOut": true,
                      "properties": {
                        "dpa:docpalType": "Prospects",
                        "dc:creator": "Administrator",
                        "dc:modified": "2025-05-06T05:13:27.992Z",
                        "dc:lastContributor": "Administrator",
                        "dc:created": "2025-05-06T05:13:27.690Z",
                        "dc:title": "Contract",
                        "dc:contributors": [
                          "Administrator"
                        ],
                        "uid:major_version": 0,
                        "uid:minor_version": 0,
                        "common:icon": "/img/folder.gif"
                      },
                      "parentRef": "2ac5b8eb-dfab-46f3-98d2-100a94dae2ec",
                      "logicalPath": null,
                      "auditComment": null,
                      "auditName": null,
                      "permissionName": null
                    }
                  ],
                  "children": []
                }
              ],
              "documents": [
                {
                  "id": "2ac5b8eb-dfab-46f3-98d2-100a94dae2ec",
                  "name": "Contract22",
                  "description": null,
                  "path": "/default-domain/AAATest/tesy/Contract/Contract22",
                  "type": "Contract",
                  "version": "0.0",
                  "createdBy": "Administrator",
                  "createdDate": "2025-05-06T05:13:23.523Z",
                  "modifiedDate": "2025-05-06T05:13:24.014Z",
                  "isFolder": true,
                  "isCheckedOut": true,
                  "properties": {
                    "dpa:docpalType": "Contract",
                    "dc:creator": "Administrator",
                    "dc:modified": "2025-05-06T05:13:24.014Z",
                    "dc:lastContributor": "Administrator",
                    "dc:created": "2025-05-06T05:13:23.523Z",
                    "dc:title": "Contract22",
                    "dc:contributors": [
                      "Administrator"
                    ],
                    "uid:major_version": 0,
                    "uid:minor_version": 0,
                    "common:icon": "/img/folder.gif"
                  },
                  "parentRef": "42716a43-be74-4439-9d89-2a35597bd30c",
                  "logicalPath": null,
                  "auditComment": null,
                  "auditName": null,
                  "permissionName": null
                }
              ]
            },
            {
              "id": "faba15e2-a9e7-49a6-8d4f-ed1e25b79c92",
              "rootId": "e3302e2b-fdcb-42c8-922f-b4e68392e59c",
              "parentId": "dcadf042-600a-4e46-b941-795748d21f2f",
              "templateId": "411a32c8-2598-4f72-be00-da8195ad88e7",
              "label": "Contract224",
              "documentType": "Pre-Sales",
              "documentPath": "/default-domain/AAATest/tesy/Contract/Contract224",
              "folder": true,
              "allow": true,
              "multiple": false,
              "createdBy": "Administrator",
              "modifiedBy": "Administrator",
              "createdDate": "2025-05-06T05:12:55Z",
              "modifiedDate": "2025-05-06T05:14:33Z",
              "state": "true",
              "labelRule": "[{\"dataType\": \"string\", \"metaData\": \"fc:docTitle\", \"metadata\": \"fc:docTitle\", \"noDelete\": true}]",
              "metadataValue": "{\"dpa:approver\":\"\",\"dpa:contractNo\":\"\",\"dpa:crNumber\":\"\",\"dpa:caseId\":\"\",\"dpa:solutionOffering\":\"\",\"dpa:customerName\":\"\",\"dpa:date\":\"\",\"dpa:prospectId\":\"\",\"dpa:parentContractId\":\"\",\"dpa:contractNature\":\"\",\"dpa:expiryDate\":\"\",\"dpa:invoiceNo\":\"\",\"dpa:receiptNo\":\"\",\"dpa:prospectName\":\"\",\"dpa:paymentDate\":\"\",\"dpa:remark\":\"\",\"dpa:contractStatus\":\"\",\"dpa:status\":\"\",\"dpa:startDate\":\"\",\"dpa:customerCode\":\"\",\"dpa:country\":\"\"}",
              "repeatName": false,
              "complete": true,
              "binds": [],
              "documents": [
                {
                  "id": "e3302e2b-fdcb-42c8-922f-b4e68392e59c",
                  "name": "Contract224",
                  "description": null,
                  "path": "/default-domain/AAATest/tesy/Contract/Contract224",
                  "type": "Pre-Sales",
                  "version": "0.0",
                  "createdBy": "Administrator",
                  "createdDate": "2025-05-06T05:13:23.816Z",
                  "modifiedDate": "2025-05-06T05:13:25.209Z",
                  "isFolder": true,
                  "isCheckedOut": true,
                  "properties": {
                    "dpa:docpalType": "Pre-Sales",
                    "dc:creator": "Administrator",
                    "dc:modified": "2025-05-06T05:13:25.209Z",
                    "dc:lastContributor": "Administrator",
                    "dc:created": "2025-05-06T05:13:23.816Z",
                    "dc:title": "Contract224",
                    "dc:contributors": [
                      "Administrator"
                    ],
                    "uid:major_version": 0,
                    "uid:minor_version": 0,
                    "common:icon": "/img/folder.gif"
                  },
                  "parentRef": "42716a43-be74-4439-9d89-2a35597bd30c",
                  "logicalPath": null,
                  "auditComment": null,
                  "auditName": null,
                  "permissionName": null
                }
              ],
              "children": []
            }
          ],
          "documents": [
            {
              "id": "42716a43-be74-4439-9d89-2a35597bd30c",
              "name": "2025-05-06-undefined",
              "description": null,
              "path": "/default-domain/AAATest/tesy/Contract",
              "type": "ContractFolder",
              "version": "0.0",
              "createdBy": "Administrator",
              "createdDate": "2025-05-06T05:13:20.544Z",
              "modifiedDate": "2025-05-06T05:13:21.068Z",
              "isFolder": true,
              "isCheckedOut": true,
              "properties": {
                "dpa:docpalType": "ContractFolder",
                "dc:creator": "Administrator",
                "dc:modified": "2025-05-06T05:13:21.068Z",
                "dc:lastContributor": "Administrator",
                "dc:created": "2025-05-06T05:13:20.544Z",
                "dc:title": "2025-05-06-undefined",
                "dc:contributors": [
                  "Administrator"
                ],
                "uid:major_version": 0,
                "uid:minor_version": 0,
                "common:icon": "/img/folder.gif"
              },
              "parentRef": "62b95cc1-0d3c-4379-943b-efedf1426fbf",
              "logicalPath": null,
              "auditComment": null,
              "auditName": null,
              "permissionName": null
            }
          ]
        }
      ],
      "notificationReminder": {
        "intervalTime": 1,
        "tos": [
          "Administrator",
          "administrator"
        ],
        "ccs": null
      },
      "emailReport": {
        "intervalTime": 1,
        "tos": [
          "Administrator"
        ],
        "ccs": []
      }
    }
    vi.spyOn(clientApi.api, 'postCabinetVerificationComplete').mockResolvedValue({ data: data })

    vi.spyOn(clientApi.api, 'getCabinetTemplateId').mockResolvedValue({})
    const docItem = {
      "allow": true,
      "documentType": "Customer",
      "multiple": false,
      "label": "tesy",
      "templateId": "411a32c8-2598-4f72-be00-da8195ad88e7",
      "documentPath": "/default-domain/AAATest/tesy",
      "parentId": "15f48b87-0ae4-4735-a69e-d58bc0ad90de",
      "createdBy": "Administrator",
      "modifiedDate": "2025-05-07T04:00:01Z",
      "documentId": "62b95cc1-0d3c-4379-943b-efedf1426fbf",
      "id": "46ff0c1f-c263-4e88-9d95-670faae5ade0",
      "state": "delay",
      "complete": false,
      "deadline": "2025-05-07T05:12:45.150413Z",
      "_X_ROW_KEY": "row_70"
    }
    const templateId = '411a32c8-2598-4f72-be00-da8195ad88e7'
    await wrapper.vm.init(docItem, templateId)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.state.activeDoc).toEqual(docItem)
    expect(wrapper.vm.state.templateId).toBe(templateId)
    expect(clientApi.api.postCabinetVerificationComplete).toHaveBeenCalled()

    expect(wrapper.vm.state.treeData).toEqual(data.children)
    expect(wrapper.vm.state.loading).toBe(false)
  })

  it('should addDocToChildren the component correctly', async () => {
    const children = [
      {
        'id': '1111',
        'children': [
          {
            'id': 'dedecda4-4c60-42ed-8b37-b04ffc4a26f6',
            'name': '简历 - 副本 (2).txt',
            'description': null,
            'path': '/default-domain/workspaces/Folder Cabinet Test/test(1)/Contract/简历 - 副本 (2).txt',
            'type': null,
            'version': '',
            'createdBy': null,
            'createdDate': null,
            'modifiedDate': '2024-03-12T08:20:01.878Z',
            'isFolder': false,
            'isCheckedOut': false,
            'properties': null,
            'parentRef': '30738784-1aca-4f70-9400-a6c5967fdc3c',
            'logicalPath': null,
            'auditComment': null,
            'auditName': null,
            'permissionName': null,
            'isDoc': true
          },
          {
            'id': '3acb1d75-15ce-4088-8cca-c70baba3f4cf',
            'name': '简历 - 副本 (2).txt',
            'description': null,
            'path': '/default-domain/workspaces/Folder Cabinet Test/test(1)/Contract/简历 - 副本 (2).txt',
            'type': null,
            'version': '',
            'createdBy': null,
            'createdDate': null,
            'modifiedDate': '2024-04-17T08:46:13.468Z',
            'isFolder': false,
            'isCheckedOut': true,
            'properties': null,
            'parentRef': '30738784-1aca-4f70-9400-a6c5967fdc3c',
            'logicalPath': null,
            'auditComment': null,
            'auditName': null,
            'permissionName': null,
            'isDoc': true
          }
        ],
        'documentPath': '/default-domain/workspaces/Folder Cabinet Test/test(1)/Contract'
      }
    ]
    const documentPath = '/default-domain/AAATest/tesy/Contract/Contract224'
    await wrapper.vm.addDocToChildren(children, documentPath)
    await wrapper.vm.$nextTick()

  })

  it('should showError the component correctly', async () => {
    const data = {
      'id': 'e5c5e15c-4ae1-4d68-a3b0-f7abbbc31073',
      'parentId': '4a8124b0-6511-4889-9cfa-50fe493ec64c',
      'templateId': '8457155f-96e4-45c3-aaf3-c9f77a98b2cd',
      'label': 'Contract File',
      'documentType': 'ContractFile',
      'folder': false,
      'allow': false,
      'multiple': false,
      'createdBy': 'Administrator',
      'modifiedBy': 'Joshua',
      'createdDate': '2024-03-12T00:20:02Z',
      'modifiedDate': '2025-05-08T07:03:21Z',
      'state': 'false',
      'repeatName': true,
      'complete': false,
      'binds': [],
      'documents': [
        {
          'id': 'dedecda4-4c60-42ed-8b37-b04ffc4a26f6',
          'name': '简历 - 副本 (2).txt',
          'description': null,
          'path': '/default-domain/workspaces/Folder Cabinet Test/test(1)/Contract/简历 - 副本 (2).txt',
          'type': null,
          'version': '',
          'createdBy': null,
          'createdDate': null,
          'modifiedDate': '2024-03-12T08:20:01.878Z',
          'isFolder': false,
          'isCheckedOut': false,
          'properties': null,
          'parentRef': '30738784-1aca-4f70-9400-a6c5967fdc3c',
          'logicalPath': null,
          'auditComment': null,
          'auditName': null,
          'permissionName': null,
          'isDoc': true
        },
        {
          'id': '3acb1d75-15ce-4088-8cca-c70baba3f4cf',
          'name': '简历 - 副本 (2).txt',
          'description': null,
          'path': '/default-domain/workspaces/Folder Cabinet Test/test(1)/Contract/简历 - 副本 (2).txt',
          'type': null,
          'version': '',
          'createdBy': null,
          'createdDate': null,
          'modifiedDate': '2024-04-17T08:46:13.468Z',
          'isFolder': false,
          'isCheckedOut': true,
          'properties': null,
          'parentRef': '30738784-1aca-4f70-9400-a6c5967fdc3c',
          'logicalPath': null,
          'auditComment': null,
          'auditName': null,
          'permissionName': null,
          'isDoc': true
        }
      ],
      'children': [
        {
          'id': 'dedecda4-4c60-42ed-8b37-b04ffc4a26f6',
          'name': '简历 - 副本 (2).txt',
          'description': null,
          'path': '/default-domain/workspaces/Folder Cabinet Test/test(1)/Contract/简历 - 副本 (2).txt',
          'type': null,
          'version': '',
          'createdBy': null,
          'createdDate': null,
          'modifiedDate': '2024-03-12T08:20:01.878Z',
          'isFolder': false,
          'isCheckedOut': false,
          'properties': null,
          'parentRef': '30738784-1aca-4f70-9400-a6c5967fdc3c',
          'logicalPath': null,
          'auditComment': null,
          'auditName': null,
          'permissionName': null,
          'isDoc': true
        },
        {
          'id': '3acb1d75-15ce-4088-8cca-c70baba3f4cf',
          'name': '简历 - 副本 (2).txt',
          'description': null,
          'path': '/default-domain/workspaces/Folder Cabinet Test/test(1)/Contract/简历 - 副本 (2).txt',
          'type': null,
          'version': '',
          'createdBy': null,
          'createdDate': null,
          'modifiedDate': '2024-04-17T08:46:13.468Z',
          'isFolder': false,
          'isCheckedOut': true,
          'properties': null,
          'parentRef': '30738784-1aca-4f70-9400-a6c5967fdc3c',
          'logicalPath': null,
          'auditComment': null,
          'auditName': null,
          'permissionName': null,
          'isDoc': true
        }
      ],
      'documentPath': '/default-domain/workspaces/Folder Cabinet Test/test(1)/Contract'
    }

    await wrapper.vm.showError(data)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.showError(data)).toBe(true)
  })

  it('should showFolderError the component correctly', async () => {
    const data = {
      folder: true,
      complete: false
    }

    await wrapper.vm.showFolderError(data)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.showFolderError(data)).toBe(true)
  })

  it('should getCss the component correctly', async () => {
    const data = {
      isDoc: true,
      complete: false
    }

    await wrapper.vm.getCss(data)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.getCss(data)).toBe('ellipsis el-icon--right')
  })

  it('should showAddButton the component correctly', async () => {
    const data = {
      'id': 'd4a1058b-7bc0-4df3-a131-fcc9db3a693a',
      'rootId': 'f7fb03a7-38c9-49b8-9f72-c618c42ba93f',
      'parentId': '56b59044-5828-4b74-8866-5ef7a049b086',
      'templateId': '17dac973-ee2e-43a3-993d-3eca3e159485',
      'label': 'test2',
      'documentType': 'Prospect Profile',
      'documentPath': '/new Folder1688632436106/new Folder1688699964915/New Folder/test1/test2',
      'folder': true,
      'allow': true,
      'multiple': false,
      'createdBy': 'Joshua',
      'modifiedBy': 'Joshua',
      'createdDate': '2025-05-08T07:02:45Z',
      'modifiedDate': '2025-05-08T07:03:21Z',
      'state': 'true',
      'labelRule': '[{"dataType": "string", "metaData": "fc:docTitle", "metadata": "fc:docTitle", "noDelete": true}]',
      'metadataValue': '{"dpf:contactInformation":"","dpf:businessNeeds":"","dpg:documentOwner":"","dpf:companyInformation":"","dph:documentVersion":""}',
      'repeatName': false,
      'complete': true,
      'binds': [],
      'documents': [
        {
          'id': 'f7fb03a7-38c9-49b8-9f72-c618c42ba93f',
          'name': 'test2',
          'description': null,
          'path': '/new Folder1688632436106/new Folder1688699964915/New Folder/test1/test2',
          'type': 'Prospect Profile',
          'version': '0.0',
          'createdBy': 'Joshua',
          'createdDate': '2025-05-08T07:03:15.415Z',
          'modifiedDate': '2025-05-08T07:03:15.566Z',
          'isFolder': true,
          'isCheckedOut': true,
          'properties': {
            'dpa:docpalType': 'Prospect Profile',
            'dc:creator': 'Joshua',
            'dc:modified': '2025-05-08T07:03:15.566Z',
            'dc:lastContributor': 'Joshua',
            'dc:created': '2025-05-08T07:03:15.415Z',
            'dc:title': 'test2',
            'dc:contributors': [
              'Joshua'
            ],
            'uid:major_version': 0,
            'uid:minor_version': 0,
            'common:icon': '/img/folder.gif'
          },
          'parentRef': '2d36807d-a23a-444d-8107-087c4c17f3f4',
          'logicalPath': null,
          'auditComment': null,
          'auditName': null,
          'permissionName': null
        }
      ],
      'children': []
    }
    await wrapper.vm.showAddButton(data)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.showAddButton(data)).toBe(false)
  })

  it('should refresh the component correctly', async () => {
    wrapper.vm.state.activeDoc = ''
    wrapper.vm.state.templateId = ''

    await wrapper.vm.refresh()
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 1000))

    expect(wrapper.vm.state.loading).toBe(false)
  })

  it('should handleAddFile the component correctly', async () => {
    const handleOpenSpy = vi.spyOn(wrapper.vm.UploadFileDialogRef, 'handleOpen')

    const item = { name: 'aaa', id: '1111' }
    await wrapper.vm.handleAddFile(item)
    await wrapper.vm.$nextTick()

    expect(handleOpenSpy).toHaveBeenCalled()
  })

  it('should handleDeleteFile the component correctly', async () => {
    const data = { path: '/11/qwe' }
    const apiSpy = vi.spyOn(clientApi.api, 'deleteNuxeoDocumentTrash')
    ElMessageBox.confirm.mockResolvedValue('confirm')
    await wrapper.vm.handleDeleteFile(data)
    await wrapper.vm.$nextTick()

    expect(apiSpy).toHaveBeenCalled()
  })

  it('should handlePreview the component correctly', async () => {
    const row = { name: 'aaa', id: '123' }

    await wrapper.vm.handlePreview(row)
    await wrapper.vm.$nextTick()

    expect(mockRouterProvider.navigateTo).toHaveBeenCalled()
  })

  it('should handleOpenReplaceDialog the component correctly', async () => {
    const handleOpenSpy = vi.spyOn(wrapper.vm.BrowseActionsReplaceDialogRef, 'handleOpen')

    await wrapper.vm.handleOpenReplaceDialog()
    await wrapper.vm.$nextTick()

    expect(handleOpenSpy).toHaveBeenCalled()
  })

  it('should refreshCabinet the component correctly', async () => {
    const apiSpy = vi.spyOn(clientApi.api, 'getCabinetRefreshcompletestatusId')

    await wrapper.vm.refreshCabinet()
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 1000))

    expect(apiSpy).toHaveBeenCalled()
    expect(wrapper.vm.state.refreshLoading).toBe(false)
  })

  it('should handleInitFolderCabinet the component correctly', async () => {
    wrapper.vm.state.cabinetTemplate = {
      'id': 'a9358336-7d51-4ee3-9f3f-674a6476e059',
      'rootId': '8fbbac85-5998-429f-ab00-a0e67f3f5ff8',
      'parentId': '41cec595-9381-422e-b060-44d4e7344c5b',
      'label': 'Test1',
      'documentType': 'Folder',
      'documentPath': '/default-domain/sean test',
      'pathIds': 'root,test_doc',
      'folder': true,
      'allow': false,
      'multiple': false,
      'createdBy': 'sean-admin',
      'modifiedBy': 'Joshua',
      'createdDate': '2025-03-05T06:05:24Z',
      'modifiedDate': '2025-04-16T01:55:18Z',
      'binds': [
        {
          'id': 415245,
          'folderCabinetId': 'a9358336-7d51-4ee3-9f3f-674a6476e059',
          'bindId': 'administrators',
          'type': 'group'
        },
        {
          'id': 415246,
          'folderCabinetId': 'a9358336-7d51-4ee3-9f3f-674a6476e059',
          'bindId': 'nurse',
          'type': 'group'
        }
      ],
      'metadata': [],
      'labelRule': '[{"name": "fc:creator", "dataType": "string", "metadata": "fc:creator"}, {"name": "fc:createDate", "dataType": "date", "metadata": "fc:createDate"}, {"name": "fc:docTitle", "dataType": "string", "metadata": "fc:docTitle"}]',
      'metadataValue': '{"dc:expired":""}',
      'notificationReminder': {
        'intervalTime': 5,
        'tos': [
          'createBy'
        ],
        'ccs': null
      },
      'emailReport': {
        'intervalTime': 5,
        'tos': [
          'createBy'
        ],
        'ccs': null
      },
      'emailReminder': {
        'intervalTime': 5,
        'tos': [
          'createBy'
        ],
        'ccs': null
      },
      'children': [
        {
          'id': '8cfce6f1-c9b7-4c8a-8211-a9c6be508b7d',
          'parentId': 'a9358336-7d51-4ee3-9f3f-674a6476e059',
          'label': 'demo-file',
          'documentType': 'File',
          'pathIds': 'root,test_doc,demo-file',
          'folder': false,
          'allow': false,
          'multiple': true,
          'complete': false,
          'metadata': [],
          'labelRule': '[{"name": "fc:label", "dataType": "string", "metadata": "fc:label"}, {"dataType": "string", "metaData": "fc:docTitle", "metadata": "fc:docTitle", "noDelete": true}, {"name": "fc:createDate", "dataType": "date", "metadata": "fc:createDate"}, {"name": "fc:creator", "dataType": "string", "metadata": "fc:creator"}]',
          'metadataValue': '{"dc:nature":"","dc:language":"","dc:coverage":"","dc:format":"","dc:expired":"","dpk:printingSpecifications":""}',
          'repeatName': false
        }
      ],
      'repeatName': false,
      'acls': [
        {
          'id': 'administrators:Everything:true:nine::',
          'userId': 'administrators',
          'permission': 'Everything',
          'grarntedBy': 'nine',
          'startDate': null,
          'endDate': null,
          'print': false
        },
        {
          'id': 'ITDept:Everything:true:nine::',
          'userId': 'ITDept',
          'permission': 'Everything',
          'grarntedBy': 'nine',
          'startDate': null,
          'endDate': null,
          'print': false
        }
      ]
    }
    wrapper.vm.state.activeDoc.documentPath = '/new Folder1688632436106/new Folder1688699964915/New Folder/test2'
    const handleOpenSpy = vi.spyOn(wrapper.vm.NextDialogRef, 'handleOpen')

    await wrapper.vm.handleInitFolderCabinet()
    await wrapper.vm.$nextTick()

    expect(handleOpenSpy).toHaveBeenCalled()
  })

})
