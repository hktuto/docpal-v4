import { shallowMount, mount } from '@vue/test-utils';
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest';
import { ExternalSharePage, ExternalShareDialog, ResponsiveFilter } from '#components';
import { adminApi } from './mock/api';
import { VxeGrid, } from 'vxe-table';
import { ElMessageBox } from 'element-plus';
import { mockRouterProvider } from './util';

vi.mock('element-plus', () => ({
  ElMessageBox: {
    alert: vi.fn(),
    confirm: vi.fn()
  },
  ElNotification: {
    success: vi.fn(),
  },
  ElMessage: {
    success: vi.fn(),
    warning: vi.fn()
  }
}));
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
describe('[admin-share]ExternalSharePage', () => {
  let wrapper: any;
  const mockTabProvider = {};

  beforeEach(async () => {
    wrapper = mount(ExternalSharePage, {
      props: {
        group: { id: 'group-1', name: 'Existing Group' },
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: string) => msg,// Mock translation function
          $i18n: { t: (key: string) => key },
        }
      },
    });
    // const dialogRef = wrapper.vm.$refs.ExternalSharePageRef;
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
  });
  it('should call handleSubmit and update data', async () => {
    const shareInfo = { shareID: '123', emailList: ['test@example.com'] };

    await wrapper.vm.handleSubmit(shareInfo);
    expect(adminApi.api.patchNuxeoShare).toHaveBeenCalledWith(shareInfo);
  });
  it('should confirm and delete share info', async () => {
    const row = { shareID: '123' };

    // Mock the confirm dialog to return 'confirm'
    vi.spyOn(ElMessageBox, 'confirm').mockResolvedValue('confirm');

    await wrapper.vm.handleDisabled(row);

    expect(adminApi.api.deleteNuxeoShare).toHaveBeenCalledWith([row.shareID]);
    expect(mockRouterProvider.message.success).toHaveBeenCalledWith(expect.any(String));
  });
  it('should not delete share info if action is canceled', async () => {
    const row = { shareID: '123' };

    // Mock the confirm dialog to return 'cancel'
    vi.spyOn(ElMessageBox, 'confirm').mockResolvedValue('cancel');

    await wrapper.vm.handleDisabled(row);
    expect(adminApi.api.deleteNuxeoShare).not.toHaveBeenCalled();
  });
});
describe('[admin-share]ExternalShareDialog', () => {
  let wrapper: any;
  const mockTabProvider = {};

  beforeEach(async () => {
    wrapper = mount(ExternalShareDialog, {
      props: {
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, FormRenderer, VFormRender, ReaderDialog },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: string) => msg,// Mock translation function
          $i18n: { t: (key: string) => key },
        }
      },
    });
    const dialogRef = wrapper.vm.$refs.ExternalSharePageRef;
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
  });
  it('should open dialog when handleOpen is called', async () => {
    wrapper.vm.handleOpen({
      shareID: '123',
      emailList: ['test@example.com'],
      password: 'password',
      expiredDate: new Date(),
      accessToken: 'token123',
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.dialogVisible).toBe(true);
    expect(wrapper.vm.form.emailList).toEqual(['test@example.com']);
  });
  it('should submit the form successfully', async () => {
    wrapper.vm.form.emailList = ['test@example.com'];
    wrapper.vm.form.password = 'password';
    wrapper.vm.form.dueDate = new Date(Date.now() + 3600 * 1000); // 设置未来日期
    wrapper.vm.formRef = {
      validate: vi.fn().mockResolvedValue(true)
    };
    await wrapper.vm.handleSubmit();
    expect(wrapper.vm.formRef.validate).toHaveBeenCalled();
    expect(wrapper.emitted('submit')).toBeTruthy();
    expect(wrapper.emitted().submit[0][0]).toMatchObject({
      password: 'password',
      tokenLiveInMinutes: expect.any(Number),
      shareId: expect.any(String),
    });
  });
  it('should copy share link', async () => {
    const copySpy = vi.spyOn(navigator.clipboard, 'writeText');
    wrapper.vm.state.shareLink = 'http://example.com/share?token=token123';
    wrapper.vm.handleCopy(wrapper.vm.state.shareLink);
    expect(copySpy).toHaveBeenCalledWith(wrapper.vm.state.shareLink);
  });
});
