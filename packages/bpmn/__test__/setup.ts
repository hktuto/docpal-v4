import { vi } from 'vitest'
import { config } from '@vue/test-utils'

config.global.stubs = {
  'ElForm': {
    template: '<form><slot /></form>'
  },
  'ElFormItem': {
    template: '<div><slot /></div>'
  },
  'ElSelect': {
    template: '<select><slot /></select>',
    props: ['modelValue', 'disabled', 'clearable'],
    emits: ['update:modelValue', 'change']
  },
  'ElOption': {
    template: '<option><slot /></option>',
    props: ['label', 'value']
  },
  'ElButton': {
    template: '<button><slot /></button>',
    props: ['type', 'size', 'disabled', 'loading']
  },
  'ElDialog': {
    template: '<div><slot /></div>',
    props: ['modelValue', 'fullscreen', 'width', 'top', 'append-to-body', 'destroy-on-close', 'draggable']
  },
  'ElAlert': {
    template: '<div><slot /></div>',
    props: ['title', 'type', 'closable', 'show-icon']
  },
  'ElMessage': {
    template: '<div></div>'
  },
  'BpmnContextFolderCabinet1Detail': {
    template: '<div class="bpmn-context-folder-cabinet-detail"><slot /></div>',
    props: ['field', 'allField', 'folderCabinetItem'],
    emits: ['update:fields', 'update:fieldData']
  }
}

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn()
}
