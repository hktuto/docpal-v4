export const FromRendererRef = {
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
