<script lang="ts" setup>

import { TabManagerKey } from '#imports'
const tabProvider = inject(TabManagerKey)
if(!tabProvider) {
    throw createError('tab manger not found')
}

</script>

<template>
    <Icon name="tabler:layout-sidebar-filled" @click="tabProvider.toggleMenuStick" style="cursor: pointer;" />

</template>