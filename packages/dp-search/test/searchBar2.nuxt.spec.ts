// CommentComponent.spec.ts
import { vi, it, expect, describe, beforeEach, afterEach } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils';
import { ElMessage, ElMessageBox } from 'element-plus';

import { 
  SearchGroupBar2Filter,
  SearchGroupTable  } from '#components'
import { SearchGroupGetApi } from './mock/api';
vi.mock('element-plus', () => ({
  ElMessage: {
    warning: vi.fn(),
    success: vi.fn(),
  },
  ElMessageBox: {
    confirm: vi.fn(() => Promise.resolve("confirm")),
  },
}));

describe('SearchGroupBar2Filter', () => {
  let wrapper: any;
  
  beforeEach(() => {
    wrapper = shallowMount(SearchGroupBar2Filter, {
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
  it('renders correctly and initializes with one filter', async() => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.vm.filters.query.length).toBe(1); // 默认添加一个过滤器
  });
  it('handles adding a filter correctly', async () => {
    wrapper.vm.handleAddFilter();
    expect(wrapper.vm.filters.query.length).toBe(2); // 检查过滤器数量增加
  });
  it('handles adding a query filter correctly', async () => {
    const initialLength = wrapper.vm.filters.query[0].matchs.length;
    wrapper.vm.handleAddQueryFilter(wrapper.vm.filters.query[0]);
    expect(wrapper.vm.filters.query[0].matchs.length).toBe(initialLength + 1); // 检查匹配项数量增加
  });
  it('handles deleting a filter correctly', async () => {
    const filterId = wrapper.vm.filters.query[0].id;
    wrapper.vm.handleDeleteFilter(filterId, wrapper.vm.filters.query);
    expect(wrapper.vm.filters.query.length).toBe(0); // 确保过滤器被删除
  });
  it('handles command updates correctly', async () => {
    wrapper.vm.handleCommand('or', wrapper.vm.filters);
    expect(wrapper.vm.filters.condition).toBe('or'); // 检查条件是否更新
  });
  it('handles updates to filter conditions correctly', async () => {
    const filterItem = wrapper.vm.filters.query[0];
    const mockData = [{ id: 'mock-match-id' }];
    wrapper.vm.handleUpdate(mockData, filterItem);
    expect(filterItem.matchs).toEqual(mockData); // 检查匹配项是否更新
  });
});
