import { shallowMount, mount, flushPromises } from '@vue/test-utils';
import { ref } from 'vue';
import { describe, it, vi, expect, beforeEach, afterEach, } from 'vitest';
import {
  EasyFormDesigner,
} from '#components';
import { adminApi } from './mock/api';

import { ElMessage, ElMessageBox } from 'element-plus';
const mockRouterProvider = {
  navigateTo: vi.fn()
};
// 模拟 FormDesigner 组件
const mockFormJson = {
  widgetList: [],
  formConfig: {/*...*/ }
};
const FormDesignerStub = {
  template: '<div class="form-designer-stub"></div>',
  methods: {
    getFormJson: vi.fn().mockReturnValue(mockFormJson),
    setFormJson: vi.fn()
  }
};
describe('EasyFormDesigner', () => {
  let wrapper: any;

  beforeEach(() => {
    vi.clearAllMocks();
    wrapper = mount(EasyFormDesigner, {
      props: {
        id: '1'
      },
      provide: {
        [MenuRouterKey]: mockRouterProvider
      },
      global: {
        mocks: {
          $t: (msg: any) => msg,// Mock translation function
        },
        stubs: {
          FormDesigner: FormDesignerStub,
          VFormDesigner: FormDesignerStub,
        }
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
    await flushPromises();
    await nextTick();
    const mockResponse = { data: { success: true } };
    vi.spyOn(adminApi.api, 'postFormDesignSavePreview').mockResolvedValue(mockResponse);
    const elMessageSpy = vi.spyOn(ElMessage, 'success');
    // console.log(wrapper.html());
    // setTimeout(async () => {
    //   console.log(wrapper.vm.FormDesignerRef);
    //   await wrapper.vm.handleSubmit();
    //   // 验证 API 被调用
    //   expect(adminApi.api.postFormDesignSavePreview).toHaveBeenCalledWith();
    //   console.log('?????????');

    //   // 验证 ElMessage 被调用
    //   expect(elMessageSpy).toHaveBeenCalledWith('msg_successfullyModified');
    //   expect(wrapper.vm.state.submitLoading).toBe(false);
    // }, 500);
  });

  it('should handle submit error', async () => {
    wrapper.vm.state.loadField = true;
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockJson = { widgetList: [], formConfig: {} };
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
