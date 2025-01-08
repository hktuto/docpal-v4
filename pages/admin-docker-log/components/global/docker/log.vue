<script lang="ts" setup>
const routerProvider = inject(MenuRouterKey)
if(!routerProvider) {
    throw createError('MenuRouterKey is not provided')
}
const iframe = ref();

const hostname = computed(() => location.host.includes('localhost') ? 'http://132.148.160.88:8989' : location.protocol + '//' + location.host)


</script>


<template>

    <div class="pageContainer">
        <iframe ref="iframe" :src="`${hostname}/container_logs/`" crossorigin allowfullscreen   />
    </div>
</template>


<style lang="scss" scoped>
.pageContainer{
    position: relative;
    height: 100%;
    width:100%;
    iframe{
        width: 100%;
        height: 100%;
        overflow: hidden;
        border: none;
        border-radius: var(--app-space-xs);
        // opacity:0;
        transition: opacity .3s ease-in-out;
        &.show{
            opacity:1;
        }
    }
}
</style>