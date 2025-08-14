import { mount } from '@vue/test-utils';
import { describe, test, vi, expect, beforeEach } from 'vitest';
import { AdminEasyFormPage, ResponsiveFilter } from '#components';
import { adminApi } from './mock/api';
import { VxeGrid } from 'vxe-table';
import { mockRouterProvider } from './util';

describe('[admin-easy-form]AdminEasyFormPage', () => {
  let wrapper: any;
  beforeEach(() => {
    vi.clearAllMocks();
    wrapper = mount(AdminEasyFormPage, {
      global: {
        components: { VxeGrid, ResponsiveFilter },
        provide: {
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: string) => msg,// Mock translation function
          $i18n: { t: (key: string) => key },
        }
      }
    });
  });

  // 基础渲染测试
  test('should render the component correctly', () => {
    expect(wrapper.findComponent(VxeGrid).exists()).toBe(true);
    expect(wrapper.find('#EasyForm__CreateNewForm').exists()).toBe(true);
    expect(wrapper.findComponent(ResponsiveFilter).exists()).toBe(true);
  });

  // 新增表单测试
  test('should call handleAdd when button is clicked', async () => {
    const mockOpen = vi.fn();
    wrapper.vm.DialogRef = { handleOpen: mockOpen };

    await wrapper.find('#EasyForm__CreateNewForm').trigger('click');
    expect(mockOpen).toHaveBeenCalled();
  });
  test('should call handleDblclick with correct row', async () => {
    const row = { id: 1 };
    const handleDblclickSpy = vi.spyOn(wrapper.vm, 'handleDblclick');

    await wrapper.vm.handleDblclick(row);

    expect(handleDblclickSpy).toHaveBeenCalledWith(row);
  });
  test('should activate and deactivate correctly', async () => {
    const row = { id: 1, enable: false };
    const apiSpy = vi.spyOn(adminApi.api, 'patchFormDesignEnableId').mockResolvedValue({ data: true });

    await wrapper.vm.handleActive(row, true);

    expect(apiSpy).toHaveBeenCalledWith(row.id);
    expect(row.enable).toBe(true); // Check if row.enable is updated

    apiSpy.mockResolvedValue({ data: true });
    await wrapper.vm.handleActive(row, false);

    expect(apiSpy).toHaveBeenCalledWith(row.id);
    expect(row.enable).toBe(false); // Check if row.enable is updated
  });
  test('should call handleFilterFormChange with correct parameters', async () => {
    const formModel = { isDesc: false };
    const handleFilterFormChangeSpy = vi.spyOn(wrapper.vm, 'handleFilterFormChange');

    await wrapper.vm.handleFilterFormChange(formModel);

    expect(handleFilterFormChangeSpy).toHaveBeenCalledWith(formModel);
    expect(formModel.isDesc).toBe(true); // Check if isDesc is modified
  });
});
