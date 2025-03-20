<template>
  <el-card ref="cardRef" class="dashboard-item dashboard-item-card">
    <template #header="{ close, titleId, titleClass }">
      <h4>{{ $t("dashboard.PersonalCaseCreate") }}</h4>
      <div v-if="!hideSetting" class="flex-x-between">
        <SvgIcon
          src="/icons/setting.svg"
          class="el-icon--right"
          style="--icon-size: 1.14rem; --icon-color: #8796a4"
          @click="openSetting"
        />
      </div>
    </template>
    <div class="workflow-create-content">
      <el-button
        v-for="item in state.caseList"
        type="primary"
        :key="item.id"
        @click="handleClick(item)"
      >
        {{ item.name }}
      </el-button
      >
    </div>
    <PersonalCaseCreateDialog
      ref="settingRef"
      @delete="handleDelete"
      @refresh="handleRefresh"
    />
    <!-- <CaseNewDialog ref="dialogRef" @refresh="handleNewCase"/> -->
  </el-card>
</template>
<script lang="ts" setup>
import {clientApi} from "api";

const emits = defineEmits(["delete", "refreshSetting"]);

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
const state = reactive<any>({
  caseList: [],
});

async function handleDelete() {
  emits("delete");
}

const settingRef = ref();

function openSetting() {
  settingRef.value.handleOpen({
    caseList: state.caseList,
    caseKeys: props.setting.caseKeys,
  });
}

const dialogRef = ref();

function handleClick(item: any) {
  console.log(22, state.caseList)
  // dialogRef.value.handleOpen(item)
}

function handleNewCase() {
}

function handleRefresh(chartSetting, caseList) {
  console.log({caseList});

  state.caseList = caseList;
  emits("refreshSetting", chartSetting);
}

async function getList() {
  try {
    const res = await clientApi.api.postCaseTypesPage({}).then((res) => res.data);
    console.log({res});
    return res?.entryList;
  } catch (error) {
    return [];
  }
}

async function getCaseList() {
  if (props.setting.caseKeys && props.setting.caseKeys.length > 0) {
    const list = await getList();
    state.caseList = props.setting.caseKeys.reduce((prev, id: any) => {
      const caseItem = list?.find((cases: any) => cases.id === id);
      prev.push({...caseItem});
      return prev;
    }, []);
  }
}

watch(
  () => props.setting.caseKeys,
  () => {
    getCaseList();
  },
  {
    immediate: true,
  }
);

function resize() {
}

defineExpose({
  resize,
});
</script>
<style lang="scss" scoped>
.workflow-create-content {
  .el-button {
    width: 100%;
    margin: 0;
    margin-bottom: var(--app-space-xs);
  }
}
</style>
