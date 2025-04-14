import { shallowMount, mount } from '@vue/test-utils';
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest';
import { adminApi } from './mock/api';
import { VxeGrid, } from 'vxe-table';
import { mockRouterProvider } from './util';
import { GroupList } from '#components';
import { ElMessageBox, ElNotification, ElMessage } from 'element-plus';
import { groupProviderKey, groupProviderDetailKey } from '~/util/userProvider';
vi.mock('element-plus', () => ({
  ElMessageBox: {
    alert: vi.fn(),
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
describe('GroupList', () => {
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
