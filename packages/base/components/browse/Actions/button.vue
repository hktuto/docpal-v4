<script setup lang="ts">
const props = defineProps<{
  label?: string
}>()
</script>

<template>
  <div class="buttonContainer">
    <slot />
    <div class="label">{{label}}</div>
  </div>
</template>

<style scoped lang="scss">
.buttonContainer{
  display: flex;
  flex-flow: row nowrap;
  gap: var(--app-space-xs);
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  @media (max-width: 1024px) {
    &:hover {
      background: var(--app-primary-color-02);
    }
  }
  .label {
    display: none;
    color: var(--app-grey-200);
    @media (max-width: 1024px) {
      display: block;
    }
  }
}
</style>