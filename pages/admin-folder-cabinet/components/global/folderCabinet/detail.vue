<script lang="ts" setup>
import { Loading } from "@element-plus/icons-vue";
import { ElMessageBox, ElNotification } from 'element-plus';
import { adminApi } from 'api'
import { onActivated } from "vue";
const { t } = useI18n()
const { id } = defineProps<{
  id: string;
}>();
const state = reactive({
  loading: false,
  setting: {},
  currentRow: {}
});
async function getData() {
  state.loading = true;
  try {
    state.setting = await adminApi.api.getCabinetTemplateId(id).then(res => res.data);
    state.setting.folder = true
  } catch (error) {}
  finally {
    state.loading = false;
  }
}
const detailRef = ref()
function handleCurrentChange(row, node) {
  state.currentRow = row
  detailRef.value.init(row)
}
const FolderCabinetAddChildDialogRef = ref()
function handleAddChild(data, isFolder) {
  FolderCabinetAddChildDialogRef.value.handleOpen(data, data.children, isFolder);
}
async function handleDeleteChild(setting) {
  const action = await ElMessageBox.confirm(`${t('msg_confirmWhetherToDelete')}`)
  if(action !== 'confirm') return
    const noti = ElNotification({
      title: t("delete"),
      icon: Loading,
      dangerouslyUseHTMLString: true,
      message: `<div title="${setting.label}">${setting.label}</div>`,
      showClose: true,
      customClass: "loading-notification",
      duration: 0,
      position: "bottom-right",
    });
    const response = await adminApi.api.deleteCabinetId(setting.id);
    await getData();
    noti.close();
    ElNotification({
      title: "Success",
      message: "Item deleted",
      type: "success",
      duration: 2000,
    });
}
const FolderCabinetAddDialogRef = ref();
function handleEdit(setting: any, isRoot: boolean = false, parentSettingChildren) {
  const _setting = deepCopy(setting);
  _setting.isEdit = true;
  if (!!isRoot) {
    FolderCabinetAddDialogRef.value.handleOpen(_setting);
  } else {
    FolderCabinetAddChildDialogRef.value.handleOpen(
      _setting,
      parentSettingChildren,
      _setting.folder
    );
  }
}
provide("handleEdit", handleEdit);
provide("handleAddChild", handleAddChild);
provide("handleDeleteChild", handleDeleteChild);
onActivated(() => {
  getData();
});
</script>
<template>
  <div class="pageContainer--padding main">
    <FolderCabinetSettingTree
      v-if="state.setting"
      :data="state.setting" :id="state.currentRow.id"
      @current-change="handleCurrentChange"
    />
    <FolderCabinetSettingDetail ref="detailRef" :data="state.currentRow" :isRoot="state.currentRow.id === id"
    @update="getData"
  />
  <FolderCabinetSettingAddChildDialog ref="FolderCabinetAddChildDialogRef" @update="getData" />
  <!-- <FolderCabinetSettingAddDialog ref="FolderCabinetAddDialogRef" @update="getData" /> -->
  </div>
</template>
<style lang="scss" scoped>
.main {
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: var(--app-space-s);
}
.FolderCabinetCard {
  height: 100%;
  background-color: #f1f1f1;
  overflow: auto;
}
.doc-container {
  display: grid;
  grid-template-columns: min-content 1fr;
}
</style>
