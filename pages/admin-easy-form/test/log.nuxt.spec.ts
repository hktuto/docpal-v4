import { mount, flushPromises, shallowMount } from '@vue/test-utils';
import { describe, it, vi, expect, beforeEach, afterEach, } from 'vitest';
import {
  EasyFormDetail,
  EasyFormDetailName,

} from '#components';
import { adminApi } from './mock/api';
import { VxeGrid } from 'vxe-table';
import { ElMessageBox, ElNotification, ElMessage } from 'element-plus';
import { a } from 'vitest/dist/chunks/suite.B2jumIFP.js';
vi.mock('element-plus', () => ({
  ElMessageBox: {
    alert: vi.fn(),
  },
  ElNotification: {
    success: vi.fn(),
  },
  ElMessage: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockRouterProvider = {
  navigateTo: vi.fn()
};
describe('EasyFormDetailName', () => {
  let wrapper: any;
  const mockDetail = {
    id: 'test-id',
    name: 'Test Name'
  };
  beforeEach(async () => {
    wrapper = mount(EasyFormDetailName, {
      props: {
        detail: mockDetail
      },
      provide: {
        [MenuRouterKey]: mockRouterProvider
      },
      global: {
        components: {
          VxeGrid,
        },
        mocks: {
          $t: (msg: any) => msg // Mock translation function
        },
      },
    });
    await wrapper.vm.$nextTick(); // 确保 DOM 更新完成
  });
  it('should render the component correctly', async () => {
    console.log(wrapper.find('el-input'));
    await wrapper.vm.$nextTick(); // 等待组件渲染更新
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.html().includes('easyForm.formSetting')).toBe(true);
    expect(wrapper.html().includes('el-input')).toBe(true);
    expect(wrapper.html().includes('button.publish')).toBe(true);
  });
  it('initializes form with detail name', () => {
    expect(wrapper.vm.form.name).toBe(mockDetail.name);
  });
  it('handles name change correctly', async () => {
    const newName = 'New Test Name';
    await wrapper.vm.handleChange(newName);

    expect(wrapper.vm.form.name).toBe(mockDetail.name); // should revert back on error
    expect(ElMessage.success).toHaveBeenCalledWith('dpMsg_success');
  });
  it('publishes correctly', async () => {
    const publishSpy = vi.spyOn(wrapper.vm, 'handlePublish');
    await wrapper.vm.handlePublish();

    expect(wrapper.vm.state.publishLoading).toBe(false);
    expect(ElMessage.success).toHaveBeenCalledWith('dpMsg_success');
    expect(publishSpy).toHaveBeenCalled();
  });
  it('watches for detail changes', async () => {
    const newDetail = { id: 'test-id', name: 'Updated Name' };
    await wrapper.setProps({ detail: newDetail });

    expect(wrapper.vm.form.name).toBe(newDetail.name);
  });
  it('handles error during name change', async () => {
    vi.spyOn(adminApi.api, 'patchFormDesignName').mockImplementationOnce(() => {
      throw new Error('Error');
    });

    await wrapper.vm.handleChange('Invalid Name');

    expect(wrapper.vm.form.name).toBe(mockDetail.name); // should revert back to original
    expect(ElMessage.error).toHaveBeenCalledWith('dpMsg_error');
  });
});
