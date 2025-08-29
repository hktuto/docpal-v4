import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { SearchGroupBarRecordAddDialog } from '#components'

const mockFormRenderer = {
  template: '<div class="FormRenderer">FormRenderer</div>',
  methods: {
    getFormData: vi.fn().mockResolvedValue({
      label: 'Test Label',
      includeFilter: true
    })
  }
}

describe('[dp-search]SearchGroupBarRecordAddDialog', () => {
  let wrapper: any
  let getFormDataSpy: any
  const formData = {
    label: 'Test Label',
    includeFilter: true
  }
  beforeEach(async() => {
    vi.clearAllMocks()
    getFormDataSpy = vi.fn().mockResolvedValue(formData)
    wrapper = mount(SearchGroupBarRecordAddDialog, {
      global: {
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        },
        components: {
          FormRenderer: mockFormRenderer
        }
      }
    })
    wrapper.vm.state.dialogVisible = true
    wrapper.vm.FormRendererRef = {
      getFormData: getFormDataSpy
    }
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  it('should handle submit correctly', async () => {
    wrapper.vm.state.dialogVisible = true
    await wrapper.vm.handleSubmit()
    expect(wrapper.emitted('save')).toBeTruthy()
    expect(wrapper.vm.state.dialogVisible).toBe(false)
  })

  it('should not emit save when no form data', async () => {
    wrapper.vm.state.dialogVisible = true
    wrapper.vm.FormRendererRef.getFormData = vi.fn().mockResolvedValue(null)
    
    await wrapper.vm.handleSubmit()
    
    expect(wrapper.emitted('save')).toBeFalsy()
  })

  it('should handle submit error correctly', async () => {
    wrapper.vm.state.dialogVisible = true
    wrapper.vm.FormRendererRef.getFormData = vi.fn().mockRejectedValue(new Error('Form Error'))
    
    await wrapper.vm.handleSubmit()
    
    expect(wrapper.vm.state.loading).toBe(false)
  })

  it('should handle open dialog correctly', () => {
    wrapper.vm.handleOpen()
    
    expect(wrapper.vm.state.dialogVisible).toBe(true)
  })

  it('should expose correct methods', () => {
    expect(wrapper.vm.handleOpen).toBeDefined()
  })
})
