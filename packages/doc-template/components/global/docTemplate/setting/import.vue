<script lang="ts" setup>
import { DocTemplateProveKey } from "~/utils/docTempalteHelper";
import formJson from "./docJson.json";

const { editor, editorOptions } = inject(DocTemplateProveKey);
const { t } = useI18n();

const state = reactive({
  loading: false,
  visible: false,
  textContent: ""
});

const FormRendererRef = ref();

async function handleSubmit() {
  try {
    const data = await FormRendererRef.value.vFormRenderRef.getFormData();
    const json = JSON.parse(data.textContent);
    setOptionsFoJson(json.Options);
    setContentFoJson(json.Content);
    state.visible = false;
  } catch (e) {
    console.log(e);
  }
}

function setOptionsFoJson(json) {
  console.log(22, editor.value);
  try {
    editor.value.setOptions(json);
  } catch (e) {
    console.log("set options is error", e);
  }
}

function setContentFoJson(json) {
  try {
    editor.value.commands.setContent(json);
  } catch (e) {
    console.log("set content is error", e);
  }
}

function setContentFoHtml(html: string) {
  try {
    editor.value.commands.setContent(html);
  } catch (e) {
    console.log("html parse is error", e);
  }
}

</script>

<template>
  <ElButton @click="state.visible = true">Import</ElButton>

  <el-dialog v-model="state.visible" :title="t('Import')">
    <FormRenderer ref="FormRendererRef" :form-json="formJson" />
    <template #footer>
      <el-button type="primary" :loading="state.loading" @click="handleSubmit">
        {{ $t("common_submit") }}
      </el-button>
    </template>
  </el-dialog>
</template>
