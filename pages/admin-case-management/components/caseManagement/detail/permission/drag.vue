<template>
  <div class="drag-container">
    <div v-for="(item,lIndex) in list" :key="lIndex">
      <div>{{convertToTitleCase(lIndex)}}</div>
      <draggable
          class="list-group"
          :list="item"
          group="people"
          @change="log"
          itemKey="id"
        >
          <template #item="{ element, index }">
            <div class="list-group-item">
              <SvgIcon class="handle-icon" src="/icons/drag.svg" />
              {{ element.id }}</div>
          </template>
        </draggable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import draggable from "vuedraggable";
const props = defineProps(['list'])
function convertToTitleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
</script>
<style lang="scss" scoped>
.drag-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--app-space-xs);
}
.list-group {
  height: 100%;
  background-color: #606266;
  padding: var(--app-space-xs);
  &-item {
    background-color: #fff;
    margin-bottom: var(--app-input-padding);
    padding: var(--app-input-padding);
    display: flex;
    align-items: center;
  }
}
</style>
