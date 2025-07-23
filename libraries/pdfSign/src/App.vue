<template>
  <div id="app">
    <h1>PDF Signature Designer Example</h1>
    <input type="file" accept="application/pdf" @change="onPdfFileChange" />
    <div v-if="pdfBlob">
      <PdfSignDesigner :pdfSrc="pdfBlob" />
    </div>
    <div v-else class="no-pdf-msg">
      <p>Please select a PDF file to begin.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import PdfSignDesigner from './frontend/PdfSignDesigner.vue';

const pdfBlob = ref<Blob | null>(null);

function onPdfFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  pdfBlob.value = file;
}
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  padding: 32px;
  background: #f7f7f7;
  min-height: 100vh;
}
h1 {
  text-align: center;
  margin-bottom: 32px;
}
.no-pdf-msg {
  text-align: center;
  margin-top: 48px;
  color: #888;
}
</style> 
