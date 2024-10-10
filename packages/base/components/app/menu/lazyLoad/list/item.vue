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