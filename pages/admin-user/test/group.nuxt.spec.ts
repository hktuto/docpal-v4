import { shallowMount, mount } from '@vue/test-utils';
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest';
import { adminApi } from './mock/api';
import { VxeGrid, } from 'vxe-table';
import { mockRouterProvider } from './util';
import { GroupList, GroupDetail, GroupUserTable, GroupTable, GroupDialog, GroupEditDialog, GroupAddUserDialog, ResponsiveFilter } from '#components';
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
    warning: vi.fn(),
    error: vi.fn()
  }
}));
const groupProviderDetail = {
  openGroupDetail: vi.fn(),
  GetGroupListApi: adminApi.api.postNuxeoIdentityGroups,
  DeleteGroupApi: adminApi.api.deleteNuxeoIdentityGroup,
  CreateGroupApi: adminApi.api.postNuxeoIdentityGroup,
  BatchGroupRemoveUsersApi: vi.fn(),
  PatchGroupApi: vi.fn(),
  BatchGroupAddUsersApi: vi.fn(),
};
const SvgIcon = {
  template: '<div class="SvgIcon">SvgIcon</div>',
  methods: {}
};
const Icon = {
  template: '<div class="Icon">Icon</div>',
  methods: {}
};
const FormRenderer = {
  template: '<div class="FormRenderer">FormRenderer</div>',
  methods: {
    setFormJson: vi.fn(),
    setFormData: vi.fn(),
  }
};
const VFormRender = {
  template: '<div class="FormRenderer">FormRenderer</div>',
  methods: {}
};
const ReaderDialog = {
  template: '<div class="FormRenderer">FormRenderer</div>',
  methods: {}
};
describe('[admin-group]GroupList', () => {
  let wrapper: any;
  const mockTabProvider = {};

  beforeEach(() => {
    wrapper = mount(GroupList, {
      global: {
        components: { VxeGrid, ResponsiveFilter },
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
    vi.clearAllMocks(); 
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
        components: { VxeGrid, ResponsiveFilter, Icon },
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
describe('[admin-group]GroupUserTable', () => {
  let wrapper: any;
  const mockTabProvider = {};

  beforeEach(() => {
    wrapper = mount(GroupUserTable, {
      props: {
        group: { id: 'group-1', isCanModified: true },
      },
      global: {
        components: { VxeGrid, ResponsiveFilter },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider,
          [groupProviderDetailKey]: groupProviderDetail,
        },
        mocks: {
          $t: (msg: string) => msg,// Mock translation function
          $i18n: { t: (key: string) => key },
        }
      },
    });
    const dialogRef = wrapper.vm.$refs.UserAddGroupDialogRef;
    dialogRef.handleOpen = vi.fn();
    const tableRef = wrapper.vm.$refs.tableRef;
    tableRef.loadData = vi.fn();
  });

  afterEach(() => {
    wrapper.unmount();
    vi.clearAllMocks(); 
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
  it('filters user list based on input', async () => {
    wrapper.vm.state.userList.push({ firstName: 'Alice' });
    wrapper.vm.state.userList.push({ firstName: 'Bob' });

    await wrapper.vm.$nextTick();
    await wrapper.vm.handleFilterFormChange({ username: 'Alice' });

    expect(wrapper.vm.tableRef.loadData).toHaveBeenCalledWith([{ firstName: 'Alice' }]);
  });
});

describe('[admin-group]GroupTable', () => {
  let wrapper: any;
  const mockTabProvider = {};

  beforeEach(() => {
    wrapper = mount(GroupTable, {
      global: {
        components: { VxeGrid, ResponsiveFilter },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider,
          [groupProviderKey]: groupProviderDetail,
        },
        mocks: {
          $t: (msg: string) => msg,// Mock translation function
          $i18n: { t: (key: string) => key },
        }
      },
    });
    const dialogRef = wrapper.vm.$refs.GroupDialogRef;
    dialogRef.handleOpen = vi.fn();
    const tableRef = wrapper.vm.$refs.tableRef;
    tableRef.loadData = vi.fn();
  });

  afterEach(() => {
    wrapper.unmount();
    vi.clearAllMocks(); 
  });
  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.vxe-grid').exists()).toBe(true);
  });
  it('opens group dialog when add button is clicked', async () => {
    const addButton = wrapper.find('#UserGroupList__AddNewUserGroup');
    await addButton.trigger('click');

    const dialogRef = wrapper.vm.$refs.GroupDialogRef;
    expect(dialogRef.handleOpen).toHaveBeenCalled();
  });
  it('deletes a group', async () => {
    ElMessageBox.confirm.mockResolvedValue('confirm');
    const groupRow = { id: 'group-1' };
    groupProviderDetail.DeleteGroupApi.mockResolvedValue(true);
    await wrapper.vm.handleDelete(groupRow);

    expect(mockRouterProvider.message.success).toHaveBeenCalledWith('dpMsg_success');
    expect(groupProviderDetail.DeleteGroupApi).toHaveBeenCalledWith({ groupId: 'group-1' });
  });

  it('does not delete a group if action is cancelled', async () => {
    ElMessageBox.confirm.mockResolvedValue('cancel');

    const groupRow = { id: 'group-1' };
    await wrapper.vm.handleDelete(groupRow);

    expect(mockRouterProvider.message.success).not.toHaveBeenCalled();
    expect(groupProviderDetail.DeleteGroupApi).not.toHaveBeenCalled();
  });
  // it('filters group list based on input', async () => {

  //   wrapper.vm.state.groupList.push({ name: 'Admin Group' });
  //   wrapper.vm.state.groupList.push({ name: 'User Group' });
  //   wrapper.vm.state._groupList = [];
  //   await wrapper.vm.$nextTick();
  //   await wrapper.vm.handleFilterFormChange({ userNameOrEmail: 'Admin' });

  //   expect(wrapper.vm.state._groupList[0].name).toEqual('Admin Group');
  //   expect(wrapper.vm.tableRef.loadData).toHaveBeenCalledWith([{ name: 'Admin Group' }]);
  // });
  it('fetches group list on mount', async () => {
    const mockGroupList = [{ name: 'Admin Group', id: '1' }, { name: 'User Group', id: '2' }];
    adminApi.api.postNuxeoIdentityGroups = vi.fn().mockResolvedValue({ data: mockGroupList });

    await wrapper.vm.getGroup();

    expect(wrapper.vm.state.groupList).toEqual(mockGroupList);
  });
});
describe('[admin-group]GroupEditDialog', () => {
  let wrapper: any;
  const mockTabProvider = {};

  beforeEach(() => {
    wrapper = mount(GroupEditDialog, {
      props: {
        group: { id: 'group-1', isCanModified: true },
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider,
          [groupProviderDetailKey]: groupProviderDetail,
        },
        mocks: {
          $t: (msg: string) => msg,// Mock translation function
          $i18n: { t: (key: string) => key },
        }
      },
    });
    // const dialogRef = wrapper.vm.$refs.GroupDialogRef;
    // dialogRef.handleOpen = vi.fn();
    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.loadData = vi.fn();
  });

  afterEach(() => {
    wrapper.unmount();
    vi.clearAllMocks(); 
  });
  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.el-overlay-dialog').exists()).toBe(true);
  });
  it('opens the dialog and sets the form data', async () => {

    await wrapper.vm.handleOpen();

    await new Promise(resolve => setTimeout(resolve, 1000));

    expect(wrapper.vm.state.visible).toBe(true);
  });
  it('submits the form with valid data', async () => {
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue({
        groupName: 'New Group Name',
      }),
      vFormRenderRef: {
        resetForm: vi.fn()
      }
    };
    groupProviderDetail.PatchGroupApi.mockResolvedValue({
      data: {}
    });
    await wrapper.vm.handleSubmit();

    expect(ElMessage.success).toHaveBeenCalledWith('tip_updateSuccessMsg');
    expect(groupProviderDetail.PatchGroupApi).toHaveBeenCalledWith({
      groupId: 'group-1',
      groupName: 'New Group Name',
    });
  });
  it('shows error if group name is empty', async () => {
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue({
        groupName: '',
      })
    };
    await wrapper.vm.handleSubmit();

    expect(ElMessage.error).toHaveBeenCalledWith('user_userGroupNamerender.hint.fieldRequired');
  });
  it('shows error if group name already exists', async () => {
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue({
        groupName: 'Admin Group',
      })
    };
    const mockGroupList = [{ name: 'Admin Group' }, { name: 'User Group' }];
    adminApi.api.postNuxeoIdentityGroups.mockResolvedValue({ data: mockGroupList });

    await wrapper.vm.handleSubmit();

    expect(ElMessage.error).toHaveBeenCalledWith('user_userGroupsIsExistsMsg');
  });
});

describe('[admin-group]GroupDialog', () => {
  let wrapper: any;
  const mockTabProvider = {};

  beforeEach(() => {
    wrapper = mount(GroupDialog, {
      props: {
        groups: [{ id: 'group-1', name: 'Existing Group' }],
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider,
          [groupProviderKey]: groupProviderDetail,
        },
        mocks: {
          $t: (msg: string) => msg,// Mock translation function
          $i18n: { t: (key: string) => key },
        }
      },
    });
    // const dialogRef = wrapper.vm.$refs.GroupDialogRef;
    // dialogRef.handleOpen = vi.fn();
    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.loadData = vi.fn();
  });

  afterEach(() => {
    wrapper.unmount();
    vi.clearAllMocks(); 
  });
  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.el-overlay-dialog').exists()).toBe(true);
  });
  it('opens the dialog and sets option data', async () => {
    await wrapper.vm.handleOpen();
    expect(wrapper.vm.state.visible).toBe(true);
  });
  it('submits the form with valid data', async () => {
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue({
        groupId: 'group-2',
        groupName: 'New Group Name',
      }),
      vFormRenderRef: {
        resetForm: vi.fn()
      }
    };

    await wrapper.vm.handleSubmit();

    expect(ElMessage.success).toHaveBeenCalledWith('tip_createdSuccessMsg');
    expect(groupProviderDetail.CreateGroupApi).toHaveBeenCalledWith({
      groupId: 'group-2',
      groupName: 'New Group Name',
    });
  });
  it('shows error if group name or ID is empty', async () => {
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue({
        groupId: '',
        groupName: ''
      })
    };

    await wrapper.vm.handleSubmit();

    expect(ElMessage.error).toHaveBeenCalledWith('user_userGroupNamerender.hint.fieldRequired');
  });
  it('shows error if group name or ID already exists', async () => {
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue({
        groupId: 'group-1',
        groupName: 'Existing Group',
      })
    };
    await wrapper.vm.handleSubmit();

    expect(ElMessage.error).toHaveBeenCalledWith('user_userGroupsIsExistsMsg');
  });
});
describe('[admin-group]GroupAddUserDialog', () => {
  let wrapper: any;
  const mockTabProvider = {};

  beforeEach(() => {
    wrapper = mount(GroupAddUserDialog, {
      props: {
        group: { id: 'group-1', name: 'Existing Group' },
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider,
          [groupProviderDetailKey]: groupProviderDetail
        },
        mocks: {
          $t: (msg: string) => msg,// Mock translation function
          $i18n: { t: (key: string) => key },
        }
      },
    });

    // const dialogRef = wrapper.vm.$refs.GroupAddUserDialogRef;
    // dialogRef.handleOpen = vi.fn();
    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.loadData = vi.fn();
  });

  afterEach(() => {
    wrapper.unmount();
    vi.clearAllMocks(); 
  });
  it('renders correctly', () => {
    console.log(wrapper.html());

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.el-overlay-dialog').exists()).toBe(true);
  });
  it('should call BatchGroupAddUsersApi after successful form submission', async () => {
    const mockFormRenderer = {
      getFormData: vi.fn().mockResolvedValue({ id: ['user-id'] }),
      vFormRenderRef: {
        resetForm: vi.fn(),
      },
    };

    wrapper.vm.FormRendererRef = mockFormRenderer;

    await wrapper.vm.handleSubmit();

    expect(ElMessage.success).toHaveBeenCalledWith(expect.any(String));
    expect(groupProviderDetail.BatchGroupAddUsersApi).toHaveBeenCalledWith({
      groupId: 'group-1',
      userIds: ['user-id'],
    });
    expect(mockFormRenderer.vFormRenderRef.resetForm).toHaveBeenCalled();
  });
  it('should handle errors during submission', async () => {
    groupProviderDetail.BatchGroupAddUsersApi.mockRejectedValue(new Error('API Error'));

    const mockFormRenderer = {
      getFormData: vi.fn().mockResolvedValue({ id: ['user-id'] }),
    };

    wrapper.vm.FormRendererRef = mockFormRenderer;

    await wrapper.vm.handleSubmit();

    expect(groupProviderDetail.BatchGroupAddUsersApi).toHaveBeenCalled();
  });
});
