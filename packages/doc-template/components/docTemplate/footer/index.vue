<script lang="ts" setup>
import { inject } from 'vue'
import { DocTemplateProveKey } from '../../../utils/docTemplateHelper';

const editorProvider = inject(DocTemplateProveKey)

if(!editorProvider) {
  throw createError('editorProvider is not found')
}
const { editor, options } = editorProvider
</script>

<template>
  <div class="footerContainer">
    Footer
    <div class="space"></div>
    <template v-if="options.textCount">
      <div v-if="editor " class="wordCount">
        {{ editor.storage.characterCount.characters() }}
        characters
        <template v-if="options.textCount">
          <span class="slash">/</span>
          {{ options.textCount }} <span class="word">characters</span>
        </template>
        
      </div>
    </template>
    <template v-else>
      <div v-if="editor " class="wordCount">
        {{ editor.storage.characterCount.characters() }}
        characters
        
          <span class="slash">/</span>
          {{ editor.storage.characterCount.words() }} <span class="word">word</span>
        
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.footerContainer{
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  padding: var(--app-space-s);
  background: var(--app-grey-950);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.space{
  flex: 1 0 auto;
}
.scale{
  max-width: 100px;
}
</style>
