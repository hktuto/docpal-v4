<script lang="ts" setup>
  const props = defineProps<{
    content: string
  }>()
</script>


<template>
  <div>
    
    viewer

    {{ content }}
    {{ data }}
  </div>
</template>
