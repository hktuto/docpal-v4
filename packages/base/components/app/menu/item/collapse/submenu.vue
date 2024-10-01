<script lang="ts" setup>
const { subMenuItem } = defineProps<{ subMenuItem: MenuItem }>()

const opened = ref(false)
</script>

<template>
<div class="subMenuItem">
    <div :class="{header:true, opened}" @click="opened = !opened">
        <Icon v-if="!opened" :name="subMenuItem.icon" />
        <Icon v-else :name="opened ? subMenuItem.hoverIcon : subMenuItem.icon" />
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
</div>
</template>

<style lang="scss" scoped>
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

    

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>