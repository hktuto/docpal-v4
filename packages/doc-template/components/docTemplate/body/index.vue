<script lang="ts" setup>

const {doc, options, scale} = inject('docEditor')



</script>

<template>
  <div class="docContent">
    <div class="scaleContainer" >
        <DocTemplateBodyPage v-for="(page,index) in doc" :key="index" :index="index"  />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.docContent{
  width: 100%;
  overflow: auto;
  background: var(--app-grey-900);
  padding: var(--app-space-s);
  flex: 1 0 auto;
}
.scaleContainer{
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: var(--app-space-m);
  transform-origin: top center;
}
.hiddenComoponent{
  display: none;
}
</style>
