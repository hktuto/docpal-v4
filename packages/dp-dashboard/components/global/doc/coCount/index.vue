<template>
  <el-card
    class="dashboard-item dashboard-item-main"
    :style="`--setting-color:${setting.color}`"
  >
    <template #header="{ close, titleId, titleClass }">
      <h4>
        {{ $t(setting.documentType) }}
        <DashboardUserFilter
          class="el-icon--right"
          :user="state.filterUser"
          :show="setting.showUserFilter"
          @refreshSetting="handleFilterUser"
        ></DashboardUserFilter>
      </h4>
      <SvgIcon
        v-if="!hideSetting"
        src="/icons/setting.svg"
        style="--icon-size: 1.14rem; --icon-color: #8796a4"
        @click="openSetting"
      />
    </template>
    <div class="trendContainer">
      <DocCoCountFileCount
        v-if="setting.showCount"
        ref="DocCoCountCountRef"
        :dates="dates"
        :documentType="setting.documentType"
        :user="state.filterUser"
      />
      <DocCoCountSize
        v-if="setting.showSize"
        ref="DocCoCountSizeRef"
        :dates="dates"
        :documentType="setting.documentType"
        :user="state.filterUser"
      />
    </div>
    <el-button
      v-if="state.drillDownFlag"
      :loading="state.drillDownBackLoading"
      @click="handleDrillDownBack"
      text
      >{{ $t("dpButtom_back") }}</el-button
    >
    <div class="metaContainer" style="--trend-columns: 1fr 1fr 1fr 1fr">
      <DocCoCountMeta
        v-for="item in setting.displayList"
        :ref="
          (el) => {
            displayListRef[item.meta] = el;
          }
        "
        :documentType="setting.documentType"
        :user="setting.user"
        :meta="item.meta"
        :data="metaData[`group_${item.meta}`]"
        @drillDown="handleDrillDown"
      />
    </div>
    <DocCoCountDialog ref="settingRef" @delete="handleDelete" @refresh="handleRefresh" />
  </el-card>
</template>

<script lang="ts" setup>
import { ArrowDown } from "@element-plus/icons-vue";
import { publicApi } from "api";
import { watchDebounced } from "@vueuse/core";

const props = withDefaults(
  defineProps<{
    dates?: any;
    setting?: any;
    hideSetting?: boolean;
  }>(),
  {
    setting: {},
    hideSetting: false,
  }
);
const emits = defineEmits(["refreshSetting", "delete"]);
const metaData = ref({});
const state = reactive({
  drillDownBackLoading: false,
  drillDownFlag: false,
  drillDownParams: {},
  filterUser: "",
});

const DocCoCountCountRef = ref();
const DocCoCountSizeRef = ref();
const displayListRef = ref({});
function resize() {
  DocCoCountCountRef.value.resize();
  DocCoCountSizeRef.value.resize();
  Object.keys(displayListRef.value).forEach((key) => {
    const item = displayListRef.value[key];
    if (item) item.resize();
  });
}
const settingRef = ref();
function openSetting() {
  settingRef.value.handleOpen(props.setting);
}
function handleFilterUser(user) {
  state.filterUser = user;
  getMetaData();
}
const GetCoCountMetaApi = async (params: any) => {
  if (params.creator)
    return await publicApi.api
      .postDashboardNewfilesofspecifyusermetabydtypebyrange(params)
      .then((res) => res.data);
  return await publicApi.api
    .postDashboardNewfilesofusersmetabydtypebyrange(params)
    .then((res) => res.data);
};
const GetCoCountMetaFilterApi = async (params: any) => {
  if (params.creator)
    return await publicApi.api
      .postDashboardNewfilesofspecifyuserbydtypebyrangefiltermatedata(params)
      .then((res) => res.data);
  return await publicApi.api
    .postDashboardNewfilesofuserbydtypebyrangefiltermatedata(params)
    .then((res) => res.data);
};
async function getMetaData() {
  const params: any = {
    groupByMetadatas: props.setting.displayList.map((item) => item.meta),
    primaryType: props.setting.documentType,
    creator: state.filterUser,
  };
  if (props.dates) {
    params.isQueryList = true;
    params.dateRange = {
      from: props.dates[0],
      to: props.dates[1],
    };
  }
  try {
    metaData.value = await GetCoCountMetaApi(params);
  } catch (error) {}
}
async function handleDrillDownBack() {
  state.drillDownParams = {};
  state.drillDownBackLoading = true;
  try {
    await getMetaData();
    state.drillDownFlag = false;
  } catch (error) {}
  state.drillDownBackLoading = false;
}
async function handleDrillDown(metaParams) {
  state.drillDownParams[metaParams.meta] = metaParams.key;
  try {
    const params: any = {
      filterByMetaDatas: state.drillDownParams,
      creator: state.filterUser,
      primaryType: props.setting.documentType,
      groupByMetadatas: props.setting.displayList.map((item) => item.meta),
    };
    if (props.dates) {
      params.isQueryList = true;
      params.dateRange = {
        from: props.dates[0],
        to: props.dates[1],
      };
    }
    metaData.value = await GetCoCountMetaFilterApi(params);
    state.drillDownFlag = true;
  } catch (error) {}
}
function handleDelete() {
  emits("delete");
}
function handleRefresh(chartSetting) {
  emits("refreshSetting", chartSetting);
}
watchDebounced(
  () => [props.setting, props.dates],
  (newValue, oldValue) => {
    if (!props.setting) return;
    if (!oldValue || JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
      getMetaData();
      state.filterUser = newValue[0].user;
    }
  },
  { debounce: 200, maxWait: 500, immediate: true }
);
defineExpose({
  resize,
});
</script>

<style lang="scss" scoped>
.dashboard-item-main {
  display: grid;
  grid-template-rows: min-content 1fr;
  overflow: hidden;
  background-color: var(--setting-color, #fff);
}
.dashboard-item-main :deep(.el-card__body) {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.dashboard-item-main :deep(.el-card__header) {
  display: flex;
  justify-content: space-between;
  border-bottom: unset;
  padding: var(--app-space-xs) var(--app-space-xs) 0;
  h4 {
    padding: unset;
    margin: unset;
    color: #464646;
    font-size: 18px;
    font-family: Arial;
  }
}
.trendContainer {
  display: flex;
  flex-flow: row wrap;
  container-type: inline-size;
}
.metaContainer {
  display: flex;
  flex-flow: row wrap;
  container-type: inline-size;
}
@container (min-width: 640px) {
  .co-count {
    flex: 1 0 50%;
    max-width: 50%;
  }
  .co-count-meta {
    flex: 1 0 25%;
    max-width: 25%;
  }
}
:deep(.co-count-chart) {
  width: 100%;
  height: 100%;
  min-height: 250px;
}
</style>
