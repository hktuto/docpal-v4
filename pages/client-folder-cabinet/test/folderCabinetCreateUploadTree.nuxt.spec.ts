import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { FolderCabinetCreateUploadTree } from '#components'

import { mockRouterProvider } from './util'

vi.mock('../../../packages/base/components/meta/renderForm', () => {
  return {
    default: {
      userDisplayTimeSetting: true
    }
  }
})

describe('[client-folder-cabinet]FolderCabinetCreateUploadTree', () => {
  let wrapper: any
  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(FolderCabinetCreateUploadTree, {
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

  it('should getData the component correctly', async () => {
    const isValidate = false
    const result = await wrapper.vm.getData(isValidate)
    await wrapper.vm.$nextTick()

    expect(result).toEqual([])
  })

  it('should getLabelList the component correctly', async () => {
    wrapper.vm.state.selectedRow = {
      labelRule: false
    }

    expect(wrapper.vm.getLabelList()).toEqual([{
      'dataType': 'string',
      'metadata': 'fc:docTitle',
      'noDelete': true
    }])
  })

  it('should getMetaName the component correctly', async () => {
    wrapper.vm.state.selectedRow = {
      properties: {},
      label: 'aaa'
    }
    await wrapper.vm.getMetaName()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.getMetaName()).toEqual('')
  })

  it('should handleNodeClick the component correctly', async () => {
    const row = {
      metadataValue: '',
      folder: true,
      properties: {},
      documentType: 'testType',
      docName: 'Test Document',
      label: 'Test Label'
    }

    wrapper.vm.MetaFormRef = {
      init: vi.fn(),
      setData: vi.fn()
    }

    await wrapper.vm.handleNodeClick(row)
    await wrapper.vm.$nextTick()
    await nextTick()
    await new Promise(resolve => setTimeout(resolve, 3000))

    expect(wrapper.vm.state.selectedRow).toEqual(row)
    expect(wrapper.vm.state.selectedRow.properties).toEqual({})
  })

  it('should handleMetaChange the component correctly', async () => {
    const data = {
      formModel: {}
    }

    await wrapper.vm.handleMetaChange(data)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.state.selectedRow.properties).toEqual(data.formModel)
    expect(wrapper.vm.state.selectedRow.previewName).toBe('')
  })

  it('should getCss the component correctly', async () => {
    wrapper.vm.state.isCheck = true
    const data = {
      folder: false,
      children: []
    }

    await wrapper.vm.getCss(data)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.getCss(data)).toBe('lack-item')
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

  it('should handleAddFile the component correctly', async () => {
    const clickSpy = vi.spyOn(wrapper.vm.fileUploaderRef, 'click')

    const treeItem = {
      'id': '4563946a-1b09-4d3b-827e-2b1d949ffc7c',
      'parentId': '1c7b3618-5574-422d-9686-36548792310a',
      'label': 'Multiple Personal Picture',
      'documentType': 'Picture',
      'pathIds': 'root,personal_files,personal_resume,simple_personal_picture',
      'folder': false,
      'allow': false,
      'multiple': true,
      'complete': false,
      'repeatName': true,
      'isLack': false,
      'previewName': 'Multiple Personal Picture',
      'children': []
    }
    await wrapper.vm.handleAddFile(treeItem)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.state.treeItem).toEqual(treeItem)
    expect(clickSpy).toHaveBeenCalled()
  })

  it('should uploadHandler the component correctly', async () => {
    const e = {
      target: {
        files: [new File(['content'], 'test.txt')],
        value: ''
      }
    }

    wrapper.vm.state.treeItem = {
      'id': '4563946a-1b09-4d3b-827e-2b1d949ffc7c',
      'parentId': '1c7b3618-5574-422d-9686-36548792310a',
      'label': 'Multiple Personal Picture',
      'documentType': 'Picture',
      'pathIds': 'root,personal_files,personal_resume,simple_personal_picture',
      'folder': false,
      'allow': false,
      'multiple': true,
      'complete': false,
      'repeatName': true,
      'isLack': false,
      'previewName': 'Multiple Personal Picture',
      'children': []
    }

    await wrapper.vm.uploadHandler(e)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.state.treeItem.loading).toBe(false)
  })

  it('should handleDeleteFile the component correctly', async () => {
    const removeSpy = vi.spyOn(wrapper.vm.treeRef, 'remove')

    const treeItem = {
      'id': '4563946a-1b09-4d3b-827e-2b1d949ffc7c',
      'parentId': '1c7b3618-5574-422d-9686-36548792310a',
      'label': 'Multiple Personal Picture',
      'documentType': 'Picture',
      'pathIds': 'root,personal_files,personal_resume,simple_personal_picture',
      'folder': false,
      'allow': false,
      'multiple': true,
      'complete': false,
      'repeatName': true,
      'isLack': false,
      'previewName': 'Multiple Personal Picture',
      'children': []
    }
    await wrapper.vm.handleDeleteFile(treeItem)
    await wrapper.vm.$nextTick()

    expect(removeSpy).toHaveBeenCalled()
  })

})
