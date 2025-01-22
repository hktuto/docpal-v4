<template>
<div>
    <div>{{ label }}</div>
    <div class="flex-x-between">
        <b>{{ value || '-' }}</b>
        <SvgIcon v-if="!noCopy && value" size="16" src="/icons/file/copy.svg" @click="handleCopy()"></SvgIcon>
    </div>
</div>
</template>

<script lang="ts" setup>
const props = defineProps([
    'label','value', 'noCopy'
])

function handleCopy() {
    copy(props.value, $i18n.t('common_copySuccess'))
    console.log();
}
</script>
<style scoped lang="scss">
b {
    word-break: break-all;
}
</style>
