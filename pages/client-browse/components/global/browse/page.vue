<script lang="ts" setup>
import {BrowseListProviderKey} from '#imports'
import {clientApi} from 'api'
import {BrowseListTable} from '#components'

defineOptions({
    name: 'BrowsePage'
})

const props = defineProps<{ 
    idOrPath: string ,
    filter: any,
}>();



</script>

<template>
        
    <div class="pageContainer" >
        <BrowsePageComponent v-bind="props" >
        </BrowsePageComponent>
    </div>
</template>

<style lang="scss" scoped>
.actionRow{
    width:auto;
    display: flex;
    flex-flow: column nowrap;
}
.pageContainer{
    height: 100%;
    position: relative;
    padding: var(--app-space-s);
}
</style>