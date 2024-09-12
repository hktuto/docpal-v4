<script setup lang="ts">
const route = useRoute()
const menuList = useMenuList()



</script>

<template>
    <NuxtLayout >
<!--        TODO: Tab Container -->
        {{ route.path }}
    </NuxtLayout>
</template>

<style scoped lang="scss">

</style>