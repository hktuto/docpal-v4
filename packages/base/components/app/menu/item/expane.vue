<script lang="ts" setup generic="T extends MenuItem">
import type {MenuItem} from '#imports'
import {menuKey} from '#imports';
const tabProvider = inject(TabManagerKey)
if(!tabProvider) {
    throw createError('tab manger not found')
}
const props = defineProps<{item :MenuItem, selectedMenuItem?:TabItem, menuMode?:'collapse' | 'expand'}>()
const { selectedMenuItem } = toRefs(props)
const emits = defineEmits(['contextmenu'])

const selected = ref(false)
const dropOtion:UseDraggableParam = {
    key: menuKey,
    dragData: {
        key: menuKey,
        type: 'menu',
        data: props.item
    },
    detectDrop: false,
}

if(props.item.onDropItself) {
    dropOtion.detectDrop = true
    dropOtion.onDropItself = props.item.onDropItself;
}

function itemClick() {
    if(props.item.children && props.item.children.length > 0) {
        opened.value = !opened.value
        return;
    }
    if(props.item.component) {
      console.log('itemClick',props.item.component)
        tabProvider?.openInCurrentTab(props.item)
    }
}

const { dragState ,setupDrag } = useDragable(dropOtion)

const { t} = useI18n()
const opened = ref(false)

const elRef = ref()

watch(selectedMenuItem, (newSelectedMenuItem) => {
    if(!newSelectedMenuItem) return
    if(props.item.name && newSelectedMenuItem.name === props.item.name) {
        selected.value = true
        return
    }
    if(props.item.children) {
        const selectedChild = props.item.children.some(subItem => subItem.name === newSelectedMenuItem.name)
        
        if(selectedChild) {
            selected.value = true
            return
        }
    }
    selected.value = false
})

onMounted(() => {
    if(!elRef) return
    if(!props.item.children || props.item.children.length === 0) {
        // only dragable if no children
        setupDrag(elRef.value)
    }
})

onUnmounted(() => {
    // cleanup()
})
</script>
<template>
    <div :class="{menuExpanItemContainer:true, opened, selected, children: item.children && item.children.length > 0}">
       <div ref="elRef" :id="(item.id || item.label) + 'menu' "  class="menuItem"  @click="itemClick">
           <div class="menuIcon" v-tooltip="t(item.label)">
               <Icon :name="item.icon"></Icon>
           </div>
           <div v-if="menuMode === 'expand'" class="menuLabel">
               {{ t(item.label) }}
           </div>
           <!-- <div v-if="item.children && item.children.length > 0" class="menuIcon dropdown" >
                <Icon :name="opened ? 'lucide:chevron-up' : 'lucide:chevron-down'"  />
           </div> -->
       </div>
       <div v-show="opened" :class="{expendItem:true, [menuMode]:true}">
        <!-- {{ item.children }} -->
            <AppMenuItemExpane v-for="subItem in item.children" menuMode="expand" :key="subItem.id" :item="subItem" :selectedMenuItem="selectedMenuItem" />
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
    overflow: visible;
    .menuLabel{
        flex:1 0 auto;
        color: var(--text-color);
        font-weight: 400;
        font-size: var(--app-font-size-m);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    cursor: pointer;
    
    &:hover{
        --item-bg: linear-gradient(180deg, hsl(200, 0%,97%) 0%, hsl(200, 0%,99%) 20%);
        
        color: var(--app-success-4);
        box-shadow: var(--app-shadow-s);
        .menuIcon, .menuLabel{
            color: var(--app-success-4);
        }
    }
    .menuIcon{
        font-size: calc(var(--app-font-size-m) + 2px);
        color: var(--text-color);
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
    --menu-bg: transparent;
    --text-color: var(--app-success-6);
    background: var(--menu-bg);
    position: relative;
    z-index: 2;
    isolation: isolate;
    &.opened {
        // background: linear-gradient(180deg, hsl(200, 0%,97%) 0%, hsl(200, 0%,99%) 20%);;
        margin-bottom: var(--app-space-xs);
        // border-bottom: 1px solid var(--app-grey-800);
    }
    &.selected {
        &.children{
            --text-color: var(--app-accent-color);
            > .menuItem{
                .menuLabel, .menuIcon{
                    --text-color: var(--app-accent-color);
                    
                }
            }
        }
        --menu-bg: var(--app-grey-1000);
        border-radius: var(--app-border-radius-s);
        > .menuItem{
            .menuLabel, .menuIcon{
                --text-color: var(--app-accent-color);
                font-weight: 700;
            }
        }
        .menuItem {
            &:hover{
                background: var(--app-grey-950);
            }
        }
    }
}
.expendItem{
    padding: var(--app-space-xs);
    border-radius: var(--app-border-radius-s);
    box-shadow: var(--app-shadow-m);
    &.collapse{
        position: absolute;
        left:30px;
        top:0;
        width:200px;
        background: var(--app-grey-1000);
        z-index: -1;
    }
}

.dropPreviewFile{
    padding: var(--app-space-xs);
    border-radius: var(--app-border-radius-s);
    background: var(--app-grey-1000);
    color: var(--app-main-color);
}
</style>
