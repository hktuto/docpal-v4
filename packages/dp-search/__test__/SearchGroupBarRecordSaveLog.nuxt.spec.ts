import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { SearchGroupBarRecordSaveLog } from '#components'
import { clientApi } from './mock/api'
import { ElMessageBox } from 'element-plus'

// Mock conditionDecorators
vi.mock('~/utils/searchFormHelper', () => ({
  conditionDecorators: vi.fn()
}))

const mockSearchGroupBarSaveLogAdd = {
  template: '<div>SearchGroupBarSaveLogAdd</div>',
  methods: {
    handleOpen: vi.fn()
  }
}

const SvgIcon = {
  template: '<div class="svg-icon"></div>'
}

describe('[dp-search]SearchGroupBarRecordSaveLog', () => {
  let wrapper: any

  beforeEach(async () => {
    vi.clearAllMocks()
    clientApi.api.getNuxeoSearchQueryNestedSearchLog = vi.fn().mockResolvedValue({
      data: [
        { id: 1, label: 'Test Record 1', queryCondition: '{"docId":"test1","query":["test1"]}' },
        { id: 2, label: 'Test Record 2', queryCondition: '{"docId":"test2","query":["test2"]}' }
      ]
    })
    clientApi.api.deleteNuxeoSearchDeleteNestedSearchLogId = vi.fn().mockResolvedValue({})
    
    
    wrapper = mount(SearchGroupBarRecordSaveLog, {
      global: {
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        },
        components: {
          SearchGroupBarSaveLogAdd: mockSearchGroupBarSaveLogAdd,
          SvgIcon
        }
      }
    })
    await new Promise(resolve => setTimeout(resolve, 100))
    wrapper.vm.popoverRef = {
      hide: vi.fn()
    }
    wrapper.vm.addRef = {
      handleOpen: vi.fn()
    }
  })
  
  it('should initialize on mount', () => {
    expect(clientApi.api.getNuxeoSearchQueryNestedSearchLog).toHaveBeenCalled()
  })
  it('should get list correctly', async () => {
    await wrapper.vm.getList()
    
    expect(clientApi.api.getNuxeoSearchQueryNestedSearchLog).toHaveBeenCalled()
    expect(wrapper.vm.state._searchList).toHaveLength(2)
  })

  it('should handle input change correctly', async () => {
    wrapper.vm.state.searchList = [
      { id: 1, label: 'Test Record 1' },
      { id: 2, label: 'Another Record' }
    ]
    wrapper.vm.state._searchList = [...wrapper.vm.state.searchList]
    
    await wrapper.vm.handleChange('test')
    
    expect(wrapper.vm.state._searchList).toHaveLength(1)
    expect(wrapper.vm.state._searchList[0].label).toBe('Test Record 1')
  })

  it('should handle input change with empty value', async () => {
    wrapper.vm.state.searchList = [
      { id: 1, label: 'Test Record 1' },
      { id: 2, label: 'Another Record' }
    ]
    wrapper.vm.state._searchList = [...wrapper.vm.state.searchList]
    
    await wrapper.vm.handleChange('')
    
    expect(wrapper.vm.state._searchList).toHaveLength(2)
  })

  it('should handle search correctly', async () => {
    const item = { id: 1, label: 'Test Record', queryCondition: '{"docId":"test","query":["test"]}' }
    
    await wrapper.vm.handleSearch(item)
    
    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')[0][0]).toEqual({ docId: 'test', query: ['test'] })
    expect(wrapper.vm.popoverRef.hide).toHaveBeenCalled()
  })

  it('should handle add correctly', () => {
    wrapper.vm.handleAdd()
    
    expect(wrapper.vm.addRef.handleOpen).toHaveBeenCalled()
    expect(wrapper.vm.popoverRef.hide).toHaveBeenCalled()
  })

  it('should handle delete correctly', async () => {
    const item = { id: 1, label: 'Test Record' }
    vi.spyOn(ElMessageBox, 'confirm').mockResolvedValueOnce('confirm' as any)
    await wrapper.vm.handleDelete(item)
    
    expect(clientApi.api.deleteNuxeoSearchDeleteNestedSearchLogId).toHaveBeenCalledWith(1)
  })

  it('should not delete when user cancels', async () => {
    const item = { id: 1, label: 'Test Record' }
    vi.spyOn(ElMessageBox, 'confirm').mockRejectedValueOnce(new Error('cancel'))
    
    await wrapper.vm.handleDelete(item)
    
    expect(clientApi.api.deleteNuxeoSearchDeleteNestedSearchLogId).not.toHaveBeenCalled()
  })

  it('should hide popover correctly', () => {
    wrapper.vm.hidePopover()
    
    expect(wrapper.vm.popoverRef.hide).toHaveBeenCalled()
  })

  it('should expose correct methods', () => {
    expect(wrapper.vm.getList).toBeDefined()
  })

  it('should handle delete icon click correctly', async () => {
    await wrapper.vm.getList()
    
    const deleteIcon = wrapper.find('.svg-icon')
    await deleteIcon.trigger('click')
    
    // Should not trigger search event when clicking delete icon
    expect(wrapper.emitted('search')).toBeFalsy()
  })

})
