<script lang="ts" setup>
import { MenuRouterKey } from '#imports'
import type {TipTapOptions} from 'docpal-document-editor/src/types'
const pageReady = ref(false)
const routerProvider = inject(MenuRouterKey)
if(!routerProvider) {
  throw new Error("routerProvider not found")
}
const json = ref({})
const documentOptions = ref<TipTapOptions>()

const user = useUserState()

function newSetting(newData:TipTapOptions) {
  documentOptions.value = newData;
  documentOptions.value.editable = true;
  // if documentOptions.value.title is valid, the update router title
  if (newData.title) {
    routerProvider?.updateTabName(newData.title)
  }
  pageReady.value = true
}


</script>


<template>
  <div class="pageContainer">
    <template v-if="pageReady">
      <DocTemplateEditor :editorOptions="documentOptions" :user="user" :variables="[]" :json="json" />
    </template>
    <DocTemplateNewDocumentDialog ref="dialog" :defaultOpened="true" @submit="newSetting" />
  </div>
</template>

<style lang="scss" scoped>
.pageContainer{
  // padding: var(--app-space-s);
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>


