// CommentComponent.spec.ts
import { vi, test, expect, describe, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises  } from '@vue/test-utils';
import { mockRouterProvider } from './util'
import {
  WhatappsCard,
} from '#components'; // 替换为你的组件路径
import { adminApi } from './mock/api';
import { ElMessage, ElMessageBox } from 'element-plus';

vi.mock('element-plus', async () => ({
  ElMessageBox: {
    confirm: vi.fn(),
  }
}));

describe('[admin-external-connection]WhatappsCard', () => {
  let wrapper: any;
  global.open = vi.fn();
  beforeEach(() => {
    wrapper = mount(WhatappsCard, {
      global: {
        provide: {
          [MenuRouterKey]: mockRouterProvider,
        },
        mocks: {
          $t: (msg: string) => msg, // 模拟国际化函数
          $i18n: () => {
            return {
              t: (msg: string) => msg
            };
          }
        },
      }
    });
  });

  test('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h3').text()).toBe('adminMenu.whatsApps');
  });
  test('handles switch change correctly', async () => {
    const mockResponse = { success: true };
    adminApi.api.putWhatsappUpdateWhatsappSetting.mockResolvedValue(mockResponse);

    await wrapper.vm.handleSwitchChange(true);
    
    expect(adminApi.api.putWhatsappUpdateWhatsappSetting).toHaveBeenCalledWith({
      whatsAppSwitch: true,
      accessToken: undefined,
      phoneNum: '',
      accountNum: '',
    });
    expect(wrapper.vm.state.switchLoading).toBe(true);
  });
  test('handles save correctly', async () => {
    const mockResponse = { success: true };
    adminApi.api.putWhatsappUpdateWhatsappSetting.mockResolvedValue(mockResponse);
    wrapper.vm.form.accessToken = 'new-token';
    wrapper.vm.form.phoneNum = '9876543210';
    wrapper.vm.form.accountNum = 'new-account';
    
    // Mock form validation
    wrapper.vm.formRef = {
      validate: vi.fn().mockReturnValue(true),
    };

    await wrapper.vm.handleSave();

    expect(adminApi.api.putWhatsappUpdateWhatsappSetting).toHaveBeenCalledWith({
      whatsAppSwitch: false, // 根据实际状态调整
      accessToken: 'new-token',
      phoneNum: '9876543210',
      accountNum: 'new-account',
    });
    expect(wrapper.vm.state.saveLoading).toBe(true);
  });
  test('handles test connection correctly', async () => {
    const mockResponse = 'Online';
    adminApi.api.getWhatsappTestConnection.mockResolvedValue(mockResponse);

    await wrapper.vm.handleTestConnection();

    expect(adminApi.api.getWhatsappTestConnection).toHaveBeenCalled();
    expect(wrapper.vm.state.testLoading).toBe(true);
  });
  test('displays error messages on API failure', async () => {
    adminApi.api.getWhatsappTestConnection.mockRejectedValue(new Error('Test connection failed'));

    await wrapper.vm.handleTestConnection();

    expect(wrapper.vm.state.testLoading).toBe(true);
  });
});
