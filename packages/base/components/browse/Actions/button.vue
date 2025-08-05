<script setup lang="ts">
const props = defineProps<{
  label?: string
}>()
</script>

<template>
  <div class="buttonContainer">
    <slot />
    <!-- <div class="label">{{label}}</div> -->
  </div>
</template>

<style scoped lang="scss">
$label-show-size: 1920px;
.buttonContainer{
  display: flex;
  flex-flow: row nowrap;
  gap: var(--app-space-xs);
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  @container (min-width: #{$label-show-size}) {
    &:hover {
      background: var(--app-primary-color-02);
    }
  }
  .label {
    // display: none;
    color: var(--app-grey-200);
    @container (min-width: #{$label-show-size}) {
      display: block;
    }
  }
}
</style>
