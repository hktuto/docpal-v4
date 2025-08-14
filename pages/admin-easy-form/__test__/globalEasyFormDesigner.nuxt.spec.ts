import { shallowMount, mount, flushPromises } from '@vue/test-utils';
import { describe, it, vi, expect, beforeEach, afterEach, } from 'vitest';
import {
  AdminEasyFormDesigner,
} from '#components';
import { adminApi } from './mock/api';

import { mockRouterProvider } from './util';
// 模拟 FormDesigner 组件
const mockFormJson = {
  widgetList: [],
  formConfig: {/*...*/ }
};

describe('[admin-easy-form]AdminEasyFormDesigner', () => {
  let wrapper: any;

  beforeEach(() => {
    vi.clearAllMocks();
    wrapper = shallowMount(AdminEasyFormDesigner, {
      props: {
        id: '1'
      },
      global: {
        provide: {
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: any) => msg,// Mock translation function
        },
      },
    });
  });
  afterEach(() => {
    vi.restoreAllMocks(); // 恢复所有模拟
  });
  it('should render correctly when loading fields', async () => {
    // 模拟 loadField 为 true
    wrapper.vm.state.loadField = true;
    await wrapper.vm.$nextTick(); // 等待更新

    expect(wrapper.find('.pageContainer--padding').exists()).toBe(true);
  });

  it('should call handleSubmit and show success message', async () => {
    const mockResponse = { data: { success: true } };
    vi.spyOn(adminApi.api, 'postFormDesignSavePreview').mockResolvedValue(mockResponse);
    wrapper.vm.FormDesignerRef = {
      getFormJson: vi.fn().mockReturnValue(mockFormJson)
    };
    await wrapper.vm.handleSubmit();
    expect(adminApi.api.postFormDesignSavePreview).toHaveBeenCalled();
    expect(mockRouterProvider.message.success).toHaveBeenCalledWith('msg_successfullyModified');
  });

  it('should handle submit error', async () => {
    wrapper.vm.state.loadField = true;
    wrapper.vm.FormDesignerRef = {
      getFormJson: vi.fn().mockReturnValue(mockFormJson)
    };
    // 模拟 adminApi.api.postFormDesignSavePreview 方法抛出错误
    vi.spyOn(adminApi.api, 'postFormDesignSavePreview').mockRejectedValue(new Error('API Error'));
    // 调用 handleSubmit 方法
    await wrapper.vm.handleSubmit();
    // 验证 submitLoading 状态
    expect(wrapper.vm.state.submitLoading).toBe(false);
  });

  it('should handle field list correctly', () => {
    const testList = [{ name: 'Field1' }, { name: 'Field2' }];

    // 调用 handleFiledList 方法
    wrapper.vm.handleFiledList(testList);

    // 验证 state.loadField 的值
    expect(wrapper.vm.state.loadField).toBe(true);
    // 验证 state.fieldListApi 的值
    expect(wrapper.vm.state.fieldListApi.data[0].id).toEqual('Field1');

    // 验证 state.loadField 被设置为 true
    expect(wrapper.vm.state.loadField).toBe(true);
  });
  it('should get detail and update state correctly', async () => {
    const mockDetail = {
      previewStyle: '{"widgetList":[],"formConfig":{}}',
      information: [{ name: 'Field1' }, { name: 'Field2' }],
    };
    vi.spyOn(adminApi.api, 'getFormDesignDraftId').mockResolvedValue({ data: mockDetail });

    // 调用 getDetail 方法
    await wrapper.vm.getDetail();

    // 验证 state.detail 的值
    expect(wrapper.vm.state.detail).toEqual(mockDetail);

    // 验证 handleFiledList 被调用
    expect(wrapper.vm.state.fieldListApi.data).toEqual([
      { id: 'Field1' },
      { id: 'Field2' },
    ]);
  });
});
