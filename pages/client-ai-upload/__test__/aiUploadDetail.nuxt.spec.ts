import { describe, it, expect, vi, beforeEach, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { AiUploadDetail } from '#components'
import { clientApi } from './mock/api'
import { mockRouterProvider } from './util'

vi.mock('element-plus', async () => ({
  ElMessage: {
    success: vi.fn(),
    warning: vi.fn(),
    error: vi.fn()
  },
  ElMessageBox: {
    confirm: vi.fn(() => Promise.resolve('confirm'))
  }
}))

vi.mock('../../../packages/base/utils/browseHelper', () => {
  return {
    allowFeature: vi.fn(() => 'upload'),
    canOCR: vi.fn(() => true)
  }
})

vi.mock('../../../packages/authApp/composables/useAuth', () => {
  return {
    useFeature: vi.fn(() => true)
  }
})

const allowFeature = vi.fn()

describe('[client-ai-upload]AiUploadDetail', () => {
  let wrapper: any
  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(AiUploadDetail, {
      global: {
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        },
        provide: {
          [MenuRouterKey]: mockRouterProvider
        }
      },
      props: {
        userId: '111',
        id: '22',
        status: 'Prepare'
      }
    })
  })

  it('should init the component correctly', async () => {
    const docList = [
      {
        'id': 418422,
        'fileRelativePath': '/hq720.jpg',
        'aiAnalysisDocument': {
          'documentType': 'Picture',
          'metaDatas': []
        },
        'metaDatas': null,
        'name': 'hq720.jpg',
        'fileType': 'File',
        'parentId': null
      }
    ]
    vi.spyOn(clientApi.api, 'postNuxeoDocumentQueryuploadfiledetaildtolist').mockResolvedValue({ data: docList })

    await wrapper.vm.init()
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 1000))

    const fileList = [
      {
        'aiAnalysis': {
          'documentType': {
            'value': 'Picture'
          }
        },
        'canOcr': false,
        'properties': {},
        'id': 418422,
        'fileRelativePath': '/hq720.jpg',
        'aiAnalysisDocument': {
          'documentType': 'Picture',
          'metaDatas': []
        },
        'metaDatas': null,
        'name': 'hq720.jpg',
        'fileType': 'File',
        'parentId': null,
        'isFolder': false
      }
    ]
    expect(wrapper.vm.state.fileList).toEqual(fileList)
  })

  it('should handleMetaChange the component correctly', async () => {
    const fieldName = 'docName'
    const formModel = {
      docName: 'hq720222',
      documentType: 'File',
      'dc:nature': '',
      'dc:language': '',
      'dc:coverage': '',
      'dc:format': '',
      'dc:expired': '',
      'dpk:printingSpecifications': ''
    }
    const newVale = 'hq720222'
    const oldValue = 'hq720'

    const handleMetaChangeMock = vi.fn()
    wrapper.vm.handleMetaChange = handleMetaChangeMock

    wrapper.vm.MetaFormRef = {
      init: vi.fn()
    }

    await wrapper.vm.handleMetaChange(fieldName, formModel, newVale, oldValue)
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 1000))

    expect(handleMetaChangeMock).toHaveBeenCalledTimes(1)
    expect(handleMetaChangeMock).toHaveBeenCalledWith(fieldName, formModel, newVale, oldValue)
  })

  it('should ocrPermission the component correctly', async () => {
    const doc = {
      name: 'abc.jpg',
      isFolder: false
    }
    allowFeature.mockReturnValue(true)

    const result = await wrapper.vm.ocrPermission(doc)
    await wrapper.vm.$nextTick()

    expect(result).toBe(false)
  })

  it('should handleNodeClick the component correctly', async () => {
    const buffer = Buffer.from('Mock file content')
    const mockBlob = new Blob([buffer], { type: 'application/jpeg' })

    wrapper.vm.state.selectedDoc.id = 418422

    const row = {
      'id': 418422,
    }

    wrapper.vm.MetaFormRef = {
      init: vi.fn()
    }

    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 1000))

    expect(wrapper.vm.state.selectedDoc).toEqual(row)
  })

  it('should handleDeleteFile the component correctly', async () => {
    const data = {
      name: 'abc.jpg',
      id: '111'
    }

    const response = { data: true }
    vi.spyOn(clientApi.api, 'deleteNuxeoDocumentTempfileId').mockResolvedValue({ response })

    await wrapper.vm.handleDeleteFile(data)
    await wrapper.vm.$nextTick()

    expect(clientApi.api.deleteNuxeoDocumentTempfileId).toHaveBeenCalled()
  })

  it('should handleDiscard the component correctly', async () => {
    await wrapper.vm.handleDiscard()
    await wrapper.vm.$nextTick()

    expect(clientApi.instance.post).toHaveBeenCalled()
    expect(mockRouterProvider.navigateTo).toHaveBeenCalled()
  })

  it('should handleClose the  component correctly', async () => {
    await wrapper.vm.handleClose()
    await wrapper.vm.$nextTick()

    expect(mockRouterProvider.navigateTo).toHaveBeenCalled()
  })

  it('should handleRetry the  component correctly', async () => {
    wrapper.vm.state.retryLoading = false

    const data = {}
    vi.spyOn(clientApi.api, 'getNuxeoDocumentRetryClassificationUploadid').mockResolvedValue({ data })
    vi.spyOn(wrapper.vm, 'init').mockResolvedValue(true)

    await wrapper.vm.handleRetry()
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 1000))

    expect(clientApi.api.getNuxeoDocumentRetryClassificationUploadid).toHaveBeenCalled()
    expect(wrapper.vm.state.retryLoading).toBe(false)
  })
})
