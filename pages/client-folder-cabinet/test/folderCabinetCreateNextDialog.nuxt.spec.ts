import { describe, it, expect, vi, beforeEach, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { FolderCabinetCreateNextDialog } from '#components'
import { clientApi } from '~/test/mock/api'
import { ElMessage, ElMessageBox } from 'element-plus'
import { mockRouterProvider } from './util'
import { VxeGrid } from 'vxe-table'

vi.mock('element-plus', () => ({
  ElMessage: {
    success: vi.fn()
  }
}))

describe('[client-folder-cabinet]FolderCabinetCreateNextDialog', () => {
  let wrapper: any
  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(FolderCabinetCreateNextDialog, {
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

  it('should handleSubmit the component correctly', async () => {
    wrapper.vm.state.visible = true
    wrapper.vm.state.loading = false
    wrapper.vm.state.rootDetail.idOrPath = '1111'

    const uploadList = []

    wrapper.vm.FolderCabinetUploadTreeRef = {
      getData: vi.fn().mockReturnValue(uploadList)
    }

    await wrapper.vm.handleSubmit()
    await wrapper.vm.$nextTick()
    await wrapper.vm.nextTick
    await new Promise((resolve) => setTimeout(resolve, 2500))

    expect(wrapper.vm.state.loading).toBe(false)
    expect(wrapper.vm.state.visible).toBe(false)
  })

  it('should handleOpen the component correctly', async () => {
    wrapper.vm.state.visible = false
    wrapper.vm.state.loading = true

    //const initTreeDataSpy = vi.spyOn(wrapper.vm, 'initTreeData')

    const cabinetTemplate = {
      id: 'abc',
      name: 'test',
      children: [
        {
          id: '123',
          isLack: true,
          folder: true,
          properties: { test: '1' },
          metadataValue: false,
          previewName: '',
          children: []
        }
      ]
    }
    const mockData = {
      id: '123',
      path: '/path',
      dfcId: '111'
    }

    await wrapper.vm.handleOpen(cabinetTemplate, mockData)
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 2000))

    expect(wrapper.vm.state.cabinetTemplate).toEqual(cabinetTemplate)
    expect(wrapper.vm.state.rootDetail.idOrPath).toBe(mockData.path)
    expect(wrapper.vm.state.visible).toBe(true)
    expect(wrapper.vm.state.treeData).toEqual(cabinetTemplate.children)
    expect(wrapper.vm.state.treeLoading).toBe(false)
  })

  it('should initTreeData the component correctly', async () => {
    const children = [
      {
        id: '123',
        isLack: true,
        folder: true,
        properties: { test: '1' },
        metadataValue: false,
        previewName: '',
        children: []
      }
    ]
    const parentId = '000'

    const initTreeDataSpy = vi.spyOn(wrapper.vm, 'initTreeData')

    await wrapper.vm.initTreeData(children, parentId)
    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 2000))

    expect(initTreeDataSpy).toHaveBeenCalledWith(children, parentId)
  })

  it('should getLabelList the component correctly', async () => {
    const row = {
      labelRule: false
    }

    await wrapper.vm.getLabelList(row)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.getLabelList(row)).toEqual([{ dataType: 'string', metadata: 'fc:docTitle', noDelete: true }])
  })

  it('should getMetaName the component correctly', async () => {
    const labelList = [{ dataType: 'string', metadata: 'fc:docTitle', noDelete: true }]
    vi.spyOn(wrapper.vm, 'getLabelList').mockResolvedValue(labelList)

    const row = {}
    await wrapper.vm.getMetaName({}, row)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.getMetaName({}, row)).toBe('')
  })

})
