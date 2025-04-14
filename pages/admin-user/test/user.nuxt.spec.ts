import { shallowMount, mount } from '@vue/test-utils';
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest';
import { AdminUserList, UserTable, AdminUserDetail, ResponsiveFilter } from '#components';
import { adminApi } from './mock/api';
import { VxeGrid, } from 'vxe-table';
import { userProviderKey } from '~/util/userProvider';
import { ElMessageBox, ElNotification, ElMessage } from 'element-plus';
const mockRouterProvider = {
  navigateTo: vi.fn(),
  menuSymbol: 'mockMenuSymbol',
  message: {
    success: vi.fn(),
  }
};
const userProvider = {
  getAllUsersApi: vi.fn(),
  BatchDeleteUserApi: vi.fn(),
  SetUserStatusApi: vi.fn(),
  BatchActiveUserApi: vi.fn(),
  getAllUserAndActiveCountApi: vi.fn(),
  openUserDetail: vi.fn(),
  openUserList: vi.fn(),
};
vi.mock('element-plus', () => ({
  ElMessageBox: {
    alert: vi.fn(),
  },
  ElNotification: {
    success: vi.fn(),
  },
  ElMessage: vi.fn().mockResolvedValue(() => {
    return {
      success: vi.fn(),
      error: vi.fn(),
    };
  }),
}));
describe('[admin-user]AdminUserList', () => {
  let wrapper: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    wrapper = shallowMount(AdminUserList, {
      global: {
        components: { VxeGrid, ResponsiveFilter },
        provide: {
          [MenuRouterKey]: mockRouterProvider,
          userProviderKey: 'userProviderKey'
        },
        mocks: {
          $t: (msg: string) => msg,// Mock translation function
          $i18n: { t: (key: string) => key },
        }
      }
    });
    await wrapper.vm.$nextTick();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.pageContainer').exists()).toBe(true);
  });
  test('handles filter change correctly', async () => {
    const filter = { search: 'test' };

    wrapper.vm.tableRef = {
      reload: vi.fn().mockReturnValue(true)
    };
    await wrapper.vm.handleFilterChange(filter);

    expect(wrapper.vm.userTableFilter).toEqual(filter);
    expect(wrapper.vm.tableRef.reload).toHaveBeenCalled();
  });
  test('opens user detail correctly', async () => {
    const userData = { id: '1', username: 'testUser', userId: 'user-1' };
    wrapper.vm.openUserDetail(userData);

    expect(mockRouterProvider.navigateTo).toHaveBeenCalledWith({
      menuKey: mockRouterProvider.menuSymbol,
      id: expect.stringContaining('user-detail-'),
      name: 'user-detail-1',
      icon: 'lucide:user',
      label: 'testUser',
      component: 'LazyAdminUserDetail',
      props: {
        id: 'user-1',
      },
    }, false);
  });

});
describe('[admin-user]UserTable', () => {
  let wrapper: any;
  beforeEach(async () => {
    vi.clearAllMocks();
    wrapper = mount(UserTable, {
      props: {
        id: 'user-1',
      },
      global: {
        components: { VxeGrid, ResponsiveFilter },
        provide: {
          [MenuRouterKey]: mockRouterProvider,
          [userProviderKey]: userProvider
        },
        mocks: {
          $t: (msg: string) => msg,// Mock translation function
          $i18n: { t: (key: string) => key },
        }
      }
    });
    await wrapper.vm.$nextTick();
  });
  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.userDetailSection').exists()).toBe(false);
  });
  it('fetches user count on mount', async () => {
    const mockCountResponse = { ActiveCount: 10, licenseUserNum: 50 };
    userProvider.getAllUserAndActiveCountApi.mockResolvedValueOnce(mockCountResponse);

    await wrapper.vm.getAllUserAndActiveCount();

    expect(userProvider.getAllUserAndActiveCountApi).toHaveBeenCalled();
    expect(wrapper.vm.state.activeUsers).toBe(10);
    expect(wrapper.vm.state.licenseUsers).toBe(50);
  });
  it('handles user deletion confirmation', async () => {
    const userToDelete = { userId: 'user-1' };
    wrapper.vm.state.selectList = [userToDelete];

    ElMessageBox.confirm = vi.fn().mockResolvedValue('confirm');
    userProvider.BatchDeleteUserApi.mockResolvedValueOnce({});
    await wrapper.vm.handleDeleteSelected();

    expect(ElMessageBox.confirm).toHaveBeenCalled();
    expect(userProvider.BatchDeleteUserApi).toHaveBeenCalledWith({ userIds: ['user-1'] });
    expect(mockRouterProvider.message.success).toHaveBeenCalled();
  });
  it('does not delete users if confirmation is canceled', async () => {
    ElMessageBox.confirm = vi.fn().mockResolvedValue('cancel');

    await wrapper.vm.handleDeleteSelected();

    expect(userProvider.BatchDeleteUserApi).not.toHaveBeenCalled();
  });
  it('sets user status correctly', async () => {
    const userRow = { userId: 'user-1', status: 'D', loading: false };
    userProvider.SetUserStatusApi.mockResolvedValueOnce({});

    await wrapper.vm.handleSetStatus('A', userRow);

    expect(userRow.loading).toBe(false);
    expect(userProvider.SetUserStatusApi).toHaveBeenCalledWith(userRow);
  });

  it('shows warning when active users exceed license limit', async () => {
    wrapper.vm.state.activeUsers = 50;
    const userRow = { userId: 'user-1', status: 'D', loading: false };

    await wrapper.vm.handleSetStatus('A', userRow);

    expect(userRow.status).toBe('D'); // Status should not change
    expect(ElMessage).toHaveBeenCalledWith({
      message: expect.any(String), // Check for warning message
      type: 'warning',
    });
  });
  it('handles filter form change', async () => {
    const filterModel = { isDesc: false };
    await wrapper.vm.handleFilterFormChange(filterModel);

    expect(wrapper.vm.state.extraParamsFilter).toEqual(filterModel);
  });
  it('clears filters correctly', async () => {
    await wrapper.vm.handleClearFilter();

    expect(wrapper.vm.state.extraParamsFilter).toEqual({});
  });
});

describe('[admin-user]AdminUserDetail', () => {
  let wrapper: any;
  const mockUserData = {
    id: 'user-1',
    username: 'testUser',
    status: 'A',
  };
  beforeEach(async () => {
    vi.clearAllMocks();
    wrapper = shallowMount(AdminUserDetail, {
      props: {
        id: 'user-1',
      },
      global: {
        components: { VxeGrid, ResponsiveFilter },
        provide: {
          [MenuRouterKey]: mockRouterProvider,
          userProviderKey: 'userProviderKey'
        },
        mocks: {
          $t: (msg: string) => msg,// Mock translation function
          $i18n: { t: (key: string) => key },
        }
      }
    });
    await wrapper.vm.$nextTick();
  });
  test('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.userDetailSection').exists()).toBe(false);
  });
  test('opens user list correctly', async () => {
    adminApi.api.getNuxeoUserUserid.mockResolvedValueOnce({ data: mockUserData });
    await wrapper.vm.getUser();
    wrapper.vm.openUserList();

    expect(mockRouterProvider.navigateTo).toHaveBeenCalledWith({
      menuKey: mockRouterProvider.menuSymbol,
      id: 'admin-user',
      name: 'admin-user-list',
      icon: 'lucide:user',
      label: 'Admin User',
      component: 'LazyAdminUserList',
      props: {},
    }, false);
  });
  test('handles user data retrieval correctly', async () => {
    adminApi.api.getNuxeoUserUserid.mockResolvedValueOnce({ data: mockUserData });

    await wrapper.vm.getUser();

    expect(wrapper.vm.state.curUser).toEqual({
      ...mockUserData,
      status: 'A', // Ensure the status is set correctly
    });
  });
  test('does not set user data if no data is returned', async () => {
    adminApi.api.getNuxeoUserUserid.mockResolvedValueOnce({ data: null });

    await wrapper.vm.getUser();

    expect(wrapper.vm.state.curUser).toBeNull();
  });
});
