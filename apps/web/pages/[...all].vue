<script setup lang="ts">
const route = useRoute()
</script>

<template>
    <NuxtLayout name="auth">
        {{ $route.params }}
    </NuxtLayout>
</template>

<style scoped lang="scss">

</style>