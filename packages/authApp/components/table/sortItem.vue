<script lang="ts" setup>
import type { TableColumnItem } from '#imports';


const props = defineProps<{
    element: TableColumnItem
}>()
const emit = defineEmits(['change'])
const handleSubmit = () => {
    emit('change', props.element)
}

</script>

<template>
    <div class="list-group-item" v-if="!element.hideSort" :data-testid="`table-sort-${element.label}`">
        <div v-if="!element.fixed"  class="handle">
            <SvgIcon src="/icons/move-handle.svg" />
        </div>
            <div class="label">
            {{ $t(element.label || element.type)}}
            </div>
            <div v-if="!element.canNotDelete" class="show">
            <el-switch v-model="element.show" :disabled="element.defaultColumn" @change="handleSubmit"/>
            </div>
        </div>
</template>

<style lang="scss" scoped>
.list-group-item {
    display: grid;
    grid-template-columns: 20px 1fr 40px;
    grid-template-areas: 'handle label toggle';
    padding: calc(var(--app-space-xs)) calc(var(--app-space-xs) / 2) ;
    background: var(--app-grey-900);
    align-items: center;
    &:hover {
      background: var(--app-grey-9000);
    }
    & + & {
      border-top: 1px solid var(--app-grey-900);
    }
    .handle{
      grid-area: handle;
    }
    .label{
      grid-area: label;
    }
    .show{
      grid-area: toggle;
      justify-self: end;
    }
}
</style>
