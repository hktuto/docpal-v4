<script setup lang="ts">
const { homeList, currentHome, checkoutDashboard } = useHomePage()

function handleSelect(item: any) {
  checkoutDashboard(item)
}
</script>

<template>
  <div class="dashboardList">
    <div :class="{ 'dashboardItem': true, 'selected': currentHome.id === item.id }" v-for="item in homeList" :key="item.id" @click="handleSelect(item)">
      <span class="label">{{ item.name }}</span>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.dashboardList{
  width: 100%;
  min-width: 220px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: var(--app-space-xs);
}
.dashboardItem{
  cursor: pointer;
  width: 100%;
  line-height: 1;
  padding: var(--app-space-xs);
  border-radius: var(--app-border-radius-s);
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: var(--app-space-xs);
  color: var(--app-grey-200);
  .label{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  transition: all 0.2s ease-in-out;
  &.selected{
    background: var(--app-primary-color) !important;
    color: var(--app-paper) !important;
    box-shadow: var(--app-shadow-s);
  }
  &:hover{
    box-shadow: var(--app-shadow-s);
    background: var(--app-primary-alpha-30);
  }
}
</style>


