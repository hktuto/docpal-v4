<template>
  <div class="dashboard-item-tab--content">
    <el-dropdown v-if="!isTabView" trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        <h4>{{ $t(state.activeTabName) }}</h4>
        <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in list" :key="item.key" :command="item.key" :disabled="state.activeTab === item.key">{{ $t(item.name) }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-tabs v-else v-model="state.activeTab" class="demo-tabs" @tab-change="handleCommand">
      <el-tab-pane v-for="item in list" :key="item.key" :label="$t(item.name)" :name="item.key"></el-tab-pane>
    </el-tabs>
    <div v-show="state.activeTab === 'file_share'" class="dashboard-item-tab--content--table" >
      <PersonalShareExternalTable  />
    </div>
    <div v-show="state.activeTab === 'file_share_me'" class="dashboard-item-tab--content--table" >
      <PersonalShareInternalMeTable />
    </div>
    <div v-show="state.activeTab === 'file_share_other'" class="dashboard-item-tab--content--table" >
      <PersonalShareInternalOtherTable  />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ArrowDown } from '@element-plus/icons-vue'
const props = defineProps(['isTabView'])
const emits = defineEmits(['tab-change'])
const state = reactive<any>({
  activeTab: 'file_share_me',
  activeTabName: 'file_share_me' 
})
const list = [
  { name: 'file_share_me', key: 'file_share_me' },
  { name: 'file_share_other', key: 'file_share_other' },
  { name: 'file_share', key: 'file_share' }
]
function handleCommand(command: string | number | object) {
  state.activeTab = command
  state.activeTabName = list.find(item => item.key === command)?.name
  emits('tab-change', command)
}
function resize() {
}

defineExpose({ resize });
</script>
<style lang="scss" scoped>
.el-dropdown-link {
  display: flex;
  align-items: center;
}
</style>
