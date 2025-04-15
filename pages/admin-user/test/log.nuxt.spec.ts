import { shallowMount, mount } from '@vue/test-utils';
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest';
import { adminApi } from './mock/api';
import { VxeGrid, } from 'vxe-table';
import { mockRouterProvider } from './util';
import { GroupUserTable } from '#components';
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
  GetGroupDetailApi: adminApi.api.postNuxeoIdentityGroups,
  DeleteGroupApi: adminApi.api.deleteNuxeoIdentityGroup,
  CreateGroupApi: adminApi.api.postNuxeoIdentityGroup,
};
describe('[admin-group]GroupUserTable', () => {
  let wrapper: any;
  const mockTabProvider = {};

  beforeEach(() => {
    wrapper = mount(GroupUserTable, {
      props: {
        group: { id: 'group-1', isCanModified: true },
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
    const dialogRef = wrapper.vm.$refs.UserAddGroupDialogRef;
    dialogRef.handleOpen = vi.fn();
  });

  afterEach(() => {
    wrapper.unmount();
    vi.clearAllMocks(); // 清除所有模拟
  });
  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.el-card').exists()).toBe(true);
  });
  it('shows the correct number of selected users', async () => {
    wrapper.vm.state.selectedRows.push({ userId: 'user-1' });
    wrapper.vm.state.selectedRows.push({ userId: 'user-2' });
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('2');
  });
  it('opens user add dialog when add button is clicked', async () => {
    const addButton = wrapper.find('#UserGroupList__Info__AddUsersToUserGroup');
    await addButton.trigger('click');

    const dialogRef = wrapper.vm.$refs.UserAddGroupDialogRef;
    expect(dialogRef.handleOpen).toHaveBeenCalled();
  });
  it('deletes selected users', async () => {
    ElMessageBox.confirm.mockResolvedValue('confirm');
    wrapper.vm.state.selectedRows.push({ userId: 'user-1' });
    await wrapper.vm.$nextTick();

    await wrapper.vm.handleDeleteSelected();

    expect(mockRouterProvider.message.success).toHaveBeenCalledWith('user_userGroupSelectRemovedSuccessMsg');
    expect(wrapper.vm.state.selectedRows).toEqual([]
    );
  });
  it('does not delete users if action is cancelled', async () => {
    ElMessageBox.confirm.mockResolvedValue('cancel');
    wrapper.vm.state.selectedRows.push({ userId: 'user-1' });
    await wrapper.vm.$nextTick();

    await wrapper.vm.handleDeleteSelected();

    expect(mockRouterProvider.message.success).not.toHaveBeenCalled();
  });

});
