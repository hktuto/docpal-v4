import { describe, it, expect, vi, beforeEach, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { AiUpload } from '#components'
import { VxeGrid } from 'vxe-table'
import { clientApi } from './mock/api'
import { ElMessage, ElMessageBox } from 'element-plus'
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

describe('[client-ai-upload]AiUploadIndex', () => {
  let wrapper: any
  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(AiUpload, {
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

  it('should render the component correctly', () => {
    expect(wrapper.findComponent(VxeGrid).exists()).toBe(true)
  })

  it('should handleFilterFormChange the component correctly', async () => {
    const filterModel = { isDesc: false }
    await wrapper.vm.handleFilterFormChange(filterModel)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.extraParams).toEqual(filterModel)
  })

  it('should dblclickHandler the component correctly', async () => {

    const row = {
      uploadStatus: 'Ready',
      uploadId: '111'
    }
    wrapper.vm.dblclickHandler(row)
    wrapper.vm.$nextTick()

    const item = {
      id: 'ai-upload-detial-' + row.uploadId,
      name: 'ai-upload-detial-' + row.uploadId,
      label: 'AIUpload',
      component: 'LazyAiUploadDetail',
      props: {
        id: row.uploadId,
        status: row.uploadStatus
      }
    }
    expect(mockRouterProvider.navigateTo).toHaveBeenCalledWith(item)
  })

  it('should handleDelete the component correctly', async () => {

    await wrapper.vm.handleDelete('f6155379-a8ed-45c1-94bb-342059816e66')
    await wrapper.vm.$nextTick()

    expect(clientApi.api.postNuxeoDocumentQueryuploadfiledtopage).toHaveBeenCalled()
  })

  it('should showStructure the component correctly', async () => {
    const row = { id: 'f6155379-a8ed-45c1-94bb-342059816e66', label: 'abc' }
    wrapper.vm.AiUploadPreviewDialogRef = { handleOpen: vi.fn() }

    await wrapper.vm.showStructure(row)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.AiUploadPreviewDialogRef.handleOpen).toHaveBeenCalled()
  })

})
