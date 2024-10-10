<script lang="ts" setup>
import {addTabInCurrentPanel} from '#imports'

const { item, selected, tabindex } = defineProps<{ item: any , selected:boolean, tabindex:number}>()

const tabProvider = inject(TabManagerKey)
if(!tabProvider) {
    throw createError('tab manger not found')
}

const emtis = defineEmits(['focus'])
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



function itemDblclick(){
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
<li ref="elRef" :class="{item:true, selected}"  @dblclick="itemDblclick" :tabindex="tabindex" @mouseenter="itemFocus" >
        {{ item.name}}
    </li>
    <Teleport v-if="dragState.type === 'preview'" :to="dragState.container">
            <div class="dropPreviewFile">
                {{ item.name }}
            </div>
        </Teleport>

</template>

<style lang="scss" scoped>
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