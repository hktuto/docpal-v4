import { vi } from 'vitest';
export const FormRendererRef = {
  getFormJson: () => ({ widgetList: [], formConfig: {} }),
  init: () => {
    return {};
  },
  vFormRenderRef: {
    setFormData: () => {
      return true;
    },
    getFormData: () => {
      return {
        fileName: 'testFile',
      };
    },
    resetForm: () => {
      return true;
    },
    getFormJson: () => ({ widgetList: [], formConfig: {} })
  },

  getData: () => {
    return {};
  }
};
export const MetaFormRef = {
  init: (setting) => {
    return setting;
  },
  getData: () => {
    return {};
  }
};
export const mockRouterProvider = {
  navigateTo: vi.fn(),
  updateProps: vi.fn(),
  menuSymbol: 'mockMenuSymbol',
  message: {
    success: vi.fn(),
    warning: vi.fn(),
    error: vi.fn(),
  }
};
