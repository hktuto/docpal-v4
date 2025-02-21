<template>
  <!-- <div> -->
    <div v-infinite-scroll="getList" test-id="notification-detail" class="infinite-list" style="overflow: auto;height: 100%;"
      :infinite-scroll-disabled="state.scrollNoMore || state.loading"
      :infinite-scroll-immediate="false"
    >
      <div v-for="item in state.list" :key="item.id" class="infinite-list-item">
        <div class="notificationContent">
          <div>{{ formatDate(item.createdDateTimestamp)  }}</div>
          <div class="dp-title">{{ $t(item.content.templateId, {
            userId: item.creator,
            documentName: item.content.documentName,
            businessName: item.content.businessName,
            emailList: item.content.emailList,
            email: item.content.email,
            path: item.content.path,
            fileName: item.content.fileName
          }) }}</div>
            <!-- emailList: item.content.emailList ? item.content.emailList.join(',') : '' -->
          <div>{{ item.creator }}</div>
          <div>
            <el-button :loading="item.loading" :test-id="`notification-dismiss-button-${item.id}`" type="info"  @click="handleDismiss(item)">{{ $t('button.dismiss') }}</el-button>
            <el-button v-if="notiShowView(item)" :test-id="`notification-view-button-${item.id}`"  type="primary" @click="handleView(item)">{{ $t('button.view') }}</el-button>
          </div>
          <el-divider />
        </div>
        
      </div>
      <p v-if="state.loading" class="center">{{ $t('dpTip.loading') }}</p>
      <p v-if="!state.loading && state.scrollNoMore" class="center">{{ $t('dpTip.noMore') }}</p>
    </div>
  <!-- </div> -->
</template>
<script lang="ts" setup>
import { clientApi } from 'api'
import { notiShowView, notiHandleView } from '../../../utils/notificationHelper.ts'
const props = defineProps(['type'])
const emits = defineEmits(['close', 'unreadCountChange'])

const router = useRouter()

const userId = useUserId()
const pageParams = ref({
  pageNum: 0,
  pageSize: 10,
  receiveId: userId.value,
  orderBy: 'createdDate',
  isDesc: true
})

const state = reactive<any>({
  list: [],
  totalSize: 0,
  loading: false,
  scrollNoMore: true,
})
async function getList () {
  const param: any = {
    readStatus: 'CREATE'
  }
  if (props.type !== 'Unread') param.type = props.type
  try {
    state.loading = true
    const { data:res} = await clientApi.api.postNotificationQueryNotificationList({ ...param, ...pageParams.value})
    res.entryList.map(item => {
      if(typeof item.content === 'string') {
        item.content = JSON.parse(item.content)
        if(typeof item.content.emailList === 'string') item.content.emailList = JSON.parse(item.content.emailList).join(',')
      }
      return item
    })
    state.list.push(...res.entryList)
    state.totalSize = res.totalSize
    pageParams.value.pageNum ++
  } catch (error) {
    
  } finally {
    
    setTimeout(() => state.loading = false, 200)
    state.scrollNoMore = state.list.length >= state.totalSize
  }
}
async function handleDismiss(item) {
  try {
    item.loading = true
    await clientApi.api.putNotificationIdStatusStatus(item.id)
    const index = state.list.findIndex(lItem => lItem.id === item.id)
    state.list.splice(index, 1)
    emits('unreadCountChange', item)
  } catch (error) {
  } finally {
    item.loading = false
  }
}

async function handleView(item) {
  notiHandleView(item)
  handleDismiss(item)
  emits('close')
}
function handleDismissAll() {}
function initData (noGetData:boolean = false) {
  state.list = []
  pageParams.value.pageNum = 0
  if(!noGetData) getList()
}
onMounted(() => {
  initData()
})
defineExpose({ initData })
</script>
<style lang="scss" scoped>
.el-divider--horizontal {
  margin: var(--app-space-xs) 0;
}
.notificationContent {
  display: flex;
  flex-direction: column;
  gap: var(--app-space-xs);
}
.center {
  text-align: center;
}
</style>
