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

async function getJsonConfig() {
  state.visible = true;

  try {
    const json = editor.value.getJSON()
    editor.value.getOptions()
    navigator.clipboard.writeText(json)
  } catch (e) {
    console.log(e);
  }
}

</script>

<template>
  <ElButton @click="getJsonConfig">Export</ElButton>
  <el-dialog v-model="state.visible" :title="t('Export')">
    <FormRenderer ref="FormRendererRef" :form-json="formJson" />
  </el-dialog>
</template>
