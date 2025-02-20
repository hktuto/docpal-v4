<template>
  <div class="template-container">
    <DashboardDetail
      ref="DashboardDetailRef"
      v-model:layout="state.layout"
      :dates="state.dates"
      :hideSetting="!state.editMode"
      :resizable="state.editMode"
      :draggable="state.editMode"
      :editMode="state.editMode"
      @delete="handleDelete"
      @refreshSetting="handleRefresh"
    ></DashboardDetail>
    <el-affix position="bottom" :offset="20" style="text-align: right; width: 100%">
      <el-button
        v-if="!state.editMode"
        @click="state.editMode = true"
        type="primary"
        :icon="Edit"
        circle
      />
      <template v-else>
        <el-dropdown trigger="click" @command="handleAdd">
          <el-button type="primary" :icon="Plus" circle />
          <template #dropdown>
            <el-dropdown-menu>
              <template v-for="(item, key) in dashboardWidgetSetting" :key="key">
                <el-dropdown-item
                  v-if="
                    (!item.feature || allowFeature(item.feature)) &&
                    (item.type === 'personal' || !item.type)
                  "
                  :command="key"
                >
                  {{ $t(`dashboard.${item.label}`) }}
                </el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button @click="handleClear">handleClear</el-button>
        <el-button class="el-icon--right" type="primary" @click="handleFinish">{{
          $t("dpButtom_finish")
        }}</el-button>
      </template>
    </el-affix>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { Plus, Edit } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import { clientApi } from "api";

import { allowFeature } from "#imports";
import {
  getNormalizeSetting,
  dashboardWidgetSetting,
  getWidgetSetting,
} from "../utils/dashboardWidgetHelper";
import type {
  DashboardWidget,
  DashboardWidgetSetting,
} from "../utils/dashboardWidgetHelper";
const dateFormat = useDisplayTimeFormat().value;
const state = reactive({
  editMode: false,
  loading: false,
  info: {
    name: "",
  } as any,
  layout: [] as DashboardWidgetSetting[],
  dates: [
    dayjs().startOf("year").format("YYYY-MM-DD"),
    formatDate(new Date(), "YYYY-MM-DD"),
  ],
});
function handleAdd(command: DashboardWidget) {
  state.editMode = false;
  const item = getWidgetSetting(command);
  state.layout.push({
    x: (state.layout.length * 2) % 4,
    y: state.layout.length + 4, // puts it at the bottom
    i: new Date().valueOf().toString(),
    ...item,
  });

  // 新增dashboard需要 在setTimeout后 重新設置才可以拖拽
  setTimeout(() => {
    state.editMode = true;
  });
}
async function getInfo() {
  state.info = await clientApi.api.getPersonalLanding().then((res) => res.data);
  if (!state.info || !state.info.styleJson) return;
  let temLayout = [];
  try {
    temLayout = JSON.parse(state.info.styleJson);
  } catch (error) {
  } finally {
    state.layout = temLayout;
  }
}
function handleRefresh(layoutSetting: any) {
  const index = state.layout.findIndex((item) => item.i === layoutSetting.i);
  state.layout[index] = deepCopy(layoutSetting);
}
function handleDelete(i) {
  const index = state.layout.findIndex((item) => item.i === i);
  state.layout.splice(index, 1);
}
function handleFinish() {
  state.editMode = false;
  handleSave();
}
async function handleSave() {
  try {
    state.loading = true;
    await clientApi.api.putPersonalLandingSave({
      styleJson: JSON.stringify(state.layout),
    });
  } catch (error) {
  } finally {
    state.loading = false;
  }
}
async function handleClear() {
  try {
    state.loading = true;
    await clientApi.api.putPersonalLandingSave({
      styleJson: "",
    });
  } catch (error) {
  } finally {
    state.loading = false;
  }
}
onMounted(async () => {
  getInfo();
});
</script>

<style lang="scss" scoped>
.template-container {
  display: grid;
  grid-template-rows: 1fr min-content;
  gap: var(--app-padding);
  overflow-y: auto !important;
  height: 100%;
  .vue-grid-layout {
    min-height: 80vh;
  }
}
:deep .tableHeader {
  margin-bottom: unset;
}
</style>
