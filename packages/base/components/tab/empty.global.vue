<script lang="ts" setup>
import {appMenu} from '#imports'
import { TabManagerKey } from '#imports';

const props = defineProps<{tab: any}>()
const counter = ref(0)
const tabManager = inject(TabManagerKey)
if(!tabManager){
    throw createError('Tab manger not found')
}


</script>
<template>
    <div class="emptyContainer">
        <div class="content">
            <div class="tabId">
                <small>tab id: </small>  <br/>
                {{ tab.id }} 
            </div>
        <div class="menuGrid">
            <div v-for="item in appMenu" :key="item.id" class="menuItem">
                <Icon :name="item.icon" />
            </div>
        </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.menuGrid{
    display:grid;
    grid-template-columns: repeat(6, 1fr);
    gap: var(--app-space-s);
    padding-block: var(--app-space-s);
    @container (max-width: 640px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @container (max-width: 480px) {
        grid-template-columns: repeat(2, 1fr);
    }
}
.menuItem{
    padding: var(--app-space-xs);
    background: var(--app-grey-1000);
    color: var(--app-grey-300);
    border: 1px solid var(--app-grey-800);
    border-radius: var(--app-border-radius-s);
    font-size: var(--app-font-size-l);
    display: grid;
    place-items: center;
    &:hover{
        color: var(--app-main-color);
    }
}
.emptyContainer{
    width:100%;
    height: 100%;
    display: grid;
    place-items: center;
}
</style>