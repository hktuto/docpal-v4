<script setup lang="ts">
import type { NuxtError } from '#app'
const props = defineProps<{error:any}>()

const handleError = () => window.location.reload()
</script>

<template>
  <NuxtLayout name="error">
    <h2 v-if="error">Error : {{ error.statusCode }}</h2>
    <pre v-if="error">
        {{  error.data  }}
    </pre>
    <NuxtLink to="/">Go back home</NuxtLink>
  </NuxtLayout>
</template>