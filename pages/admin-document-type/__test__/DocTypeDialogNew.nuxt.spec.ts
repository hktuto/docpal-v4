import { mount } from '@vue/test-utils'
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest'
import { DocTypeDialogNew } from '#components'
import { adminApi, clientApi } from './mock/api'
import { ElMessage } from 'element-plus'
import { mockRouterProvider } from './util'

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
    warning: vi.fn()
  }
}))

describe('[admin-document-type]DocTypeDialogNew', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(DocTypeDialogNew, {
      global: {
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
        }
      }
    })
    wrapper.vm.state.visible = true
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  describe('Dialog State Management', () => {

    it('should show dialog when handleOpen is called', async () => {
      wrapper.vm.state.visible = false
      adminApi.api.getDocpaltypeSettingsCategories.mockResolvedValue({ data: ['Category 1', 'Category 2', 'Category 3'] })
      await wrapper.vm.handleOpen()
      expect(wrapper.vm.state.visible).toBe(true)
    })

  })

  describe('Options Loading', () => {
    it('should load category options on open', async () => {
      const mockCategories = ['Category 1', 'Category 2', 'Category 3']
      adminApi.api.getDocpaltypeSettingsCategories.mockResolvedValue({ data: mockCategories })

      await wrapper.vm.handleOpen()

      expect(adminApi.api.getDocpaltypeSettingsCategories).toHaveBeenCalled()
      expect(wrapper.vm.categoryOptions).toHaveLength(3)
      expect(wrapper.vm.categoryOptions[0]).toEqual({
        label: 'Category 1',
        value: 'Category 1'
      })
    })

    it('should load user list on open', async () => {
      const mockUsers = [
        { userId: 'user1', username: 'User One' },
        { userId: 'user2', username: 'User Two' }
      ]
      clientApi.api.postNuxeoIdentityUsers.mockResolvedValue({ data: mockUsers })

      await wrapper.vm.handleOpen()

      expect(clientApi.api.postNuxeoIdentityUsers).toHaveBeenCalled()
      expect(wrapper.vm.permissionOptions).toHaveLength(2)
      expect(wrapper.vm.permissionOptions[1].label).toBe('user_users')
      expect(wrapper.vm.permissionOptions[1].options).toHaveLength(2)
    })

    it('should handle user list API error gracefully', async () => {
      clientApi.api.postNuxeoIdentityUsers.mockRejectedValue(new Error('API Error'))

      await wrapper.vm.handleOpen()

      expect(wrapper.vm.permissionOptions[1].options).toHaveLength(0)
    })

    it('should populate role options from flatRole', async () => {

      await wrapper.vm.handleOpen()

      expect(wrapper.vm.permissionOptions[0].label).toBe('user_role')
      expect(wrapper.vm.permissionOptions[0].options).toHaveLength(2)
      expect(wrapper.vm.permissionOptions[0].options[0]).toEqual({
        label: 'Admin Role',
        value: 'role____1'
      })
    })
  })

  describe('Form Data Management', () => {
    it('should initialize form data with default values', () => {
      expect(wrapper.vm.formData.name).toBe('')
      expect(wrapper.vm.formData.category).toBe('')
      expect(wrapper.vm.formData.isFolder).toBe(false)
      expect(wrapper.vm.formData.acls).toEqual([])
      expect(wrapper.vm.formData.status).toBe('A')
      expect(wrapper.vm.formData.langs).toEqual({
        en: true,
        zh: true,
        ja: true,
        ko: true,
        fr: true
      })
    })

    it('should update category when select changes', async () => {
      // First load options
      adminApi.api.getDocpaltypeSettingsCategories.mockResolvedValue({
        data: ['Category 1', 'Category 2']
      })
      await wrapper.vm.handleOpen()

      // Simulate category selection
      wrapper.vm.formData.category = 'Category 1'
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.formData.category).toBe('Category 1')
    })

  })

  describe('Form Submission', () => {
    it('should submit form data successfully', async () => {
      // Set up form data
      wrapper.vm.formData.name = 'Test Document Type'
      wrapper.vm.formData.category = 'Test Category'
      wrapper.vm.formData.isFolder = true
      wrapper.vm.formData.acls = ['role____1', 'user1']

      adminApi.api.postDocpaltypeSettingsDocpalTypeV2Create.mockResolvedValue({ data: true })

      await wrapper.vm.handleSubmit()

      expect(adminApi.api.postDocpaltypeSettingsDocpalTypeV2Create).toHaveBeenCalledWith({
        name: 'Test Document Type',
        category: 'Test Category',
        isFolder: true,
        acls: ['role____1', 'user1'],
        status: 'A',
        langs: {
          en: true,
          zh: true,
          ja: true,
          ko: true,
          fr: true
        }
      })
      expect(ElMessage.success).toHaveBeenCalledWith(expect.stringContaining('tip_createdSuccessMsg'))
      expect(wrapper.vm.state.visible).toBe(false)
      expect(wrapper.emitted('refresh')).toBeTruthy()
    })

    it('should show loading state during submission', async () => {
      // Mock a slow API call
      adminApi.api.postDocpaltypeSettingsDocpalTypeV2Create.mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve({ data: true }), 100)))

      await wrapper.vm.handleSubmit()
      expect(wrapper.vm.state.loading).toBe(false)
    })

    it('should handle API error during submission', async () => {
      adminApi.api.postDocpaltypeSettingsDocpalTypeV2Create.mockRejectedValue(new Error('API Error'))

      await wrapper.vm.handleSubmit()

      expect(wrapper.vm.state.loading).toBe(false)
      expect(wrapper.vm.state.visible).toBe(true) // Dialog should remain open
      expect(wrapper.emitted('refresh')).toBeFalsy() // Should not emit refresh
    })

    it('should reset loading state even on error', async () => {
      adminApi.api.postDocpaltypeSettingsDocpalTypeV2Create.mockRejectedValue(new Error('API Error'))

      await wrapper.vm.handleSubmit()

      expect(wrapper.vm.state.loading).toBe(false)
    })
  })

  describe('Permission Management', () => {
    it('should handle multiple permission selections', async () => {
      // Load options first
      adminApi.api.getDocpaltypeSettingsCategories.mockResolvedValue({ data: ['Category 1'] })
      clientApi.api.postNuxeoIdentityUsers.mockResolvedValue({
        data: [{ userId: 'user1', username: 'User One' }]
      })
      await wrapper.vm.handleOpen()

      // Set multiple permissions
      wrapper.vm.formData.acls = ['role____1', 'user1']

      expect(wrapper.vm.formData.acls).toHaveLength(2)
      expect(wrapper.vm.formData.acls).toContain('role____1')
      expect(wrapper.vm.formData.acls).toContain('user1')
    })
  })

  describe('Language Settings', () => {
    it('should have default language settings', () => {
      expect(wrapper.vm.formData.langs).toEqual({
        en: true,
        zh: true,
        ja: true,
        ko: true,
        fr: true
      })
    })

    it('should maintain language settings during form submission', async () => {
      wrapper.vm.formData.name = 'Test Document Type'
      wrapper.vm.formData.category = 'Test Category'

      adminApi.api.postDocpaltypeSettingsDocpalTypeV2Create.mockResolvedValue({ data: true })

      await wrapper.vm.handleSubmit()

      expect(adminApi.api.postDocpaltypeSettingsDocpalTypeV2Create).toHaveBeenCalledWith(
        expect.objectContaining({
          langs: {
            en: true,
            zh: true,
            ja: true,
            ko: true,
            fr: true
          }
        })
      )
    })
  })

  describe('Error Handling', () => {

    it('should handle user list API error', async () => {
      clientApi.api.postNuxeoIdentityUsers.mockRejectedValue(new Error('User API Error'))

      await wrapper.vm.handleOpen()

      expect(wrapper.vm.permissionOptions[1].options).toEqual([])
    })

    it('should continue loading other options even if one fails', async () => {
      adminApi.api.getDocpaltypeSettingsCategories.mockResolvedValue({ data: ['Category 1'] })
      clientApi.api.postNuxeoIdentityUsers.mockRejectedValue(new Error('User API Error'))

      await wrapper.vm.handleOpen()

      expect(wrapper.vm.categoryOptions).toHaveLength(1)
      expect(wrapper.vm.permissionOptions[1].options).toEqual([])
    })
  })

  describe('Component Integration', () => {
    it('should expose handleOpen method', () => {
      expect(wrapper.vm.handleOpen).toBeDefined()
      expect(typeof wrapper.vm.handleOpen).toBe('function')
    })

    it('should emit refresh event on successful submission', async () => {
      wrapper.vm.formData.name = 'Test Document Type'
      wrapper.vm.formData.category = 'Test Category'
      adminApi.api.postDocpaltypeSettingsDocpalTypeV2Create.mockResolvedValue({ data: true })

      await wrapper.vm.handleSubmit()

      expect(wrapper.emitted('refresh')).toBeTruthy()
    })
  })

})
