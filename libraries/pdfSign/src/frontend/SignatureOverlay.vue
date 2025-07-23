<template>
  <div class="signature-overlay">
    <!-- Signature blocks for this page -->
    <div
      v-for="(sig, idx) in signaturesForPage"
      :key="`${pageNum}-${idx}`"
      class="signature-block"
      :style="getSignatureBlockStyle(sig)"
      :class="{ selected: getGlobalSignatureIndex(idx) === selectedSignatureIndex }"
      @mousedown="(e) => startDrag(e, getGlobalSignatureIndex(idx))"
      @click.stop="selectSignature(getGlobalSignatureIndex(idx))"
    >
      <span v-if="sig.prefixText">{{ sig.prefixText }}</span>
      <img v-if="sig.imageData" :src="sig.imageData" class="signature-image" />
      <span v-if="sig.suffixText">{{ sig.suffixText }}</span>
    </div>

    <!-- Signature controls (only show if a signature is selected) -->
    <div v-if="selectedSignature" class="signature-controls">
      <input v-model="selectedSignature.prefixText" placeholder="Prefix text (optional)" />
      <input type="file" accept="image/*" @change="onImageChange" />
      <input v-model="selectedSignature.suffixText" placeholder="Suffix text (optional)" />
      <label>Page:
        <input type="number" v-model.number="selectedSignature.page" :min="1" :max="totalPages" style="width: 50px;" />
      </label>
      <button @click="$emit('export')">Export Signature Settings</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, type CSSProperties } from 'vue';
import type { SignatureSetting } from '../types';

const props = defineProps<{
  pageNum: number;
  signatures: SignatureSetting[];
  selectedSignatureIndex: number | null;
  totalPages: number;
  containerElement?: HTMLElement | null;
}>();

const emit = defineEmits<{
  'update:signatures': [signatures: SignatureSetting[]];
  'update:selectedSignatureIndex': [index: number | null];
  'export': [];
}>();

const signaturesForPage = computed(() => 
  props.signatures.filter(sig => sig.page === props.pageNum)
);

const selectedSignature = computed({
  get() {
    if (props.selectedSignatureIndex === null) return null;
    return props.signatures[props.selectedSignatureIndex] || null;
  },
  set(val) {
    if (props.selectedSignatureIndex !== null && val) {
      const newSignatures = [...props.signatures];
      newSignatures[props.selectedSignatureIndex] = val;
      emit('update:signatures', newSignatures);
    }
  }
});

function getGlobalSignatureIndex(localIdx: number): number {
  const sig = signaturesForPage.value[localIdx];
  return props.signatures.indexOf(sig);
}

function selectSignature(idx: number) {
  emit('update:selectedSignatureIndex', idx);
}

function onImageChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file || !selectedSignature.value) return;
  const reader = new FileReader();
  reader.onload = function (ev) {
    if (selectedSignature.value) {
      selectedSignature.value.imageData = ev.target?.result as string;
    }
  };
  reader.readAsDataURL(file);
}

// Drag logic
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
  if (!dragging || draggingIndex === null || !props.containerElement) return;
  
  const sig = props.signatures[draggingIndex];
  const pageContainer = props.containerElement.querySelector(`[data-page="${sig.page}"]`)?.parentElement;
  if (!pageContainer) return;
  
  const containerRect = pageContainer.getBoundingClientRect();
  
  const newSignatures = [...props.signatures];
  newSignatures[draggingIndex] = {
    ...sig,
    x: e.clientX - containerRect.left - dragOffset.x,
    y: e.clientY - containerRect.top - dragOffset.y,
  };
  emit('update:signatures', newSignatures);
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
    boxShadow: props.selectedSignatureIndex !== null && props.signatures[props.selectedSignatureIndex] === sig ? '0 0 0 2px #007bff' : '',
  };
}
</script>

<style scoped>
.signature-overlay {
  position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;
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
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  z-index: 1000;
  pointer-events: auto;
}
</style> 
