<script lang="ts" setup>
import { DocTemplateProveKey } from "~/utils/docTempalteHelper";
import formJson from "./docJson.json";

const { editor, options, initEditor } = inject(DocTemplateProveKey);
const { t } = useI18n();

const state = reactive({
  loading: false,
  visible: false,
  textContent: ""
});

const FormRendererRef = ref();

async function getJsonConfig() {
  state.visible = true;
  state.loading = true;
  const data = {
    options: "",
    content: ""
  };
  try {
    data.options = options.value;
    data.content = editor.value.getJSON();
    const textContent = JSON.stringify(data);
    setTimeout(async () => {
      await FormRendererRef.value.vFormRenderRef.setFormData({ textContent: textContent, isExport: true });
      state.loading = false;
    });
    navigator.clipboard.writeText(textContent);
  } catch (e) {
    console.log(e);
  }
}

</script>

<template>
  <ElButton @click="getJsonConfig">Export</ElButton>
  <el-dialog v-model="state.visible" :title="t('Export')">
    <FormRenderer ref="FormRendererRef" v-loading="state.loading" :form-json="formJson" />
  </el-dialog>
</template>
