import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import {
  ExternalStorageProfilesGenerate,
} from '#components'
import { ElMessage } from 'element-plus'
import { FormRenderer } from './util'

// Mock element-plus
vi.mock('element-plus', () => ({
  ElMessage: {
    success: vi.fn()
  }
}))

describe('[admin-external-storage]ExternalStorageProfilesGenerate', () => {
  let wrapper: any
  const mockSettings = {
    id: '1',
    name: 'Test Profile',
    status: 'A',
    batchIdSetting: {
      prefix: 'TEST',
      digit: 5,
      startNumber: 1
    }
  }

  const mockFormData = {
    name: 'Test Profile',
    status: true,
    prefix: 'TEST',
    digit: 5,
    startNumber: 1
  }

  beforeEach(async () => {
    wrapper = mount(ExternalStorageProfilesGenerate, {
      props: {
        id: '1',
        storageId: 'storage-1',
        settings: mockSettings
      },
      global: {
        components: { 
          FormRenderer
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
        }
      }
    })
    await wrapper.vm.$nextTick()
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('should render the component correctly', () => {
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.find('.container').exists()).toBe(true)
    })

    it('should render save button', () => {
      const saveButton = wrapper.find('.el-button')
      expect(saveButton.exists()).toBe(true)
      expect(saveButton.text()).toContain('button.save')
    })

    it('should have correct props', () => {
      expect(wrapper.props('id')).toBe('1')
      expect(wrapper.props('storageId')).toBe('storage-1')
      expect(wrapper.props('settings')).toEqual(mockSettings)
    })
  })

  describe('Data Initialization', () => {
    it('should initialize with correct default values', () => {
      expect(wrapper.vm.loading).toBe(false)
      expect(wrapper.vm.FormRendererRef).toBeDefined()
    })

    it('should set form data when settings prop changes', async () => {
      const setFormDataSpy = vi.fn()
      wrapper.vm.FormRendererRef = {
        vFormRenderRef: {
          setFormData: setFormDataSpy
        }
      }

      // Trigger the watch
      await wrapper.setProps({
        settings: {
          name: 'New Profile',
          status: 'D',
          batchIdSetting: {
            prefix: 'NEW',
            digit: 10,
            startNumber: 100
          }
        }
      })

      await wrapper.vm.$nextTick()

      expect(setFormDataSpy).toHaveBeenCalledWith({
        name: 'New Profile',
        status: false, // 'D' should be converted to false
        prefix: 'NEW',
        digit: 10,
        startNumber: 100
      })
    })

    it('should handle settings with missing batchIdSetting', async () => {
      const setFormDataSpy = vi.fn()
      wrapper.vm.FormRendererRef = {
        vFormRenderRef: {
          setFormData: setFormDataSpy
        }
      }

      await wrapper.setProps({
        settings: {
          name: 'Test Profile',
          status: 'A'
          // Missing batchIdSetting
        }
      })

      await wrapper.vm.$nextTick()

      expect(setFormDataSpy).toHaveBeenCalledWith({
        name: 'Test Profile',
        status: true, // 'A' should be converted to true
        prefix: undefined,
        digit: undefined,
        startNumber: undefined
      })
    })

    it('should not set form data when settings is null', async () => {
      const setFormDataSpy = vi.fn()
      wrapper.vm.FormRendererRef = {
        vFormRenderRef: {
          setFormData: setFormDataSpy
        }
      }

      await wrapper.setProps({
        settings: null
      })

      await wrapper.vm.$nextTick()

      expect(setFormDataSpy).not.toHaveBeenCalled()
    })
  })

  describe('Form Data Handling', () => {
    it('should transform form data correctly for API call', async () => {
      const getFormDataSpy = vi.fn().mockResolvedValue(mockFormData)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      // Mock API call
      adminApi.api.patchExternalstorageIdProfilesProfileidGeneral.mockResolvedValue({})

      await wrapper.vm.handleSave()

      expect(getFormDataSpy).toHaveBeenCalled()
      expect(adminApi.api.patchExternalstorageIdProfilesProfileidGeneral).toHaveBeenCalledWith(
        'storage-1',
        '1',
        {
          name: 'Test Profile',
          status: 'A', // true should be converted to 'A'
          batchIdSetting: {
            prefix: 'TEST',
            digit: 5,
            startNumber: 1
          }
        }
      )
    })

    it('should handle inactive status correctly', async () => {
      const inactiveFormData = {
        ...mockFormData,
        status: false
      }
      wrapper.vm.FormRendererRef = {
        getFormData: vi.fn().mockResolvedValue(inactiveFormData)
      }

      adminApi.api.patchExternalstorageIdProfilesProfileidGeneral.mockResolvedValue({})

      await wrapper.vm.handleSave()

      expect(adminApi.api.patchExternalstorageIdProfilesProfileidGeneral).toHaveBeenCalledWith(
        'storage-1',
        '1',
        {
          name: 'Test Profile',
          status: 'D', // false should be converted to 'D'
          batchIdSetting: {
            prefix: 'TEST',
            digit: 5,
            startNumber: 1
          }
        }
      )
    })
  })

  describe('Save Functionality', () => {
    it('should call API and emit update event on successful save', async () => {
      const getFormDataSpy = vi.fn().mockResolvedValue(mockFormData)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      adminApi.api.patchExternalstorageIdProfilesProfileidGeneral.mockResolvedValue({})

      await wrapper.vm.handleSave()

      expect(adminApi.api.patchExternalstorageIdProfilesProfileidGeneral).toHaveBeenCalled()
      expect(ElMessage.success).toHaveBeenCalledWith('dpMsg_success')
      expect(wrapper.emitted('update')).toBeTruthy()
    })

    it('should handle loading state correctly', async () => {
      const getFormDataSpy = vi.fn().mockResolvedValue(mockFormData)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      // Mock a slow API call
      adminApi.api.patchExternalstorageIdProfilesProfileidGeneral.mockImplementation(
        () => new Promise(resolve => setTimeout(resolve, 100))
      )

      const savePromise = wrapper.vm.handleSave()

      // Check loading state during API call
      expect(wrapper.vm.loading).toBe(false)

      await savePromise

      // Check loading state after API call
      expect(wrapper.vm.loading).toBe(false)
    })

    it('should handle API error gracefully', async () => {
      const getFormDataSpy = vi.fn().mockResolvedValue(mockFormData)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      adminApi.api.patchExternalstorageIdProfilesProfileidGeneral.mockRejectedValue(new Error('API Error'))

      await wrapper.vm.handleSave()

      expect(consoleSpy).toHaveBeenCalled()
      expect(wrapper.vm.loading).toBe(false)
      expect(wrapper.emitted('update')).toBeFalsy() // Should not emit on error

      consoleSpy.mockRestore()
    })

    it('should handle form data error gracefully', async () => {
      const getFormDataSpy = vi.fn().mockRejectedValue(new Error('Form Error'))
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      await wrapper.vm.handleSave()

      expect(consoleSpy).toHaveBeenCalled()
      expect(wrapper.vm.loading).toBe(false)

      consoleSpy.mockRestore()
    })
  })
  describe('Event Emission', () => {
    it('should emit update event on successful save', async () => {
      const getFormDataSpy = vi.fn().mockResolvedValue(mockFormData)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      adminApi.api.patchExternalstorageIdProfilesProfileidGeneral.mockResolvedValue({})

      await wrapper.vm.handleSave()

      expect(wrapper.emitted('update')).toBeTruthy()
      expect(wrapper.emitted('update')).toHaveLength(1)
    })

    it('should not emit update event on error', async () => {
      const getFormDataSpy = vi.fn().mockResolvedValue(mockFormData)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      adminApi.api.patchExternalstorageIdProfilesProfileidGeneral.mockRejectedValue(new Error('API Error'))

      await wrapper.vm.handleSave()

      expect(wrapper.emitted('update')).toBeFalsy()
    })
  })

  describe('Button Interaction', () => {

    it('should show loading state on button during save', async () => {
      const getFormDataSpy = vi.fn().mockResolvedValue(mockFormData)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      adminApi.api.patchExternalstorageIdProfilesProfileidGeneral.mockImplementation(
        () => new Promise(resolve => setTimeout(resolve, 100))
      )

      const saveButton = wrapper.find('.el-button')
      const savePromise = wrapper.vm.handleSave()

      // Check button loading state
      await savePromise

      // Check button loading state after completion
      expect(wrapper.vm.loading).toBe(false)
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty form data', async () => {
      const emptyFormData = {
        name: '',
        status: false,
        prefix: '',
        digit: 0,
        startNumber: 0
      }
      const getFormDataSpy = vi.fn().mockResolvedValue(emptyFormData)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      adminApi.api.patchExternalstorageIdProfilesProfileidGeneral.mockResolvedValue({})

      await wrapper.vm.handleSave()

      expect(adminApi.api.patchExternalstorageIdProfilesProfileidGeneral).toHaveBeenCalledWith(
        'storage-1',
        '1',
        {
          name: '',
          status: 'D',
          batchIdSetting: {
            prefix: '',
            digit: 0,
            startNumber: 0
          }
        }
      )
    })

    it('should handle missing FormRendererRef', async () => {
      wrapper.vm.FormRendererRef = null

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      await wrapper.vm.handleSave()

      expect(consoleSpy).toHaveBeenCalled()
      expect(wrapper.vm.loading).toBe(false)

      consoleSpy.mockRestore()
    })
  })
}) 
