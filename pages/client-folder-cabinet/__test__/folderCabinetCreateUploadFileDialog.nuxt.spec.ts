import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { FolderCabinetCreateUploadFileDialog } from '#components'
import { clientApi } from './mock/api'
import { mockRouterProvider } from './util'
import { VxeGrid } from 'vxe-table'

describe('[client-folder-cabinet]FolderCabinetCreateUploadFileDialog', () => {
  let wrapper: any
  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(FolderCabinetCreateUploadFileDialog, {
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


  it('should handleChange the component correctly', async () => {
    wrapper.vm.state.fileList = [
      {
        name: 'test1.jpg'
      }
    ]

    wrapper.vm.MetaFormRef = {
      setData: vi.fn()
    }

    await wrapper.vm.handleChange()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.MetaFormRef.setData).toHaveBeenCalled()
  })

  it('should handleMetaChange the component correctly', async () => {
    const data = {
      formModel: {
        isDesc: true
      }
    }

    await wrapper.vm.handleMetaChange(data)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.state.metaFormData).toEqual({ isDesc: true })
    expect(wrapper.vm.state.setting.previewName).toEqual('')
  })

  it('should handleOpen the component correctly', async () => {
    wrapper.vm.MetaFormRef = {
      init: vi.fn(),
      setData: vi.fn()
    }

    const setting = {
      metadataValue: '{"id":"1","name":"test"}'
    }
    await wrapper.vm.handleOpen(setting)
    await wrapper.vm.$nextTick()
    await wrapper.vm.nextTick
    await new Promise((resolve) => setTimeout(resolve, 2000))

    expect(wrapper.vm.state.dialogOpened).toBe(true)
    expect(wrapper.vm.state.setting).toEqual(setting)
    expect(wrapper.vm.state.fileList).toEqual([])
    expect(wrapper.vm.state.setting.metadataValue).toEqual(setting.metadataValue)
  })

  it('should handleSubmit the component correctly', async () => {
    const data = {}
    vi.spyOn(clientApi.api, 'postNuxeoDocumentIsduplicatename').mockResolvedValue({ data: data })
    vi.spyOn(clientApi.api, 'postNuxeoDocumentCreatedocument')

    wrapper.vm.state.fileList = [
      { id: 'a1' }
    ]
    wrapper.vm.state.setting.previewName = 'test-previewName'
    const getFormData = {
      'docName': 'aaaa',
      'dpc:contractExpirationDate': '',
      'dpc:contractRenewalDate': '',
      'dpa:contractNature': '',
      'dpa:status': '',
      'dpa:caseId': '',
      'dpa:paymentDate': '',
      'dpe:approvalStatus': '',
      'dpb:currency': '',
      'dpb:contractAttachments': [''],
      'dpa:parentContractId': '',
      'dpa:contractStatus': '',
      'dpa:customerName': '',
      'dpa:prospectId': '',
      'dpc:contractEffectiveDate': '',
      'dpa:approver': '',
      'dpg:contractTerms': '',
      'dpa:invoiceNo': '',
      'dpa:contractNo': '',
      'dpa:solutionOffering': '',
      'dpa:date': '',
      'dpg:contractType': '',
      'dpa:country': '',
      'dpa:customerCode': '',
      'dpa:expiryDate': '',
      'dpa:receiptNo': '',
      'dpa:startDate': '',
      'dpg:contractScope': '',
      'dpa:crNumber': '',
      'dpa:prospectName': '',
      'dpa:remark': ''
    }

    wrapper.vm.MetaFormRef = {
      getData: vi.fn(() => Promise.resolve(getFormData))
    }

    await wrapper.vm.handleSubmit()
    await wrapper.vm.$nextTick()

    expect(clientApi.api.postNuxeoDocumentIsduplicatename).toHaveBeenCalled()
    expect(clientApi.api.postNuxeoDocumentCreatedocument).toHaveBeenCalled()
    expect(wrapper.vm.state.dialogOpened).toBe(false)
    expect(wrapper.vm.state.loading).toBe(false)
  })

  it('should handleReplace the component correctly', async () => {
    const inputFile = {}
    const file = { raw: '' }

    const spyOn = vi.spyOn(clientApi.api, 'patchNuxeoDocumentReplacefileV2')

    await wrapper.vm.handleReplace(inputFile, file)
    await wrapper.vm.$nextTick()

    expect(spyOn).toHaveBeenCalled()
    expect(wrapper.vm.state.dialogOpened).toBe(false)
    expect(wrapper.vm.state.loading).toBe(false)
  })

})
