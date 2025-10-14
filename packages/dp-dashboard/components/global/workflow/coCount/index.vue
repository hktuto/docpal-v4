<template>
  <DashboardCard
    ref="cardRef"
    v-loading="loading"
    class="dp-dashboard--card__padding"
    :hideSetting="hideSetting"
    :title="$t(setting.workflowName || setting.workflow)"
    :setting="setting"
    :settingRef="settingRef"
    @delete="handleDelete"
    @refresh="refresh"
  >
    <template #title_suffix>
      <DashboardUserFilter
        class="el-icon--right"
        :user="state.filterUser"
        :show="setting.showUserFilter"
        @refreshSetting="handleFilterUser"
      ></DashboardUserFilter>
    </template>
    <div class="chartContainer">
      <component
        v-for="(item, index) in setting.displayList"
        class="chartContainer-item"
        :dates="dates"
        :is="widgetComponent[item]"
        :ref="
          (el) => {
            displayListRef[item] = el
          }
        "
        :setting="setting"
        :workflow="setting.workflow"
        :user="state.filterUser"
      ></component>
    </div>
    <WorkflowCoCountDialog ref="settingRef" @delete="handleDelete" @refresh="handleRefresh" />
  </DashboardCard>
</template>

<script lang="ts" setup>
import { widgetComponent } from '~/utils/dashboardWidgetHelper'

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
const emits = defineEmits(['refreshSetting', 'delete'])
const state = reactive({
  filterUser: ''
})
const displayListRef = ref<any>({})
const { settingRef, cardRef, resize, refresh, loading } = useDashboardCard({
  props,
  resizeAction: () => {
    Object.keys(displayListRef.value).forEach((key) => {
      const item = displayListRef.value[key]
      if (item) item.resize()
    })
  },
  handleInitCardAction: (setting: any) => {
    state.filterUser = setting.user
  },
  handleRefreshAction: (setting: any) => {
    for (const key in displayListRef.value) {
      const item = displayListRef.value[key]
      if (item && item.handleInitCard) item.handleInitCard(setting)
    }
  }
})

function handleDelete() {
  emits('delete')
}
function handleRefresh(chartSetting: any) {
  emits('refreshSetting', chartSetting)
}
function handleFilterUser(user: any) {
  state.filterUser = user
}

defineExpose({
  resize
})
</script>

<style lang="scss" scoped>
.dashboard-item-main {
  display: grid;
  grid-template-rows: min-content 1fr;
  overflow: hidden;
  background-color: var(--setting-color, #fff);
}
.dashboard-item-main :deep(.el-card__body) {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.dashboard-item-main :deep(.el-card__header) {
  display: flex;
  justify-content: space-between;
  border-bottom: unset;
  padding: var(--app-space-xs);
  h4 {
    padding: unset;
    margin: unset;
    color: #464646;
    font-size: var(--app-font-size-l);
    font-family: Arial;
  }
}
.chartContainer {
  height: 100%;
  max-width: 100%;
  overflow-y: auto;
  display: flex;
  flex-flow: row wrap;
  container-type: inline-size;
  &-item {
    min-height: 300px;
  }
}
@container (min-width: 640px) {
  .co-count {
    flex: 1 0 50%;
    max-width: 50%;
  }
}
</style>
