<template>
<el-card class="o-auto">
  <h3>{{ $t('dashboard.cmmnActivity') }}</h3>
  <el-timeline>
    <el-timeline-item v-for="(item, index) in state.activityList" :key="index"
      :timestamp="formatDate(item.endedTime)"
      :type="getType(item.state)"
      :icon="getIcon(item.state)"
      :color="item.color"
      :size="getSize(item.state)"
       placement="top">
        <h3>{{item.name}}</h3>
    </el-timeline-item>
  </el-timeline>
  <SvgIcon v-if="!hideSetting" class="setting--icon" src="/icons/delete.svg"
    @click="handleDelete"/>
</el-card>
</template>
<script lang="ts" setup>
import { Finished, Select } from '@element-plus/icons-vue'
import { adminApi } from 'api'
import { ElMessageBox } from 'element-plus'
const props = withDefaults( defineProps<{
    instanceId?: string,
    caseId?: string,
    dates?: any;
    setting?: any;
    hideSetting?: boolean,
}>() , {
    setting: {},
    hideSetting: false
})

const { t } = useI18n()
const emits = defineEmits(['delete'])
async function handleDelete() {
    const action = await ElMessageBox.confirm(`${t('msg_confirmWhetherToDelete')}`)
    if(action !== 'confirm') return
    emits('delete')
}
const state = reactive<any>({
  activityList: []
})

function getType(state: string) {
  // 'primary' | 'success' | 'warning' | 'danger' | 'info'
  const map = {
    completed: 'success'
  }
  return map[state]
}
function getIcon(state: string) {
  // Finished | Select 
  const map = {
    completed: Select
  }
  return map[state]
}
function getSize(state: string) {
  // Finished | Select 
  const map = {
    completed: 'large'
  }
  return map[state]
}
const route = useRoute()
async function init() {
  const id = props.instanceId
  const caseTypeId = props.caseId
  if(id){
    const { data } = await adminApi.api.getCaseDashboardInstanceCaseidActivity(props.instanceId) as any
    state.activityList = data
  } 
  else if(caseTypeId){
    const { data } = await adminApi.api.getCaseDashboardCasetypeCasetypeidActivity(caseTypeId) as any
    state.activityList = data
  } 
}
onMounted(() => {
  init()
})
</script>
<style lang="scss" scoped>
.el-timeline {
  padding: var(--app-space-xs);
  overflow: auto;
}
</style>
  