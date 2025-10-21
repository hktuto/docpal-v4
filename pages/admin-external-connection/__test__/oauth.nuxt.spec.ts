// CommentComponent.spec.ts
import { vi, test, expect, describe, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { mockRouterProvider } from './util'
import {
  Oauth,
} from '#components'; // 替换为你的组件路径
import { adminApi } from './mock/api';
import { ElMessage, ElMessageBox } from 'element-plus';

vi.mock('element-plus', async () => ({
  ElMessageBox: {
    confirm: vi.fn(),
  }
}));

describe('[admin-external-connection]Oauth', () => {
  let wrapper: any;
  global.open = vi.fn();
  beforeEach(() => {
    wrapper = mount(Oauth, {
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
    expect(wrapper.find('h3').text()).toBe('adminMenu.oauth');
  });
  test('fetches OAuth2 settings on mount', async () => {
    const mockResponse = {
      data: {
        clientId: 'test-client-id',
        clientSecret: 'test-client-secret',
        redirectUri: 'http://localhost/callback',
        authenticationMethod: 'DEFAULT',
      },
    };
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn(() => Promise.resolve({ name: '1111' })),
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn()
      }
    }
    adminApi.api.getOauth2Setting.mockResolvedValue(mockResponse);

    await wrapper.vm.handleGet(); // 确保 onMounted 被调用
    expect(adminApi.api.getOauth2Setting).toHaveBeenCalled();
    expect(wrapper.vm.FormRendererRef.vFormRenderRef.setFormData).toHaveBeenCalledWith(mockResponse.data);
  });

  test('handles form submission correctly', async () => {
    const mockFormData = {
      clientId: 'test-client-id',
      clientSecret: 'test-client-secret',
      redirectUri: 'http://localhost/callback',
      authenticationMethod: 'DEFAULT',
    };
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue(mockFormData),
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn()
      }
    }
    adminApi.api.postOauth2Setting.mockResolvedValue({});

    await wrapper.vm.handleSubmit();

    expect(adminApi.api.postOauth2Setting).toHaveBeenCalledWith(mockFormData);
    expect(mockRouterProvider.message.success).toHaveBeenCalledWith('msg_successfullyModified'); // 根据实际翻译文本调整
  });
  test('opens a new window for non-default authentication methods', async () => {
    const mockFormData = {
      clientId: 'test-client-id',
      clientSecret: 'test-client-secret',
      redirectUri: 'http://localhost/callback',
      authenticationMethod: 'GOOGLE',
    };
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue(mockFormData),
      vFormRenderRef: {
        resetForm: vi.fn(),
        setFormData: vi.fn()
      }
    }
    adminApi.api.postOauth2Setting.mockResolvedValue('http://example.com/auth');

    await wrapper.vm.handleSubmit();

    expect(window.open).toHaveBeenCalledWith('http://example.com/auth', '_blank');
  });
});
