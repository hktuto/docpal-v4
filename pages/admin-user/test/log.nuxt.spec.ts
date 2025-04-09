import { shallowMount, mount } from '@vue/test-utils';
import { describe, test, it, vi, expect, beforeEach, afterEach } from 'vitest';
import { UserInfo } from '#components';
import { adminApi } from './mock/api';
import { VxeGrid, } from 'vxe-table';
import { userProviderDetailKey } from '~/util/userProvider';
import { ElMessageBox, ElNotification, ElMessage } from 'element-plus';
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
const mockRouterProvider = {
  navigateTo: vi.fn(),
  menuSymbol: 'mockMenuSymbol',
  message: {
    success: vi.fn(),
  }
};
const userProviderDetail = {
  BatchDeleteUserApi: vi.fn(),
  SetUserStatusApi: vi.fn(),
  openUserList: vi.fn(),
};
// Mock UserEditDialog
const mockUserEditDialog = {
  template: '<div class="mock-user-edit-dialog" @refresh="$emit(\'refresh\')"></div>',
  methods: {
    handleOpen: vi.fn(),
  },
};
const mockUserPasswordDialog = {
  template: '<div class="mock-user-password-dialog"></div>',
  methods: {
    handleOpen: vi.fn(),
  },
};
// Mock Icon
const mockIcon = {
  template: '<span class="mock-icon"></span>',
};
describe('[admin-user]UserInfo', () => {
  let wrapper: any;
  const mockUser = {
    userId: 'user-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    company: 'Example Inc.',
    status: 'A',
    loading: false,
  };
  beforeEach(async () => {
    vi.clearAllMocks();
    wrapper = mount(UserInfo, {
      props: {
        user: mockUser,
        isLdapMode: false,
      },
      global: {
        components: {
          VxeGrid,
          UserEditDialog: mockUserEditDialog,
          UserPasswordDialog: mockUserPasswordDialog,
          Icon: mockIcon
        },
        provide: {
          [MenuRouterKey]: mockRouterProvider,
          [userProviderDetailKey]: userProviderDetail
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
    console.log(wrapper.html());

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h3').text()).toBe('user_info');
    const rowValues = wrapper.findAll('.rowValue');
    expect(rowValues.length).toBe(5);
    expect(rowValues[0].text()).toBe(mockUser.firstName);
    expect(rowValues[1].text()).toBe(mockUser.lastName);
    expect(rowValues[2].text()).toBe(mockUser.email);
    expect(rowValues[3].text()).toBe(mockUser.company);
  });
  it('handles user edit', async () => {
    const editDialogRef = wrapper.vm.UserEditDialogRef;
    const handleOpenSpy = vi.spyOn(editDialogRef, 'handleOpen');

    await wrapper.vm.handleEdit();

    expect(handleOpenSpy).toHaveBeenCalled();
  });
  it('handles password change dialog', async () => {
    const passwordDialogRef = wrapper.vm.UserPasswordDialogRef;
    const handleOpenSpy = vi.spyOn(passwordDialogRef, 'handleOpen');

    await wrapper.vm.openDialog();

    expect(handleOpenSpy).toHaveBeenCalled();
  });
  it('confirms user deletion and deletes user', async () => {
    ElMessageBox.confirm = vi.fn().mockResolvedValue('confirm');
    userProviderDetail.BatchDeleteUserApi.mockResolvedValueOnce({});

    await wrapper.vm.handleDelete();

    expect(ElMessageBox.confirm).toHaveBeenCalled();
    expect(userProviderDetail.BatchDeleteUserApi).toHaveBeenCalledWith({ userIds: [mockUser.userId] });
    expect(mockRouterProvider.message.success).toHaveBeenCalledWith(expect.stringContaining('tip_deleteSuccessMsg'));
    expect(userProviderDetail.openUserList).toHaveBeenCalled();
  });
  it('does not delete user if confirmation is canceled', async () => {
    ElMessageBox.confirm = vi.fn().mockResolvedValue('cancel');

    await wrapper.vm.handleDelete();

    expect(userProviderDetail.BatchDeleteUserApi).not.toHaveBeenCalled();
  });
  it('sets user status correctly', async () => {
    userProviderDetail.SetUserStatusApi.mockResolvedValueOnce(true);

    await wrapper.vm.handleSetStatus('D', mockUser);

    expect(mockUser.loading).toBe(false);
    expect(userProviderDetail.SetUserStatusApi).toHaveBeenCalledWith(mockUser);
  });
  it('handles status update failure', async () => {
    userProviderDetail.SetUserStatusApi.mockResolvedValueOnce(false);

    await wrapper.vm.handleSetStatus('D', mockUser);

    expect(mockUser.status).toBe('A'); // 确保状态不变
  });
});
