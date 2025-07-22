<template>
  <div class="pdf-form-field-manager">
    <!-- Toolbar -->
    <div class="toolbar">
      <div class="upload-section">
        <input 
          type="file" 
          accept=".pdf" 
          @change="onPdfUpload" 
          ref="fileInput"
          class="file-input"
        />
        <button @click="triggerFileUpload" class="upload-btn">
          Upload PDF Form
        </button>
      </div>
      
      <div v-if="pdfLoaded" class="navigation-section">
        <span>Total Pages: {{ numPages }} | Fields: {{ allFields.length }}</span>
        <button @click="scrollToPage(1)">Go to Page 1</button>
        <input 
          type="number" 
          v-model.number="goToPageNumber" 
          :min="1" 
          :max="numPages" 
          style="width: 60px;" 
          placeholder="Page" 
        />
        <button @click="scrollToPage(goToPageNumber)">Go</button>
      </div>

      <div v-if="pdfLoaded" class="field-controls">
        <button @click="selectAllFields" :class="{ active: allFieldsSelected }">
          {{ allFieldsSelected ? 'Deselect All' : 'Select All' }}
        </button>
        <button @click="showCreateCombinedField = true" :disabled="selectedFields.length < 2">
          Combine Fields ({{ selectedFields.length }})
        </button>
        <button @click="exportConfiguration">Export Configuration</button>
      </div>
    </div>

    <!-- PDF Viewer -->
    <div v-if="pdfLoaded" class="pdf-viewer-container">
      <div class="pdf-scroll-container" ref="scrollContainer" @scroll="onScroll">
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
            
            <!-- Form field overlays for this page -->
            <div
              v-for="field in getFieldsForPage(pageNum)"
              :key="field.id"
              class="form-field-overlay"
              :class="{ 
                selected: field.selected, 
                [field.type]: true,
                readonly: field.readonly 
              }"
              :style="getFieldOverlayStyle(field, pageNum)"
              @click.stop="toggleFieldSelection(field.id)"
              @mouseenter="hoveredField = field.id"
              @mouseleave="hoveredField = null"
            >
              <div class="field-label">
                {{ field.customLabel || field.name }}
              </div>
              <div class="field-type-badge">{{ field.type }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Side Panel -->
      <div class="side-panel">
        <div class="panel-section">
          <h3>Form Fields ({{ allFields.length }})</h3>
          <div class="field-list">
            <div 
              v-for="field in allFields" 
              :key="field.id"
              class="field-item"
              :class="{ 
                selected: field.selected,
                hovered: hoveredField === field.id,
                readonly: field.readonly
              }"
              @click="toggleFieldSelection(field.id)"
              @mouseenter="hoveredField = field.id"
              @mouseleave="hoveredField = null"
            >
                             <div class="field-header">
                 <input 
                   type="checkbox" 
                   :checked="field.selected" 
                   @change="() => toggleFieldSelection(field.id)"
                 />
                <span class="field-name">{{ field.customLabel || field.name }}</span>
                <span class="field-type-badge small">{{ field.type }}</span>
              </div>
              <div class="field-details">
                Page {{ field.page }} • {{ field.width }}×{{ field.height }}
                <button 
                  @click.stop="editFieldLabel(field)"
                  class="edit-btn"
                >
                  Edit Label
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="combinedFields.length > 0" class="panel-section">
          <h3>Combined Fields ({{ combinedFields.length }})</h3>
          <div class="combined-field-list">
            <div 
              v-for="combinedField in combinedFields" 
              :key="combinedField.id"
              class="combined-field-item"
            >
              <div class="combined-field-header">
                <span class="combined-field-name">{{ combinedField.customLabel }}</span>
                <button @click="deleteCombinedField(combinedField.id)" class="delete-btn">×</button>
              </div>
              <div class="combined-field-details">
                Type: {{ combinedField.combineType }} • Fields: {{ combinedField.fieldIds.length }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Creating Combined Fields -->
    <div v-if="showCreateCombinedField" class="modal-overlay" @click="showCreateCombinedField = false">
      <div class="modal" @click.stop>
        <h3>Create Combined Field</h3>
        <div class="form-group">
          <label>Field Label:</label>
          <input v-model="newCombinedField.label" placeholder="Enter label for combined field" />
        </div>
        <div class="form-group">
          <label>Combine Type:</label>
          <select v-model="newCombinedField.combineType">
            <option value="concatenate">Concatenate</option>
            <option value="sum">Sum</option>
            <option value="average">Average</option>
            <option value="group">Group</option>
          </select>
        </div>
        <div v-if="newCombinedField.combineType === 'concatenate'" class="form-group">
          <label>Separator:</label>
          <input v-model="newCombinedField.separator" placeholder="e.g., ' - ', ', '" />
        </div>
        <div class="form-group">
          <label>Selected Fields ({{ selectedFields.length }}):</label>
          <div class="selected-fields-list">
            <div v-for="fieldId in selectedFields" :key="fieldId" class="selected-field">
              {{ getFieldById(fieldId)?.customLabel || getFieldById(fieldId)?.name }}
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button @click="showCreateCombinedField = false">Cancel</button>
          <button @click="createCombinedField" :disabled="!newCombinedField.label">Create</button>
        </div>
      </div>
    </div>

    <!-- Modal for Editing Field Label -->
    <div v-if="editingField" class="modal-overlay" @click="editingField = null">
      <div class="modal" @click.stop>
        <h3>Edit Field Label</h3>
        <div class="form-group">
          <label>Original Name:</label>
          <input :value="editingField.name" readonly />
        </div>
        <div class="form-group">
          <label>Custom Label:</label>
          <input v-model="editingFieldLabel" placeholder="Enter custom label" />
        </div>
        <div class="modal-actions">
          <button @click="editingField = null">Cancel</button>
          <button @click="saveFieldLabel" :disabled="!editingFieldLabel">Save</button>
        </div>
      </div>
    </div>

    <!-- Export Results -->
    <div v-if="exportResult" class="export-section">
      <h3>Exported Configuration</h3>
      <textarea v-model="exportResult" readonly rows="10"></textarea>
      <button @click="exportResult = ''">Close</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue';
import type { PdfFormField, CombinedField, PdfFormDocument } from '../types';
import type { CSSProperties } from 'vue';
import PdfFormFieldManager from '../backend';

import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// Props
const props = defineProps<{
  autoDetectFields?: boolean;
  highlightColor?: string;
}>();

// Emit events
const emit = defineEmits<{
  fieldsDetected: [fields: PdfFormField[]];
  fieldsSelected: [fieldIds: string[]];
  configurationExported: [config: any];
}>();

// Refs
const fileInput = ref<HTMLInputElement | null>(null);
const scrollContainer = ref<HTMLElement | null>(null);

// State
const pdfLoaded = ref(false);
const numPages = ref(1);
const allFields = ref<PdfFormField[]>([]);
const combinedFields = ref<CombinedField[]>([]);
const goToPageNumber = ref(1);
const hoveredField = ref<string | null>(null);
const editingField = ref<PdfFormField | null>(null);
const editingFieldLabel = ref('');
const showCreateCombinedField = ref(false);
const exportResult = ref('');

// New combined field form
const newCombinedField = reactive({
  label: '',
  combineType: 'concatenate' as CombinedField['combineType'],
  separator: ' - '
});

// Virtual scrolling state (similar to PdfSignDesigner)
const pageHeight = ref(800);
const pageGap = ref(20);
const scrollTop = ref(0);
const containerHeight = ref(600);
const visibleBuffer = ref(2);
const pageCanvases = ref<Map<number, HTMLCanvasElement>>(new Map());
const renderedPages = ref<Set<number>>(new Set());
const renderingPages = ref<Set<number>>(new Set());
const renderTasks = ref<Map<number, any>>(new Map());

// Backend manager
const formFieldManager = new PdfFormFieldManager();
let pdfJsDoc: any = null;

// Computed
const totalHeight = computed(() => {
  return numPages.value * (pageHeight.value + pageGap.value) - pageGap.value;
});

const visiblePages = computed(() => {
  if (!pdfLoaded.value) return [];
  const startY = scrollTop.value;
  const endY = startY + containerHeight.value;
  
  const startPage = Math.max(1, Math.floor(startY / (pageHeight.value + pageGap.value)) + 1 - visibleBuffer.value);
  const endPage = Math.min(numPages.value, Math.ceil(endY / (pageHeight.value + pageGap.value)) + visibleBuffer.value);
  
  const pages: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});

const selectedFields = computed(() => {
  return allFields.value.filter(field => field.selected).map(field => field.id);
});

const allFieldsSelected = computed(() => {
  return allFields.value.length > 0 && allFields.value.every(field => field.selected);
});

// Methods
function triggerFileUpload() {
  fileInput.value?.click();
}

async function onPdfUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  try {
    const document = await formFieldManager.loadPdf(file);
    console.log('document', document.fields);
    allFields.value = document.fields.map(field => ({ ...field, selected: false }));
    
    // Load for rendering
    const arrayBuffer = await file.arrayBuffer();
    pdfJsDoc = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
    numPages.value = pdfJsDoc.numPages;
    pdfLoaded.value = true;

    // Get first page to calculate actual height
    if (pdfJsDoc.numPages > 0) {
      const page = await pdfJsDoc.getPage(1);
      const viewport = page.getViewport({ scale: 1.5 });
      pageHeight.value = viewport.height;
    }

    emit('fieldsDetected', allFields.value);
  } catch (error) {
    console.error('Error loading PDF:', error);
    alert('Error loading PDF. Please try again.');
  }
}

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

// Watch for visible pages changes and render them
watch(visiblePages, (newPages) => {
  newPages.forEach(pageNum => {
    nextTick(() => renderPage(pageNum));
  });
});

function renderPage(pageNum: number) {
  const canvas = pageCanvases.value.get(pageNum);
  if (!canvas || !pdfJsDoc || renderingPages.value.has(pageNum)) {
    return;
  }
  
  renderingPages.value.add(pageNum);
  
  pdfJsDoc.getPage(pageNum).then((page: any) => {
    if (!renderingPages.value.has(pageNum)) {
      return;
    }
    
    const viewport = page.getViewport({ scale: 1.5 });
    
    if (canvas.width !== viewport.width || canvas.height !== viewport.height) {
      canvas.width = viewport.width;
      canvas.height = viewport.height;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      renderingPages.value.delete(pageNum);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const renderTask = page.render({ canvasContext: ctx, viewport });
    renderTasks.value.set(pageNum, renderTask);
    
    renderTask.promise.then(() => {
      renderedPages.value.add(pageNum);
      renderingPages.value.delete(pageNum);
      renderTasks.value.delete(pageNum);
    }).catch((error: any) => {
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

function getFieldsForPage(pageNum: number): PdfFormField[] {
  return allFields.value.filter(field => field.page === pageNum);
}

function getFieldOverlayStyle(field: PdfFormField, pageNum: number): CSSProperties {
  const highlightColor = props.highlightColor || '#007bff';
  
  return {
    position: 'absolute',
    left: field.x + 'px',
    top: field.y + 'px',
    width: field.width + 'px',
    height: field.height + 'px',
    border: field.selected ? `2px solid ${highlightColor}` : `1px dashed ${highlightColor}`,
    backgroundColor: field.selected ? `${highlightColor}20` : `${highlightColor}10`,
    zIndex: '10',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };
}

function toggleFieldSelection(fieldId: string) {
  const fieldIndex = allFields.value.findIndex(field => field.id === fieldId);
  if (fieldIndex !== -1) {
    allFields.value[fieldIndex].selected = !allFields.value[fieldIndex].selected;
    emit('fieldsSelected', selectedFields.value);
  }
}

function selectAllFields() {
  const shouldSelect = !allFieldsSelected.value;
  allFields.value.forEach(field => {
    field.selected = shouldSelect;
  });
  emit('fieldsSelected', selectedFields.value);
}

function getFieldById(fieldId: string): PdfFormField | undefined {
  return allFields.value.find(field => field.id === fieldId);
}

function editFieldLabel(field: PdfFormField) {
  editingField.value = field;
  editingFieldLabel.value = field.customLabel || field.name;
}

function saveFieldLabel() {
  if (editingField.value && editingFieldLabel.value) {
    const fieldIndex = allFields.value.findIndex(field => field.id === editingField.value!.id);
    if (fieldIndex !== -1) {
      allFields.value[fieldIndex].customLabel = editingFieldLabel.value;
    }
    editingField.value = null;
    editingFieldLabel.value = '';
  }
}

function createCombinedField() {
  if (selectedFields.value.length < 2 || !newCombinedField.label) return;

  const combined = formFieldManager.createCombinedField(
    selectedFields.value,
    newCombinedField.label,
    newCombinedField.combineType,
    newCombinedField.separator
  );
  
  combinedFields.value.push(combined);
  
  // Reset form
  newCombinedField.label = '';
  newCombinedField.combineType = 'concatenate';
  newCombinedField.separator = ' - ';
  showCreateCombinedField.value = false;
}

function deleteCombinedField(combinedFieldId: string) {
  const index = combinedFields.value.findIndex(field => field.id === combinedFieldId);
  if (index !== -1) {
    combinedFields.value.splice(index, 1);
  }
}

function exportConfiguration() {
  const config = {
    fields: allFields.value,
    selectedFields: selectedFields.value,
    combinedFields: combinedFields.value,
    exportDate: new Date()
  };
  
  exportResult.value = JSON.stringify(config, null, 2);
  emit('configurationExported', config);
}
</script>

<style scoped>
.pdf-form-field-manager {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  background: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  flex-wrap: wrap;
}

.upload-section, .navigation-section, .field-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.file-input {
  display: none;
}

.upload-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.upload-btn:hover {
  background: #0056b3;
}

.pdf-viewer-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.pdf-scroll-container {
  flex: 1;
  height: 100%;
  overflow-y: auto;
  border-right: 1px solid #dee2e6;
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

.form-field-overlay {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 2px;
  font-size: 10px;
  overflow: hidden;
}

.form-field-overlay:hover {
  opacity: 0.8;
}

.form-field-overlay.selected {
  box-shadow: 0 0 0 2px #007bff;
}

.form-field-overlay.readonly {
  opacity: 0.6;
  border-style: dotted;
}

.field-label {
  background: rgba(255,255,255,0.9);
  padding: 1px 3px;
  border-radius: 2px;
  font-weight: bold;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.field-type-badge {
  background: #6c757d;
  color: white;
  padding: 1px 3px;
  border-radius: 2px;
  font-size: 8px;
  margin-top: 2px;
}

.field-type-badge.small {
  font-size: 10px;
}

.side-panel {
  width: 300px;
  background: white;
  border-left: 1px solid #dee2e6;
  overflow-y: auto;
  padding: 16px;
}

.panel-section {
  margin-bottom: 24px;
}

.panel-section h3 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: bold;
  color: #495057;
}

.field-list {
  max-height: 400px;
  overflow-y: auto;
}

.field-item {
  padding: 8px;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  margin-bottom: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.field-item:hover, .field-item.hovered {
  background: #f8f9fa;
  border-color: #007bff;
}

.field-item.selected {
  background: #e3f2fd;
  border-color: #007bff;
}

.field-item.readonly {
  opacity: 0.7;
  font-style: italic;
}

.field-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.field-name {
  flex: 1;
  font-weight: 500;
  font-size: 12px;
}

.field-details {
  font-size: 10px;
  color: #6c757d;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.edit-btn {
  background: none;
  border: 1px solid #007bff;
  color: #007bff;
  padding: 2px 6px;
  border-radius: 2px;
  cursor: pointer;
  font-size: 10px;
}

.edit-btn:hover {
  background: #007bff;
  color: white;
}

.combined-field-item {
  padding: 8px;
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 4px;
  margin-bottom: 4px;
}

.combined-field-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}

.combined-field-name {
  font-weight: 500;
  font-size: 12px;
}

.delete-btn {
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.combined-field-details {
  font-size: 10px;
  color: #6c757d;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 24px;
  border-radius: 8px;
  min-width: 400px;
  max-width: 500px;
}

.modal h3 {
  margin: 0 0 16px 0;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
}

.form-group input, .form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.selected-fields-list {
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 8px;
}

.selected-field {
  padding: 4px;
  background: #e3f2fd;
  margin-bottom: 4px;
  border-radius: 2px;
  font-size: 12px;
}

.modal-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 16px;
}

.modal-actions button {
  padding: 8px 16px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  cursor: pointer;
}

.modal-actions button:last-child {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.modal-actions button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.export-section {
  padding: 16px;
  background: #f8f9fa;
  border-top: 1px solid #dee2e6;
}

.export-section h3 {
  margin: 0 0 12px 0;
}

.export-section textarea {
  width: 100%;
  font-family: monospace;
  font-size: 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 8px;
}

button.active {
  background: #28a745;
  color: white;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style> 
