<script lang="ts" setup>

const props = defineProps<{
    id: string,
    name: string,
    currentVersion: string,
}>()

const routerProvider = inject(MenuRouterKey)
if(!routerProvider) {
    throw new Error('MenuRouterKey not found')
}

const caseDetailData = ref();



</script>

<template>
    detail
</template>