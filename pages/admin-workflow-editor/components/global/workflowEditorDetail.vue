<script lang="ts" setup>
import {MenuRouterKey} from '#imports'
const menuManager = inject(MenuRouterKey)
if(!menuManager) {
    throw createError('menu manger not found')
}

</script>

<template>
    detail
</template>