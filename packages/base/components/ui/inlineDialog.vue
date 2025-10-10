<script lang="ts" setup>
const {destroyOnClose = false, title='', hideCloseButton = false} = defineProps<{
    destroyOnClose?: boolean,
    title?: string,
    hideCloseButton?: boolean,
}>()
const modelValue = defineModel<boolean>({required:true})

</script>


<template>
    <div :class="{inlineDialogContainer:true, opend:modelValue}">
        <div class="header">
            <div class="title">{{ title }}</div>
            <div v-if="!hideCloseButton" class="close" @click="modelValue = false">
                <Icon name="lucide:x" />
            </div>
        </div>
        <div v-if="modelValue" class="body">
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.inlineDialogContainer{
    width:100%;
    height:100%;
    left:0;
    top:0;
    position:absolute;
    z-index: 9;
    display: none;
    background: var(--app-grey-950);
    &.opend{
        display: block;
    }
}
</style>
