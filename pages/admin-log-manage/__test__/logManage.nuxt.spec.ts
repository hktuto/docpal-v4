// CommentComponent.spec.ts
import { vi, test, expect, describe, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { mockRouterProvider } from './util'
import {
  LogManage,
} from '#components'; // 替换为你的组件路径
import { adminApi } from './mock/api';
import { ElMessage, ElMessageBox } from 'element-plus';

vi.mock('element-plus', async () => ({
  ElMessageBox: {
    confirm: vi.fn(),
  }
}));

describe('[admin-log-manage]LogManage', () => {
  let wrapper: any;
  global.open = vi.fn();
  beforeEach(() => {
    wrapper = mount(LogManage, {
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
    wrapper.vm.tableConfig.data = [
      {
        service: 'service1',
        levels: ['INFO', 'DEBUG'],
        effectiveLevel: 'INFO',
        configuredLevel: 'DEBUG',
        loading: false,
      },
    ]
  });

  test('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });
  test('handles level change correctly', async () => {
    const mockResponse = { success: true };
    adminApi.api.getManagementLoggers.mockResolvedValue({
      data: {
        service1: {
          levels: ['INFO', 'DEBUG'],
          loggers: {
            ROOT: {
              effectiveLevel: 'INFO',
              configuredLevel: 'DEBUG',
            },
          },
        },
      },
    });
    adminApi.api.postManagementLoggers.mockResolvedValue(mockResponse);

    await wrapper.vm.$nextTick(); // 确保组件更新

    const row = wrapper.vm.tableConfig.data[0];
    row.loading = false; // 确保初始状态
    await wrapper.vm.handleLevelChange('DEBUG', row);

    expect(adminApi.api.postManagementLoggers).toHaveBeenCalledWith({
      service: 'service1',
      level: 'DEBUG',
    });

    expect(row.loading).toBe(false);
  });
  test('sets loading state during level change', async () => {
    
    adminApi.api.getManagementLoggers.mockResolvedValue({
      data: {
        service1: {
          levels: ['INFO', 'DEBUG'],
          loggers: {
            ROOT: {
              effectiveLevel: 'INFO',
              configuredLevel: 'DEBUG',
            },
          },
        },
      },
    });

    await wrapper.vm.$nextTick(); // 确保组件更新
    const row = wrapper.vm.tableConfig.data[0];

    expect(row.loading).toBe(false);
    await wrapper.vm.handleLevelChange('DEBUG', row);
    expect(row.loading).toBe(false); 
  });
  test('handles API errors during level change', async () => {
    adminApi.api.getManagementLoggers.mockResolvedValue({
      data: {
        service1: {
          levels: ['INFO', 'DEBUG'],
          loggers: {
            ROOT: {
              effectiveLevel: 'INFO',
              configuredLevel: 'DEBUG',
            },
          },
        },
      },
    });
    adminApi.api.postManagementLoggers.mockRejectedValue(new Error('API Error'));

    const row = wrapper.vm.tableConfig.data[0];

    await wrapper.vm.handleLevelChange('DEBUG', row);
    expect(row.loading).toBe(false); // 错误后也应为 false
  });
});
