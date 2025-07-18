import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'

import PublicForm from '../pages/public-form.vue'; 
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
describe('[public-easy-form]PublicForm', () => {
  let wrapper: any
  const mockTabProvider = {}
  const mockId = 'test-form-id';
  const mockDetail = {
    previewStyle: JSON.stringify({
      widgetList: [
        {
          key: 1,
          type: 'input',
          options: {
            name: 'username',
            label: 'User Name',
            placeholder: 'Enter your name',
          },
          id: 'input1',
        },
      ],
      formConfig: {
        modelName: 'formData',
      },
    }),
  };
  beforeEach(async () => {
    wrapper = mount(PublicForm, {
      props: {
        pageNum: 0,
        pageSize: 20
      },
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
    // const dialogRef = wrapper.vm.$refs.DocTypeDialogNewRef
    // dialogRef.handleOpen = vi.fn()
    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.loadData = vi.fn();
  })
  clientApi.api.getFormDesignIdDetail.mockResolvedValue({ data: mockDetail })
  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('should load form JSON on mount', async () => {
    await wrapper.vm.getFormJson(); // 调用获取表单 JSON 的方法
    expect(wrapper.vm.state.formJson).toBeDefined(); // 检查表单 JSON 是否被定义
    expect(wrapper.vm.state.formJson.widgetList).toHaveLength(1);
  });
  it('should submit the form successfully', async () => {
    await wrapper.vm.getFormJson(); // 确保表单 JSON 已加载

    // 模拟获取表单数据
    const mockFormData = {
      username: 'testuser',
    };
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockReturnValue(mockFormData),
    };

    await wrapper.vm.handleSubmit(); // 提交表单

    expect(clientApi.api.postFormDesignSubmitData).toHaveBeenCalled();
  });

  it('should handle errors during form submission', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    // 模拟错误
    clientApi.api.postFormDesignSubmitData.mockRejectedValue(new Error('Submission error'));

    await wrapper.vm.getFormJson(); // 确保表单 JSON 已加载

    // 模拟获取表单数据
    const mockFormData = {
      username: 'testuser',
    };
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockReturnValue(mockFormData),
    };

    await wrapper.vm.handleSubmit(); // 提交表单
    expect(console.error).toHaveBeenCalled() // 确保错误被捕获并打印
  });
})
