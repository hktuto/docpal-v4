<script lang="ts" setup>
import { DocTemplateProveKey } from "~/utils/docTempalteHelper";
import formJson from "./docJson.json";

const docTempalteProvider = inject(DocTemplateProveKey);
const { t } = useI18n();
const { editor, options} = docTempalteProvider

const state = reactive({
  loading: false,
  visible: false,
  textContent: ""
});

const FormRendererRef = ref();
// TODO : the server should add to nuxtConfig runtime
const nodeBackendEndpoint = 'http://localhost:3333'
async function exportDocx(){
  const json = getJsonConfig();
  const blob = await fetch(nodeBackendEndpoint+'/convert/docx', {
     method:"POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      json
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
async function exportHTML(){
  const json = getJsonConfig();
  console.log(options)
  const res = await fetch(nodeBackendEndpoint + '/convert/html', {
     method:"POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      json
    })
  }).then( res => res.text())
  const blob = new Blob([res], { type: 'text/html' });
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'test.html'
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
  <ElButton  @click="openDialog">Export</ElButton>
  <ElButton size="small" @click="exportHTML">Export HTML</ElButton>
  <ElButton size="small" @click="exportDocx">Export Docx</ElButton>
  <el-dialog v-model="state.visible" :title="t('Export')">
    <FormRenderer ref="FormRendererRef" v-loading="state.loading" :form-json="formJson" />
  </el-dialog>
</template>
