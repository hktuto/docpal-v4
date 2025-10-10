
<script lang="ts" setup>
import {addTabInCurrentPanel} from '#imports'

const { item, selected, tabindex, index } = defineProps<{ item: any , selected:boolean, tabindex:number, index:number}>()

const tabProvider = inject(TabManagerKey)
if(!tabProvider) {
    throw createError('tab manger not found')
}
const clickTimeout = ref()
const emits = defineEmits(['focus', 'itemClick'])
const elRef = ref()


const { dragState ,setupDrag } = useDragable({
    key: menuKey,
    dragData: {
        key: menuKey,
        type: 'collection',
        data: item.tabData
    },
    // TODO : allow Drop file to collection
    detectDrop: false,
})


function itemClick(){
    if(clickTimeout.value) {
        clearTimeout(clickTimeout.value)
    }
    clickTimeout.value = setTimeout(() => {
        emits('itemClick', index)
    }, 200)
}


function itemDblclick(){
    if(clickTimeout.value) {
        clearTimeout(clickTimeout.value)
    }
    addTabInCurrentPanel(item.tabData)
}

function itemFocus(){
    elRef.value.focus()
}

onMounted(() => {
    setupDrag(elRef.value)
})


</script>

<template>
<div ref="elRef" :class="{item:true, selected}" @click="itemClick"  @dblclick="itemDblclick" :tabindex="tabindex" @mouseenter="itemFocus" >
        {{ item.name}}
    </div>
    <Teleport v-if="dragState.type === 'preview'" :to="dragState.container">
            <div class="dropPreviewFile">
                {{ item.name }}
            </div>
        </Teleport>

</template>

<style lang="scss" scoped>
.item{
    width: 100%;
        padding: var(--app-space-xxs) var(--app-space-xs);
        border-radius: var(--app-border-radius-s);
        // background: var(--app-grey-950);
        color: var(--app-grey-300);
        font-size: var(--app-font-size-s);
        cursor: pointer;
        &:hover, &:focus{
            background: var(--app-grey-950);
        }
        &.selected{
            background: var(--app-grey-950);
        }
    }

    .dropPreviewFile{
        padding: var(--app-space-xs);
        border-radius: var(--app-border-radius-s);
        background: var(--app-grey-950);
        color: var(--app-main-color);   
    }
</style>
