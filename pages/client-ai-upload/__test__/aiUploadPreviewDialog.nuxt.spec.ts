import { describe, it, expect, vi, beforeEach, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { AiUploadPreviewDialog } from '#components'
import { VxeGrid } from 'vxe-table'
import { clientApi } from './mock/api'
import { ElMessage, ElMessageBox } from 'element-plus'
import { mockRouterProvider } from './util'
import { aw } from 'vitest/dist/chunks/reporters.C_zwCd4j'

vi.mock('element-plus', async () => ({
  ElMessage: {
    success: vi.fn(),
    warning: vi.fn()
  },
  ElMessageBox: {
    confirm: vi.fn(() => Promise.resolve('confirm'))
  }
}))

describe('[client-ai-upload]AiUploadAiPreviewDialog', () => {
  let wrapper: any
  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(AiUploadPreviewDialog, {
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

  it('should handleOpen the component correctly', async () => {
    const row = { uploadId: '11' }

    await wrapper.vm.handleOpen(row)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.state.visible).toBe(true)
  })

  it('should init the component correctly', async () => {
    const id = '11'
    const docList = [{
      'id': 418436,
      'fileRelativePath': '/hq720.jpg',
      'aiAnalysisDocument': {
        'documentType': 'Picture',
        'metaDatas': []
      },
      'metaDatas': '{}',
      'name': 'hq720.jpg',
      'fileType': 'File',
      'parentId': null
    }]
    vi.spyOn(clientApi.api, 'postNuxeoDocumentQueryuploadfiledetaildtolist').mockResolvedValue({ data: docList })

    await wrapper.vm.init(id)
    await wrapper.vm.$nextTick()

    const fileList = [{
      'id': 418436,
      'fileRelativePath': '/hq720.jpg',
      'aiAnalysisDocument': {
        'documentType': 'Picture',
        'metaDatas': []
      },
      'metaDatas': '{}',
      'name': 'hq720.jpg',
      'fileType': 'File',
      'parentId': null,
      'isFolder': false
    }]
    expect(wrapper.vm.state.fileList).toEqual(fileList)
  })
})
