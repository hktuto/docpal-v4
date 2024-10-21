<script lang="ts" setup>
import {useActiveElement, useMagicKeys, whenever} from '@vueuse/core'

const { subMenuItem } = defineProps<{ subMenuItem: MenuItem }>()
const elRef = ref()
const activeElement = useActiveElement()
const itemId = ref(subMenuItem.id)
const { enter} = useMagicKeys()

const isFocusWithin = computed(() => {
    return (tabProvider?.dialogOpened.value || activeElement.value?.parentElement?.classList.contains('inlineListContainer'))
})

const opened = ref(false)
const dialogOpened = ref(false)

whenever(logicAnd(enter, isFocusWithin, dialogOpened), () => {
    if(tabProvider?.dialogOpened.value){
        tabProvider?.closeDialog();
        addTabInCurrentPanel(subMenuItem as any)
    }
})

const tabProvider = inject(TabManagerKey)
if(!tabProvider) {
    throw createError('tab manger not found')
}

const dropOtion:UseDraggableParam = {
    key: menuKey,
    dragData: {
        key: menuKey,
        type: 'menu',
        data: subMenuItem
    },
    detectDrop: false,
}

if(subMenuItem.onDropItself) {
    dropOtion.detectDrop = true
    dropOtion.onDropItself = subMenuItem.onDropItself;
}
if(subMenuItem.canDrop) {
    dropOtion.canDrop = subMenuItem.canDrop
}
const { dragState ,setupDrag } = useDragable(dropOtion)

function itemClickHandler(item:MenuItem) {
    if(item.isList || item.inlineRender) {
        opened.value = !opened.value
    }else{
        dialogOpened.value = true;
        tabProvider?.openNewDialog(subMenuItem)
    }
}

watch(tabProvider.dialogOpened, (bool) => {
    if(!bool) {
        console.log("dialog closed")
        dialogOpened.value = false
    }
})

onMounted(() => {
    setupDrag(elRef.value)
})

onUnmounted(() => {
})
</script>

<template>
<div ref="elRef" :class="{subMenuItem:true, detectDrop: !!subMenuItem.onDropItself, [dragState.type]:true}">
    <div :class="{header:true, opened}" @click="itemClickHandler(subMenuItem)">
        <Icon v-if="!opened && subMenuItem.icon" :name="subMenuItem.icon" />
        <Icon v-else-if="subMenuItem.icon"  class="hoverIcon" :name="opened ? subMenuItem.hoverIcon : subMenuItem.icon"  />
        <span class="label">{{ subMenuItem.label }}</span>
        <Icon v-if="subMenuItem.isList" :name="opened ? 'lucide:chevron-up' : 'lucide:chevron-down'" class="toggler"  />
    </div>
    <template v-if="subMenuItem.isList && opened">
        <div class="child">
            <Transition appear name="fade">
                <KeepAlive>
                    <Suspense>
                        <AppMenuLazyLoadList v-bind="subMenuItem.props" />
                        <template #fallback>
                            <LoadingBgInline />
                        </template>
                    </Suspense>
                </KeepAlive>
            </Transition>
        </div>
    </template>
    <template v-if="subMenuItem.inlineRender && opened">
        <KeepAlive>
            <Suspense>
                <component :is="resolveComponent(subMenuItem.component)" :tab="subMenuItem" v-props="subMenuItem.props" />
            </Suspense>
        </KeepAlive>
    </template>
    <!-- <template v-if=subMenuItem.isList && opened">
        <div class="child">

            <Transition appear name="fade">
                <KeepAlive>
                    <Suspense>
                        <component :is="resolveComponent(subMenuItem.component)" :tab="subMenuItem" />
                        <template #fallback>
                            <LoadingBgInline />
                        </template>
                    </Suspense>
                </KeepAlive>
            </Transition>
        </div>
    </template> -->
    <Teleport v-if="dragState.type === 'preview'" :to="dragState.container">
        <div class="dropPreviewFile">
            <Icon v-if="subMenuItem.icon" :name="subMenuItem.icon"></Icon>
            <span>{{ subMenuItem.label }}</span>
        </div>
    </Teleport>
    
</div>
</template>

<style lang="scss" scoped>
.dropPreviewFile{
    padding: var(--app-space-xs);
    border-radius: var(--app-border-radius-s);
    background: var(--app-grey-1000);
    color: var(--app-main-color);
}
.subMenuItem{
    font-size: var(--app-font-size-m);
    color: var(--app-grey-500);
    &.detectDrop{
        &.is-dragging-over {
            outline: 1px dashed var(--app-grey-800);
            border-radius: var(--app-border-radius-s);
        }
    }
}
.child{
    padding-bottom: var(--app-space-s);
}
.header{
    width:100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    padding-block: var(--app-space-xs);
    gap:var(--app-space-xs);
    cursor: pointer;
    &.opened{
        color: var(--app-grey-300);
        font-weight: bold;
    }
    .label{
        flex: 1 0 auto;
    }
}

.hoverIcon{
    color: var(--app-success-4);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>