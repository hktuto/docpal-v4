<script setup lang="ts">
const { t } = useI18n()
import CalendarManagementDetail from '../management/detail.vue'
import CalendarManagementTable from '../management/table.vue'

const isCalendarView = ref<boolean>(true)

const currentView = computed(() => {
  return isCalendarView.value ? CalendarManagementDetail : CalendarManagementTable
})

function toggleView(view: string) {
  isCalendarView.value = view === 'calendar'
}

</script>

<template>
  <div style="margin: 12px">
    <div style="height: 35px">
      <el-button key="info" type="info" text style="height:50px; width: 200px" @click="toggleView('calendar')">
        <span :class="{ active: isCalendarView }" style="font-size: 20px;">{{ $t('Calendar View') }}</span>
      </el-button>
      <el-button key="info" type="info" text style="height:50px; width: 200px" @click="toggleView('table')">
        <span :class="{ active: !isCalendarView }" style="font-size: 20px;">{{ $t('Table View') }}</span>
      </el-button>
    </div>

    <div style="margin-top: 20px;">
      <component :is="currentView"></component>
    </div>
  </div>
</template>

<style scoped lang="scss">
.active {
  color: #409eff;
}
</style>