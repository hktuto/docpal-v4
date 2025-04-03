<template>
  <div class="template-container">
    <div class="template-container--header">
      <el-dropdown class="template-container--header__title" trigger="click" @command="handleCheckout">
        <div>{{ state.curDashboard.name }} <ArrowDown class="el-icon--left" /></div>
        <template #dropdown>
          <el-dropdown-menu >
            <template v-for="item in state.dashboardList" :key="item.id">
              <el-dropdown-item :disabled="item.id === state.curDashboard.id" :command="item.id">
                {{ item.name }}
              </el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <template v-if="!state.editMode && state.curDashboard.name === 'PERSONAL'">
        <el-button @click="handleEdit" type="primary" :icon="Edit" circle />
      </template>
      <template v-else-if="state.editMode">
        <el-dropdown trigger="click" @command="handleAdd">
          <el-button type="primary" :icon="Plus" circle />
          <template #dropdown>
            <el-dropdown-menu>
              <template v-for="(item, key) in dashboardWidgetSetting" :key="key">
                <el-dropdown-item v-if="(!item.feature || checkLicenseFeatures(item.feature)) && item.type === 'personal'" :command="key">
                  {{ $t(`dashboard.${item.label}`) }}
                </el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <!-- <el-button @click="handleClear">handleClear</el-button> -->
        <el-button class="el-icon--right" type="primary" @click="handleFinish">
          {{ $t('dpButtom_finish') }}
        </el-button>
      </template>
    </div>
    <DashboardDetail class="template-container--main"
      v-if="state.curDashboard && state.curDashboard.layout"
      ref="DashboardDetailRef"
      :id="state.curDashboard.id"
      v-model:layout="state.curDashboard.layout"
      :dates="state.dates"
      :hideSetting="!state.editMode"
      :resizable="state.editMode"
      :draggable="state.editMode"
      :editMode="state.editMode"
      @delete="handleDelete"
      @refreshSetting="handleRefresh"
    ></DashboardDetail>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { ArrowDown } from '@element-plus/icons-vue'
import { Plus, Edit } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { clientApi } from 'api'

import { allowFeature } from '#imports'
import { getNormalizeSetting, dashboardWidgetSetting, getWidgetSetting } from '../utils/dashboardWidgetHelper'
import type { DashboardWidget, DashboardWidgetSetting } from '../utils/dashboardWidgetHelper'

const dateFormat = useDisplayTimeFormat().value
const state = reactive<any>({
  editMode: false,
  loading: false,
  dates: [dayjs().startOf('year').format('YYYY-MM-DD'), formatDate(new Date(), 'YYYY-MM-DD')],
  dashboardList: [],
  curDashboard: {},
  editCount: 0
})

function handleAdd(command: DashboardWidget) {
  state.editCount++
  state.editMode = false
  const item = getWidgetSetting(command)
  state.curDashboard.layout.push({
    x: (state.curDashboard.layout.length * 2) % 4,
    y: state.curDashboard.layout.length + 4, // puts it at the bottom
    i: new Date().valueOf().toString(),
    ...item
  })

  // 新增dashboard需要 在setTimeout后 重新設置才可以拖拽
  setTimeout(() => {
    state.editMode = true
  })
}
function handleEdit() {
  state.editMode = true
  state.editCount = 0
}
function handleRefresh(layoutSetting: any, id: any) {
  state.editCount++
  const index = state.curDashboard.layout.findIndex((item) => item.i === layoutSetting.i)
  state.curDashboard.layout[index] = deepCopy(layoutSetting)
}

function handleDelete(i: any) {
  state.editCount++
  const index = state.curDashboard.layout.findIndex((item) => item.i === i)
  state.curDashboard.layout.splice(index, 1)
}

function handleFinish() {
  state.editMode = false
  handleSave()
}

async function handleSave() {
  try {
    state.loading = true
    await clientApi.api.putPersonalLandingSave({
      styleJson: JSON.stringify(state.curDashboard.layout)
    })
  } catch (error) {
  } finally {
    state.loading = false
  }
}

// 开发时可使用：清屏
async function handleClear() {
  try {
    state.loading = true
    await clientApi.api.putPersonalLandingSave({
      styleJson: ''
    })

    state.curDashboard.layout = []
  } catch (error) {
  } finally {
    state.loading = false
  }
}
async function getDashboardList() {
  let personal: any = await clientApi.api.getPersonalLanding().then((res) => res.data)
  let dashboardList: any = await clientApi.api.getPersonalLandingDashboardList().then((res: any) => res.data)
  if (!personal) personal = {}
  if (!dashboardList) dashboardList = []
  personal.id = 'PERSONAL'
  personal.name = 'PERSONAL'
  state.dashboardList = [personal, ...dashboardList]
  checkoutDashboard(personal)
}
async function handleCheckout(id: any) {
  if(id === state.curDashboard.id) return
  if (id !== 'PERSONAL' && state.editMode) handleFinish()
  const cur = state.dashboardList.find((item: any) => item.id === id)
  checkoutDashboard(cur)
}
async function checkoutDashboard(detail: any) {
  state.loading = true
  state.curDashboard = deepCopy(detail)
  let dashboardDetail: any
  if (detail.id === 'PERSONAL') {
    dashboardDetail = await clientApi.api.getPersonalLanding().then((res: any) => res.data)
  } else {
    dashboardDetail = await clientApi.api.getPersonalLandingDashboardId(detail.id).then((res: any) => res.data)
  }
  try {
    const styleJson = JSON.parse(dashboardDetail.styleJson)
    state.curDashboard.layout = Array.isArray(styleJson) ? styleJson : []
  } catch (error) {
    state.curDashboard.layout = []
  }
  setTimeout(() => {
    state.loading = false
  })
}
onMounted(async () => {
  getDashboardList()
})
</script>

<style lang="scss" scoped>
.template-container {
  display: grid;
  grid-template-rows: min-content 1fr;
  gap: var(--app-space-xs);
  overflow-y: hidden !important;
  height: 100%;

  &--main {
    overflow:auto
  }

  :deep(.el-card) {
    height: 100%;
    overflow: auto;
  }
  :deep(.splitpanes__pane) {
    box-shadow: unset !important;
  }
  &--header {
    padding: var(--app-space-s);
    text-align: left;
    line-height: 30px;
    &__title {
      height: 100%;
      line-height: 30px;
      title {
        display: flex;
        align-items: center;
        text-align: left;
      }
      svg {
        width: 1rem;
        height: 1rem;
      }
    }
  }
}

.el-dropdown-link {
  cursor: pointer;
  font-size: 1.2rem;
}
</style>
