<template>
  <div id="app">
    <header class="app-header">
      <h1>PDF Form Field Manager</h1>
      <p>Upload a PDF form to detect, highlight, and manage form fields</p>
    </header>
    
    <main class="app-main">
      <PdfFormFieldManager 
        :auto-detect-fields="true"
        :highlight-color="highlightColor"
        @fields-detected="onFieldsDetected"
        @fields-selected="onFieldsSelected"
        @configuration-exported="onConfigurationExported"
      />
    </main>

    <!-- Settings Panel -->
    <div v-if="showSettings" class="settings-panel">
      <h3>Settings</h3>
      <div class="setting-group">
        <label>Highlight Color:</label>
        <input type="color" v-model="highlightColor" />
      </div>
      <div class="setting-group">
        <label>Auto-detect fields:</label>
        <input type="checkbox" v-model="autoDetectFields" />
      </div>
      <button @click="showSettings = false">Close</button>
    </div>

    <!-- Stats Panel -->
    <div v-if="stats.totalFields > 0" class="stats-panel">
      <h3>Statistics</h3>
      <div class="stat-item">
        <span>Total Fields:</span>
        <span>{{ stats.totalFields }}</span>
      </div>
      <div class="stat-item">
        <span>Selected Fields:</span>
        <span>{{ stats.selectedFields }}</span>
      </div>
      <div class="stat-item">
        <span>Combined Fields:</span>
        <span>{{ stats.combinedFields }}</span>
      </div>
    </div>

    <!-- Floating Action Buttons -->
    <div class="fab-container">
      <button @click="showSettings = !showSettings" class="fab" title="Settings">
        ⚙️
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue';
import PdfFormFieldManager from './frontend/PdfFormFieldManager.vue';
import type { PdfFormField } from './types';

// State
const highlightColor = ref('#007bff');
const autoDetectFields = ref(true);
const showSettings = ref(false);
const detectedFields = ref<PdfFormField[]>([]);
const selectedFieldIds = ref<string[]>([]);
const exportedConfigurations = ref<any[]>([]);

// Computed
const stats = computed(() => ({
  totalFields: detectedFields.value.length,
  selectedFields: selectedFieldIds.value.length,
  combinedFields: exportedConfigurations.value.reduce((sum, config) => sum + (config.combinedFields?.length || 0), 0)
}));

// Event handlers
function onFieldsDetected(fields: PdfFormField[]) {
  detectedFields.value = fields;
  console.log('Fields detected:', fields);
}

function onFieldsSelected(fieldIds: string[]) {
  selectedFieldIds.value = fieldIds;
  console.log('Fields selected:', fieldIds);
}

function onConfigurationExported(config: any) {
  exportedConfigurations.value.push(config);
  console.log('Configuration exported:', config);
}
</script>

<style>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f8f9fa;
}

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.app-header h1 {
  font-size: 2rem;
  margin-bottom: 8px;
  font-weight: 600;
}

.app-header p {
  opacity: 0.9;
  font-size: 1.1rem;
}

.app-main {
  flex: 1;
  overflow: hidden;
}

.settings-panel {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  z-index: 1000;
  min-width: 300px;
}

.settings-panel h3 {
  margin-bottom: 16px;
  color: #333;
}

.setting-group {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.setting-group label {
  font-weight: 500;
  color: #555;
}

.setting-group input {
  margin-left: 12px;
}

.stats-panel {
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 100;
  min-width: 200px;
}

.stats-panel h3 {
  margin-bottom: 12px;
  color: #333;
  font-size: 14px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 12px;
}

.stat-item span:first-child {
  color: #666;
}

.stat-item span:last-child {
  font-weight: bold;
  color: #333;
}

.fab-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
}

.fab {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #007bff;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,123,255,0.3);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fab:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,123,255,0.4);
}

.fab:active {
  transform: translateY(0);
}
</style> 
