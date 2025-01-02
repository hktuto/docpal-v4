<script lang="ts" setup>
import ContextmenuList from './list.vue'
const {item, rowData} = defineProps<{
    item:TableMenuActions,
    menuItemHeight:number,
    selected: boolean,
    rowData: any
}>()

const listProvider = inject(ContextmenuListKey)

const isMouseOver = ref(false)

const bus = useEventBus<any>(EventType.TABLE_CONTEXT_MENU_CLOSE)
const subMenuRef = ref<InstanceType<typeof ContextmenuList>>()


function itemClickHandler(){
    if(item.disabled) return
    if(item.action) {
        console.log("itemClickHandler", rowData)
        item.action(rowData)
        bus.emit()
        return
    }
    if(item.children && item.children.length > 0 ) {
        listProvider?.selectItem(item)
        nextTick(() => {
            subMenuRef.value?.openMenu()
        })
    }
}


</script>

<template>
    <li :class="{['link--active']:selected || isMouseOver, ['link--disabled']: item.disabled}" @mouseover="isMouseOver = true" @mouseleave="isMouseOver = false">

        <a  class="vxe-context-menu--link" @click="itemClickHandler">
            <div class="vxe-context-menu--link-prefix"></div>
            <div class="vxe-context-menu--link-content">
                {{ item.name }}
            </div>
            <div class="vxe-context-menu--link-suffix">
                <i v-if="item.children" class="vxe-table-icon-arrow-right" />
            </div>
        </a>
        <ContextmenuList 
            v-if="selected && item.children" 
            ref="subMenuRef"
            :items="item.children" 
            class="is--show"
            isChild :menuItemHeight="menuItemHeight" 
            :rowData="rowData" 
            />
    </li>
</template>
