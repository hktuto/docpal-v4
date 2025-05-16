<template>
  <DashboardCard
    ref="cardRef"
    class="dp-dashboard--card__padding"
    :hideSetting="hideSetting"
    :title="$t('dashboard.PersonalCaseCreate')"
    :setting="setting"
    :settingRef="settingRef"
    @delete="handleDelete"
  >
    <div class="workflow-create-content">
      <el-button v-for="item in state.caseList" type="primary" :key="item.id" @click="handleClick(item)">
        {{ item.name }}
      </el-button>
    </div>
    <PersonalCaseCreateDialog ref="settingRef" :caseList="state.caseList" :caseAList="state.caseAList" @delete="handleDelete" @refresh="handleRefresh" />
    <CaseNewDialog ref="dialogRef" />
  </DashboardCard>
</template>
<script lang="ts" setup>
import { clientApi } from 'api'

const emits = defineEmits(['delete', 'refreshSetting'])

const props = withDefaults(
  defineProps<{
    dates?: any
    setting?: any
    hideSetting?: boolean
  }>(),
  {
    setting: {},
    hideSetting: false
  }
)
const state = reactive<any>({
  caseList: [],
  caseAList: []
})

async function handleDelete() {
  emits('delete')
}

const settingRef = ref()
const dialogRef = ref()

function handleClick(item: any) {
  dialogRef.value.handleOpen(item)
}

function handleRefresh(chartSetting, caseList) {
  state.caseList = caseList
  emits('refreshSetting', chartSetting)
}

async function getList() {
  try {
    const res = await clientApi.api.postCaseTypesPage({}).then((res) => res.data)
    return res?.entryList
  } catch (error) {
    return []
  }
}

async function getCaseList() {
  state.caseAList = await getList()
  if (props.setting.caseKeys && props.setting.caseKeys.length > 0) {
    state.caseList = props.setting.caseKeys.reduce((prev, id: any) => {
      const caseItem = state.caseAList?.find((cases: any) => cases.id === id)
      prev.push({ ...caseItem })
      return prev
    }, [])
  }
}

onMounted(async() => {
  getCaseList()
})
</script>
<style lang="scss" scoped>
.workflow-create-content {
  .el-button {
    width: 100%;
    margin: 0;
    margin-bottom: var(--app-space-xs);
  }
}
</style>
