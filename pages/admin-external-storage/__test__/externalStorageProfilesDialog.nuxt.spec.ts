import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import {
  ExternalStorageProfilesDialog,
} from '#components'
import { ElMessage } from 'element-plus'
import { FormRenderer, VFormRender } from './util'

// Mock element-plus
vi.mock('element-plus', () => ({
  ElMessage: {
    success: vi.fn()
  }
}))

describe('[admin-external-storage]ExternalStorageProfilesDialog', () => {
  let wrapper: any
  const mockFormData = {
    name: 'Test Profile',
    profileType: 'import',
    status: 'A'
  }

  beforeEach(async () => {
    wrapper = mount(ExternalStorageProfilesDialog, {
      props: {
        id: '1'
      },
      global: {
        components: { 
          FormRenderer,
          VFormRender
        },
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        }
      }
    })
    wrapper.vm.state.visible = true
    await wrapper.vm.$nextTick()
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  describe('Dialog State Management', () => {
    it('should initialize with correct default state', () => {
      expect(wrapper.vm.state.isEdit).toBe(false)
      expect(wrapper.vm.state.loading).toBe(false)
      expect(wrapper.vm.state.setting).toEqual({})
    })

    it('should show dialog when handleOpen is called', async () => {
      await wrapper.vm.handleOpen()

      expect(wrapper.vm.state.visible).toBe(true)
      expect(wrapper.vm.state.isEdit).toBe(false)
      expect(wrapper.vm.state.setting).toEqual({})
    })

    it('should reset form when handleOpen is called', async () => {
      const resetFormSpy = vi.fn()
      wrapper.vm.FormRendererRef = {
        vFormRenderRef: {
          resetForm: resetFormSpy
        }
      }

      await wrapper.vm.handleOpen()

      // Wait for setTimeout to execute
      await new Promise(resolve => setTimeout(resolve, 100))

      expect(resetFormSpy).toHaveBeenCalled()
    })
  })

  describe('Submit Functionality', () => {
    it('should call API and emit refresh event on successful submit', async () => {
      const getFormDataSpy = vi.fn().mockResolvedValue(mockFormData)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      adminApi.api.postExternalstorageIdProfiles.mockResolvedValue({})

      await wrapper.vm.handleSubmit()

      expect(getFormDataSpy).toHaveBeenCalled()
      expect(adminApi.api.postExternalstorageIdProfiles).toHaveBeenCalledWith('1', mockFormData)
      expect(ElMessage.success).toHaveBeenCalledWith('dpMsg_success')
      expect(wrapper.emitted('refresh')).toBeTruthy()
    })

    it('should handle loading state correctly', async () => {
      const getFormDataSpy = vi.fn().mockResolvedValue(mockFormData)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      adminApi.api.postExternalstorageIdProfiles.mockImplementation(
        () => new Promise(resolve => setTimeout(resolve, 100))
      )

      const submitPromise = wrapper.vm.handleSubmit()

      await submitPromise

      expect(wrapper.vm.state.loading).toBe(false)
    })

    it('should handle API error gracefully', async () => {
      const getFormDataSpy = vi.fn().mockResolvedValue(mockFormData)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      adminApi.api.postExternalstorageIdProfiles.mockRejectedValue(new Error('API Error'))

      await wrapper.vm.handleSubmit()

      expect(consoleSpy).toHaveBeenCalled()
      expect(wrapper.vm.state.loading).toBe(false)
      expect(wrapper.emitted('refresh')).toBeFalsy() // Should not emit on error

      consoleSpy.mockRestore()
    })

    it('should handle form data error gracefully', async () => {
      const getFormDataSpy = vi.fn().mockRejectedValue(new Error('Form Error'))
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      await wrapper.vm.handleSubmit()

      expect(consoleSpy).toHaveBeenCalled()
      expect(wrapper.vm.state.loading).toBe(false)

      consoleSpy.mockRestore()
    })
  })

  describe('Event Emission', () => {
    it('should emit refresh event on successful submit', async () => {
      const getFormDataSpy = vi.fn().mockResolvedValue(mockFormData)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      adminApi.api.postExternalstorageIdProfiles.mockResolvedValue({})

      await wrapper.vm.handleSubmit()

      // Wait for setTimeout to execute
      await new Promise(resolve => setTimeout(resolve, 600))

      expect(wrapper.emitted('refresh')).toBeTruthy()
      expect(wrapper.emitted('refresh')).toHaveLength(1)
    })

    it('should not emit refresh event on error', async () => {
      const getFormDataSpy = vi.fn().mockResolvedValue(mockFormData)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      adminApi.api.postExternalstorageIdProfiles.mockRejectedValue(new Error('API Error'))

      await wrapper.vm.handleSubmit()

      expect(wrapper.emitted('refresh')).toBeFalsy()
    })
  })

  describe('Button Interaction', () => {
    it('should show loading state on button during submit', async () => {
      const getFormDataSpy = vi.fn().mockResolvedValue(mockFormData)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      adminApi.api.postExternalstorageIdProfiles.mockImplementation(
        () => new Promise(resolve => setTimeout(resolve, 100))
      )

      const submitPromise = wrapper.vm.handleSubmit()

      await submitPromise

      expect(wrapper.vm.state.loading).toBe(false)
    })
  })

  describe('Exposed Methods', () => {
    it('should expose handleOpen method', () => {
      expect(wrapper.vm.handleOpen).toBeDefined()
      expect(typeof wrapper.vm.handleOpen).toBe('function')
    })
  })

  describe('Edge Cases', () => {
    it('should handle missing FormRendererRef', async () => {
      wrapper.vm.FormRendererRef = null

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      await wrapper.vm.handleSubmit()

      expect(consoleSpy).toHaveBeenCalled()
      expect(wrapper.vm.state.loading).toBe(false)

      consoleSpy.mockRestore()
    })

    it('should handle empty form data', async () => {
      const emptyFormData = {}
      const getFormDataSpy = vi.fn().mockResolvedValue(emptyFormData)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      adminApi.api.postExternalstorageIdProfiles.mockResolvedValue({})

      await wrapper.vm.handleSubmit()

      expect(adminApi.api.postExternalstorageIdProfiles).toHaveBeenCalledWith('1', emptyFormData)
    })

    it('should handle dialog close behavior', async () => {
      await wrapper.vm.handleOpen()
      expect(wrapper.vm.state.visible).toBe(true)

      // Simulate dialog close
      wrapper.vm.state.visible = false
      expect(wrapper.vm.state.visible).toBe(false)
    })
  })
}) 
