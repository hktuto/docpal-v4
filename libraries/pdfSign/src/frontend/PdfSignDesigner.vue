<template>
  <div class="pdf-sign-designer">
    <!-- Toolbar -->
    <div class="toolbar">
      <button @click="addSignature">Add Signature</button>
      <span v-if="pdfLoaded">
        <button @click="prevPage" :disabled="currentPage <= 1">Prev</button>
        <span>Page</span>
        <input type="number" v-model.number="currentPage" :min="1" :max="numPages" style="width: 50px;" />
        <span>/ {{ numPages }}</span>
        <button @click="nextPage" :disabled="currentPage >= numPages">Next</button>
      </span>
    </div>
    <div v-if="pdfLoaded" class="pdf-canvas-wrapper">
      <!-- PDF.js canvas rendering here -->
      <canvas ref="pdfCanvas" class="pdf-canvas"></canvas>
      <!-- Signature overlays for current page only -->
      <div
        v-for="(sig, idx) in signaturesForCurrentPage"
        :key="idx"
        class="signature-block"
        :style="getSignatureBlockStyle(sig)"
        :class="{ selected: idx === selectedSignatureIndexOnPage }"
        @mousedown="(e) => startDrag(e, getGlobalSignatureIndex(idx))"
        @click.stop="selectSignature(getGlobalSignatureIndex(idx))"
      >
        <span v-if="sig.prefixText">{{ sig.prefixText }}</span>
        <img v-if="sig.imageData" :src="sig.imageData" class="signature-image" />
        <span v-if="sig.suffixText">{{ sig.suffixText }}</span>
      </div>
    </div>
    <div v-if="pdfLoaded && selectedSignature" class="signature-controls">
      <input v-model="selectedSignature.prefixText" placeholder="Prefix text (optional)" />
      <input type="file" accept="image/*" @change="onImageChange" />
      <input v-model="selectedSignature.suffixText" placeholder="Suffix text (optional)" />
      <label>Page:
        <input type="number" v-model.number="selectedSignature.page" :min="1" :max="numPages" style="width: 50px;" />
      </label>
      <button @click="exportSignatureSetting">Export Signature Settings</button>
    </div>
    <pre v-if="exportedSetting">{{ exportedSetting }}</pre>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import type { SignatureSetting } from '../types';
import type { CSSProperties } from 'vue';

import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const props = defineProps<{
  pdfSrc: string | Blob | ArrayBuffer | null;
}>();

const pdfCanvas = ref<HTMLCanvasElement | null>(null);
const pdfLoaded = ref(false);
const currentPage = ref(1);
const numPages = ref(1);
const signatures = ref<SignatureSetting[]>([]);
const selectedSignatureIndex = ref<number | null>(null);
const exportedSetting = ref('');

let pdfDoc: any = null;

function defaultSignature(page = 1): SignatureSetting {
  return {
    page,
    x: 100,
    y: 100,
    width: 200,
    height: 50,
    prefixText: '',
    imageData: '',
    suffixText: '',
  };
}

function addSignature() {
  signatures.value.push(defaultSignature(currentPage.value));
  selectedSignatureIndex.value = signatures.value.length - 1;
}

function selectSignature(idx: number) {
  selectedSignatureIndex.value = idx;
}

const selectedSignature = computed({
  get() {
    if (selectedSignatureIndex.value === null) return null;
    return signatures.value[selectedSignatureIndex.value] || null;
  },
  set(val) {
    if (selectedSignatureIndex.value !== null && val) {
      signatures.value[selectedSignatureIndex.value] = val;
    }
  }
});

const signaturesForCurrentPage = computed(() =>
  signatures.value.filter(sig => sig.page === currentPage.value)
);

const selectedSignatureIndexOnPage = computed(() => {
  if (selectedSignatureIndex.value === null) return null;
  const idx = signaturesForCurrentPage.value.findIndex(
    sig => sig === signatures.value[selectedSignatureIndex.value!]
  );
  return idx === -1 ? null : idx;
});

function getGlobalSignatureIndex(idxOnPage: number): number {
  // Map index in signaturesForCurrentPage to index in signatures
  const sig = signaturesForCurrentPage.value[idxOnPage];
  return sig ? signatures.value.indexOf(sig) : -1;
}

async function loadPdf(src: string | Blob | ArrayBuffer | null) {
  if (!src) {
    pdfLoaded.value = false;
    pdfDoc = null;
    return;
  }
  let data: any = src;
  if (typeof src === 'string') {
    data = src;
  } else if (src instanceof Blob) {
    data = new Uint8Array(await src.arrayBuffer());
  } else if (src instanceof ArrayBuffer) {
    data = new Uint8Array(src);
  }
  pdfDoc = await pdfjsLib.getDocument({ data }).promise;
  numPages.value = pdfDoc.numPages;
  pdfLoaded.value = true;
  if (currentPage.value > numPages.value) currentPage.value = 1;
  renderPage(currentPage.value);
}

watch(() => props.pdfSrc, (newVal) => {
  loadPdf(newVal);
}, { immediate: true });

watch(currentPage, (newPage) => {
  if (pdfLoaded.value) renderPage(newPage);
});

function renderPage(pageNum: number) {
  const canvas = pdfCanvas.value;
  if (!canvas || !pdfDoc) return;
  pdfDoc.getPage(pageNum).then((page: any) => {
    const viewport = page.getViewport({ scale: 1.5 });
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');
    page.render({ canvasContext: ctx, viewport });
  });
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}
function nextPage() {
  if (currentPage.value < numPages.value) currentPage.value++;
}

function onImageChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file || !selectedSignature.value) return;
  const reader = new FileReader();
  reader.onload = function (ev) {
    selectedSignature.value!.imageData = ev.target?.result as string;
  };
  reader.readAsDataURL(file);
}

// Drag/resize logic (simplified, only drag for now)
let dragOffset = { x: 0, y: 0 };
let dragging = false;
let draggingIndex: number | null = null;

function startDrag(e: MouseEvent, idx: number) {
  dragging = true;
  draggingIndex = idx;
  dragOffset.x = e.offsetX;
  dragOffset.y = e.offsetY;
  window.addEventListener('mousemove', onDrag);
  window.addEventListener('mouseup', stopDrag);
}
function onDrag(e: MouseEvent) {
  if (!dragging || draggingIndex === null) return;
  const wrapper = (pdfCanvas.value as HTMLCanvasElement).getBoundingClientRect();
  const sig = signatures.value[draggingIndex];
  sig.x = e.clientX - wrapper.left - dragOffset.x;
  sig.y = e.clientY - wrapper.top - dragOffset.y;
}
function stopDrag() {
  dragging = false;
  draggingIndex = null;
  window.removeEventListener('mousemove', onDrag);
  window.removeEventListener('mouseup', stopDrag);
}

function getSignatureBlockStyle(sig: SignatureSetting): CSSProperties {
  return {
    position: 'absolute',
    left: sig.x + 'px',
    top: sig.y + 'px',
    width: sig.width + 'px',
    height: sig.height + 'px',
    border: '1px dashed #333',
    background: 'rgba(255,255,255,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '10',
    cursor: 'move',
    boxShadow: selectedSignatureIndex.value !== null && signatures.value[selectedSignatureIndex.value] === sig ? '0 0 0 2px #007bff' : '',
  };
}

function exportSignatureSetting() {
  exportedSetting.value = JSON.stringify(signatures.value, null, 2);
}
</script>

<style scoped>
.pdf-sign-designer {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
}
.toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.pdf-canvas-wrapper {
  position: relative;
  width: 100%;
  min-height: 600px;
}
.pdf-canvas {
  width: 100%;
  border: 1px solid #ccc;
}
.signature-block {
  position: absolute;
  cursor: move;
  min-width: 100px;
  min-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  transition: box-shadow 0.2s;
}
.signature-block.selected {
  box-shadow: 0 0 0 2px #007bff;
}
.signature-image {
  max-height: 100%;
  max-width: 100%;
  margin: 0 4px;
}
.signature-controls {
  margin-top: 16px;
  display: flex;
  gap: 8px;
  align-items: center;
}
</style> 
