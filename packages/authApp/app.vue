<script lang="ts" setup>
import { StagewiseToolbar, type ToolbarConfig } from '@stagewise/toolbar-vue';

const config: ToolbarConfig = {
  plugins: [], // Add your custom plugins here
};
</script>

<template>
  <ClientOnly>
      <StagewiseToolbar :config="config" />
    </ClientOnly>
    <NuxtPage />
</template>


