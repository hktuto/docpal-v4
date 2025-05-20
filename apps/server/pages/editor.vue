<script lang="ts" setup>

const pageReady = ref(false)

const documentOptions = ref<TipTapOptions>()

function newSetting(newData) {
  documentOptions.value = newData;
  pageReady.value = true
}


</script>


<template>
  <div class="pageContainer">
    <template v-if="pageReady">
      <client-only>
        <DocTemplateEditor :editorOptions="documentOptions" />
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


