import { shallowMount, mount } from '@vue/test-utils';
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest';
import { adminApi } from './mock/api';
import { VxeGrid, } from 'vxe-table';
import { mockRouterProvider } from './util';
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
