<script setup lang="ts">
import { DocTemplateProveKey } from '~/utils/docTemplateHelper'
import { useI18n } from 'vue-i18n'
import { inject } from 'vue'
import FontControls from './setting/FontControls.vue'
import TitleControls from './setting/TitleControls.vue'
import TextAlignment from './setting/TextAlignment.vue'
import ListControls from './setting/ListControls.vue'
import LinkMediaControls from './setting/LinkMediaControls.vue'
import TableIndentControls from './setting/TableIndentControls.vue'
import SettingsControls from './setting/SettingsControls.vue'
import SignatureControls from './setting/signature.vue'

const provider = inject(DocTemplateProveKey)
if (!provider) throw new Error('DocTemplateProvider not found')
</script>

<template>
  <div class="toolsContainer">
    <LazyDocTemplateContentSettingUndo />
    <!-- Font Controls -->
    <FontControls />

    <!-- Title Controls -->
    <TitleControls />

    <!-- Text Alignment -->
    <TextAlignment />

    <!-- List Controls -->
    <ListControls />

    <!-- Link and Media Controls -->
    <LinkMediaControls />

    <!-- Signature Controls -->
    <SignatureControls />

    <!-- Table and Indentation Controls -->
    <TableIndentControls />

    <!-- Settings Controls -->
    <SettingsControls />
  </div>
</template>

<style scoped lang="scss">
.toolsContainer {
  min-width: 240px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 8px;
  overflow-x: auto;
  padding: 4px 0;
  > * {
    margin-bottom: 0;
    display: flex;
    align-items: center;
    width: 100%;
    min-width: max-content;
  }
}

.toolsContainer::-webkit-scrollbar {
  height: 4px;
}

.toolsContainer::-webkit-scrollbar-thumb {
  background-color: #dcdfe6;
  border-radius: 2px;
}

.toolsContainer::-webkit-scrollbar-track {
  background-color: #f5f7fa;
}

</style>
