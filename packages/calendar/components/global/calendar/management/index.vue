<script setup lang="ts">
const { t } = useI18n()

const props = defineProps<{
  processInstanceId: string,
  activeTab: string
}>()
const activeTab = ref<string>(props.activeTab)
</script>

<template>
  <div class="pageContainer--padding calendar-management-page">
    <el-tabs v-model="activeTab">
      <el-tab-pane :label="$t('Calendar View')" name="calendar">
        <CalendarManagementDetail v-if="activeTab === 'calendar'" v-bind="$props" />
      </el-tab-pane>
      <el-tab-pane :label="$t('Table View')" name="table">
        <CalendarManagementTable v-if="activeTab === 'table'"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
.pageContainer--padding.calendar-management-page {
  display: grid;
  grid-template-rows: 1fr min-content;
  gap: var(--app-space-xs);

  .el-tab-pane {
    height: 100%;

    div {
      height: 100%;
    }
  }
}
</style>