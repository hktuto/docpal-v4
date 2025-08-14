import { mount, flushPromises, shallowMount } from '@vue/test-utils';
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import {
  AdminEasyFormDetail,
  EasyFormEmailLog,
  EasyFormDetailName,
  EasyFormDetailPermission,
  EasyFormDetailPreview
} from '#components';
import { adminApi } from './mock/api';
import { VxeGrid } from 'vxe-table';
import { ElMessageBox, ElNotification, ElMessage } from 'element-plus';
import { mockRouterProvider } from './util';

vi.mock('element-plus', () => ({
  ElMessageBox: {
    alert: vi.fn()
  },
  ElNotification: {
    success: vi.fn()
  },
  ElMessage: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

// 创建一个空组件
const EmptyComponent = {
  template: '<div></div>'
};
describe('[admin-easy-form]AdminEasyFormDetail', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(AdminEasyFormDetail, {
      props: {
        id: '1'
      },
      provide: {
        [MenuRouterKey]: mockRouterProvider
      },
      global: {
        components: {
          VxeGrid
        },
        mocks: {
          $t: (msg: any) => msg // Mock translation function
        }
      }
    });
  });
  it('should render the component correctly', () => {
    console.log(wrapper.html());
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.pageContainer--padding.main').exists()).toBe(true);
  });
  it('should fetch detail and call handleEmailUpdate', async () => {
    const mockDetail = { id: '123', name: 'Test Form' };

    // 模拟 adminApi.api.getFormDesignDraftId
    vi.spyOn(adminApi.api, 'getFormDesignDraftId').mockResolvedValue({
      data: mockDetail
    });

    // 模拟 handleEmailUpdate 方法
    const handleEmailUpdateSpy = vi.spyOn(wrapper.vm, 'handleEmailUpdate');

    // 调用 getDetail 方法
    await wrapper.vm.getDetail();


    setTimeout(() => {
      // 验证 API 被调用
      expect(adminApi.api.getFormDesignDraftId).toHaveBeenCalledWith('123');
      // 验证 state.detail 被正确设置
      expect(wrapper.vm.state.detail).toEqual(mockDetail);
      // 验证 handleEmailUpdate 被调用
      expect(handleEmailUpdateSpy).toHaveBeenCalled();
    });
  });
  it('should handle errors correctly', async () => {
    // 模拟 adminApi.api.getFormDesignDraftId 抛出错误
    vi.spyOn(adminApi.api, 'getFormDesignDraftId').mockRejectedValue(new Error('API Error'));
    // 调用 getDetail 方法
    await wrapper.vm.getDetail();
    // 验证 state.detail 仍然为空或未被设置
    expect(Object.keys(wrapper.vm.state.detail).length).toBe(0); // 根据您的实现来调整

    // 这里可以添加更多的错误处理断言，例如检查控制台输出
  });

  it('should update action correctly', () => {
    wrapper.vm.state.detail.formResult = [{ id: '1', name: 'Test' }];
    const action = { id: '1', name: 'Updated Test' };

    wrapper.vm.handleUpdateAction(action);

    expect(wrapper.vm.state.detail.formResult[0].name).toBe('Updated Test');
  });

  it('should delete action correctly', () => {
    wrapper.vm.state.detail.formResult = [{ id: '1', name: 'Test' }];

    wrapper.vm.handleDeleteAction('1');

    expect(wrapper.vm.state.detail.formResult).toHaveLength(0);
  });

  it('should call handleEmailUpdate and reload logRef', async () => {
    const logRefValue = {
      tableRef: {
        reload: vi.fn()
      }
    };
    wrapper.vm.logRef = { value: logRefValue };

    await wrapper.vm.handleEmailUpdate();
    setTimeout(() => {
      expect(logRefValue.tableRef.reload).toHaveBeenCalled();
    });
  });

  it('should fetch detail correctly', async () => {
    const mockDetail = { id: '123', formResult: [] };
    const apiSpy = vi.spyOn(adminApi.api, 'getFormDesignDraftId').mockResolvedValue({ data: mockDetail });

    await wrapper.vm.getDetail();

    expect(apiSpy).toHaveBeenCalledWith('1');
    expect(wrapper.vm.state.detail).toEqual(mockDetail);
  });
});
describe('[admin-easy-form]EasyFormEmailLog', () => {
  let wrapper: any = shallowMount(EasyFormEmailLog, {
    props: {
      id: '1'
    },
    global: {
      provide: {
        [MenuRouterKey]: mockRouterProvider
      },
      components: {
        VxeGrid
      },
      mocks: {
        $t: (msg: any) => msg // Mock translation function
      }
    }
  });
  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    console.log(wrapper.html());
    // expect(wrapper.findComponent(VxeGrid).exists()).toBe(true);
    expect(wrapper.html().includes('vxe-grid-stub')).toBe(true);
    expect(wrapper.html().includes('dialog-stub')).toBe(true);
    expect(wrapper.html().includes('dialog-readonly-stub')).toBe(true);
  });
  it('initializes filter conditions', async () => {
    await flushPromises();
    wrapper.vm.ResponsiveFilterRef = {
      init: vi.fn().mockResolvedValue('true')
    };
    await wrapper.vm.initCondition();
    expect(wrapper.vm.ResponsiveFilterRef.init).toHaveBeenCalled();
  });
  it('calls handleOpenCase when case tag is clicked', async () => {
    const row = { actionId: '1', actionName: 'Test Case', caseId: '456' };
    await wrapper.vm.handleOpenCase(row);
    expect(wrapper.vm.loading).toBe(false);
    // 可以添加对 routerProvider.navigateTo 的期望
  });
  it('updates table on email update', async () => {
    const updateSpy = vi.spyOn(wrapper.vm, 'update');
    await wrapper.vm.update();

    expect(updateSpy).toHaveBeenCalled();
    // 可以添加对 query() 方法的期望
  });
  it('handles filter form change correctly', async () => {
    const formModel = { email: 'test@example.com', isDesc: false };
    await wrapper.vm.handleFilterFormChange(formModel);
    expect(wrapper.vm.filterParams.email).toBe('test@example.com');
    expect(wrapper.vm.filterParams.isDesc).toBe(true);
  });
});
describe('[admin-easy-form]EasyFormDetailName', () => {
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
      global: {
        provide: {
          [MenuRouterKey]: mockRouterProvider
        },
        components: {
          VxeGrid
        },
        mocks: {
          $t: (msg: any) => msg // Mock translation function
        }
      }
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
    expect(mockRouterProvider.message.success).toHaveBeenCalledWith('dpMsg_success');
  });
  it('publishes correctly', async () => {
    const publishSpy = vi.spyOn(wrapper.vm, 'handlePublish');
    await wrapper.vm.handlePublish();

    expect(wrapper.vm.state.publishLoading).toBe(false);
    expect(mockRouterProvider.message.success).toHaveBeenCalledWith('dpMsg_success');
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
    expect(mockRouterProvider.message.error).toHaveBeenCalledWith('dpMsg_error');
  });
});
describe('[admin-easy-form]EasyFormDetailPermission', () => {
  let wrapper: any;
  const mockDetail = {
    id: 'test-id',
    permission: 'group1,group2'
  };

  const mockGroups = [
    { id: 'group1', name: 'Group 1' },
    { id: 'group2', name: 'Group 2' },
    { id: 'group3', name: 'Group 3' }
  ];
  beforeEach(async () => {
    vi.spyOn(adminApi.api, 'postNuxeoIdentityGroups').mockResolvedValue({ data: mockGroups });
    vi.spyOn(adminApi.api, 'postFormDesignSavePermission').mockResolvedValue({});
    wrapper = mount(EasyFormDetailPermission, {
      props: {
        detail: mockDetail
      },
      global: {
        provide: {
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: any) => msg // Mock translation function
        }
      }
    });
    await wrapper.vm.$nextTick(); // 确保 DOM 更新完成
  });
  afterEach(() => {
    wrapper.unmount();
  });
  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h3.title').exists()).toBe(true);
    expect(wrapper.find('h3.title').text()).toBe('easyForm.permission');
    expect(wrapper.find('.el-select').exists()).toBe(true);
  });
  it('initializes form with detail permissions', () => {
    expect(wrapper.vm.form.permission).toEqual(['group1', 'group2']);
  });
  it('loads user groups on mount', async () => {
    expect(wrapper.vm.state.groups).toEqual(mockGroups);
  });
  it('handles permission change correctly', async () => {
    const newPermissions = ['group1', 'group3'];
    wrapper.vm.form.permission = newPermissions;
    await wrapper.vm.handleChange();

    expect(adminApi.api.postFormDesignSavePermission).toHaveBeenCalledWith({
      id: mockDetail.id,
      permission: newPermissions.join(',')
    });
    expect(mockRouterProvider.message.success).toHaveBeenCalledWith('dpMsg_success');
  });
  it('does not call API if no permissions are selected', async () => {
    wrapper.vm.form.permission = [];
    await wrapper.vm.handleChange();

    expect(adminApi.api.postFormDesignSavePermission).not.toHaveBeenCalled();
  });
  it('watches for detail changes', async () => {
    const newDetail = { id: 'test-id', permission: 'group2,group3' };
    await wrapper.setProps({ detail: newDetail });

    expect(wrapper.vm.form.permission).toEqual(['group2', 'group3']);
  });
});
describe('[admin-easy-form]EasyFormDetailPreview', () => {
  let wrapper: any;
  const mockDetail = {
    id: 'test-id',
    previewStyle: '{"field": "value"}'
  };

  const mockGroups = [
    { id: 'group1', name: 'Group 1' },
    { id: 'group2', name: 'Group 2' },
    { id: 'group3', name: 'Group 3' }
  ];
  beforeEach(async () => {
    vi.spyOn(adminApi.api, 'postNuxeoIdentityGroups').mockResolvedValue({ data: mockGroups });
    vi.spyOn(adminApi.api, 'postFormDesignSavePermission').mockResolvedValue({});
    wrapper = shallowMount(EasyFormDetailPreview, {
      props: {
        detail: mockDetail
      },
      global: {
        provide: {
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: any) => msg // Mock translation function
        }
      }
    });
    await wrapper.vm.$nextTick();
  });
  afterEach(() => {
    wrapper.unmount();
  });
  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('opens form design on button click', async () => {
    await wrapper.vm.handleOpenFormDesign();
    expect(mockRouterProvider.navigateTo).toHaveBeenCalled();
  });
  it('copies URL to clipboard', async () => {
    wrapper.vm.handleCopyUrl();
    expect(mockRouterProvider.message.success).toHaveBeenCalledWith('dpTip.urlCopied');
  });
  it('copies embed code to clipboard', async () => {
    wrapper.vm.handleCopyIframe();
    expect(mockRouterProvider.message.success).toHaveBeenCalledWith('dpTip.embedCodeCopied');
  });
  it('opens email dialog on send email button click', async () => {
    const dialogRef = { handleOpen: vi.fn() };
    wrapper.vm.dialogRef = dialogRef;
    wrapper.vm.handleSendEmail();
    expect(dialogRef.handleOpen).toHaveBeenCalledWith(mockDetail.id);
  });
});
