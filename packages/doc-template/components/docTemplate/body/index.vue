<script lang="ts" setup>

const {doc, options, scale} = inject('docEditor')

const pageCount = ref(1);


</script>

<template>
  <div class="docContent">
    <div class="scaleContainer" >
        <DocTemplateBodyPage />
    </div>
    <div class="hiddenComoponent">
      <component 
        v-for="item in doc" 
        :is="`DocTemplateConent${item.type}`" 
        :key="item.id" 
        :setting="item"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.docContent{
  width: 100%;
  overflow: auto;
  background: var(--app-grey-900);
  padding: var(--app-space-s);
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
