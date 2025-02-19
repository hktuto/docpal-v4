<script lang="ts" setup>
import { ElTabs, ElTabPane, ElButton, ElDialog, ElBadge } from 'element-plus'
import { useEventListener } from '@vueuse/core'

import { clientApi } from 'api'
const props = defineProps<{
  unreadCount?: number;
}>();
type Notification = {
  id: number;
  title: string;
  content: any;
  type: string;
  createDate: string;
  functionPoint: any;
  processInstanceId?: string;
  status: string;
};

const router = useRouter()

const state = reactive<any>({
  visible: false,
  activeName: 0,
  list: [
    { name: 'unread', unreadCount: 10 },
    { name: 'folder', unreadCount: 10 },
    { name: 'document', unreadCount: 0 },
  ],
  dismissLoading: false
})
function handleOpen() {
  state.visible = true;
}
function handleClick() {
  console.log(state.activeName);
  
}
async function getTypeList() {
  const { data} = await clientApi.api.getNotificationQueryNotificationUnreadCountList()
  state.list = data
  const unreadCount = state.list.reduce((prev, item) => {
    prev += item.unreadCount
    return prev 
  }, 0);
  state.list.unshift({
    type: 'Unread',
    unreadCount
  })
  state.activeName = state.list[0].type
}
function handleUnreadCountChange(row) {
  if (row.type !== 'Unread') state.list[0].unreadCount --
  const activeItem = state.list.find(item => item.type === row.type)
  activeItem.unreadCount --
}

const detailRef = ref({})
async function handleDismissAll() {
  try {
    state.dismissLoading = true
    if(state.activeName === 'Unread') {
      await clientApi.api.postNotificationReadAll()
      state.list.forEach(item => {
        item.unreadCount = 0
      });
    }
    else {
      await clientApi.api.putNotificationDissmissByType(state.activeName)
      const activeItem = state.list.find(item => item.type === (state.activeName))
      state.list[0].unreadCount -= activeItem.unreadCount
      activeItem.unreadCount = 0
    }
    detailRef.value[state.activeName].initData(true)
  } catch (error) {
    
  } finally {
    state.dismissLoading = false
  }

}
function handleViewMore() {
  router.push('/notificationPage')
  state.visible = false
}
function initData() {
  getTypeList()
  try {
    detailRef.value[state.activeName].initData()
  } catch (error) {
  }
}

onMounted(() => {
  getTypeList()
});
useEventListener(window, 'updateNotificationUnreadCount', initData)
defineExpose({ handleOpen, initData });
</script>

<template>
  <el-dialog
    v-model="state.visible"
    class="scroll-dialog notification-tag-dialog"
    :title="$t('notifications.text')"
    :close-on-click-modal="false"
    append-to-body
  >
    <el-tabs v-model="state.activeName" class="dp-tabs--auto" @tab-click="handleClick">
      <ElTabPane v-for="item in state.list" :key="item.type" :name="item.type">
        <template #label>
          <el-badge :value="item.unreadCount" :hidden="item.unreadCount === 0"  type="primary">
            {{ item.type }}
          </el-badge>
        </template>
        <NotificationTabDialogDetail v-if="item.type === state.activeName" 
          :ref="el => { detailRef[item.type] = el }"
          :type="item.type"
          @unreadCountChange="handleUnreadCountChange"
          @close="state.visible = false"
        ></NotificationTabDialogDetail>
      </ElTabPane>
    </el-tabs>
    <template #footer>
      <div class="flex-x-between">
        <el-button test-id="notification-dismiss-button" :loading="dismissLoading" type="info" text @click="handleDismissAll">{{$t('button.dismissAll')}}</el-button>
        <el-button test-id="notification-view-more-button" type="primary" @click="handleViewMore">{{ $t('button.viewMore') }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>



<style  lang="scss">
.notification-tag-dialog {
  height: 70vh;
  .el-dialog__body {
    padding: 0 var(--el-dialog-padding-primary);
  }

}
</style>
