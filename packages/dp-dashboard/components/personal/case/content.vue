<template>
  <div class="dashboard-item-tab--content">
    <el-dropdown v-if="!isTabView" trigger="click" @command="handleCommand">
      <div class="el-dropdown-link">
        <h4>{{$t('caseManagement.my')}}({{ $t(state.activeTabName) }})</h4>
        <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in state.list" :key="item.id" :command="item.id" :disabled="state.activeTab === item.id">{{ item.name }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-tabs v-else v-model="state.activeTab" class="demo-tabs" @tab-change="handleCommand">
      <el-tab-pane v-for="item in state.list" :key="item.id" :label="item.name" :name="item.id"></el-tab-pane>
    </el-tabs>
    <div class="dashboard-item-tab--content--table">
      <PersonalCaseTable ref="tableRef" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { clientApi } from "api";
const props = defineProps(['isTabView'])
const emits = defineEmits(['tab-change'])
const state = reactive<any>({
  activeTab: '',
  activeTabName: '',
  list: []
})

const tableRef = ref()
function handleCommand(command: string | number | object) {
  state.activeTab = command
  state.activeTabName = state.list.find(item => item.id === command)?.name

  tableRef.value.reload(command) 
  emits('tab-change', command)
}

onMounted(async() => {
  try {
    const res = await clientApi.api.postCaseTypesPage({}).then(res => res.data)
    state.list = res?.entryList
    if(state.list.length > 0) handleCommand(state.list[0]?.id)
  } catch (error) {
  }
})
function resize() {
}
defineExpose({
  resize
})
</script>
<style lang="scss" scoped>
.el-dropdown-link {
  display: flex;
  align-items: center;
}
</style>
