import { shallowMount, mount } from '@vue/test-utils';
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest';
import { adminApi } from './mock/api';
import { VxeGrid, } from 'vxe-table';
import { mockRouterProvider } from './util';
import { GroupList, GroupDetail } from '#components';
import { ElMessageBox, ElNotification, ElMessage } from 'element-plus';
import { groupProviderKey, groupProviderDetailKey } from '~/util/userProvider';
vi.mock('element-plus', () => ({
  ElMessageBox: {
    alert: vi.fn(),
    confirm: vi.fn(),
  },
  ElNotification: {
    success: vi.fn(),
  },
  ElMessage: {
    success: vi.fn(),
    warning: vi.fn()
  }
}));
const groupProviderDetail = {
  openGroupDetail: vi.fn(),
  GetGroupListApi: adminApi.api.postNuxeoIdentityGroups,
  DeleteGroupApi: adminApi.api.deleteNuxeoIdentityGroup,
  CreateGroupApi: adminApi.api.postNuxeoIdentityGroup,
};
describe('[admin-group]GroupList', () => {
  let wrapper: any;
  const mockTabProvider = {};

  beforeEach(() => {
    wrapper = mount(GroupList, {
      global: {
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider,
          groupProviderKey: groupProviderDetail,
        },
        mocks: {
          $t: (msg: string) => msg,// Mock translation function
          $i18n: { t: (key: string) => key },
        }
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
    vi.clearAllMocks(); // 清除所有模拟
  });
  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.pageContainer').exists()).toBe(true);
  });
  it('opens group detail correctly', () => {
    const groupData = { id: 'group-1', name: 'Group 1', isCanModified: true };

    wrapper.vm.openGroupDetail(groupData);

    expect(mockRouterProvider.navigateTo).toHaveBeenCalledWith(expect.objectContaining({
      id: expect.stringContaining('group-detail-'),
      name: `group-detail-${groupData.id}`,
      props: {
        id: groupData.id,
        name: groupData.name,
        isCanModified: groupData.isCanModified,
      },
    }), false);
  });
  it('fetches group list successfully', async () => {
    const mockGroupList = [{ id: 'group-1', name: 'Group 1' }];
    adminApi.api.postNuxeoIdentityGroups.mockResolvedValue({ data: mockGroupList });

    const result = await groupProviderDetail.GetGroupListApi();
    console.log(result);
    expect(result.data).toEqual(mockGroupList);
    expect(adminApi.api.postNuxeoIdentityGroups).toHaveBeenCalled();
  });
  it('deletes a group successfully', async () => {
    const params = { id: 'group-1' };
    adminApi.api.deleteNuxeoIdentityGroup.mockResolvedValue({ success: true });

    const result = await groupProviderDetail.DeleteGroupApi(params);

    expect(result).toEqual({ success: true });
    expect(adminApi.api.deleteNuxeoIdentityGroup).toHaveBeenCalledWith(params);
  });
  it('creates a group successfully', async () => {
    const params = { name: 'New Group' };
    adminApi.api.postNuxeoIdentityGroup.mockResolvedValue({ success: true });

    const result = await groupProviderDetail.CreateGroupApi(params);

    expect(result).toEqual({ success: true });
    expect(adminApi.api.postNuxeoIdentityGroup).toHaveBeenCalledWith(params);
  });
});
describe('[admin-group]GroupDetail', () => {
  let wrapper: any;
  const mockTabProvider = {};

  beforeEach(() => {
    wrapper = mount(GroupDetail, {
      props: {
        id: 'group-1',
        name: 'Group 1',
        isCanModified: true,
      },
      global: {
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider,
          groupProviderKey: groupProviderDetail,
        },
        mocks: {
          $t: (msg: string) => msg,// Mock translation function
          $i18n: { t: (key: string) => key },
        }
      },
    });
    const dialogRef = wrapper.vm.$refs.GroupEditDialogRef;
    dialogRef.handleOpen = vi.fn();
  });

  afterEach(() => {
    wrapper.unmount();
    vi.clearAllMocks();
  });
  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.group-detail').exists()).toBe(true);
    expect(wrapper.find('.topArea').exists()).toBe(true);
    expect(wrapper.text()).toContain('Group 1');
  });
  it('opens edit dialog on edit button click', () => {
    const editButton = wrapper.find('#UserGroupList__Info__EditUserGroup');
    editButton.trigger('click');

    const dialogRef = wrapper.vm.$refs.GroupEditDialogRef;
    expect(dialogRef.handleOpen).toHaveBeenCalled();
  });
  it('deletes group on delete button click', async () => {
    ElMessageBox.confirm.mockResolvedValue('confirm');
    adminApi.api.postNuxeoIdentityGroup.mockResolvedValue(true);
    await wrapper.vm.handleDelete();

    expect(adminApi.api.postNuxeoIdentityGroup).toHaveBeenCalledWith({ groupId: 'group-1' });
    expect(mockRouterProvider.navigateTo).toHaveBeenCalledWith(expect.objectContaining({
      id: "admin-group",
      name: "admin-group-list",
    }), false);
  });
  it('does not delete group if action is cancelled', async () => {
    ElMessageBox.confirm.mockResolvedValue('cancel'); // 模拟取消删除

    await wrapper.vm.handleDelete();

    expect(adminApi.api.postNuxeoIdentityGroup).not.toHaveBeenCalled(); // 确保删除 API 未被调用
  });
  it('refreshes group name correctly', () => {
    const newGroup = { id: 'group-1', name: 'Updated Group', isCanModified: true };
    wrapper.vm.handleEditRefresh(newGroup);

    expect(wrapper.vm.state.name).toBe('Updated Group'); // 确保组名更新
  });
});
