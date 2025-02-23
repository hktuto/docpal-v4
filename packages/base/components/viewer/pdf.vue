<script setup lang="ts">
import {useEventListener} from "@vueuse/core";
type PdfJsOptions = {
  print: boolean,
  loadAnnotations: boolean,
  readOnly: boolean
}
const props = withDefaults(defineProps<{
  blob?: Blob,
  name?:string
  annotation?: Map<string, any>,
  options : PdfJsOptions
}>(),{
  annotations: new Map(),
  options:{
    print: false,
    loadAnnotations: false,
    readOnly: true
  }
})
const iframe = ref()
const {public:{pdfReaderUrl}} = useRuntimeConfig();
const {locale} = useI18n()
const emits = defineEmits(['annotation', 'ready'])
const  ready = ref(false)
function pdfReadyHandler() {
  const frame = iframe.value?.contentWindow;
  console.log(props.blob)
  frame?.postMessage({blob: props.blob, filename: props.name, annotations:props.annotations, locale: locale.value, options: props.options }, '*');

}
function gotMessageFromIframe(message:MessageEvent) {
  const { data:{ data, type} } = message;
  if(!data && !type ) return;
  switch(type) {
    case 'ready':
      pdfReadyHandler()
      ready.value = true;
      emits('ready', data)
      break;
    case 'annotation':
      emits('annotation', data)
      // saveAnnotation(data)
      break;
    default:
      break;
  }

}


useEventListener(window, 'message', gotMessageFromIframe)

watch(props, () => {
  if(props.blob && ready.value) {
    pdfReadyHandler()
  }
})
</script>

<template>
  <div class="contentContainer" v-loading="loading">
    <iframe ref="iframe" :src="pdfReaderUrl" allowfullscreen />
  </div>
</template>

<style lang="scss" scoped>
.contentContainer{
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
}
iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
