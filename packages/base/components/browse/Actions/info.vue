<template>
    
    <SvgIcon id="infoActionButton" src="/icons/file/info.svg"  
                :content="$t('rightDetail_info')"
                round
                @click="itemClicked"></SvgIcon>
</template>

<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'
const emits = defineEmits<{
    (event: 'itemClicked', ...args: any[]): void
}>();
function itemClicked(){
    emits('itemClicked');
}
onMounted(() => {
    useEventListener(document, 'docActionInfo', (event) => itemClicked(event.detail))  
})
</script>


<style lang="scss">
#infoActionButton{
    color: var(--app-grey-300);
    margin-left: var(--app-space-xs);
}
</style>

