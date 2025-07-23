<template>
  <div class="pdf-sign-designer">
    <!-- Toolbar -->
    <div class="toolbar">
      <button @click="addSignature">Add Signature</button>
      <span v-if="pdfLoaded">
        <span>Total Pages: {{ numPages }}</span>
        <button @click="scrollToPage(1)">Go to Page 1</button>
        <input type="number" v-model.number="goToPageNumber" :min="1" :max="numPages" style="width: 60px;" placeholder="Page" />
        <button @click="scrollToPage(goToPageNumber)">Go</button>
      </span>
    </div>
    <div v-if="pdfLoaded" class="pdf-scroll-container" ref="scrollContainer" @scroll="onScroll">
      <div class="pdf-pages-wrapper" :style="{ height: totalHeight + 'px' }">
        <!-- Render visible pages -->
        <div
          v-for="pageNum in visiblePages"
          :key="pageNum"
          class="pdf-page-container"
          :style="getPageStyle(pageNum)"
        >
          <canvas
            :ref="(el) => setPageCanvas(el as HTMLCanvasElement, pageNum)"
            class="pdf-canvas"
            :data-page="pageNum"
            :key="`canvas-${pageNum}`"
          ></canvas>
          <!-- Signature overlays for this page -->
          <div
            v-for="(sig, idx) in getSignaturesForPage(pageNum)"
            :key="`${pageNum}-${idx}`"
            class="signature-block"
            :style="getSignatureBlockStyle(sig, pageNum)"
            :class="{ selected: getGlobalSignatureIndex(pageNum, idx) === selectedSignatureIndex }"
            @mousedown="(e) => startDrag(e, getGlobalSignatureIndex(pageNum, idx))"
            @click.stop="selectSignature(getGlobalSignatureIndex(pageNum, idx))"
          >
            <span v-if="sig.prefixText">{{ sig.prefixText }}</span>
            <img v-if="sig.imageData" :src="sig.imageData" class="signature-image" />
            <span v-if="sig.suffixText">{{ sig.suffixText }}</span>
          </div>
        </div>
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
import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue';
import type { SignatureSetting } from '../types';
import type { CSSProperties } from 'vue';

import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const props = defineProps<{
  pdfSrc: string | Blob | ArrayBuffer | null;
}>();

const scrollContainer = ref<HTMLElement | null>(null);
const pdfLoaded = ref(false);
const numPages = ref(1);
const signatures = ref<SignatureSetting[]>([]);
const selectedSignatureIndex = ref<number | null>(null);
const exportedSetting = ref('');
const goToPageNumber = ref(1);

// Virtual scrolling state
const pageHeight = ref(800); // Approximate page height
const pageGap = ref(20); // Gap between pages
const scrollTop = ref(0);
const containerHeight = ref(600);
const visibleBuffer = ref(2); // Number of pages to render outside visible area
const pageCanvases = ref<Map<number, HTMLCanvasElement>>(new Map());
const renderedPages = ref<Set<number>>(new Set());
const renderingPages = ref<Set<number>>(new Set()); // Track pages currently being rendered
const renderTasks = ref<Map<number, any>>(new Map()); // Track active render tasks

let pdfDoc: any = null;

const totalHeight = computed(() => {
  return numPages.value * (pageHeight.value + pageGap.value) - pageGap.value;
});

const visiblePages = computed(() => {
  if (!pdfLoaded.value) return [];
  const startY = scrollTop.value;
  const endY = startY + containerHeight.value;
  
  const startPage = Math.max(1, Math.floor(startY / (pageHeight.value + pageGap.value)) + 1 - visibleBuffer.value);
  const endPage = Math.min(numPages.value, Math.ceil(endY / (pageHeight.value + pageGap.value)) + visibleBuffer.value);
  
  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});

function getPageStyle(pageNum: number): CSSProperties {
  const top = (pageNum - 1) * (pageHeight.value + pageGap.value);
  return {
    position: 'absolute',
    top: top + 'px',
    left: '0',
    width: '100%',
    height: pageHeight.value + 'px',
  };
}

function setPageCanvas(el: HTMLCanvasElement | null, pageNum: number) {
  if (el) {
    pageCanvases.value.set(pageNum, el);
    // Render page if not already rendered or rendering
    nextTick(() => {
      renderPage(pageNum);
    });
  }
}

function onScroll(e: Event) {
  const target = e.target as HTMLElement;
  scrollTop.value = target.scrollTop;
  containerHeight.value = target.clientHeight;
}

function scrollToPage(pageNum: number) {
  if (!scrollContainer.value || pageNum < 1 || pageNum > numPages.value) return;
  const targetY = (pageNum - 1) * (pageHeight.value + pageGap.value);
  scrollContainer.value.scrollTo({ top: targetY, behavior: 'smooth' });
}

function getCurrentPage(): number {
  const centerY = scrollTop.value + containerHeight.value / 2;
  return Math.max(1, Math.min(numPages.value, Math.ceil(centerY / (pageHeight.value + pageGap.value))));
}

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
  const currentPage = getCurrentPage();
  signatures.value.push(defaultSignature(currentPage));
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

function getSignaturesForPage(pageNum: number) {
  return signatures.value.filter(sig => sig.page === pageNum);
}

function getGlobalSignatureIndex(pageNum: number, localIdx: number): number {
  const signaturesOnPage = getSignaturesForPage(pageNum);
  const sig = signaturesOnPage[localIdx];
  return signatures.value.indexOf(sig);
}

async function loadPdf(src: string | Blob | ArrayBuffer | null) {
  if (!src) {
    pdfLoaded.value = false;
    pdfDoc = null;
    return;
  }
  
  // Cancel all ongoing render tasks
  renderTasks.value.forEach(task => {
    if (task && task.cancel) {
      task.cancel();
    }
  });
  renderTasks.value.clear();
  renderingPages.value.clear();
  renderedPages.value.clear();
  
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
  
  // Get first page to calculate actual height
  if (pdfDoc.numPages > 0) {
    const page = await pdfDoc.getPage(1);
    const viewport = page.getViewport({ scale: 1.5 });
    pageHeight.value = viewport.height;
  }
}

watch(() => props.pdfSrc, (newVal) => {
  loadPdf(newVal);
}, { immediate: true });

// Watch for visible pages changes and render them
watch(visiblePages, (newPages, oldPages) => {
  // Don't cancel renders for pages that are no longer visible - keep them rendered
  // Only start rendering new visible pages
  newPages.forEach(pageNum => {
    nextTick(() => renderPage(pageNum));
  });
});

function renderPage(pageNum: number) {
  const canvas = pageCanvases.value.get(pageNum);

  if (!canvas || !pdfDoc) {
    // if if canvas is already rendered same page
    
    // console.log('renderPage', pageNum, 'canvas', canvas, 'pdfDoc', pdfDoc, 'renderedPages', renderedPages.value, 'renderingPages', renderingPages.value);
    return;
  }
  
  // Mark as rendering
  renderingPages.value.add(pageNum);
  
  pdfDoc.getPage(pageNum).then((page: any) => {
    // Check if we should still render this page
    if (!renderingPages.value.has(pageNum)) {
      return;
    }
    
    const viewport = page.getViewport({ scale: 1.5 });
    
    // Only set canvas dimensions if they haven't been set or are different
    if (canvas.width !== viewport.width || canvas.height !== viewport.height) {
      canvas.width = viewport.width;
      canvas.height = viewport.height;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      renderingPages.value.delete(pageNum);
      return;
    }
    
    // Clear the canvas before rendering
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const renderTask = page.render({ canvasContext: ctx, viewport });
    renderTasks.value.set(pageNum, renderTask);
    
    renderTask.promise.then(() => {
      // Mark as completed
      renderedPages.value.add(pageNum);
      renderingPages.value.delete(pageNum);
      renderTasks.value.delete(pageNum);
    }).catch((error: any) => {
      // Handle cancellation or other errors
      if (error.name !== 'RenderingCancelledException') {
        console.error(`Error rendering page ${pageNum}:`, error);
      }
      renderingPages.value.delete(pageNum);
      renderTasks.value.delete(pageNum);
    });
  }).catch((error: any) => {
    console.error(`Error getting page ${pageNum}:`, error);
    renderingPages.value.delete(pageNum);
  });
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

// Drag/resize logic
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
  if (!dragging || draggingIndex === null || !scrollContainer.value) return;
  
  const sig = signatures.value[draggingIndex];
  const pageContainer = scrollContainer.value.querySelector(`[data-page="${sig.page}"]`)?.parentElement;
  if (!pageContainer) return;
  
  const containerRect = pageContainer.getBoundingClientRect();
  const scrollRect = scrollContainer.value.getBoundingClientRect();
  
  sig.x = e.clientX - containerRect.left - dragOffset.x;
  sig.y = e.clientY - containerRect.top - dragOffset.y;
}

function stopDrag() {
  dragging = false;
  draggingIndex = null;
  window.removeEventListener('mousemove', onDrag);
  window.removeEventListener('mouseup', stopDrag);
}

function getSignatureBlockStyle(sig: SignatureSetting, pageNum: number): CSSProperties {
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
.pdf-scroll-container {
  width: 100%;
  height: calc(100vh - 200px);
  overflow-y: auto;
  border: 1px solid #ccc;
  position: relative;
}
.pdf-pages-wrapper {
  position: relative;
  width: 100%;
}
.pdf-page-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 10px;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
}
.pdf-canvas {
  max-width: 100%;
  border: 1px solid #ccc;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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
  flex-wrap: wrap;
}
</style> 
