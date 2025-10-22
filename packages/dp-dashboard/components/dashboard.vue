<template>
  <div class="template-container">
    <template v-if="!currentHome">
      loading...
    </template>
    <template v-else>
    <div class="template-container--header">
      <span class="template-container--header__title">{{ currentHome.name }}</span>

      <template v-if="!state.editMode && currentHome.name === 'PERSONAL'">
        <el-button id="Dashboard__Home__Edit" @click="handleEdit" type="primary" :icon="Edit" circle />
      </template>
      <template v-else-if="state.editMode">
        <el-dropdown id="Dashboard__Home__Add" trigger="click" @command="handleAdd">
          <el-button type="primary" :icon="Plus" circle />
          <template #dropdown>
            <el-dropdown-menu>
              <template v-for="(item, key) in dashboardWidgetSetting" :key="key">
                <el-dropdown-item
                  v-if="(!item.feature || checkLicenseFeatures(item.feature)) && item.type === 'personal'"
                  :command="key">
                  {{ $t(`dashboard.${item.label}`) }}
                </el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <!-- <el-button @click="handleClear">handleClear</el-button> -->
        <el-button id="Dashboard__Home__Finish" class="el-icon--right" type="primary" @click="handleFinish">
          {{ $t('dpButtom_finish') }}
        </el-button>
      </template>
    </div>
    <DashboardDetail class="template-container--main"
                     v-if="currentHome && currentHome.layout"
                     ref="DashboardDetailRef"
                     :id="currentHome.id"
                     v-model:layout="currentHome.layout"
                     :dates="state.dates"
                     :hideSetting="!state.editMode"
                     :resizable="state.editMode"
                     :draggable="state.editMode"
                     :editMode="state.editMode"
                     @delete="handleDelete"
                     @refreshSetting="handleRefresh"
    ></DashboardDetail>
    </template>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { allowFeature } from '#imports'

import { Plus, Edit } from '@element-plus/icons-vue'

import { clientApi } from 'api'

import { getNormalizeSetting, dashboardWidgetSetting, getWidgetSetting } from '../utils/dashboardWidgetHelper'
import type { DashboardWidget, DashboardWidgetSetting } from '../utils/dashboardWidgetHelper'
import { onMounted, onUnmounted } from 'vue'

const routerProvider = inject(MenuRouterKey)

const { currentHome, loading, getHomeList } = useHomePage()

const state = reactive<any>({
  editMode: false,
  loading: false,
  dates: [dayjs().startOf('year').format('YYYY-MM-DD'), formatDate(new Date(), 'YYYY-MM-DD')],
  editCount: 0
})

function handleAdd(command: DashboardWidget) {
  state.editCount++
  state.editMode = false
  const item = getWidgetSetting(command)
  currentHome.value.layout.push({
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
  const index = currentHome.value.layout.findIndex((item) => item.i === layoutSetting.i)
  currentHome.value.layout[index] = deepCopy(layoutSetting)
}

function handleDelete(i: any) {
  state.editCount++
  const index = currentHome.value.layout.findIndex((item) => item.i === i)
  currentHome.value.layout.splice(index, 1)
}

function handleFinish() {
  state.editMode = false
  handleSave()
}

async function handleSave() {
  try {
    loading.value = true
    await clientApi.api.putPersonalLandingSave({
      styleJson: JSON.stringify(currentHome.value.layout)
    })
  } catch (error) {
    console.log("error", error)
  } finally {
    loading.value = false
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

onMounted(async () => {

  routerProvider?.refeshActions.value.push(getHomeList(true))
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
    overflow: auto
  }

  :deep(.splitpanes__pane) {
    box-shadow: unset !important;
  }

  &--header {
    padding: var(--app-space-s);
    text-align: left;
    line-height: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: var(--app-space-s);
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
