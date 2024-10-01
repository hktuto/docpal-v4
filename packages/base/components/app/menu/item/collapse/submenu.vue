<script lang="ts" setup>
const { subMenuItem } = defineProps<{ subMenuItem: MenuItem }>()
const elRef = ref()

const opened = ref(false)

const tabProvider = inject(TabManagerKey)
if(!tabProvider) {
    throw createError('tab manger not found')
}

const { dragState ,setupDrag } = useDragable({
        key: menuKey,
        dragData: {
            key: menuKey,
            data: subMenuItem
        },
        detectDrop: false,
    })

onMounted(() => {
    if(subMenuItem.inlineRender) return
    setupDrag(elRef.value)
})

onUnmounted(() => {
})
</script>

<template>
<div ref="elRef" class="subMenuItem">
    <div :class="{header:true, opened}" @click="opened = !opened">
        <Icon v-if="!opened && subMenuItem.icon" :name="subMenuItem.icon" />
        <Icon v-else-if="subMenuItem.icon"  class="hoverIcon" :name="opened ? subMenuItem.hoverIcon : subMenuItem.icon"  />
        <span class="label">{{ subMenuItem.label }}</span>
        <Icon v-if="subMenuItem.inlineRender" :name="opened ? 'lucide:chevron-up' : 'lucide:chevron-down'" class="toggler"  />
    </div>
    <template v-if="subMenuItem.inlineRender && opened">
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
    </template>
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