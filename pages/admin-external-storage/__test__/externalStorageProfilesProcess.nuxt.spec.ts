import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import {
  ExternalStorageProfilesProcess,
} from '#components'
import { ElMessage } from 'element-plus'
import { FormRenderer } from './util'

// Mock element-plus
vi.mock('element-plus', () => ({
  ElMessage: {
    success: vi.fn()
  }
}))

describe('[admin-external-storage]ExternalStorageProfilesProcess', () => {
  let wrapper: any
  const mockSettings = {
    enabled: true,
    autoProcess: false,
    processRules: ['rule1', 'rule2']
  }

  const mockFormData = {
    enabled: true,
    autoProcess: false,
    processRules: ['rule1', 'rule2']
  }

  beforeEach(async () => {
    wrapper = mount(ExternalStorageProfilesProcess, {
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
          $t: (msg: string) => msg,
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

      await wrapper.setProps({
        settings: {
          enabled: false,
          autoProcess: true,
          processRules: ['rule3']
        }
      })

      await wrapper.vm.$nextTick()

      expect(setFormDataSpy).toHaveBeenCalledWith({
        enabled: false,
        autoProcess: true,
        processRules: ['rule3']
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

  describe('Save Functionality', () => {
    it('should call API and emit update event on successful save', async () => {
      const getFormDataSpy = vi.fn().mockResolvedValue(mockFormData)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      adminApi.api.patchExternalstorageIdProfilesProfileidProcess.mockResolvedValue({})

      await wrapper.vm.handleSave()

      expect(adminApi.api.patchExternalstorageIdProfilesProfileidProcess).toHaveBeenCalledWith(
        'storage-1',
        '1',
        mockFormData
      )
      expect(ElMessage.success).toHaveBeenCalledWith('dpMsg_success')
      expect(wrapper.emitted('update')).toBeTruthy()
    })

    it('should handle loading state correctly', async () => {
      const getFormDataSpy = vi.fn().mockResolvedValue(mockFormData)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      adminApi.api.patchExternalstorageIdProfilesProfileidProcess.mockImplementation(
        () => new Promise(resolve => setTimeout(resolve, 100))
      )

      const savePromise = wrapper.vm.handleSave()
      await savePromise

      expect(wrapper.vm.loading).toBe(false)
    })

    it('should handle API error gracefully', async () => {
      const getFormDataSpy = vi.fn().mockResolvedValue(mockFormData)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      adminApi.api.patchExternalstorageIdProfilesProfileidProcess.mockRejectedValue(new Error('API Error'))

      await wrapper.vm.handleSave()

      expect(consoleSpy).toHaveBeenCalled()
      expect(wrapper.vm.loading).toBe(false)
      expect(wrapper.emitted('update')).toBeFalsy()

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

      adminApi.api.patchExternalstorageIdProfilesProfileidProcess.mockResolvedValue({})

      await wrapper.vm.handleSave()

      expect(wrapper.emitted('update')).toBeTruthy()
      expect(wrapper.emitted('update')).toHaveLength(1)
    })

    it('should not emit update event on error', async () => {
      const getFormDataSpy = vi.fn().mockResolvedValue(mockFormData)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      adminApi.api.patchExternalstorageIdProfilesProfileidProcess.mockRejectedValue(new Error('API Error'))

      await wrapper.vm.handleSave()

      expect(wrapper.emitted('update')).toBeFalsy()
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty form data', async () => {
      const emptyFormData = {
        enabled: false,
        autoProcess: false,
        processRules: []
      }
      const getFormDataSpy = vi.fn().mockResolvedValue(emptyFormData)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      adminApi.api.patchExternalstorageIdProfilesProfileidProcess.mockResolvedValue({})

      await wrapper.vm.handleSave()

      expect(adminApi.api.patchExternalstorageIdProfilesProfileidProcess).toHaveBeenCalledWith(
        'storage-1',
        '1',
        emptyFormData
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
