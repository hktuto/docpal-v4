<script lang="ts" setup>
import { clientApi, adminApi } from "api";
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
const caseDetail = ref<any>();
const home = ref({ secondId: "/", disabled: true });
const idOrPath = ref("/");
const homeId = ref("");
function changeRoute(path: string) {
  idOrPath.value = path;
}
const caseProvider: any = inject(CaseManagementDashboardKey);
async function getCDBasciInfo() {
  let caseData: any = {};
  try {
    if (caseData?.fields?.length > 0) return caseData;
    const id = caseProvider.instanceId?.value || null;
    const caseVersionId = caseProvider.caseVersionId?.value || null;
    if (id) {
      const { data } = await clientApi.api.getCaseDashboardInstanceCaseidPrimaryformData(
        id
      );
      caseData = data;
    } else if (caseVersionId) {
      const { data } = await adminApi.api.getCaseDashboardVersionVersionidPrimaryform(
        caseVersionId
      );
      caseData = data;
    } else {
      caseData = {
        fields: [],
        rows: [],
      };
    }
  } catch (error) {
    console.log(error);
    caseData = {
      fields: [],
      rows: [],
    };
  } finally {
    return caseData;
  }
}
async function getHomeId() {
  caseDetail.value = await getCDBasciInfo();
  if (caseDetail.value.rows) {
    const _item = caseDetail.value.rows.find((d: any) => d.id === props.setting.home)
    if(!!_item && _item.value) {
      homeId.value = _item.value
      home.value.secondId = _item.value
    }
  }
}
// #region module: setting
const settingRef = ref();
function openSetting() {
  settingRef.value.handleOpen(props.setting, caseDetail.value?.fields);
}
function handleDelete() {
  emits("delete");
}
function handleRefresh(chartSetting: any) {
  emits("refreshSetting", chartSetting);
}
// #endregion
onMounted(() => {
  getHomeId();
});
provide(BrowseListProviderKey, {
  getchildApi: (pageParams: any) => {
    return clientApi.api.postNuxeoDocumentChildrenThumbnailV2(pageParams);
  },
  idOrPath,
  changeRoute,
});
</script>

<template>
  <ElCard class="o-auto">
    <h3>{{ $t("dashboard.cmmnDocumentRoot") }}</h3>
    <SvgIcon
      v-if="!hideSetting"
      class="setting--icon"
      src="/icons/setting.svg"
      @click="openSetting"
    />
    <div v-if="homeId" class="rootContainer">
      <BrowseMiniTable ref="tableRef" :home="props.setting.home">
        <template #toolbar_buttons>
          <BrowseBreadcrumb :idOrPath="homeId" :home="home" />
        </template>
      </BrowseMiniTable>
    </div>
    <div v-else-if="setting?.home"> <el-skeleton :rows="5"  /> </div>
    <div v-else>{{ $t('el.table.emptyText') }} </div>
    <DashboardDocumentRootSetting
      ref="settingRef"
      @delete="handleDelete"
      @refresh="handleRefresh"
    ></DashboardDocumentRootSetting>
  </ElCard>
</template>
<style lang="scss" scoped>
h3 {
  margin-bottom: var(--app-space-xs) !important;
}
</style>
