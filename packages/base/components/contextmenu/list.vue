<script lang="ts" setup>


const {items} = defineProps<{
    items:TableMenuActions[]
}>();


</script>

<template>
    <ul class="vxe-context-menu--option-wrapper">
        <ContextmenuItem v-for="(item, index) in items" :key="index" :item="item" />
    </ul>
</template>