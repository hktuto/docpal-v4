<template>
  <DashboardCard
    ref="cardRef"
    v-loading="loading"
    class="dp-dashboard--card__padding"
    :settingRef="settingRef"
    :hideSetting="hideSetting"
    title=""
    :setting="setting"
    @delete="handleDelete"
    @refresh="refresh"
  >
    <template #title_suffix>
      <el-dropdown v-if="!setting.isTabView" trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <h4>{{ $t(activeTabName) }}</h4>
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="item in list" :key="item.key" :command="item.key" :disabled="activeTab === item.key"
              >{{ $t(item.name) }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-tabs v-else v-model="activeTab" class="tab-container" @tab-change="handleCommand">
        <el-tab-pane v-for="item in list" :key="item.key" :label="$t(item.name)" :name="item.key"></el-tab-pane>
      </el-tabs>
    </template>
    <PersonalShareExternalTable ref="tableRef" v-if="activeTab === 'file_share'" />
    <PersonalShareInternalMeTable ref="tableRef" v-else-if="activeTab === 'file_share_me'" />
    <PersonalShareInternalOtherTable ref="tableRef" v-else-if="activeTab === 'file_share_other'" />
    <PersonalShareSetting ref="settingRef" @delete="handleDelete" @refresh="handleRefresh" />
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
const activeTab = ref('file_share_me')
const activeTabName = ref('file_share_me')
const list = [
  { name: 'file_share_me', key: 'file_share_me' },
  { name: 'file_share_other', key: 'file_share_other' },
  { name: 'file_share', key: 'file_share' }
]

const settingRef = ref()
function handleCommand(command: string) {
  activeTab.value = command
  const name = list.find((item) => item.key === command)?.name
  activeTabName.value = name || ''
}
const tableRef = ref()
const { cardRef, refresh, loading } = useDashboardCard({
  props,
  handleRefreshAction: (setting: any) => {
    tableRef.value.query({})
  }
})
async function handleDelete() {
  emits('delete')
}
function handleRefresh(chartSetting: any) {
  emits('refreshSetting', chartSetting)
}

defineExpose({})
</script>
<style lang="scss" scoped>
.el-dropdown-link {
  display: flex;
  align-items: center;
}
</style>
