<template>
<el-card class="o-auto">
  <h3>{{ $t('dashboard.cmmnAction') }}</h3>
  <DashboardActionList class="dashboard-auto" :actionList="state.data" @refresh="init()"/>
  <SvgIcon v-if="!hideSetting" class="setting--icon" src="/icons/delete.svg"
    @click="handleDelete"/>
</el-card>
</template>
<script lang="ts" setup>
import { getCDActionsApi, getCDVActionsApi } from 'dp-api'
import { ElMessageBox } from 'element-plus'
const props = withDefaults( defineProps<{
    dates?: any;
    setting?: any;
    hideSetting?: boolean,
}>() , {
    setting: {},
    hideSetting: false
})
const emits = defineEmits(['delete'])
async function handleDelete() {
    const action = await ElMessageBox.confirm(`${$i18n.t('msg_confirmWhetherToDelete')}`)
    if(action !== 'confirm') return
    emits('delete')
}

const state = reactive<any>({
  data: [],
  loading: false
})
const userId:string = useUser().getUserId()
const route = useRoute()
async function init() {
  const id = route.query.instanceId
  const caseTypeId = route.query.caseId
  if(id) state.data = await getCDActionsApi(id, userId)
  else if(caseTypeId) state.data = await getCDVActionsApi(caseTypeId)
}

onMounted(() => {
  init()
})
</script>
<style lang="scss" scoped>


</style>