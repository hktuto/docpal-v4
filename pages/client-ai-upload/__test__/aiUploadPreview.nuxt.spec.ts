import { describe, it, expect, vi, beforeEach, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { AiPreview } from '#components'
import { VxeGrid } from 'vxe-table'
import { clientApi } from './mock/api'
import { mockRouterProvider } from './util'

vi.mock('element-plus', async () => ({
  ElMessage: {
    success: vi.fn(),
    warning: vi.fn()
  },
  ElMessageBox: {
    confirm: vi.fn(() => Promise.resolve('confirm'))
  }
}))

describe('[client-ai-upload]AiUploadPreview', () => {
  let wrapper: any
  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(AiPreview, {
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
        doc: {
          id: '11',
          fileRelativePath: 'qwe/test.jpg',
          isFolder: false
        }
      }
    })
  })

  it('should getBlobFile the component correctly', async () => {
    const buffer = Buffer.from('Mock file content')
    const mockBlob = new Blob([buffer], { type: 'application/jpeg' })

    wrapper.vm.state.blob = {
      size: 1433451,
      type: 'image/jpeg'
    }
    wrapper.vm.state.encodeUrl = 'http://localhost:3000/95a68cd6-8332-4f90-980a-f76a93228d54'

    vi.spyOn(clientApi.api, 'getNuxeoDocumentDownloadTempFileId').mockResolvedValue(mockBlob)
    await wrapper.vm.getBlobFile('418443')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.state.loading).toBe(false)
  })

  it('should checkExtension the component correctly', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.fileType).toBe('image')
  })

})
