<template>
  <el-dialog
    class="scroll-dialog"
    v-model="state.visible"
    :title="state.isEdit ? $t('folderCabinet.edit') : $t('folderCabinet.create')"
    :close-on-click-modal="false"
    destroy-on-close
    append-to-body
  >
    <FormRenderer ref="FormRendererRef" :form-json="formJson"> </FormRenderer>
    <template #footer>
      <el-button type="primary" :loading="state.loading" @click="handleSubmit">{{
        $t("common_submit")
      }}</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { adminApi } from "api";
import formJson from "./addDialog.vform.json";
const emits = defineEmits(["update"]);
const state = reactive({
  loading: false,
  visible: false,
  setting: null,
  isEdit: false,
});

const FormRendererRef = ref();
async function handleSubmit() {
  const data = await FormRendererRef.value.vFormRenderRef.getFormData();
  if (!data) return;
  const params = {
    ...data,
    binds: data.userGroups.map((value: string) => {
      const values = value.split("&&&&");
      return {
        bindId: values[1],
        type: values[0],
      };
    }),
  };
  try {
    state.loading = true;
    let response;
    if (state.isEdit) {
      params.id = state.setting.id;
      const { data: patchData } = await adminApi.api.patchCabinetTemplate({
        ...params,
        rootId: data.cabinetRoot.pop(),
      });
      response = patchData;
    } else {
      const { data: createData } = await adminApi.api.postCabinetTemplate({
        documentType: "Folder",
        ...params,
        rootId: data.cabinetRoot.pop(),
        status: "A",
      });
      response = createData;
    }
    FormRendererRef.value.vFormRenderRef.resetForm();
    state.visible = false;
    emits("update", {
      edit: state.isEdit,
      response,
    });
  } catch (error) {
    console.log(error);
  }
  state.loading = false;
}
function handleOpen(setting) {
  state.visible = true;
  state.loading = false;
  if (setting) {
    state.isEdit = true;
    state.setting = setting;
    // try {
    setTimeout(async () => {
      await FormRendererRef.value.vFormRenderRef.resetForm();
      state.loading = true;
      if (!setting.binds) setting.binds = [];
      const data = {
        ...setting,
        cabinetRoot: await getRootIds(setting.rootId),
        userGroups: setting.binds.reduce((prev: any, item: any) => {
          const value = item.type + "&&&&" + item.bindId;
          prev.push(value);
          return prev;
        }, []),
      };
      await FormRendererRef.value.vFormRenderRef.setFormData(data);
      state.loading = false;
    });
    // } catch (error) {
    //   state.loading = false;
    // }
  } else {
    state.isEdit = false;
    state.setting = {};
    setTimeout(() => {
      FormRendererRef.value.vFormRenderRef.resetForm();
    });
  }
}

async function getRootIds(idOrPath: string) {
  try {
    const data = await adminApi.api
      .postNuxeoDocumentBreadcrumb({ idOrPath })
      .then((res) => res.data);
    return data?.map((item) => item.id);
  } catch (error) {
    return [];
  }
}

defineExpose({ handleOpen });
</script>
<style lang="scss" scoped></style>
log.inf
