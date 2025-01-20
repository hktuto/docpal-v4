<script lang="ts" setup>

</script>

<template>
  <NuxtLayout class="fit-height">
      <ElButton @click="$router.push('/editor')">Editor Example</ElButton>
      <ElButton @click="$router.push('/viewer')">Viewer Example</ElButton>
  </NuxtLayout>
</template>

<style scoped lang="scss">
.page{
    width:100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-rows: min-content 1fr;
    padding: calc( var(--app-space-xs) * 1.5);
}
</style>