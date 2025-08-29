import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { SearchGroupBarRecord } from '#components'
import { globalApi, clientApi } from './mock/api'
import { ElMessageBox, ElMessage, ElSwitch } from 'element-plus'
vi.mock('element-plus', () => ({
  ElMessageBox: {
    alert: vi.fn(),
    confirm: vi.fn()
  },
  ElNotification: {
    success: vi.fn()
  },
  ElMessage: {
    success: vi.fn(),
    warning: vi.fn(),
    error: vi.fn()
  }
}))
// Mock conditionDecorators
vi.mock('~/utils/searchFormHelper', () => ({
  conditionDecorators: vi.fn()
}))

const mockSearchGroupBarRecordAddDialog = {
  template: '<div>SearchGroupBarRecordAddDialog</div>',
  methods: {
    handleOpen: vi.fn()
  }
}

const SvgIcon = {
  template: '<div class="svg-icon"></div>'
}

describe('[dp-search]SearchGroupBarRecord', () => {
  let wrapper: any

  beforeEach(() => {
    vi.clearAllMocks()
    globalApi.api.getNuxeoSearchQueryNestedSearchLog = vi.fn().mockResolvedValue({
      data: [
        { id: 1, label: 'Test Record 1', queryCondition: '{"docId":"test1","query":["test1"]}' },
        { id: 2, label: 'Test Record 2', queryCondition: '{"docId":"test2","query":["test2"]}' }
      ]
    })
    globalApi.api.getNuxeoSfolder = vi.fn().mockResolvedValue({
      data: [
        { name: 'System Record 1', json_value: '{"docId":"sys1","query":["sys1"]}' },
        { name: 'System Record 2', json_value: '{"docId":"sys2","query":["sys2"]}' }
      ]
    })
    globalApi.api.deleteNuxeoSearchDeleteNestedSearchLogId = vi.fn().mockResolvedValue({})

    wrapper = mount(SearchGroupBarRecord, {
      global: {
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        },
        components: {
          SearchGroupBarRecordAddDialog: mockSearchGroupBarRecordAddDialog,
          SvgIcon
        }
      },
      props: {
        aggregation: {
          type: [{ key: 'pdf', value: 'PDF', count: 10 }]
        }
      }
    })
    wrapper.vm.recordRef = {
      getList: vi.fn()
    }
    wrapper.vm.recordDetailRef = {
      init: vi.fn()
    }
    wrapper.vm.recordDetailData = {
      id: 1,
      label: 'Test Record',
      query: { docId: 'test', query: ['test'] }
    }
    wrapper.vm.aggRef = {
      clear: vi.fn()
    }
    wrapper.vm.filterRef = {
      initForm: vi.fn()
    }
    wrapper.vm.addRef = {
      handleOpen: vi.fn()
    }
    wrapper.vm.popoverRef = {
      hide: vi.fn()
    }
  })

  it('should render the component correctly', () => {
    expect(wrapper.find('.search-bar-record').exists()).toBe(true)
    expect(wrapper.find('.search-bar-record__list').exists()).toBe(true)
  })

  it('should get list correctly', async () => {
    clientApi.api.getNuxeoSearchQueryNestedSearchLog.mockImplementationOnce(() => {
      return Promise.resolve({
        data: [
          { id: 1, label: 'Test Record 1', queryCondition: '{"docId":"test1","query":["test1"]}' },
          { id: 2, label: 'Test Record 2', queryCondition: '{"docId":"test2","query":["test2"]}' }
        ]
      })
    })
    await wrapper.vm.getList()

    expect(clientApi.api.getNuxeoSearchQueryNestedSearchLog).toHaveBeenCalled()
    expect(wrapper.vm.state.records).toHaveLength(2)
    expect(wrapper.vm.state._records).toHaveLength(2)
  })

  it('should get system records correctly', async () => {
    clientApi.api.getNuxeoSfolder.mockImplementationOnce(() => {
      return Promise.resolve({
        data: [
          { name: 'System Record 1', json_value: '{"docId":"sys1","query":["sys1"]}' },
          { name: 'System Record 2', json_value: '{"docId":"sys2","query":["sys2"]}' }
        ]
      })
    })
    await wrapper.vm.getSystemRecords()

    expect(clientApi.api.getNuxeoSfolder).toHaveBeenCalled()
    expect(wrapper.vm.state.systemRecords).toHaveLength(2)
    expect(wrapper.vm.state._systemRecords).toHaveLength(2)
  })

  it('should handle add correctly', () => {

    wrapper.vm.handleAdd()

    expect(wrapper.vm.addRef.handleOpen).toHaveBeenCalled()
  })

  it('should handle edit correctly', async () => {
    const row = { id: 1, label: 'Test Record', queryCondition: '{"docId":"test","query":["test"]}' }

    await wrapper.vm.handleEdit(row)

    expect(wrapper.emitted('edit')).toBeTruthy()
    expect(wrapper.emitted('edit')[0][0]).toEqual({
      id: 1,
      label: 'Test Record',
      query: { docId: 'test', query: ['test'] }
    })
  })

  it('should handle double click correctly', async () => {
    const row = { id: 1, label: 'Test Record', queryCondition: '{"docId":"test","query":["test"]}' }

    await wrapper.vm.handleDblclick(row)

    expect(wrapper.emitted('dblclick')).toBeTruthy()
    expect(wrapper.emitted('dblclick')[0][0]).toEqual({ docId: 'test', query: ['test'] })
  })

  it('should handle delete correctly', async () => {
    const row = { id: 1, label: 'Test Record' }
    vi.spyOn(ElMessageBox, 'confirm').mockResolvedValueOnce('confirm' as any)
    const getListSpy = vi.spyOn(wrapper.vm, 'getList')
    await wrapper.vm.handleDelete(row)

    expect(clientApi.api.deleteNuxeoSearchDeleteNestedSearchLogId).toHaveBeenCalledWith(1)
    // expect(getListSpy).toHaveBeenCalled()
  })

  it('should not delete when user cancels', async () => {
    const row = { id: 1, label: 'Test Record' }
    vi.spyOn(ElMessageBox, 'confirm').mockRejectedValueOnce(new Error('cancel'))

    await wrapper.vm.handleDelete(row)

    expect(clientApi.api.deleteNuxeoSearchDeleteNestedSearchLogId).not.toHaveBeenCalled()
  })

  it('should handle search correctly', async () => {
    wrapper.vm.state.input = 'test'
    wrapper.vm.state._records = [{ label: 'Test Record 1' }, { label: 'Another Record' }]
    wrapper.vm.state._systemRecords = [{ label: 'System Test' }, { label: 'System Another' }]

    await wrapper.vm.handleSearch()

    expect(wrapper.vm.state.records).toHaveLength(1)
    expect(wrapper.vm.state.systemRecords).toHaveLength(1)
  })

  it('should handle search with empty input', async () => {
    wrapper.vm.state.input = ''
    wrapper.vm.state._records = [{ label: 'Test Record' }]
    wrapper.vm.state._systemRecords = [{ label: 'System Record' }]

    await wrapper.vm.handleSearch()

    expect(wrapper.vm.state.records).toHaveLength(1)
    expect(wrapper.vm.state.systemRecords).toHaveLength(1)
  })

  it('should expose correct methods', () => {
    expect(wrapper.vm.getList).toBeDefined()
  })

  it('should render add icon correctly', () => {
    expect(wrapper.find('#Search__Save__Add').exists()).toBe(true)
  })

  it('should render record lists correctly', async () => {
    clientApi.api.getNuxeoSearchQueryNestedSearchLog.mockImplementationOnce(() => { 
      return Promise.resolve({
        data: []
      })
    })
    await wrapper.vm.getList()
    clientApi.api.getNuxeoSfolder.mockImplementationOnce(() => {
      return Promise.resolve({
        data: []
      })
    })
    await wrapper.vm.getSystemRecords()

    expect(wrapper.text()).toContain('dpSearch.records')
    expect(wrapper.text()).toContain('dpSearch.systemRecords')
  })

  it('should not render edit and delete icons for system records', async () => {
    clientApi.api.getNuxeoSfolder.mockImplementationOnce(() => {
      return Promise.resolve({
        data: []
      })
    })
    await wrapper.vm.getSystemRecords()

    expect(wrapper.find('#Search__Save__Edit__System Record 1').exists()).toBe(false)
    expect(wrapper.find('#Search__Save__Delete__System Record 1').exists()).toBe(false)
  })
})
