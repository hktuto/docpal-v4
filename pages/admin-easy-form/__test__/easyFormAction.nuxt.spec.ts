// CommentComponent.spec.ts
import { vi, test, expect, describe, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import {
  EasyFormAction,
} from '#components'; // 替换为你的组件路径
import { adminApi } from './mock/api';
import { ElMessage, ElMessageBox } from 'element-plus';

vi.mock('element-plus', async () => ({
  ElMessageBox: {
    confirm: vi.fn(),
  }
}));

describe('[admin-easy-form]EasyFormAction', () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = mount(EasyFormAction, {
      props: {
        detail: {
          id: 'form-id',
          formResult: [
            { id: '1', actionName: 'Action 1', actionType: 'Email', status: 'A', actionKey: 'key1' },
            { id: '2', actionName: 'Action 2', actionType: 'CaseType', status: 'D', actionKey: 'key2' },
          ],
        }
      },
      global: {
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
    expect(wrapper.find('h3.title').text()).toBe('easyForm.actions'); // 检查标题是否正确
    expect(wrapper.findAll('.action').length).toBe(2); // 检查动作列表是否正确渲染
  });
  test('handles add action correctly', async () => {
    const item = { id: '1', actionName: 'Action 1' };
    const dialogRef = wrapper.vm.dialogRef;
    console.log(wrapper);
    dialogRef.handleOpen = vi.fn((item) => Promise.resolve(item));
    await wrapper.vm.handleAdd(item);
    expect(dialogRef.handleOpen).toHaveBeenCalledWith(item); // 检查是否调用了打开对话框
  });
  test('handles action command correctly', async () => {
    const item = { id: '1', actionName: 'Action 1', actionType: 'Email', actionKey: 'key1' };
    const dialogRef = wrapper.vm.dialogRef;
    dialogRef.handleOpen = vi.fn((oitem) => Promise.resolve(oitem));
    await wrapper.vm.handleAction('edit', item);
    expect(wrapper.vm.dialogRef.handleOpen).toHaveBeenCalledWith(item); // 检查编辑动作是否正确处理
    await wrapper.vm.handleAction('active', item);
    expect(adminApi.api.postFormDesignSaveFormresultAppend).toHaveBeenCalled(); // 检查激活 API 是否被调用

    ElMessageBox.confirm.mockResolvedValue('confirm'); // 需要在ElMessageBox之前调用
    await wrapper.vm.handleAction('delete', item);
    // await wrapper.vm.$nextTick();
    expect(ElMessageBox.confirm).toHaveBeenCalled();
    expect(adminApi.api.deleteFormDesignDraftidFormresultFormresultid).toHaveBeenCalled();
  });
});
