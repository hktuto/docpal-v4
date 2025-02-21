<template>
  <div class="pageContainer">
    <div class="dashboard-page">
      <div class="dashboard-page--header">
        <el-dropdown trigger="click" @command="createDashboard">
          <el-button type="primary">
              {{$t('common_add')}}
          </el-button>
          <template #dropdown>
              <el-dropdown-menu>
                  <el-dropdown-item v-for="(item, key) in CmmnDashboardWidgetSetting" :key="key" :command="key" :divided="item.divided">
                      {{$t(`dashboard.${item.label}`)}}
                  </el-dropdown-item>
              </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button class="el-icon--right" type="primary"
          :loading="state.saveLoading"
          @click="handleSave">{{$t('common_save')}}</el-button>
      </div>
      <div class="dashboard-page--main">
        <!-- {{ CmmnDashboardWidgetSetting }} -->
        <DashboardDetail
          ref="DashboardDetailRef"
          v-model:layout="state.layout"
          :componentMap="CmmnWidgetComponent"
          :resizable="true"
          :draggable="true"
          @delete="handleDelete"
          @refreshSetting="handleRefresh"></DashboardDetail>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

import { adminApi } from 'api'
const props = defineProps<{
    id: string,
    caseTypeId: string,
    name: string,
}>()
const {caseTypeId, name} = toRefs(props)
const routerProvider = inject(MenuRouterKey)
const state = reactive({
  info: {
    name: ''
  } as any,
  layout: [] as DashboardWidgetSetting[],
  saveLoading: false,
  detail: {}
})


function createDashboard(command: CmmnDashboardWidget) {
  const item = getCmmnWidgetSetting(command)
  state.layout.push({
    x: (state.layout.length * 2) % 4,
    y: state.layout.length +  4, // puts it at the bottom
    i: new Date().valueOf().toString(),
    ...item
  })
}
function handleRefresh (layoutSetting:any) {
  const index = state.layout.findIndex((item) =>  item.i === layoutSetting.i)
  state.layout[index] = deepCopy(layoutSetting)
}
function handleDelete(i) {
  const index = state.layout.findIndex((item) =>  item.i === i)
  state.layout.splice(index, 1)
}
async function handleSave() {
  try {
    state.saveLoading = true
    await adminApi.api.postCaseDashboardSaveStyle({
      id: props.id,
      styleJson: JSON.stringify(state.layout)
    })
  } catch (error) {
  } finally {
    state.saveLoading = false
  }
}

provide(CaseManagementDashboardKey, {
  caseTypeId,
  name
})

onMounted(async () => {
  const { data } = await adminApi.api.getCaseDashboardId(props.id)
  state.detail = data
  const temLayout = JSON.parse(data.styleJson)
  if(Array.isArray(temLayout)){
    state.layout = temLayout.map( item => {
      return Object.assign(item, getCmmnNormalizeSetting(item.component))
    })
  }
  console.log(data.label)
  name.value = data.label
  routerProvider?.updateTabName(data.label)
})
</script>
<style lang="scss" scoped>
.dashboard-page {
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-rows: min-content 1fr;
  padding: var(--app-space-xs);
  gap: var(--app-space-xs);
  &--header {
    text-align: right;
  }
  &--main {
    overflow: auto;
  }
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
