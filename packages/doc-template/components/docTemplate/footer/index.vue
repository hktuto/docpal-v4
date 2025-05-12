<script lang="ts" setup>
const {editor} = inject('editor')
</script>

<template>
  <div class="footerContainer">
    footer
    <div class="space"></div>
    <div v-if="editor && editor.storage" class="wordCount">
      {{ editor.storage.characterCount.characters() }}
      characters
      <span class="slash">/</span>
      {{ editor.storage.characterCount.words() }} <span class="word">words</span>
    </div>
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
  background: var(--app-grey-975);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.space{
  flex: 1 0 auto;
}
.scale{
  max-width: 100px;
}
</style>
