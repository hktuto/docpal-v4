<template>
  <NuxtLayout :back-path="`/case/${route.query.caseId}`">
    <template #headerLeft>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <div class="ellipsis">{{state.selectedDashboard.label}}</div>
          <el-icon class="el-icon--right"
            v-if="state.dashboardList.length > 1"> <ArrowDown /> </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu v-if="state.dashboardList.length > 1">
            <el-dropdown-item 
              v-for="item in state.dashboardList" :command="item.id"
              :disabled="item.id === state.selectedDashboard.id"
              @click="getLayout(item.id, item)">
              {{item.label}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
    <div class="dashboard-page" v-loading="state.loading">
        <DashboardDetail v-if="!state.loading"
          ref="DashboardDetailRef" 
          v-model:layout="state.layout"
          :componentMap="CmmnWidgetComponent"
          :hideSetting="true"
          :resizable="false"
          :draggable="false"></DashboardDetail>
    </div>
  </NuxtLayout>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'

import {clientApi} from 'api'
const routerProvider = inject(MenuRouterKey)
const state = reactive({
  loading: false,
  layout: [] as DashboardWidgetSetting[],
  dashboardList: [],
  selectedDashboard: {},
  time: 3
})
const {caseId} = defineProps<{
  caseId: string
}>()
async function getDashboardList() {
  try {
    state.dashboardList = await clientApi.api.getCaseDashboardCasetypeCasetypeidPermission(caseId).then(res => res.data) as any
    const dashboardId = sessionStorage.getItem('case-dashboard-id')
    let index = state.dashboardList.findIndex(item => item.id === dashboardId )
    if(!index || index < 0) index = 0
    getLayout(state.dashboardList[index].id, state.dashboardList[index])
  } catch (error) {
    ElMessage({
      message: `${$i18n.t('caseManagement.dashboardNotSet')}`,
      onClose: () => goBack(),
    })
  }
}
function goBack() {
  // TODO: add fallback to case list
  routerProvider.back()
  // router.push(`/case/${route.query.caseId}`)
}
async function getLayout(id: string, row: any) {
  try {
    state.loading = true
    state.selectedDashboard = row
    if(row.layout) {
      state.layout = row.layout
      return
    }
    sessionStorage.setItem('case-dashboard-id', id)
    const detail = await clientApi.api.getCaseDashboardId(id).then(res => res.data) as any
    if(!detail.styleJson) throw new Error("");
    state.layout = JSON.parse(detail.styleJson)
    row.layout = state.layout
  } catch (error) {
    state.layout = []
    row.layout = []
  } finally {
    setTimeout(() => {
      state.loading = false
    }, 200)
  }
}
onMounted(async () => {
  getDashboardList()
})
</script>
<style lang="scss" scoped>
.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.dashboard-page {
  height: 100%;
  overflow: auto;
  
}
:deep .o-auto  {
  height: 100%;
   & > .el-card__body {
    height: 100%;
    overflow: hidden;
    display: grid;
    grid-template-rows: min-content 1fr;
    gap: var(--app-space-xs);
    h3 {
      margin: unset;
    }
  }
  .setting--icon {
    --icon-size: 1.14rem; 
    --icon-color: #8796A4;
    position: absolute;
    top: var(--app-space-xs);
    right: var(--app-space-xs);
  }
}
:deep .responsive-container {
  margin-bottom: 10px;
}
</style>
