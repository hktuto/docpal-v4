<script setup lang="ts">
import type { NuxtError } from '#app'
const {loggedIn, ready} = useAuth()
const props = defineProps({
  error: Object as () => NuxtError
})

const handleError = () => window.location.reload()
</script>

<template>
  <div>
    <h2>Error : {{ error.statusCode }}</h2>
    <pre>
        {{  error.data  }}
    </pre>
    <NuxtLink to="/">Go back home</NuxtLink>
  </div>
</template>