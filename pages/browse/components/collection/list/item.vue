<script lang="ts" setup>
const { item, selected, tabindex } = defineProps<{ item: any , selected:boolean, tabindex:number}>()

const tabProvider = inject(TabManagerKey)
if(!tabProvider) {
    throw createError('tab manger not found')
}

const emtis = defineEmits(['focus'])
const elRef = ref()

const tabData = {
    id: item.id,
    label: item.name,
    icon: 'tabler:bookmark-filled',
    component:'LazyCollectionDetail',
    props:{
        collectionId: item.id
    }
}

const { dragState ,setupDrag } = useDragable({
    key: menuKey,
    dragData: {
        key: menuKey,
        type: 'collection',
        data: tabData
    },
    // TODO : allow Drop file to collection
    detectDrop: false,
})


function itemClick(){
    tabProvider?.openNewDialog(tabData)
}

function itemDblclick(){
    addTabInCurrentPanel(tabData)
}

function itemFocus(){
    elRef.value.focus()
    emtis('focus')
}

onMounted(() => {
    setupDrag(elRef.value)
})

</script>

<template>
    <li ref="elRef" :class="{item:true, selected}"  @dblclick="itemDblclick" :tabindex="tabindex" @mouseenter="itemFocus" >
        {{ item.name}}
    </li>
    <Teleport v-if="dragState.type === 'preview'" :to="dragState.container">
            <div class="dropPreviewFile">
                {{ item.name }}
            </div>
        </Teleport>
</template>

<style scoped lang="scss">
.item{
        padding: var(--app-space-xxs) var(--app-space-xs);
        border-radius: var(--app-border-radius-s);
        // background: var(--app-grey-1000);
        color: var(--app-grey-300);
        font-size: var(--app-font-size-s);
        cursor: pointer;
        &:hover, &:focus{
            background: var(--app-grey-975);
        }
        &.selected{
            background: var(--app-grey-975);
        }
    }

    .dropPreviewFile{
        padding: var(--app-space-xs);
        border-radius: var(--app-border-radius-s);
        background: var(--app-grey-1000);
        color: var(--app-main-color);   
    }
</style>