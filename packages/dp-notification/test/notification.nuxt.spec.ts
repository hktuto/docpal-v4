import { mount, shallowMount } from '@vue/test-utils';
import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest';
import { NotificationTabDialog } from '#components'; // 请根据实际路径修改
import { nextTick } from 'vue';

describe('NotificationTabDialog.vue', () => {
    
    let wrapper: any;
    
    beforeEach(() => {
      wrapper = shallowMount(NotificationTabDialog, {
        global: {
          mocks: {
              $t: (msg: string) => msg, // 模拟国际化函数
              $i18n: () => {
                return {
                  t: (msg: string) => msg
                }
              }
          },
        },
      });
    });

//   afterEach(() => {
//     wrapper.unmount();
//   });

  it('should open the dialog when handleOpen is called', async () => {
    expect(wrapper.vm.state.visible).toBe(false);
    wrapper.vm.handleOpen();
    await nextTick();
    expect(wrapper.vm.state.visible).toBe(true);
  });

  it('should fetch notification types on mount', async () => {
    await wrapper.vm.getTypeList();
    await nextTick();
    
    // expect(wrapper.vm.state.list).toEqual(mockList);
  });
  
  it('should dismiss all notifications', async () => {
    wrapper.vm.state.activeName = 'Unread';
    wrapper.vm.state.dismissLoading = false;
    await wrapper.vm.handleDismissAll();
    await nextTick();
    expect(wrapper.vm.state.list[0].unreadCount).toBe(0);
  });

  it('should navigate to notification page when handleViewMore is called', async () => {
    console.log('======================');
    await wrapper.vm.handleViewMore();
    expect(wrapper.vm.state.visible).toBe(false);
  });

  it('should decrease unread count on unreadCountChange event', async () => {
    wrapper.vm.state.list[0].unreadCount = 5;
    console.log(wrapper.vm.state.list[0])
    const row = { type: 'Unread' };

    wrapper.vm.handleUnreadCountChange(row);
    console.log(wrapper.vm.state.list[0]);
    
    expect(wrapper.vm.state.list[0].unreadCount).toBe(4);
  });
});
