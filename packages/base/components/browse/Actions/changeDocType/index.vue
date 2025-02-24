<template>
    <div style="--icon-color: var(--app-primary-color)">
        <SvgIcon src="/icons/file/changeDocType.svg"  
            :content="$t('tip.changeDocType')"
            @click="iconClickHandler(doc)"></SvgIcon>
        
    </div>
    
</template>

<script lang="ts" setup>

const emits = defineEmits(['success'])

function iconClickHandler(doc:any) {
    const ev = new CustomEvent('docActionChangeDocType', { detail: doc })
    document.dispatchEvent(ev)
}

defineExpose({ iconClickHandler })
</script>
<style lang="scss" scoped>
main {
    display: grid;
    grid-template-columns: 30% min-content 1fr;
    gap: var(--app-space-xs);
    .border {
        border-right: 1px solid #ddd;
    }
}
</style>
