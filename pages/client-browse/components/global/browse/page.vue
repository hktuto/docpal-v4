<script lang="ts" setup>
const props = defineProps<{
  idOrPath: string
  filter: any
  home: any
  commentId: string
  expandedItems: any[]
  showInfo: boolean
}>()

</script>

<template>
  <div class="pageContainer">
    <BrowseTablePage v-bind="props" :isReload="true"> </BrowseTablePage>
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
