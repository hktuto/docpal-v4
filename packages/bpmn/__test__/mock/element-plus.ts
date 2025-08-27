import { vi } from 'vitest'

// Mock Element Plus 组件
vi.mock('element-plus', () => ({
  ElMessage: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn()
  },
  ElMessageBox: {
    confirm: vi.fn(),
    alert: vi.fn(),
    prompt: vi.fn()
  },
  ElNotification: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn()
  }
}))

// Mock Element Plus 指令
vi.mock('element-plus/es/directives/index', () => ({
  vLoading: {
    mounted: vi.fn(),
    updated: vi.fn(),
    unmounted: vi.fn()
  }
}))
