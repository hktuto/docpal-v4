<template>
  <div class="worfklow-list-card dashboard-item-tab--content">
    <h2 v-if="title">{{ title }}</h2>
    <el-dropdown v-if="!isTabView && !singleTableMode" trigger="click" @command="handleCommand">
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
    <div v-if="singleTableMode && selectedTable" class="dashboard-item-tab--content--table" >
      <template v-if="selectedTable === 'myTask'">
        
        <PersonalWorkflowMy :processKeys="processKeys" />
      </template>
      <template v-else-if="selectedTable === 'activeTask'">
        <PersonalWorkflowActive :processKeys="processKeys" />
      </template>
      <template v-else-if="selectedTable === 'allTask'">
        <PersonalWorkflowAvalible :processKeys="processKeys"  />
      </template>
    </div>
    <template v-if="!singleTableMode && state.activeTab ">
      <el-tabs  v-model="state.activeTab" class="demo-tabs" @tab-change="handleCommand">
        <el-tab-pane v-for="item in list" :key="item.key" :label="$t(item.name)" :name="item.key"></el-tab-pane>
      </el-tabs>
      <div v-if="state.activeTab === 'myTask'"  class="dashboard-item-tab--content--table" >
        <PersonalWorkflowMy :processKeys="processKeys" />
      </div>
      <div v-else-if="state.activeTab === 'activeTask'" class="dashboard-item-tab--content--table" >
        <PersonalWorkflowActive :processKeys="processKeys" />
      </div>
      <div v-else="state.activeTab === 'allTask'" class="dashboard-item-tab--content--table" >
        <PersonalWorkflowAvalible :processKeys="processKeys"  />
      </div>
    </template>
    
</div>
</template>
<script lang="ts" setup>
import { ArrowDown } from '@element-plus/icons-vue'
const props = defineProps(['isTabView', 'processKeys','title', 'singleTableMode','selectedTable'])
const emits = defineEmits(['tab-change'])
const state = reactive<any>({
  activeTab: 'myTask',
  activeTabName: 'workflow_myTask' 
})
const list = [
  { name: 'workflow_myTask', key: 'myTask' },
  { name: 'workflow_activeTask', key: 'activeTask' },
  { name: 'workflow_allTask', key: 'allTask' },
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
.worfklow-list-card{
  height: 100%;
  overflow: auto;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.demo-tabs{
  overflow: auto;
}
.dashboard-item-tab--content--table{
  flex: 1 0 auto;
  width: 100%;
  overflow: hidden;
  position: relative;
}
</style>
