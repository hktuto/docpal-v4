<script lang="ts" setup>

import { TabManagerKey } from '#imports'
const tabProvider = inject(TabManagerKey)
if(!tabProvider) {
    throw createError('tab manger not found')
}
const icon = computed(() => {
    return tabProvider.menuStick.value ? 'tabler:layout-sidebar-left-collapse-filled' : 'tabler:layout-sidebar-left-expand-filled'
})
</script>

<template>
    <Icon :name="icon" @click="tabProvider.toggleMenuStick" style="cursor: pointer;" />

</template>