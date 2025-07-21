import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { FileInputBlob, UploadForm, UploadPassword } from '#components'
import PublicUpload from '../pages/public/upload.vue'
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

describe('[public-upload]PublicUpload', () => {
  let wrapper: any
  const mockTabProvider = {}
  const mockToken = 'test-token'
  const mockResponse = [
    { id: 1, name: 'File 1' },
    { id: 2, name: 'File 2' }
  ]
  beforeEach(async () => {
    wrapper = mount(PublicUpload, {
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
  })
  it('should switch to upload form on successful password submission', async () => {
    const mockFormData = { password: 'testPassword' };
    
    // 模拟 API 调用的返回值
    clientApi.api.getNuxeoPublicFilerequest.mockResolvedValue({
      data: { properties: [{ id: 'fileId', value: 'fileValue' }], task: { id: 'taskId' } },
    });

    await wrapper.vm.handleGetPublicDocument(mockFormData);

    expect(wrapper.vm.uploadState).toBe(true);
    expect(wrapper.vm.fileRequestDetail).toEqual({
      properties: [{ id: 'fileId', value: 'fileValue' }],
      task: { id: 'taskId' },
      config: { fileId: 'fileValue' },
    });
  });

  it('should handle password submission errors gracefully', async () => {
    const mockFormData = { password: 'wrongPassword' };

    // 模拟 API 调用的错误
    clientApi.api.getNuxeoPublicFilerequest.mockRejectedValue(new Error('Error'));

    await wrapper.vm.handleGetPublicDocument(mockFormData);

    expect(wrapper.vm.uploadState).toBe(''); // 确保没有切换到上传状态
    expect(wrapper.vm.fileRequestDetail).toEqual({}); // 确保文件请求细节为空
  });

  it('should submit files successfully in handleWorkflow', async () => {
    const mockFileList = [{ raw: new Blob(['file content'], { type: 'text/plain' }) }];
    wrapper.vm.fileRequestDetail = { task: { id: 'taskId' } };
    wrapper.vm.password = 'testPassword';

    // 模拟 API 调用的返回值
    clientApi.api.postNuxeoPublicFilerequest.mockResolvedValue({});

    await wrapper.vm.handleWorkflow(mockFileList);

    expect(wrapper.vm.state.loading).toBe(false); // 确保加载状态被重置
  });

  it('should handle file upload errors gracefully', async () => {
    const mockFileList = [{ raw: new Blob(['file content'], { type: 'text/plain' }) }];
    wrapper.vm.fileRequestDetail = { task: { id: 'taskId' } };
    wrapper.vm.password = 'testPassword';

    // 模拟 API 调用的错误
    clientApi.api.postNuxeoPublicFilerequest.mockRejectedValue(new Error('Error'));

    await wrapper.vm.handleWorkflow(mockFileList);

    expect(wrapper.vm.state.loading).toBe(false); // 确保加载状态被重置
  });
})
describe('[public-upload]UploadForm', () => {
  let wrapper: any
  const mockTabProvider = {}
  const mockToken = 'test-token'
  const mockResponse = [
    { id: 1, name: 'File 1' },
    { id: 2, name: 'File 2' }
  ]
  beforeEach(async () => {
    wrapper = mount(UploadForm, {
      props: {
        fileRequestDetail: {
          config: {
            message: 'Test message',
            maximum: 5,
            fileType: 'image/png',
          },
          uploadFileMaxSize: '1200M',
        },
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
  })
  it('should render the component correctly', () => {
    expect(wrapper.find('.logo').exists()).toBe(true);
    expect(wrapper.text()).toContain('Test message');
  });
  it('should compute file options correctly', () => {
    const fileOptions = wrapper.vm.fileOptions;
    expect(fileOptions.limit).toBe(5);
    expect(fileOptions.accept).toBe('image/png');
    expect(fileOptions.multiple).toBe(true);
    expect(fileOptions.fileMaxSize).toBe(1200); // 1200M
  });

  it('should emit submit event with file data on submit', async () => {
    const mockFileData = [{ name: 'test.png', size: 1000 }];
    
    // Mock the getFilesBlob method to return mock data
    const FileInputBlobRef = wrapper.vm.$refs.FileInputBlobRef;
    vi.spyOn(FileInputBlobRef, 'getFilesBlob').mockReturnValue(mockFileData);

    await wrapper.find('.el-button').trigger('click'); // Trigger the button click

    expect(wrapper.emitted('submit')).toBeTruthy();
    expect(wrapper.emitted('submit')[0]).toEqual([mockFileData]);
  });
})

describe('[public-upload]UploadPassword', () => {
  let wrapper: any
  const mockTabProvider = {}
  const mockToken = 'test-token'
  const mockResponse = [
    { id: 1, name: 'File 1' },
    { id: 2, name: 'File 2' }
  ]
  beforeEach(async () => {
    wrapper = mount(UploadPassword, {
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
  })
  it('should render the component correctly', () => {
    expect(wrapper.find('.logo').exists()).toBe(true);
  });
  it('should call handleSubmit and emit submit event with form data', async () => {
    // Mock the getFormData method to return mock data
    const mockFormData = { password: 'testPassword' };
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue(mockFormData)
    }

    await wrapper.find('.el-button').trigger('click'); // Trigger the button click

    expect(wrapper.emitted('submit')).toBeTruthy();
    expect(wrapper.emitted('submit')[0]).toEqual([mockFormData]);
  });
  it('should handle errors when getFormData fails', async () => {
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue(new Error('Error'))
    }
    await wrapper.find('.el-button').trigger('click'); // Trigger the button click

    expect(wrapper.emitted('submit')).toBeTruthy();
  });
})
describe('[public-upload]FileInputBlob', () => {
  let wrapper: any
  const mockTabProvider = {}
  const mockToken = 'test-token'
  const mockResponse = [
    { id: 1, name: 'File 1' },
    { id: 2, name: 'File 2' }
  ]
  beforeEach(async () => {
    wrapper = mount(FileInputBlob, {
      props: {
        fileMaxSize: 5, // 设置最大文件大小为 5MB
        multiple: true,
        limit: 3,
        accept: '.jpg,.png',
        disabled: false,
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
  })
  it('should render the component correctly', () => {
    expect(wrapper.find('.el-upload__text').exists()).toBe(true);
    expect(wrapper.find('i.el-icon-upload').exists()).toBe(true);
  });
  it('should update file list on file change', async () => {
    const file = new File(['content'], 'test.jpg', { type: 'image/jpeg', size: 4 * 1024 * 1024 }); // 4MB
    await wrapper.vm.onChange(file, [file]); // Simulate file change

    expect(wrapper.vm.state.fileList).toHaveLength(1);
    expect(wrapper.vm.state.fileList[0].name).toBe('test.jpg');
  });



  it('should return files blob', async () => {
    const file = new File(['content'], 'test.jpg', { type: 'image/jpeg', size: 4 * 1024 * 1024 });
    await wrapper.vm.onChange(file, [file]); // Add file

    const filesBlob = wrapper.vm.getFilesBlob();
    expect(filesBlob).toHaveLength(1);
    expect(filesBlob[0].name).toBe('test.jpg');
  });
})
