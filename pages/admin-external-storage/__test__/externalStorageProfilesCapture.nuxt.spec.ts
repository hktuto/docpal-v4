import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import {
  ExternalStorageProfilesCapture,
} from '#components'
import { ElMessage } from 'element-plus'
import { FormRenderer } from './util'

// Mock element-plus
vi.mock('element-plus', () => ({
  ElMessage: {
    success: vi.fn()
  }
}))

describe('[admin-external-storage]ExternalStorageProfilesCapture', () => {
  let wrapper: any
  const mockSettings = {
    use_document_type: true,
    document_type: ['pdf', 'doc'],
    need_confirm: true,
    confirm_user: ['user1', 'user2'],
    confirm_group: ['group1', 'group2']
  }

  const mockFormData = {
    use_document_type: true,
    document_type: ['pdf', 'doc'],
    need_confirm: true,
    confirm_user: ['user1', 'user2', 'group&&&&group1', 'group&&&&group2']
  }

  beforeEach(async () => {
    wrapper = mount(ExternalStorageProfilesCapture, {
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

    it('should set form data when settings prop changes with use_document_type true', async () => {
      const setFormDataSpy = vi.fn()
      wrapper.vm.FormRendererRef = {
        vFormRenderRef: {
          setFormData: setFormDataSpy
        }
      }

      await wrapper.setProps({
        settings: {
          use_document_type: true,
          document_type: ['txt'],
          need_confirm: false,
          confirm_user: ['user3'],
          confirm_group: ['group3']
        }
      })

      await wrapper.vm.$nextTick()

      expect(setFormDataSpy).toHaveBeenCalledWith({
        use_document_type: true,
        document_type: ['txt'],
        need_confirm: false,
        confirm_user: ['user3', 'group&&&&group3']
      })
    })

    it('should set form data when settings prop changes with use_document_type false', async () => {
      const setFormDataSpy = vi.fn()
      wrapper.vm.FormRendererRef = {
        vFormRenderRef: {
          setFormData: setFormDataSpy
        }
      }

      await wrapper.setProps({
        settings: {
          use_document_type: false
        }
      })

      await wrapper.vm.$nextTick()

      expect(setFormDataSpy).toHaveBeenCalledWith({
        use_document_type: false
      })
    })

    it('should handle settings with missing confirm_user and confirm_group', async () => {
      const setFormDataSpy = vi.fn()
      wrapper.vm.FormRendererRef = {
        vFormRenderRef: {
          setFormData: setFormDataSpy
        }
      }

      await wrapper.setProps({
        settings: {
          use_document_type: true,
          document_type: ['pdf'],
          need_confirm: true
          // Missing confirm_user and confirm_group
        }
      })

      await wrapper.vm.$nextTick()

      expect(setFormDataSpy).toHaveBeenCalledWith({
        use_document_type: true,
        document_type: ['pdf'],
        need_confirm: true,
        confirm_user: []
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
    it('should call API and emit update event on successful save with use_document_type true', async () => {
      const getFormDataSpy = vi.fn().mockResolvedValue(mockFormData)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      adminApi.api.patchExternalstorageIdProfilesProfileidCapture.mockResolvedValue({})

      await wrapper.vm.handleSave()

      expect(adminApi.api.patchExternalstorageIdProfilesProfileidCapture).toHaveBeenCalledWith(
        'storage-1',
        '1',
        {
          use_document_type: true,
          document_type: ['pdf', 'doc'],
          need_confirm: true,
          confirm_user: ['user1', 'user2'],
          confirm_group: ['group1', 'group2']
        }
      )
      expect(ElMessage.success).toHaveBeenCalledWith('dpMsg_success')
      expect(wrapper.emitted('update')).toBeTruthy()
    })

    it('should call API with correct params when use_document_type is false', async () => {
      const formDataWithoutdocument_type = {
        use_document_type: false
      }
      const getFormDataSpy = vi.fn().mockResolvedValue(formDataWithoutdocument_type)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      adminApi.api.patchExternalstorageIdProfilesProfileidCapture.mockResolvedValue({})

      await wrapper.vm.handleSave()

      expect(adminApi.api.patchExternalstorageIdProfilesProfileidCapture).toHaveBeenCalledWith(
        'storage-1',
        '1',
        {
          use_document_type: false
        }
      )
    })

    it('should filter out group&&&& prefix from confirm_user and create confirm_group', async () => {
      const formDataWithGroups = {
        use_document_type: true,
        document_type: ['pdf'],
        need_confirm: true,
        confirm_user: ['user1', 'group&&&&group1', 'user2', 'group&&&&group2']
      }
      const getFormDataSpy = vi.fn().mockResolvedValue(formDataWithGroups)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      adminApi.api.patchExternalstorageIdProfilesProfileidCapture.mockResolvedValue({})

      await wrapper.vm.handleSave()

      expect(adminApi.api.patchExternalstorageIdProfilesProfileidCapture).toHaveBeenCalledWith(
        'storage-1',
        '1',
        {
          use_document_type: true,
          document_type: ['pdf'],
          need_confirm: true,
          confirm_user: ['user1', 'user2'],
          confirm_group: ['group1', 'group2']
        }
      )
    })

    it('should handle loading state correctly', async () => {
      const getFormDataSpy = vi.fn().mockResolvedValue(mockFormData)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      adminApi.api.patchExternalstorageIdProfilesProfileidCapture.mockImplementation(
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
      adminApi.api.patchExternalstorageIdProfilesProfileidCapture.mockRejectedValue(new Error('API Error'))

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

  describe('Data Transformation', () => {
    it('should transform form data correctly for API call', async () => {
      const getFormDataSpy = vi.fn().mockResolvedValue(mockFormData)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      adminApi.api.patchExternalstorageIdProfilesProfileidCapture.mockResolvedValue({})

      await wrapper.vm.handleSave()

      // Verify the transformation logic
      const apiCall = adminApi.api.patchExternalstorageIdProfilesProfileidCapture.mock.calls[0]
      const params = apiCall[2]

      expect(params.use_document_type).toBe(true)
      expect(params.document_type).toEqual(['pdf', 'doc'])
      expect(params.need_confirm).toBe(true)
      expect(params.confirm_user).toEqual(['user1', 'user2'])
      expect(params.confirm_group).toEqual(['group1', 'group2'])
    })

    it('should handle empty confirm_user array', async () => {
      const formDataWithEmptyconfirm_user = {
        use_document_type: true,
        document_type: ['pdf'],
        need_confirm: true,
        confirm_user: []
      }
      const getFormDataSpy = vi.fn().mockResolvedValue(formDataWithEmptyconfirm_user)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      adminApi.api.patchExternalstorageIdProfilesProfileidCapture.mockResolvedValue({})

      await wrapper.vm.handleSave()

      expect(adminApi.api.patchExternalstorageIdProfilesProfileidCapture).toHaveBeenCalledWith(
        'storage-1',
        '1',
        {
          use_document_type: true,
          document_type: ['pdf'],
          need_confirm: true,
          confirm_user: [],
          confirm_group: []
        }
      )
    })
  })

  describe('Event Emission', () => {
    it('should emit update event on successful save', async () => {
      const getFormDataSpy = vi.fn().mockResolvedValue(mockFormData)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      adminApi.api.patchExternalstorageIdProfilesProfileidCapture.mockResolvedValue({})

      await wrapper.vm.handleSave()

      expect(wrapper.emitted('update')).toBeTruthy()
      expect(wrapper.emitted('update')).toHaveLength(1)
    })

    it('should not emit update event on error', async () => {
      const getFormDataSpy = vi.fn().mockResolvedValue(mockFormData)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      adminApi.api.patchExternalstorageIdProfilesProfileidCapture.mockRejectedValue(new Error('API Error'))

      await wrapper.vm.handleSave()

      expect(wrapper.emitted('update')).toBeFalsy()
    })
  })

  describe('Edge Cases', () => {
    it('should handle missing FormRendererRef', async () => {
      wrapper.vm.FormRendererRef = null

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      await wrapper.vm.handleSave()

      expect(consoleSpy).toHaveBeenCalled()
      expect(wrapper.vm.loading).toBe(false)

      consoleSpy.mockRestore()
    })

    it('should handle form data with only users (no groups)', async () => {
      const formDataWithOnlyUsers = {
        use_document_type: true,
        document_type: ['pdf'],
        need_confirm: true,
        confirm_user: ['user1', 'user2'] // No group&&&& items
      }
      const getFormDataSpy = vi.fn().mockResolvedValue(formDataWithOnlyUsers)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      adminApi.api.patchExternalstorageIdProfilesProfileidCapture.mockResolvedValue({})

      await wrapper.vm.handleSave()

      expect(adminApi.api.patchExternalstorageIdProfilesProfileidCapture).toHaveBeenCalledWith(
        'storage-1',
        '1',
        {
          use_document_type: true,
          document_type: ['pdf'],
          need_confirm: true,
          confirm_user: ['user1', 'user2'],
          confirm_group: []
        }
      )
    })

    it('should handle form data with only groups (no users)', async () => {
      const formDataWithOnlyGroups = {
        use_document_type: true,
        document_type: ['pdf'],
        need_confirm: true,
        confirm_user: ['group&&&&group1', 'group&&&&group2'] // Only group&&&& items
      }
      const getFormDataSpy = vi.fn().mockResolvedValue(formDataWithOnlyGroups)
      wrapper.vm.FormRendererRef = {
        getFormData: getFormDataSpy
      }

      adminApi.api.patchExternalstorageIdProfilesProfileidCapture.mockResolvedValue({})

      await wrapper.vm.handleSave()

      expect(adminApi.api.patchExternalstorageIdProfilesProfileidCapture).toHaveBeenCalledWith(
        'storage-1',
        '1',
        {
          use_document_type: true,
          document_type: ['pdf'],
          need_confirm: true,
          confirm_user: [],
          confirm_group: ['group1', 'group2']
        }
      )
    })
  })
}) 
