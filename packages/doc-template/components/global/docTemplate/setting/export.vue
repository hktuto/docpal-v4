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


async function exportHTML(){
  const json = getJsonConfig();
  const res = await fetch('/jsonToHtml', {
     method:"POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      json
    })
  }).then( res => res.text())
  const blob = await fetch('/htmlToDocx',{
    method:"POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      html: res
    })
  }).then( res => res.blob())
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'test.docx'
  document.body.appendChild(link)
  link.click()
  link.remove()
}

function openDialog() {
  
  const json = getJsonConfig();
  const textContent = JSON.stringify(json)
  state.visible = true;
  state.loading = true;
  navigator.clipboard.writeText(textContent);
  nextTick(async () => {
    await FormRendererRef.value.vFormRenderRef.setFormData({ textContent, isExport: true });
    state.loading = false;
  });
}

 function getJsonConfig() {
  
  const data = {
    options: "",
    content: ""
  };
  data.options = options.value;
  data.content = editor.value.getJSON();
  return data
}

</script>

<template>
  <ElButton @click="openDialog">Export</ElButton>
  <ElButton @click="exportHTML">Export html</ElButton>
  <el-dialog v-model="state.visible" :title="t('Export')">
    <FormRenderer ref="FormRendererRef" v-loading="state.loading" :form-json="formJson" />
  </el-dialog>
</template>
