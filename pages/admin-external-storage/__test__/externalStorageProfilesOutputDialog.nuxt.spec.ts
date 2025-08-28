import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { adminApi } from './mock/api'
import {
  ExternalStorageProfilesOutputDialog,
} from '#components'

// Mock the useOutputOptioins composable
const mockDocumentTypeOpts = [
  { label: 'File', value: 'File' },
  { label: 'pdf', value: 'pdf' },
  { label: 'doc', value: 'doc' }
]

const mockOutputFormatOpts = [
  { label: 'PDF', value: 'PDF' },
  { label: 'Image', value: 'Image' },
  { label: 'Text', value: 'Text' }
]

const mockFileTypeOpts = [
  { label: 'TIFF', value: 'TIFF' },
  { label: 'JPEG', value: 'JPEG' }
]

const mockResolutionOpts = [
  { label: 'Original', value: 1 },
  { label: '0.25x', value: 0.25 }
]

const mockColorOpts = [
  { label: 'Original', value: 'original' },
  { label: 'Black & White', value: 'blackWhite' }
]

const mockDestinationOpts = [
  { label: 'External Storage Profile', value: 'external' },
  { label: 'DocPal', value: 'docPal' },
  { label: 'Workflow', value: 'workflow' }
]

const mockExternalStorageProfileOpts = [
  { label: 'Profile 1', value: 'profile1' },
  { label: 'Profile 2', value: 'profile2' }
]

const mockDuplicateNameStrategyOpts = [
  { label: 'Replace', value: 'replace' },
  { label: 'Rename', value: 'rename' }
]

const mockPathVOpts = [
  { label: 'Profile_id', value: '${Profile_id}' },
  { label: 'File_name', value: '${File_name}' }
]

const mockFileNameVOpts = [
  { label: 'Profile_id', value: '${Profile_id}' },
  { label: 'File_name', value: '${File_name}' }
]

const mockWorkflowOpts = [
  { label: 'Workflow_1', value: 'Workflow_1' },
  { label: 'Workflow_2', value: 'Workflow_2' }
]

const mockWorkflowVOpts = [
  { label: 'Profile_id', value: 'profile_id' },
  { label: 'File_name', value: 'file_name' }
]

vi.mock('~/composables/useOutputOptioins', () => ({
  useOutputOptioins: () => ({
    documentTypeOpts: mockDocumentTypeOpts,
    outputFormatOpts: mockOutputFormatOpts,
    fileTypeOpts: mockFileTypeOpts,
    resolutionOpts: mockResolutionOpts,
    colorOpts: mockColorOpts,
    destinationOpts: mockDestinationOpts,
    externalStorageProfileOpts: mockExternalStorageProfileOpts,
    duplicateNameStrategyOpts: mockDuplicateNameStrategyOpts,
    pathVOpts: mockPathVOpts,
    fileNameVOpts: mockFileNameVOpts,
    workflowOpts: mockWorkflowOpts,
    workflowVOpts: mockWorkflowVOpts
  })
}))

describe('[admin-external-storage]ExternalStorageProfilesOutputDialog', () => {
  let wrapper: any
  const mockFormData = {
    fileName: 'test.pdf',
    documentType: 'pdf',
    outputFormat: 'PDF',
    color: 'original',
    destination: 'external',
    shareDriveProfile: 'profile1',
    path: '/test/path',
    fileType: 'TIFF',
    resolution: 1,
    quality: 80,
    keepLineBreaks: 'Yes',
    insertPageBreakChar: 'Yes',
    useBlankLineAsParaSep: 'Yes',
    duplicateNameStrategy: 'replace'
  }

  beforeEach(async () => {
    wrapper = mount(ExternalStorageProfilesOutputDialog, {
      props: {
        id: '1',
        storageId: 'storage-1',
        settings: {}
      },
      global: {
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        }
      }
    })
    await wrapper.vm.$nextTick()
    wrapper.vm.dialogVisible = true
    await new Promise(resolve => setTimeout(resolve, 100))
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })

  describe('Dialog State Management', () => {
    it('should initialize with correct default state', () => {
      expect(wrapper.vm.isEdit).toBe(false)
      expect(wrapper.vm.form).toEqual({
        fileName: '',
        documentType: 'File',
        outputFormat: '',
        color: '',
        destination: '',
        shareDriveProfile: '',
        path: '/',
        fileType: '',
        resolution: 1,
        quality: 80,
        keepLineBreaks: 'Yes',
        insertPageBreakChar: 'Yes',
        useBlankLineAsParaSep: 'Yes',
        duplicateNameStrategy: ''
      })
    })

    it('should show dialog when handleOpen is called without data', async () => {
      await wrapper.vm.handleOpen()

      expect(wrapper.vm.dialogVisible).toBe(true)
      expect(wrapper.vm.isEdit).toBe(false)
      expect(wrapper.vm.setting).toBeNull()
    })

    it('should show dialog in edit mode when handleOpen is called with data', async () => {
      const editData = { id: '1', fileName: 'test.pdf' }
      await wrapper.vm.handleOpen(editData, true)

      expect(wrapper.vm.dialogVisible).toBe(true)
      expect(wrapper.vm.isEdit).toBe(true)
      expect(wrapper.vm.setting).toEqual(editData)
      expect(wrapper.vm.form.fileName).toBe('test.pdf')
    })

  })

  describe('Conditional Rendering', () => {
    it('should show text-specific fields when outputFormat is Text', async () => {
      wrapper.vm.form.outputFormat = 'Text'
      await wrapper.vm.$nextTick()

      expect(wrapper.find('.keepLineBreaks').exists()).toBe(true)
      expect(wrapper.find('.insertPageBreakChar').exists()).toBe(true)
      expect(wrapper.find('.useBlankLineAsParaSep').exists()).toBe(true)
    })

    it('should show image-specific fields when outputFormat is Image', async () => {
      wrapper.vm.form.outputFormat = 'Image'
      await wrapper.vm.$nextTick()

      expect(wrapper.find('.fileType').exists()).toBe(true)
      expect(wrapper.find('.resolution').exists()).toBe(true)
      expect(wrapper.find('.quality').exists()).toBe(true)
    })

    it('should show color field for PDF and Image formats', async () => {
      wrapper.vm.form.outputFormat = 'PDF'
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.color').exists()).toBe(true)

      wrapper.vm.form.outputFormat = 'Image'
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.color').exists()).toBe(true)

      wrapper.vm.form.outputFormat = 'Text'
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.color').exists()).toBe(false)
    })

    it('should show external storage profile field when destination is external', async () => {
      wrapper.vm.form.destination = 'external'
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.shareDriveProfile').exists()).toBe(true)

      wrapper.vm.form.destination = 'docPal'
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.shareDriveProfile').exists()).toBe(false)
    })

    it('should show path and fileName fields when destination is not workflow', async () => {
      wrapper.vm.form.destination = 'external'
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.path').exists()).toBe(true)
      expect(wrapper.find('.fileName').exists()).toBe(true)

      wrapper.vm.form.destination = 'workflow'
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.path').exists()).toBe(false)
      expect(wrapper.find('.fileName').exists()).toBe(false)
    })

    it('should show workflow field when destination is workflow', async () => {
      wrapper.vm.form.destination = 'workflow'
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.workflow').exists()).toBe(true)

      wrapper.vm.form.destination = 'external'
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.workflow').exists()).toBe(false)
    })

    it('should show duplicate name strategy field when destination is external', async () => {
      wrapper.vm.form.destination = 'external'
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.duplicateNameStrategy').exists()).toBe(true)

      wrapper.vm.form.destination = 'docPal'
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.duplicateNameStrategy').exists()).toBe(false)
    })
  })

  describe('Variable Selection', () => {
    it('should handle variable selection for fileName', async () => {
      wrapper.vm.form.fileName = 'test'
      wrapper.vm.fileNameInput = {
        input: {
          selectionStart: 4,
          selectionEnd: 4,
          setSelectionRange: vi.fn(),
          focus: vi.fn()
        }
      }

      await wrapper.vm.handleVariableSelect('${File_name}', 'fileName')

      expect(wrapper.vm.form.fileName).toBe('test${File_name}')
    })

    it('should handle variable selection for path', async () => {
      wrapper.vm.form.path = '/test'
      wrapper.vm.pathInput = {
        input: {
          selectionStart: 5,
          selectionEnd: 5,
          setSelectionRange: vi.fn(),
          focus: vi.fn()
        }
      }

      await wrapper.vm.handleVariableSelect('${Profile_id}', 'path')

      expect(wrapper.vm.form.path).toBe('/test${Profile_id}')
    })
  })

  describe('Save Functionality', () => {
    it('should call create API when not in edit mode', async () => {
      const workflowMapping = {
        workflowId: '1',
        workflowName: 'Workflow 1'
      }
      wrapper.vm.WorkflowVariableMappingRef = {
        getData: vi.fn().mockReturnValue({
          ...workflowMapping
        })
      }
      const validateSpy = vi.fn().mockResolvedValue(true)
      wrapper.vm.formRef = {
        validate: validateSpy
      }

      adminApi.api.postExternalstorageProfilesProfileidOutputrecord.mockResolvedValue({})

      await wrapper.vm.save()
      expect(validateSpy).toHaveBeenCalled()
      
      expect(adminApi.api.postExternalstorageProfilesProfileidOutputrecord).toHaveBeenCalledWith('1', {
        ...wrapper.vm.form,
        workflowMapping
      })
      expect(wrapper.vm.dialogVisible).toBe(false)
      expect(wrapper.emitted('refresh')).toBeTruthy()
    })

    it('should call update API when in edit mode', async () => {
      const workflowMapping = {
        workflowId: '1',
        workflowName: 'Workflow 1'
      }
      wrapper.vm.WorkflowVariableMappingRef = {
        getData: vi.fn().mockReturnValue({
          ...workflowMapping
        })
      }
      const validateSpy = vi.fn().mockResolvedValue(true)
      wrapper.vm.formRef = {
        validate: validateSpy
      }
      wrapper.vm.isEdit = true
      wrapper.vm.setting = { id: '1' }

      adminApi.api.patchExternalstorageProfilesProfileidOutputrecordOutputrecordid.mockResolvedValue({})

      await wrapper.vm.save()

      expect(validateSpy).toHaveBeenCalled()
      expect(adminApi.api.patchExternalstorageProfilesProfileidOutputrecordOutputrecordid).toHaveBeenCalledWith('1', '1', {
        ...wrapper.vm.form,
        workflowMapping
      })
      expect(wrapper.vm.dialogVisible).toBe(false)
      expect(wrapper.emitted('refresh')).toBeTruthy()
    })

    it('should handle validation error', async () => {
      const validateSpy = vi.fn().mockRejectedValue(new Error('Validation Error'))
      wrapper.vm.formRef = {
        validate: validateSpy
      }

      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      await wrapper.vm.save()

      expect(validateSpy).toHaveBeenCalled()
      expect(consoleSpy).toHaveBeenCalled()
      expect(wrapper.vm.dialogVisible).toBe(true) // Should not close on validation error

      consoleSpy.mockRestore()
    })

    it('should handle API error', async () => {
      const validateSpy = vi.fn().mockResolvedValue(true)
      wrapper.vm.formRef = {
        validate: validateSpy
      }

      adminApi.api.postExternalstorageProfilesProfileidOutputrecord.mockRejectedValue(new Error('API Error'))

      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      await wrapper.vm.save()

      expect(validateSpy).toHaveBeenCalled()
      expect(consoleSpy).toHaveBeenCalled()
      expect(wrapper.vm.dialogVisible).toBe(true) // Should not close on API error

      consoleSpy.mockRestore()
    })
  })

  describe('Dialog Title', () => {
    it('should show new title when not in edit mode', () => {
      wrapper.vm.isEdit = false
      const dialog = wrapper.find('.el-dialog__title')
      expect(dialog.text()).toContain('externalStorage.outputNew')
    })

    it('should show edit title when in edit mode', async () => {
      wrapper.vm.isEdit = true
      await new Promise(resolve => setTimeout(resolve, 100))
      const dialog = wrapper.find('.el-dialog__title')
      expect(dialog.text()).toContain('externalStorage.outputEdit')
    })
  })

  describe('Button Interaction', () => {
    it('should close dialog when cancel button is clicked', async () => {
      wrapper.vm.dialogVisible = true
      const cancelButton = wrapper.find('.cancel-btn')

      await cancelButton.trigger('click')

      expect(wrapper.vm.dialogVisible).toBe(false)
    })
  })

  describe('Exposed Methods', () => {
    it('should expose handleOpen method', () => {
      expect(wrapper.vm.handleOpen).toBeDefined()
      expect(typeof wrapper.vm.handleOpen).toBe('function')
    })
  })

  describe('Form Validation Rules', () => {
    it('should have validation rules for required fields', () => {
      const rules = wrapper.vm.rules
      expect(rules.fileName).toBeDefined()
      expect(rules.documentType).toBeDefined()
      expect(rules.outputFormat).toBeDefined()
      expect(rules.destination).toBeDefined()
    })

    it('should have conditional validation rules', () => {
      const rules = wrapper.vm.rules
      expect(rules.fileType).toBeDefined()
      expect(rules.resolution).toBeDefined()
      expect(rules.quality).toBeDefined()
      expect(rules.keepLineBreaks).toBeDefined()
      expect(rules.insertPageBreakChar).toBeDefined()
      expect(rules.useBlankLineAsParaSep).toBeDefined()
      expect(rules.duplicateNameStrategy).toBeDefined()
    })
  })

  describe('Edge Cases', () => {
    it('should handle missing formRef', async () => {
      wrapper.vm.formRef = null

      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      await wrapper.vm.save()

      expect(consoleSpy).toHaveBeenCalled()

      consoleSpy.mockRestore()
    })

    it('should handle empty form data', async () => {
      const workflowMapping = {
        workflowId: '1',
        workflowName: 'Workflow 1'
      }
      wrapper.vm.WorkflowVariableMappingRef = {
        getData: vi.fn().mockReturnValue({
          ...workflowMapping
        })
      }
      wrapper.vm.form = {}
      const validateSpy = vi.fn().mockResolvedValue(true)
      wrapper.vm.formRef = {
        validate: validateSpy
      }

      adminApi.api.postExternalstorageProfilesProfileidOutputrecord.mockResolvedValue({})

      await wrapper.vm.save()

      expect(adminApi.api.postExternalstorageProfilesProfileidOutputrecord).toHaveBeenCalledWith('1', {
        ...wrapper.vm.form,
        workflowMapping
      })
    })
  })
}) 
