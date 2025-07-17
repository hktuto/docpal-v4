import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { FolderCabinetCreateDialog } from '#components'
import { clientApi } from '~/test/mock/api'
import { mockRouterProvider } from './util'
import { VxeGrid } from 'vxe-table'
import dialogForm from '../components/folderCabinet/create/dialog.vform.json'

describe('[client-folder-cabinet]FolderCabinetCreateDialog', () => {
  let wrapper: any
  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(FolderCabinetCreateDialog, {
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
  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('should handleOpen the component correctly', async () => {
    const id = '123'
    const cabinetTemplate = {
      id: 'd4a1058b-7bc0-4df3-a131-fcc9db3a693a',
      rootId: 'f7fb03a7-38c9-49b8-9f72-c618c42ba93f',
      parentId: '56b59044-5828-4b74-8866-5ef7a049b086',
      templateId: '17dac973-ee2e-43a3-993d-3eca3e159485',
      label: 'test2',
      documentType: 'Prospect Profile',
      documentPath: '/new Folder1688632436106/new Folder1688699964915/New Folder/test1/test2',
      folder: true,
      allow: true,
      multiple: false,
      createdBy: 'Joshua',
      modifiedBy: 'Joshua',
      createdDate: '2025-05-08T07:02:45Z',
      modifiedDate: '2025-05-08T07:03:21Z',
      state: 'true',
      labelRule: '[{"dataType": "string", "metaData": "fc:docTitle", "metadata": "fc:docTitle", "noDelete": true}]',
      metadataValue: '{"dpf:contactInformation":"","dpf:businessNeeds":"","dpg:documentOwner":"","dpf:companyInformation":"","dph:documentVersion":""}',
      repeatName: false,
      complete: true,
      binds: [],
      children: []
    }
    vi.spyOn(clientApi.api, 'getCabinetTemplateId').mockResolvedValue({ data: cabinetTemplate })

    wrapper.vm.MetaFormRef = {
      init: vi.fn(),
      setData: vi.fn()
    }

    wrapper.vm.FormRendererRef = {
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormJson: vi.fn().mockResolvedValue(dialogForm)
      }
    }

    await wrapper.vm.handleOpen(id)
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 1000))

    expect(wrapper.vm.state.loading).toBe(false)
    expect(wrapper.vm.state.visible).toBe(true)
    expect(wrapper.vm.state.cabinetTemplate).toEqual(cabinetTemplate)
  })

  it('should formChange the component correctly', async () => {
    wrapper.vm.state.initLoading = false
    wrapper.vm.state.cabinetTemplate.labelRule = '[{ "metadata": "fc:docTitle", "dataType": "string" }]'
    const params = {
      fieldName: 'testField',
      formModel: {},
      newValue: 'newValue',
      oldValue: 'oldValue'
    }

    await wrapper.vm.formChange(params)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.state.previewName).toBe('')
  })
  it('should getMetaName the component correctly', async () => {
    const labelRule = '[{ "metadata": "fc:docTitle", "dataType": "string" }]'
    wrapper.vm.state.cabinetTemplate = {
      labelRule: labelRule
    }

    const getMetaNameSpy = vi.spyOn(wrapper.vm, 'getMetaName')

    wrapper.vm.MetaFormRef = {
      getData: vi.fn()
    }

    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockReturnValue({
        title: 'aa'
      })
    }

    await wrapper.vm.getMetaName()
    await wrapper.vm.$nextTick()

    expect(getMetaNameSpy).toHaveBeenCalled()
  })

  
  it('should handleSubmit the component correctly', async () => {
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockReturnValue({
        title: 'aa',
        label: 'test-label'
      })
    }
    wrapper.vm.MetaFormRef = {
      getData: vi.fn()
    }
    await wrapper.vm.handleSubmit()
    expect(wrapper.vm.state.loading).toBe(false)
  })
})
