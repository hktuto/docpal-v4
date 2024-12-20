<script lang="ts" setup>

const {idOrPath} = defineProps<{ idOrPath: string }>();
const tabProvider = inject(TabManagerKey)
const routerProvider = inject(MenuRouterKey)

if(!tabProvider || !routerProvider) {
    throw createError('provider not found')
}



</script>

<template>
        
    <div class="pageContainer" >
        browse
    </div>
</template>

<style lang="scss" scoped>

.pageContainer{
    height: 100%;
    position: relative;
    padding: var(--app-space-s);
}
</style>