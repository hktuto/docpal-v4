<template>
  <div
    class="detail-container"
    v-loading="state.loading"
    :class="{ 'not-root': !isRoot }"
  >
    <div style="overflow: auto; padding: 0 var(--app-space-xs)">
      <div class="flex-x-start">
        <BrowseItemIcon
          class="file-icon el-icon--left"
          :type="state.setting.folder ? 'folder' : 'file'"
        />
        {{ state.setting.label }}
      </div>
      <FormRenderer
        ref="FormRendererRef"
        :form-json="formJson"
        @docTypeChange="handleDocTypeChange"
      >
      </FormRenderer>
      <div style="padding: 0 var(--app-space-xs)">
        <el-divider v-if="isRoot" />

        <el-form label-position="top" ref="FormRef" :model="form">
          <el-form-item
            prop="labelRule"
            class="intro"
            :rules="[{ required: true, message: $t('form_common_requird') }]"
          >
            <template #label>
              {{ $t("tableHeader_labelRule") }}
              <!-- <span
                v-if="state.curDocType"
                class="color__primary__hover cursorPointer"
                @click="goMetaEdit"
                >({{ $t("tip.clickToEditDisplayMeta") }})</span
              > -->
            </template>
            <DragSelect
              :dragList="state.dragList"
              :dropList="form.labelRule"
              itemKey="metadata"
              nullTip="tip.pleaseGoToConfigDisplayMetaOrSelectDocumentType"
            />
          </el-form-item>
        </el-form>
        <el-divider />
        <h3>{{ $t("folderCabinet.defaultMetadataValue") }}</h3>
        <MasterTableVariableForm
          ref="FormVariablesRendererRef"
          :ignoreList="ignoreList"
        />

        <el-divider />
        <template v-if="state.setting.folder">
          <h3>{{ $t("allow") }}</h3>
          <el-switch
            v-model="form.allow"
            class="mb-2"
            active-text="Yes"
            inactive-text="No"
          />
          <div>{{ $t("folderCabinet.allowFilesTip") }}</div>
        </template>
        <template v-else>
          <el-row :gutter="20">
            <el-col :span="12"
              ><div class="grid-content ep-bg-purple" />
              <h3>{{ $t("folderCabinet.multiple") }}</h3>
              <el-switch
                v-model="form.multiple"
                class="mb-2"
                active-text="Yes"
                inactive-text="No"
              />
              <div>{{ $t("folderCabinet.multipleTip") }}</div>
            </el-col>
            <el-col :span="12"
              ><div class="grid-content ep-bg-purple" />
              <h3>{{ $t("folderCabinet.repeatName") }}</h3>
              <el-switch
                v-model="form.repeatName"
                class="mb-2"
                active-text="Yes"
                inactive-text="No"
              />
              <div>{{ $t("folderCabinet.repeatNameTip") }}</div>
            </el-col>
          </el-row>
        </template>

        <el-divider style="margin-bottom: 5px" />
        <FolderCabinetSettingPermission
          :id="state.setting.id"
          :tableData="state.acls"
          @refresh="emits('update')"
        />
      </div>
    </div>
    <div style="padding: var(--app-space-xs); text-align: right">
      <el-button type="info" @click="handleDelete"> {{ $t("common_delete") }} </el-button>
      <el-button type="primary" @click="handleSave"> {{ $t("button.save") }} </el-button>
    </div>
    <FolderCabinetSettingWorkflowDialog ref="WorkflowDialogRef" :id="state.setting.id" />
  </div>
</template>
<script lang="ts" setup>
import { adminApi } from "api";
import { ElMessage, ElMessageBox } from "element-plus";
import formJson from "./detail.vform.json";
import { routeFolderCabinetPage } from "~/utils/routerHelper";
const routerProvider = inject(MenuRouterKey);
if (!routerProvider) {
  throw new Error("MenuRouterKey is not provided");
}
const props = defineProps(["data", "isRoot", "id"]);
const emits = defineEmits(["update"]);
const { t } = useI18n();
const FormRendererRef = ref();
const state = reactive<any>({
  loading: false,
  setting: {},
  curDocType: "",
  dragList: [],
  defaultValue: {},
  acls: [],
});
// #region module:
const form = reactive({
  labelRule: [{ metadata: "fc:docTitle", dataType: "string", noDelete: true }],
  allow: false,
  multiple: false,
  repeatName: false,
});
const FormRef = ref();
const FormVariablesRendererRef = ref();
function handleDocTypeChange(data) {
  // if (state.editReady) form.labelRule = []
  state.curDocType = data.value;
  state.dragList = data.metaList.reduce((prev, item) => {
    if (item.metaDataType === "string" || item.metaDataType === "date") {
      if (item.dataType === "select") {
        const options = JSON.parse(item.options);
        if (options.multiple) {
          return prev;
        }
      }
      prev.push({
        name: item.metadata,
        metadata: item.metadata || item.metaData,
        dataType: item.metaDataType,
      });
    }
    return prev;
  }, []);

  state.dragList.push(
    { name: "fc:label", metadata: "fc:label", dataType: "string" },
    { name: "fc:createDate", metadata: "fc:createDate", dataType: "date" },
    { name: "fc:creator", metadata: "fc:creator", dataType: "string" },
    { name: "fc:docTitle", metadata: "fc:docTitle", dataType: "string" }
  );
  if (form.labelRule.length > 0) {
    state.dragList = state.dragList.filter((allItem: any) =>
      !form.labelRule.some((exitItem: any) => exitItem.metadata === allItem.metadata || exitItem.metaData === allItem.metadata)
    );
  }
  FormVariablesRendererRef.value.init(
    data.metaList.reduce((prev, item) => {
      prev.push({
        id: item.metadata,
        name: item.metadata,
        label: item.metadata,
        metadata: item.metadata || item.metaData,
        required: item.isRequire,
        dataType: item.metaDataType,
        // vocabulary: ,
        // masterTable,
        // displayField,
        // documentType
      });
      return prev;
    }, []),
    state.defaultValue
  );
}
function getReminder(data, revertList) {
  return revertList.reduce((prev, item) => {
    if (data[item]?.intervalTime) prev[`${item}.intervalTime`] = data[item].intervalTime;
    if (data[item]?.tos) prev[`${item}.tos`] = data[item].tos;
    if (data[item]?.ccs) prev[`${item}.ccs`] = data[item].ccs;
    return prev;
  }, {});
}
// #endregion
function init(row) {
  state.setting = row;
  state.loading = true;
  setTimeout(() => {
    state.acls = [];
    const _row = {
      metadata: [],
    };
    form.allow = row.allow;
    form.multiple = row.multiple || false;
    form.repeatName = row.repeatName || false;
    if (row.labelRule) {
      const labelRule = JSON.parse(row.labelRule)
        console.log("labelRule", labelRule);
      labelRule.forEach((item: any) => item.metadata = item.metaData);
      form.labelRule = labelRule
    } else {
      form.labelRule = [];
    }
    if (row.metadata) {
      _row.metadata = row.metadata.map((item) => item.name);
    }
    if (row.acls) state.acls = row.acls;
    if (row.metadataValue) state.defaultValue = JSON.parse(row.metadataValue);
    else state.defaultValue = {};
    FormRendererRef.value.vFormRenderRef.setFormData({
      ...row,
      ..._row,
      ...getReminder(row, ["notificationReminder", "emailReminder", "emailReport"]),
      showNotification: props.isRoot,
    });
    state.loading = false;
  });
}

const WorkflowDialogRef = ref();
async function handleSave() {
  const valid = await FormRef.value.validate();
  const data = await FormRendererRef.value.vFormRenderRef.getFormData();
  if (!valid || !data) return;
  const params = {
    ...data,
    allow: form.allow,
    multiple: form.multiple,
    repeatName: form.repeatName,
    labelRule: JSON.stringify(form.labelRule),
    id: state.setting.id,
    // folder: true
    folder: state.setting.folder,
  };
  if (props.isRoot) {
    const arr = ["notificationReminder", "emailReminder", "emailReport"];
    arr.forEach((key) => {
      params[key] = {};
      params[key].intervalTime = params[`${key}.intervalTime`];

      if (params[`${key}.tos`]) params[key].tos = params[`${key}.tos`];
      if (params[`${key}.ccs`]) params[key].ccs = params[`${key}.ccs`];
      delete params[`${key}.intervalTime`];
      delete params[`${key}.tos`];
      delete params[`${key}.ccs`];
    });
  }
  if (params.metadata && params.metadata.length > 0) {
    const metaRef = FormRendererRef.value.vFormRenderRef.getWidgetRef("metadata");
    const options = metaRef.getOptionItems();
    params.metadata = params.metadata.reduce((prev, key) => {
      const item = options.find((t) => t.value === key);
      prev.push({
        type: item.dataType,
        name: key,
      });
      return prev;
    }, []);
  }
  const metadataDefault = await FormVariablesRendererRef.value.getData(false);
  if (metadataDefault) params.metadataValue = JSON.stringify(metadataDefault);

  try {
    state.loading = true;
    await adminApi.api.patchCabinetTemplate(params);
    ElMessage.success(t("dpMsg_success"));
    emits("update");
    WorkflowDialogRef.value.handleCheck();
  } catch (error) {
  } finally {
    setTimeout(() => (state.loading = false), 300);
  }
}
async function handleDelete() {
  const action = await ElMessageBox.confirm(t("folderCabinet.deleteTip"));
  if (action !== "confirm") throw new Error("cancel");
  await adminApi.api.deleteCabinetId(state.setting.id);
  if (props.isRoot) {
    routerProvider?.navigateTo(routeFolderCabinetPage(), false);
  } else {
    emits("update");
  }
}
// function goMetaEdit () {
//   let r = '/documentType'
//   if (state.curDocType) r += `/${state.curDocType}`
//   const url = router.resolve(r)
//   window.open(url.href, '_blank');
// }
defineExpose({ init });
</script>
<style lang="scss" scoped>
.detail-container {
  display: grid;
  grid-template-rows: 1fr min-content;
  overflow: hidden;
}
.formContainer {
  min-height: unset;
}
:deep .el-form-item__content {
  width: 100%;
  & > div {
    width: 100%;
  }
}
</style>
<style lang="scss">
.not-root .notification-container {
  display: none;
}
</style>
