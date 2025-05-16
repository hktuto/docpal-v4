<template>
  <DashboardCard
    ref="cardRef"
    class="dp-dashboard--card__padding"
    :hideSetting="hideSetting"
    title=""
    :setting="setting"
    :settingRef="settingRef"
    @delete="handleDelete"
  >
    <template #title_suffix>
      <h4 v-if="setting.title || setting.selectedTable">{{ setting.title  }}
        <!-- <template v-if="setting.selectedTable">({{ $t(`workflow_${setting.selectedTable}`) }})</template> -->
      </h4> 
      <el-dropdown v-if="!setting.isTabView && !setting.selectedTable" trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <h4>{{ $t(activeTabName) }}</h4>
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="item in list" :key="item.key" :command="item.key" :disabled="activeTab === item.key">{{
              $t(item.name)
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-tabs v-else-if="!setting.selectedTable" v-model="activeTab" class="tab-container" @tab-change="handleCommand">
        <el-tab-pane v-for="item in list" :key="item.key" :label="$t(item.name)" :name="item.key"></el-tab-pane>
      </el-tabs>
    </template>
    <PersonalWorkflowMy v-if="setting.selectedTable === 'myTask' || (!setting.selectedTable && activeTab === 'myTask')" :processKeys="processKeys" />
    <PersonalWorkflowActive v-else-if="setting.selectedTable === 'activeTask' || (!setting.selectedTable && activeTab === 'activeTask')" :processKeys="processKeys" />
    <PersonalWorkflowAvalible v-else :processKeys="processKeys" />
    <PersonalWorkflowSetting ref="settingRef" @delete="handleDelete" @refresh="handleRefresh" />
  </DashboardCard>
</template>
<script lang="ts" setup>
import { ArrowDown } from '@element-plus/icons-vue'
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
const activeTab = ref('activeTask')
const activeTabName = ref('activeTask')
const list = [
  { name: 'workflow_myTask', key: 'myTask' },
  { name: 'workflow_activeTask', key: 'activeTask' },
  { name: 'workflow_allTask', key: 'allTask' },
]
function handleCommand(command: string | number | object) {
  activeTab.value = command
  activeTabName.value = list.find(item => item.key === command)?.name
}
async function handleDelete() {
  emits('delete')
}
const settingRef = ref()

function handleRefresh(chartSetting) {
  emits('refreshSetting', chartSetting)
}
</script>
<style lang="scss" scoped>
.el-dropdown-link {
  display: flex;
  align-items: center;
}
</style>
