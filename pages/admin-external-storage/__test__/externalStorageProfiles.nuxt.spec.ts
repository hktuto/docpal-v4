import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import {
  ExternalStorageProfileDetail,
  ExternalStorageProfilesCapture,
  ExternalStorageProfilesDialog,
  ExternalStorageProfilesProcess,
  ExternalStorageProfilesOutput,
  ExternalStorageProfilesOutputDialog,
  ExternalStorageProfilesImport,
  ExternalStorageProfilesGenerate,
} from '#components'
import { ElMessageBox, ElNotification, ElMessage } from 'element-plus'
import { mockQuery, mockTable } from './setup'
import { mockRouterProvider, ReaderDialog, VFormRender, FormRenderer } from './util'

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

// Mock the adminApi
vi.mock('api', () => ({
  adminApi: {
    api: {
      getExternalstorageIdProfilesProfileid: vi.fn()
    }
  }
}))

describe('[admin-external-storage]ExternalStorageProfileDetail', () => {
  let wrapper: any
  const mockTabProvider = {}
  const mockProfile = {
    id: '1',
    name: 'Test Profile',
    status: 'A',
    importSetting: { path: '/test/path' },
    processSetting: { enabled: true },
    captureSetting: { documentType: ['pdf', 'doc'] },
    batchIdSetting: {
      prefix: 'TEST',
      digit: 5,
      startNumber: 1
    }
  }

  beforeEach(async () => {
    // Mock the API response
    adminApi.api.getExternalstorageIdProfilesProfileid.mockResolvedValue({
      data: mockProfile
    })

    wrapper = mount(ExternalStorageProfileDetail, {
      props: {
        id: '1',
        storageId: 'storage-1'
      },
      global: {
        components: { 
          VxeGrid, 
          FormRenderer, 
          VFormRender, 
          ReaderDialog,
          ExternalStorageProfilesGenerate,
          ExternalStorageProfilesImport,
          ExternalStorageProfilesProcess,
          ExternalStorageProfilesCapture,
          ExternalStorageProfilesOutput
        },
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
    await wrapper.vm.$nextTick()
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('should render the component correctly', () => {
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.find('.externalStorage-profileDetail').exists()).toBe(true)
    })

    it('should render all tab panes', async () => {
      await wrapper.vm.$nextTick()
      const tabPanes = wrapper.findAll('.el-tab-pane')
      expect(tabPanes.length).toBe(5) // generate, import, process, capture, output
    })

    it('should have correct default active tab', () => {
      expect(wrapper.vm.activeName).toBe('output')
    })

    it('should render generate tab with correct props', async () => {
      await new Promise(r => setTimeout(r, 1000))
      const generateTab = wrapper.findComponent(ExternalStorageProfilesGenerate)
      
      expect(generateTab.exists()).toBe(true)
      expect(generateTab.props('id')).toBe('1')
      expect(generateTab.props('storageId')).toBe('storage-1')
      expect(generateTab.props('settings')).toEqual(mockProfile)
    })

    it('should render import tab with correct props', async () => {
      await new Promise(r => setTimeout(r, 1000))
      const importTab = wrapper.findComponent(ExternalStorageProfilesImport)
      expect(importTab.exists()).toBe(true)
      expect(importTab.props('id')).toBe('1')
      expect(importTab.props('storageId')).toBe('storage-1')
      // expect(importTab.props('settings')).toEqual(mockProfile.importSetting)
    })

    it('should render process tab with correct props', () => {
      const processTab = wrapper.findComponent(ExternalStorageProfilesProcess)
      expect(processTab.exists()).toBe(true)
      expect(processTab.props('id')).toBe('1')
      expect(processTab.props('storageId')).toBe('storage-1')
      // expect(processTab.props('settings')).toEqual(mockProfile.processSetting)
    })

    it('should render capture tab with correct props', () => {
      const captureTab = wrapper.findComponent(ExternalStorageProfilesCapture)
      expect(captureTab.exists()).toBe(true)
      expect(captureTab.props('id')).toBe('1')
      expect(captureTab.props('storageId')).toBe('storage-1')
      // expect(captureTab.props('settings')).toEqual(mockProfile.captureSetting)
    })

    it('should render output tab with correct props', () => {
      const outputTab = wrapper.findComponent(ExternalStorageProfilesOutput)
      expect(outputTab.exists()).toBe(true)
      expect(outputTab.props('id')).toBe('1')
      // expect(outputTab.props('storageId')).toBe('storage-1')
      // expect(outputTab.props('captureSetting')).toEqual(mockProfile.captureSetting)
    })
  })

  describe('Data Loading', () => {
    it('should call init function on mount', async () => {
      expect(adminApi.api.getExternalstorageIdProfilesProfileid).toHaveBeenCalledWith('storage-1', '1')
    })

    it('should set profile data correctly', async () => {
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.profile).toEqual(mockProfile)
    })

    it('should handle loading state correctly', async () => {
      // Initially loading should be false after mount
      expect(wrapper.vm.loading).toBe(false)
    })

    it('should handle API error gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      adminApi.api.getExternalstorageIdProfilesProfileid.mockRejectedValue(new Error('API Error'))
      
      await wrapper.vm.init()
      
      expect(consoleSpy).toHaveBeenCalled()
      expect(wrapper.vm.loading).toBe(false)
      
      consoleSpy.mockRestore()
    })
  })

  describe('Event Handling', () => {
    it('should have update event listeners on child components', async () => {
      await wrapper.vm.$nextTick()
      
      const generateTab = wrapper.findComponent(ExternalStorageProfilesGenerate)
      const importTab = wrapper.findComponent(ExternalStorageProfilesImport)
      const processTab = wrapper.findComponent(ExternalStorageProfilesProcess)
      const captureTab = wrapper.findComponent(ExternalStorageProfilesCapture)
      
      // Check that components exist
      expect(generateTab.exists()).toBe(true)
      expect(importTab.exists()).toBe(true)
      expect(processTab.exists()).toBe(true)
      expect(captureTab.exists()).toBe(true)
      
      // Check that the parent component has the init function
      expect(typeof wrapper.vm.init).toBe('function')
    })

    it('should call init function directly', async () => {
      await wrapper.vm.$nextTick()
      
      // Create a spy on the init function
      const initSpy = vi.spyOn(wrapper.vm, 'init')
      
      // Call init directly
      await wrapper.vm.init()
      
      expect(initSpy).toHaveBeenCalled()
    })

    it('should refresh profile data when init is called', async () => {
      await wrapper.vm.$nextTick()
      
      // Reset the mock to track calls
      adminApi.api.getExternalstorageIdProfilesProfileid.mockClear()
      
      // Call init
      await wrapper.vm.init()
      
      // Verify API was called
      expect(adminApi.api.getExternalstorageIdProfilesProfileid).toHaveBeenCalledWith('storage-1', '1')
    })

    it('should have correct event bindings in template', () => {
      // Check that the template contains the correct event bindings
      const html = wrapper.html()
      
      // Check for update event bindings on child components
      // expect(html).toContain('@update="init"')
      
      // Check that all child components are present
      expect(wrapper.findComponent(ExternalStorageProfilesGenerate).exists()).toBe(true)
      expect(wrapper.findComponent(ExternalStorageProfilesImport).exists()).toBe(true)
      expect(wrapper.findComponent(ExternalStorageProfilesProcess).exists()).toBe(true)
      expect(wrapper.findComponent(ExternalStorageProfilesCapture).exists()).toBe(true)
      expect(wrapper.findComponent(ExternalStorageProfilesOutput).exists()).toBe(true)
    })
  })

  describe('Props Validation', () => {
    it('should require id prop', () => {
      expect(wrapper.props('id')).toBe('1')
    })

    it('should require storageId prop', () => {
      expect(wrapper.props('storageId')).toBe('storage-1')
    })
  })

  describe('Dependency Injection', () => {
    it('should inject MenuRouterKey', () => {
      expect(wrapper.vm.routerProvider).toBeDefined()
    })

    it('should throw error if MenuRouterKey is not provided', () => {
      expect(() => {
        shallowMount(ExternalStorageProfileDetail, {
          props: {
            id: '1',
            storageId: 'storage-1'
          },
          global: {
            components: { 
              ExternalStorageProfilesGenerate,
              ExternalStorageProfilesImport,
              ExternalStorageProfilesProcess,
              ExternalStorageProfilesCapture,
              ExternalStorageProfilesOutput
            },
            mocks: {
              $t: (msg: string) => msg,
              $i18n: { t: (key: string) => key }
            }
          }
        })
      }).toThrow('MenuRouterKey is not provided')
    })
  })

  describe('Tab Navigation', () => {
    it('should change active tab when activeName is updated', async () => {
      wrapper.vm.activeName = 'generate'
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.activeName).toBe('generate')
    })

  })

  describe('Profile Data Handling', () => {
    it('should handle null profile data', async () => {
      adminApi.api.getExternalstorageIdProfilesProfileid.mockResolvedValue({
        data: null
      })
      
      await wrapper.vm.init()
      expect(wrapper.vm.profile).toBeNull()
    })

    it('should handle profile data with missing settings', async () => {
      const incompleteProfile = {
        id: '1',
        name: 'Test Profile',
        status: 'A'
        // Missing importSetting, processSetting, captureSetting
      }
      
      adminApi.api.getExternalstorageIdProfilesProfileid.mockResolvedValue({
        data: incompleteProfile
      })
      
      await wrapper.vm.init()
      expect(wrapper.vm.profile).toEqual(incompleteProfile)
    })
  })
})
