<script lang="ts" setup>
import type { ToolbarItem } from './index.vue'
const { item, level } = defineProps<{
    item: ToolbarItem,
    level: number
}>();

const opened = ref(false)

function itemClickHandler(){
    if(item.callback){
        item.callback()
    }
    if(!item.children || item.children.length > 0){
        opened.value = !opened.value
    }
}


</script>

<template>
    <div class="itemContainer">
        <div class="labelContainer" @click="itemClickHandler">
            <Icon v-if="item.icon" :name="item.icon"  />
            <div class="label">{{  item.label }}</div>
        </div>
        <div v-if="item.children && item.children.length > 0" v-show="opened" class="childrenContainer">
            <AppToolbarItem v-for="child in item.children" :item="child" :level="level + 1" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.labelContainer{
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: var(--app-space-xs);
    cursor: pointer;
    .label{
        font-size: var(--app-font-size-s);
        color: var(--app-grey-950);
    }
}
.childrenContainer{
    position: absolute;
    top: 100%;
    left: 0;
}
</style>
