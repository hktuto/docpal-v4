<script lang="ts" setup generic="T extends MenuItem">
import type {MenuItem} from '#imports'
import {menuKey} from '#imports';
const tabProvider = inject(TabManagerKey)
if(!tabProvider) {
    throw createError('tab manger not found')
}
const { item } = defineProps<{item :MenuItem, selected:boolean, mode:'collapse' | 'expand' }>()
const emits = defineEmits(['contextmenu'])


const dropOtion:UseDraggableParam = {
    key: menuKey,
    dragData: {
        key: menuKey,
        type: 'menu',
        data: item
    },
    detectDrop: false,
}

if(item.onDropItself) {
    dropOtion.detectDrop = true
    dropOtion.onDropItself = item.onDropItself;
}

function itemClick() {
    if(item.children && item.children.length > 0) {
        opened.value = !opened.value
        return;
    }
    if(item.component) {
        tabProvider?.openTab(item)
    }
}

const { dragState ,setupDrag } = useDragable(dropOtion)

const { t} = useI18n()
const opened = ref(false)

const elRef = ref()
onMounted(() => {
    if(!elRef) return
    setupDrag(elRef.value)
})

onUnmounted(() => {
    // cleanup()
})
</script>
<template>
    <div :class="{menuExpanItemContainer:true, opened, selected}">
       <div ref="elRef"  class="menuItem"  @click="itemClick">
           <div class="menuIcon">
               <Icon :name="item.icon"></Icon>
           </div>
           <div class="menuLabel">
               {{ t(item.label) }}
           </div>
           <div v-if="item.children && item.children.length > 0" class="menuIcon dropdown" >
                <Icon :name="opened ? 'lucide:chevron-up' : 'lucide:chevron-down'"  />
           </div>
       </div>
       <div v-if="opened" class="expendItem">
        <!-- {{ item.children }} -->
            <AppMenuItemExpane v-for="subItem in item.children" :key="subItem.id" :item="subItem" :selected="false" :mode="mode" />
            <!-- <AppMenuItemCollapseSubmenu v-for="subItem in item.children" :key="subItem.id" :subMenuItem="subItem" /> -->
       </div>
       <Teleport v-if="dragState.type === 'preview'" :to="dragState.container">
            <div class="dropPreviewFile">
                <Icon v-if="item.icon" :name="item.icon"></Icon>
            </div>
        </Teleport>
    </div>
</template>

<style lang="scss" scoped>
.menuItem{
    --item-bg: transparent;
    font-size: var(--app-font-size-m);
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: var(--app-space-xs);
    background: var(--item-bg);
    padding: var(--app-space-xs)  var(--app-space-xs);
    border-radius: var(--app-border-radius-s);
    color: var(--app-grey-350);
    .menuLabel{
        flex:1 0 auto;
        color: var(--app-grey-400);
        font-weight: 400;
        font-size: var(--app-font-size-m);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    cursor: pointer;
    
    &:hover{
        --item-bg: linear-gradient(180deg, hsl(200, 0%,97%) 0%, hsl(200, 0%,99%) 20%);
        
        color: var(--app-grey-100);
        box-shadow: var(--app-shadow-s);
        .menuIcon, .menuLabel{
            color: var(--app-grey-100);
        }
    }
    .menuIcon{
        font-size: calc(var(--app-font-size-m) + 2px);
        color: var(--app-grey-600);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .dropdown{
        margin-left: var(--app-space-m);

    }
    .menuLabel{
        flex: 1;
    }
}
.menuExpanItemContainer{
    width:100%;
    transition: all 0.2s ease-in-out;
    &.opened {
        // background: linear-gradient(180deg, hsl(200, 0%,97%) 0%, hsl(200, 0%,99%) 20%);;
        margin-bottom: var(--app-space-xs);
        // border-bottom: 1px solid var(--app-grey-800);
    }
}
.expendItem{
    padding: var(--app-space-xs) 0 var(--app-space-xs) var(--app-space-s) ;
    
}

.dropPreviewFile{
    padding: var(--app-space-xs);
    border-radius: var(--app-border-radius-s);
    background: var(--app-grey-1000);
    color: var(--app-main-color);
}
</style>