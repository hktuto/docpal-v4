<script lang="ts" setup>

const tabProvider = inject(TabManagerKey)
const routerProvider = inject(MenuRouterKey)
if(!tabProvider || !routerProvider) {
    throw new Error('MenuRouterKey is not provided')
}

</script>


<template>
    user list
</template>