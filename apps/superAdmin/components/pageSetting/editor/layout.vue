<script lang="ts" setup>
const { item } = defineProps<{
    item:any
}>()
</script>

<template>
    
    <component :is="item.component" :item="item" v-bind="{...item.props}" :style="item.additionStlyle">
        {{ item.props }}
        <template v-if="item.children" >
            <PageSettingEditorLayout v-for="child in item.children" :key="child.id" :item="child" />
        </template>
    </component>
</template>