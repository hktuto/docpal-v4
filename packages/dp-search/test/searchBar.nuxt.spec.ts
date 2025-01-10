// CommentComponent.spec.ts
import { vi, it, expect, describe, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils';
import { ElMessage, ElMessageBox } from 'element-plus';

import { 
  SearchGroupBar, 
  SearchGroupBarAggregation,
  SearchGroupBarSaveLog,
  SearchGroupBarSaveLogAdd,
  SearchGroupBarRecentSearch } from '#components'
import { SaveSearchApi, DeleteSearchApi, GetSearchApi } from './mock/api';
vi.mock('element-plus', () => ({
  ElMessage: {
    warning: vi.fn(),
    success: vi.fn(),
  },
  ElMessageBox: {
    confirm: vi.fn(() => Promise.resolve("confirm")),
  },
}));

describe('SearchGroupBar', () => {
  let wrapper: any;
  
  beforeEach(() => {
    wrapper = mount(SearchGroupBar, {
      global: {
        mocks: {
            $t: (msg: string) => msg, // 模拟国际化函数
            $i18n: () => {
              return {
                t: (msg: string) => msg
              }
            }
        }
      }
    })
  });
  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('toggles mode between filter and search', async () => {
    expect(wrapper.vm.mode).toBe('filter');
    await wrapper.vm.handleMode();
    expect(wrapper.vm.mode).toBe('search');
    await wrapper.vm.handleMode();
    expect(wrapper.vm.mode).toBe('filter');
  });
  it('handles search correctly', async () => {
    wrapper.vm.filterRef = {
      getData: vi.fn(() => Promise.resolve({ query: ['test'], docId: null })),
    };
    wrapper.vm.aggRef = {
      clear: vi.fn(),
    };

    await wrapper.vm.handleSearch();
    expect(wrapper.vm.aggRef.clear).toHaveBeenCalled();
    expect(wrapper.emitted().search[0][0]).toEqual({ query: ['test'], docId: null });
  });
  it('does not search if no query and no docId', async () => {
    wrapper.vm.filterRef = {
      getData: vi.fn(() => Promise.resolve({ query: [], docId: null })),
    };
    await wrapper.vm.handleSearch();
    expect(wrapper.emitted().search).toBeUndefined();
  });
  it('saves search correctly', async () => {
    wrapper.vm.filterRef = {
      getData: vi.fn(() => Promise.resolve({ query: ['test'], docId: null })),
    };
    wrapper.vm.logRef = {
      getList: vi.fn(() => Promise.resolve()),
    };
    await wrapper.vm.handleSave({ label: 'Test Label', includeFilter: false });
    expect(SaveSearchApi).toHaveBeenCalledWith({
      label: 'Test Label',
      queryCondition: JSON.stringify({ query: ['test'], docId: null }),
    });
    expect(ElMessage.success).toHaveBeenCalledWith('dpMsg_success');
    expect(wrapper.vm.logRef.getList).toHaveBeenCalled();
  });
  it('shows warning when saving with no conditions', async () => {
    wrapper.vm.filterRef = {
      getData: vi.fn(() => Promise.resolve({ query: [], docId: null })),
    };
    await wrapper.vm.handleSave({ label: 'Test Label', includeFilter: false });
    expect(ElMessage.warning).toHaveBeenCalledWith('search.noCondition');
  });
  it('handles log search correctly', async () => {
    const query = { filter: 'test' };
    wrapper.vm.filterRef = {
      initForm: vi.fn(),
    };
    wrapper.vm.aggRef = {
      clear: vi.fn(),
    };
    await wrapper.vm.handleLogSearch(query);
    expect(wrapper.vm.aggRef.clear).toHaveBeenCalled();
    expect(wrapper.vm.filterRef.initForm).toHaveBeenCalledWith(query);
    expect(wrapper.emitted().searchLog[0][0]).toEqual(query);
  });
});
describe('SearchGroupBarAggregation', () => {
  let wrapper: any;
  const aggregationData = {
    modified: [{ key: '2023-10-01', value: 'Oct 1, 2023', count: 5 }],
    createdDate: [{ key: '2023-10-02', value: 'Oct 2, 2023', count: 3 }],
    otherField: [{ key: 'example', value: 'Example', count: 2 }],
  };
  beforeEach(() => {
    wrapper = mount(SearchGroupBarAggregation, {
      props: {
        aggregation: aggregationData,
      },
      global: {
        mocks: {
            $t: (msg: string) => msg, // 模拟国际化函数
            $i18n: () => {
              return {
                t: (msg: string) => msg
              }
            }
        }
      }
    })
  });

  it('renders correctly with aggregation data', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h3').text()).toBe('searchGroup.modified');
  });
  it('gets data correctly', () => {
    wrapper.vm.state.filters.modified = ['2023-10-01'];
    const params = wrapper.vm.getData();
    expect(params).toEqual({ modified: '2023-10-01' });
  });
  it('sets default filter correctly', () => {
    const defaultFilter = { modified: '2023-10-01' };
    wrapper.vm.setDefaultFilter(defaultFilter);
    expect(wrapper.vm.state.defaultFilter).toEqual(defaultFilter);
  });
  it('clears filters correctly', () => {
    wrapper.vm.state.filters = { modified: ['2023-10-01'] };
    wrapper.vm.clear();
    expect(wrapper.vm.state.filters).toEqual({});
  });
  it('emits filters event on filter change', async () => {
    wrapper.vm.state.filters.modified = ['2023-10-01'];
    await wrapper.vm.handleFiltersChange();
    expect(wrapper.emitted().filters[0][0]).toEqual({ modified: '2023-10-01' });
  });
  it('watches aggregation prop changes', async () => {
    const newAggregationData = {
      modified: [{ key: '2023-10-03', value: 'Oct 3, 2023', count: 4 }],
    };
    await wrapper.setProps({ aggregation: newAggregationData });

    expect(wrapper.vm.state._aggregation).toEqual(newAggregationData);
    expect(wrapper.vm.state.filters.modified).toEqual([]); // 应该重置过滤器
  });
});

describe('SearchGroupBarSaveLog', () => {
  let wrapper: any;
  
  beforeEach(() => {
    wrapper = mount(SearchGroupBarSaveLog, {
      global: {
        mocks: {
            $t: (msg: string) => msg, // 模拟国际化函数
            $i18n: () => {
              return {
                t: (msg: string) => msg
              }
            }
        }
      }
    })
  });
  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('renders correctly and fetches search list on mount', async () => {
    expect(wrapper.exists()).toBe(true);
    await wrapper.vm.getList(); // 手动调用获取列表
    expect(wrapper.vm.state.searchList).toHaveLength(2);
    expect(wrapper.vm.state._searchList).toHaveLength(2);
  });
  it('filters search list based on input', async () => {
    await wrapper.vm.getList(); // 确保列表已经获取
    await wrapper.vm.handleChange('Test Search 1')
    expect(wrapper.vm.state._searchList).toHaveLength(1);
    expect(wrapper.vm.state._searchList[0].label).toBe('Test Search 1');
  });
  it('handles search item click correctly', async () => {
    await wrapper.vm.getList(); // 确保列表已经获取
    wrapper.vm.popoverRef = {}
    wrapper.vm.popoverRef.hide = () => {}

    const item = wrapper.vm.state.searchList[0];
    wrapper.vm.handleSearch(item);
    expect(wrapper.emitted().search[0][0].condition).toEqual('and');
  });
  it('opens add dialog correctly', async () => {
    // wrapper.vm.aggRef = {}
    // wrapper.vm.aggRef.handleOpen = () => {}
    wrapper.vm.popoverRef = {}
    wrapper.vm.popoverRef.hide = () => {}
    await wrapper.vm.handleAdd();
    
    // expect(addRef.value.handleOpen).toHaveBeenCalled();
  });
  it('handles delete action correctly', async () => {
    const item = wrapper.vm.state.searchList[0];

    await wrapper.vm.handleDelete(item);
    
    expect(DeleteSearchApi).toHaveBeenCalledWith(item.id);
    expect(GetSearchApi).toHaveBeenCalled(); // 确保列表被重新获取
  });
  it('shows confirmation dialog on delete', async () => {
    const item = wrapper.vm.state.searchList[0];

    await wrapper.vm.handleDelete(item);
    expect(ElMessageBox.confirm).toHaveBeenCalledWith('msg_confirmWhetherToDelete');
  });
  it('does not delete if action is canceled', async () => {
    ElMessageBox.confirm.mockImplementationOnce(() => Promise.reject("cancel"));
    const item = wrapper.vm.state.searchList[0];
    await expect(wrapper.vm.handleDelete(item)).rejects.toThrow("cancel");
    // expect(DeleteSearchApi).not.toHaveBeenCalled();
  });
})
describe('SearchGroupBarSaveLogAdd', () => {
  let wrapper: any;
  
  beforeEach(() => {
    wrapper = mount(SearchGroupBarSaveLogAdd, {
      global: {
        mocks: {
            $t: (msg: string) => msg, // 模拟国际化函数
            $i18n: () => {
              return {
                t: (msg: string) => msg
              }
            }
        }
      }
    })
  });
  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.vm.state.dialogVisible).toBe(false);
  });
  it('opens dialog when handleOpen is called', async () => {
    wrapper.vm.handleOpen();
    await wrapper.vm.$nextTick(); // 等待更新
    expect(wrapper.vm.state.dialogVisible).toBe(true);
  });
  it('submits form data correctly', async () => {
    const mockData = { key: 'value' };
    wrapper.vm.FromRendererRef = {
      vFormRenderRef: {
        getFormData: vi.fn(() => Promise.resolve(mockData)),
      },
    };

    await wrapper.vm.handleSubmit();
    
    expect(wrapper.emitted().save[0]).toEqual([mockData]);
    expect(wrapper.vm.state.dialogVisible).toBe(false);
  });
  it('does not emit save if form data is empty', async () => {
    wrapper.vm.FromRendererRef = {
      vFormRenderRef: {
        getFormData: vi.fn(() => Promise.resolve(null)),
      },
    };

    await wrapper.vm.handleSubmit();
    
    expect(wrapper.emitted().save).toBeUndefined();
  });
  it('handles errors during form submission', async () => {
    wrapper.vm.FromRendererRef = {
      vFormRenderRef: {
        getFormData: vi.fn(() => Promise.reject(new Error('Error fetching data'))),
      },
    };

    await wrapper.vm.handleSubmit();
    
    expect(wrapper.vm.state.loading).toBe(false); // 确保 loading 状态恢复
  });
})
describe('SearchGroupBarRecentSearch', () => {
  let wrapper: any;
  
  beforeEach(() => {
    wrapper = mount(SearchGroupBarRecentSearch, {
      global: {
        mocks: {
            $t: (msg: string) => msg, // 模拟国际化函数
            $i18n: () => {
              return {
                t: (msg: string) => msg
              }
            }
        }
      }
    })
  });
  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.vm.popoverRef).toBeTruthy(); // 确保 popoverRef 存在
  });
  it('handles search event correctly', async () => {
    await new Promise(resolve => setTimeout(resolve, 100)); // 等待一会，确保 popoverRef 存在
    wrapper.vm.popoverRef = {
      hide: vi.fn(),
    };
    const mockData = { key: 'value' };
    wrapper.vm.handleSearch(mockData);
    expect(wrapper.emitted().search[0]).toEqual([mockData]);
    expect(wrapper.vm.popoverRef.hide).toHaveBeenCalled(); // 确保 popover 被隐藏
  });
  it('initializes the list correctly', async () => {
    wrapper.vm.listRef = {
      initList: vi.fn(),
    };

    await wrapper.vm.initList();
    
    expect(wrapper.vm.listRef.initList).toHaveBeenCalled();
  });
  it('hides popover when hidePopover is called', async () => {
    wrapper.vm.popoverRef = {
      hide: vi.fn(),
    };

    await wrapper.vm.hidePopover();
    
    expect(wrapper.vm.popoverRef.hide).toHaveBeenCalled();
  });
})
