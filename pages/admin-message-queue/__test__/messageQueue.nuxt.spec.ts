// CommentComponent.spec.ts
import { vi, test, expect, describe, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { mockRouterProvider } from './util'
import { VxeGrid } from 'vxe-table'
import {
  MessageQueuePage,ResponsiveFilter
} from '#components'; // 替换为你的组件路径
import { adminApi } from './mock/api';
import { ElMessage, ElMessageBox } from 'element-plus';
vi.mock('element-plus', async () => ({
  ElMessageBox: {
    confirm: vi.fn(),
  }
}));

describe('[admin-message-template]MessageQueuePage', () => {
  let wrapper: any;
  global.open = vi.fn();
  beforeEach(() => {
    wrapper = mount(MessageQueuePage, {
      components: { VxeGrid, ResponsiveFilter,  },
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
  });
  test('fetches message queue data on mount', async () => {
    wrapper.vm.ResponsiveFilterRef = {
      init: vi.fn().mockResolvedValue('true')
    }
    await wrapper.vm.getFilter();
    expect(wrapper.vm.ResponsiveFilterRef.init).toHaveBeenCalled();
  });
  
  test('handles filter form changes correctly', async () => {
    const formModel = { isDesc: 'false', status: 'ERROR' };

    await wrapper.vm.handleFilterFormChange(formModel);

    expect(wrapper.vm.extraParams).toEqual(formModel);
    expect(wrapper.vm.reload).toHaveBeenCalled();
  });
});
