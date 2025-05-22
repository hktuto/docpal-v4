<script lang="ts" setup>
import type {TipTapOptions} from 'docpal-document-editor'
const pageReady = ref(false)

const documentOptions = ref<TipTapOptions>()

function newSetting(newData:any) {
  documentOptions.value = newData;
  pageReady.value = true
}


</script>


<template>
  <div class="pageContainer">
    <template v-if="pageReady">
      <client-only>
        <DocTemplateEditor :editorOptions="documentOptions" :variables="[]" />
      </client-only>
    </template>
    <DocTemplateNewDocumentDialog ref="dialog" :defaultOpened="true" @submit="newSetting" />
  </div>
</template>

<style lang="scss" scoped>
.pageContainer{
  // padding: var(--app-space-s);
  height: 100svh;
  width: 100svw;
  position: relative;
  overflow: hidden;
}
</style>


