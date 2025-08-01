import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { DocTypeDialogDuplicate } from '#components'
import { ElMessage } from 'element-plus'
import { adminApi } from './mock/api'
// Mock Element Plus components
vi.mock('element-plus', () => ({
  ElMessage: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

// Mock FormRenderer component
const FormRenderer = {
  template: '<div class="form-renderer">FormRenderer</div>',
  props: ['formJson'],
  methods: {
    getFormData: vi.fn().mockResolvedValue({ name: 'Test Document Type' }),
    vFormRenderRef: {
      setFormData: vi.fn()
    }
  }
}

describe('[admin-document-type]DocTypeDialogDuplicate', () => {
  let wrapper: any

  beforeEach(async () => {
    vi.clearAllMocks()

    wrapper = mount(DocTypeDialogDuplicate, {
      global: {
        components: { FormRenderer },
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key },
          useI18n: () => ({ t: (key: string) => key })
        }
      }
    })
    wrapper.vm.state.visible = true
    await new Promise((resolve) => setTimeout(resolve, 100))
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('should render the dialog component correctly', () => {
      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('Dialog State Management', () => {
    it('should initialize with loading state false', () => {
      expect(wrapper.vm.state.loading).toBe(false)
    })

    it('should initialize with empty setting object', () => {
      expect(wrapper.vm.state.setting).toEqual({})
    })
  })

  describe('handleOpen Method', () => {
    it('should open dialog and set form data correctly', async () => {
      const mockSetting = {
        id: 'test-id',
        name: 'Test Document Type'
      }

      // Mock FormRenderer methods
      wrapper.vm.FormRendererRef = {
        vFormRenderRef: {
          setFormData: vi.fn()
        }
      }

      // Call handleOpen
      await wrapper.vm.handleOpen(mockSetting)

      // Check dialog is opened
      expect(wrapper.vm.state.visible).toBe(true)

      // Wait for setTimeout to execute
      await new Promise((resolve) => setTimeout(resolve, 0))

      // Check setting is set
      expect(wrapper.vm.state.setting).toEqual(mockSetting)

      // Check form data is set correctly
      expect(wrapper.vm.FormRendererRef.vFormRenderRef.setFormData).toHaveBeenCalledWith({
        fromName: 'Test Document Type',
        name: ''
      })
    })

    it('should handle setting with different properties', async () => {
      const mockSetting = {
        id: 'another-id',
        name: 'Another Document Type',
        category: 'test-category'
      }

      wrapper.vm.FormRendererRef = {
        vFormRenderRef: {
          setFormData: vi.fn()
        }
      }

      await wrapper.vm.handleOpen(mockSetting)
      await new Promise((resolve) => setTimeout(resolve, 0))

      expect(wrapper.vm.state.setting).toEqual(mockSetting)
      expect(wrapper.vm.FormRendererRef.vFormRenderRef.setFormData).toHaveBeenCalledWith({
        fromName: 'Another Document Type',
        name: ''
      })
    })
  })

  describe('handleSubmit Method', () => {
    beforeEach(() => {
      // Mock FormRenderer
      wrapper.vm.FormRendererRef = {
        getFormData: vi.fn().mockResolvedValue({
          name: 'New Document Type'
        })
      }
    })

    it('should submit form data successfully', async () => {
      const mockSetting = { id: 'test-id', name: 'Original Type' }
      wrapper.vm.state.setting = mockSetting
      wrapper.vm.state.loading = false

      // Mock successful API call
      const mockApi = adminApi.api
      mockApi.postDocpaltypeSettingsDocpalTypeV2Duplicate.mockResolvedValue({ data: true })

      await wrapper.vm.handleSubmit()

      // Check API was called with correct parameters
      expect(mockApi.postDocpaltypeSettingsDocpalTypeV2Duplicate).toHaveBeenCalledWith({
        name: 'New Document Type',
        id: 'test-id'
      })

      // Check success message was shown
      expect(ElMessage.success).toHaveBeenCalledWith('metadata.duplicate_success')

      // Check refresh event was emitted
      expect(wrapper.emitted('refresh')).toBeTruthy()

      // Check dialog was closed
      expect(wrapper.vm.state.visible).toBe(false)
    })

    it('should handle API error during submission', async () => {
      const mockSetting = { id: 'test-id', name: 'Original Type' }
      wrapper.vm.state.setting = mockSetting
      wrapper.vm.state.loading = false
      wrapper.vm.FormRendererRef = {
        getFormData: vi.fn().mockResolvedValue({
          name: 'New Document Type'
        })
      }
      // Mock API error
      const error = new Error('API Error')
      adminApi.api.postDocpaltypeSettingsDocpalTypeV2Duplicate.mockRejectedValue(error)

      // Mock console.error to avoid test noise
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      await wrapper.vm.handleSubmit()

      // Check error message was shown
      expect(ElMessage.error).toHaveBeenCalledWith('metadata.duplicate_error')

      // Check console.error was called
      expect(consoleSpy).toHaveBeenCalledWith(error)

      // Check dialog remains open
      expect(wrapper.vm.state.visible).toBe(true)

      consoleSpy.mockRestore()
    })

    it('should handle loading state correctly', async () => {
      const mockSetting = { id: 'test-id', name: 'Original Type' }
      wrapper.vm.state.setting = mockSetting
      wrapper.vm.state.loading = false

      // Mock API call that takes time
      adminApi.api.postDocpaltypeSettingsDocpalTypeV2Duplicate.mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve({ data: true }), 100)))
      await wrapper.vm.handleSubmit()
      expect(wrapper.vm.state.loading).toBe(false)
    })

    it('should handle form data retrieval error', async () => {
      const mockSetting = { id: 'test-id', name: 'Original Type' }
      wrapper.vm.state.setting = mockSetting

      // Mock form data retrieval error
      const formError = new Error('Form data error')
      wrapper.vm.FormRendererRef.getFormData.mockRejectedValue(formError)

      // Mock console.error
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      await wrapper.vm.handleSubmit()
      expect(consoleSpy).toHaveBeenCalledWith(formError)
    })
  })

  describe('Component Exposed Methods', () => {
    it('should expose handleOpen method', () => {
      expect(wrapper.vm.handleOpen).toBeDefined()
      expect(typeof wrapper.vm.handleOpen).toBe('function')
    })
  })

  describe('Event Emissions', () => {
    it('should emit refresh event on successful submission', async () => {
      wrapper.vm.FormRendererRef = {
        getFormData: vi.fn().mockResolvedValue({ name: 'Test Type' })
      }
      wrapper.vm.state.setting = { id: 'test-id' }
      adminApi.api.postDocpaltypeSettingsDocpalTypeV2Duplicate.mockResolvedValue({ data: true })

      await wrapper.vm.handleSubmit()

      expect(wrapper.emitted('refresh')).toBeTruthy()
      expect(wrapper.emitted('refresh')).toHaveLength(1)
    })

    it('should not emit refresh event on failed submission', async () => {
      wrapper.vm.FormRendererRef = {
        getFormData: vi.fn().mockResolvedValue({ name: 'Test Type' })
      }
      wrapper.vm.state.setting = { id: 'test-id' }
      adminApi.api.postDocpaltypeSettingsDocpalTypeV2Duplicate.mockRejectedValue(new Error('API Error'))

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      await wrapper.vm.handleSubmit()

      expect(wrapper.emitted('refresh')).toBeFalsy()

      consoleSpy.mockRestore()
    })
  })

  describe('Form Validation', () => {
    it('should handle empty form data', async () => {
      wrapper.vm.FormRendererRef = {
        getFormData: vi.fn().mockResolvedValue({ name: '' })
      }
      wrapper.vm.state.setting = { id: 'test-id' }

      adminApi.api.postDocpaltypeSettingsDocpalTypeV2Duplicate.mockResolvedValue({ data: true })

      await wrapper.vm.handleSubmit()

      // Should still call API with empty name
      expect(adminApi.api.postDocpaltypeSettingsDocpalTypeV2Duplicate).toHaveBeenCalledWith({
        name: '',
        id: 'test-id'
      })
    })

    it('should handle form data with special characters', async () => {
      wrapper.vm.FormRendererRef = {
        getFormData: vi.fn().mockResolvedValue({ name: 'Test-Type_123' })
      }
      wrapper.vm.state.setting = { id: 'test-id' }

      adminApi.api.postDocpaltypeSettingsDocpalTypeV2Duplicate.mockResolvedValue({ data: true })

      await wrapper.vm.handleSubmit()

      expect(adminApi.api.postDocpaltypeSettingsDocpalTypeV2Duplicate).toHaveBeenCalledWith({
        name: 'Test-Type_123',
        id: 'test-id'
      })
    })
  })

  describe('Error Handling Edge Cases', () => {

    it('should handle setting without id', async () => {
      wrapper.vm.FormRendererRef = {
        getFormData: vi.fn().mockResolvedValue({ name: 'Test Type' })
      }
      wrapper.vm.state.setting = { name: 'Original Type' }

      adminApi.api.postDocpaltypeSettingsDocpalTypeV2Duplicate.mockResolvedValue({ data: true })

      await wrapper.vm.handleSubmit()

      expect(adminApi.api.postDocpaltypeSettingsDocpalTypeV2Duplicate).toHaveBeenCalledWith({
        name: 'Test Type',
        id: undefined
      })
    })
  })
})
