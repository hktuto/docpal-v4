<script lang="ts" setup>

const props = defineProps<{ 
    idOrPath: string ,
    filter: any,
    home: any,
}>();



</script>

<template>
    <div class="pageContainer" >
        <BrowsePageComponent v-bind="props" >
        </BrowsePageComponent>
    </div>
</template>

<style lang="scss" scoped>
.pageContainer {
  height: 100%;
  width: 100%;
  padding: var(--app-space-s);
  overflow: hidden;
  position: relative;
}
</style>