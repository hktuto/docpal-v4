import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { ShareTable, SharePassword} from '#components'
import SharePage from '../pages/share.vue'; 
import { adminApi, clientApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { ElMessageBox, ElMessage, ElSwitch } from 'element-plus'
import { mockRouterProvider, ReaderDialog, VFormRender, FormRenderer } from './util'
vi.mock('element-plus', () => ({
  ElMessageBox: {
    alert: vi.fn(),
    confirm: vi.fn()
  },
  ElNotification: {
    success: vi.fn()
  },
  ElMessage: {
    success: vi.fn(),
    warning: vi.fn(),
    error: vi.fn()
  }
}))
describe('[public-easy-form]SharePage', () => {
  let wrapper: any
  const mockTabProvider = {}
  const mockToken = 'test-token';
  const mockResponse = [
    { id: 1, name: 'File 1' },
    { id: 2, name: 'File 2' },
  ];
  beforeEach(async () => {
    wrapper = mount(SharePage, {
      global: {
        components: { VxeGrid, FormRenderer, VFormRender, ReaderDialog },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
        }
      }
    })
    // const router = useRouter()
    // router.push({
    //   query: {
    //     token: 'test'
    //   }
    // })
    clientApi.api.getNuxeoPublicDocument.mockResolvedValue({ data: mockResponse })
    
    // const dialogRef = wrapper.vm.$refs.DocTypeDialogNewRef
    // dialogRef.handleOpen = vi.fn()
    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.loadData = vi.fn();
  })
  
  it('should load data on mount if password exists in sessionStorage', async () => {
    sessionStorage.setItem('sharePWD', 'test-password');
    await new Promise((resolve) => setTimeout(resolve, 1000))

    await wrapper.vm.handleGetPublicDocument({ password: 'test-password', token: 'token' }); // 调用处理函数
    expect(wrapper.vm.state.shareList).toEqual(mockResponse); // 检查 shareList 的内容
    expect(wrapper.vm.state.shareState).toBe('list'); // 检查状态
  });
  it('should handle expired state', async () => {
    const expiredResponse = { errorCode: 10, message: 'Share expired' };
    clientApi.api.getNuxeoPublicDocument.mockResolvedValueOnce({ data: expiredResponse });

    await wrapper.vm.handleGetPublicDocument({ password: 'test-password', token: 'token'  });
    expect(wrapper.vm.state.shareState).toBe('expired'); // 检查状态是否变为 expired
  });

  it('should handle errors during data fetching', async () => {
    const errorMessage = 'An error occurred';
    clientApi.api.getNuxeoPublicDocument.mockRejectedValueOnce(new Error(errorMessage));

    await wrapper.vm.handleGetPublicDocument({ password: 'test-password', token: 'token' });
    expect(wrapper.vm.state.shareState).toBe(''); // 检查状态是否重置
    // 可以根据需要添加更多的错误处理逻辑验证
  });

})
describe('[public-easy-form]ShareTable', () => {
  let wrapper: any
  const mockTabProvider = {}
  const mockToken = 'test-token';
  const mockResponse = [
    { id: 1, name: 'File 1' },
    { id: 2, name: 'File 2' },
  ];
  beforeEach(async () => {
    wrapper = mount(ShareTable, {
      global: {
        components: { VxeGrid, FormRenderer, VFormRender, ReaderDialog },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
        }
      }
    })
    // const router = useRouter()
    // router.push({
    //   query: {
    //     token: 'test'
    //   }
    // })
    // const dialogRef = wrapper.vm.$refs.DocTypeDialogNewRef
    // dialogRef.handleOpen = vi.fn()
    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.loadData = vi.fn();
  })

  it('should open the reader dialog on double click', async () => {
    const row = { id: 'file-id', title: 'Test File', token: 'test' };
    wrapper.vm.ReaderRef = {
      handleOpen: vi.fn()
    }
    await wrapper.vm.handleDblclick(row);

    expect(wrapper.vm.previewFile.loading).toBe(false); // 检查 loading 状态
    expect(wrapper.vm.previewFile.name).toBe(row.title); // 检查文件名称
    expect(wrapper.vm.previewFile.id).toBe(row.id); // 检查文件 ID
  });

  it('should download the file on button click', async () => {
    const row = { id: 'file-id', title: 'Test File', downloading: false };
    await wrapper.vm.handleDownload(row); 
    expect(row.downloading).toBe(false); // 检查下载完成状态
    expect(clientApi.api.getNuxeoPublicShareDownload).toHaveBeenCalled()
  });

  it('should handle download error gracefully', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('Download error')
    clientApi.api.getNuxeoPublicShareDownload.mockRejectedValueOnce(error);
    const row = { id: 'file-id', title: 'Test File', downloading: false };

    await wrapper.vm.handleDownload(row);
    expect(row.downloading).toBe(false); // 下载状态应重置
    
    expect(console.error).toHaveBeenCalledWith(error)
  });

})
describe('[public-easy-form]SharePassword', () => {
  let wrapper: any
  const mockTabProvider = {}
  const mockToken = 'test-token';
  const mockResponse = [
    { id: 1, name: 'File 1' },
    { id: 2, name: 'File 2' },
  ];
  beforeEach(async () => {
    wrapper = mount(SharePassword, {
      global: {
        components: { VxeGrid, FormRenderer, VFormRender, ReaderDialog },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
        }
      }
    })
    // const router = useRouter()
    // router.push({
    //   query: {
    //     token: 'test'
    //   }
    // })
    // const dialogRef = wrapper.vm.$refs.DocTypeDialogNewRef
    // dialogRef.handleOpen = vi.fn()
    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.loadData = vi.fn();
  })

  it('should emit submit event with form data on button click', async () => {
    // 模拟表单数据
    const mockFormData = { password: 'testPassword' };
    
    // 模拟 FormRenderer 的 getFormData 方法
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue(mockFormData),
    };

    await wrapper.vm.handleSubmit()

    // 验证 emit 事件
    expect(wrapper.emitted('submit')).toBeTruthy();
    expect(wrapper.emitted('submit')[0]).toEqual([mockFormData]); // 检查传递的数据
    
  });
})
