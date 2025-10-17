<script lang="ts" setup>
import type { MenuItem } from '#imports'

const props= defineProps<{
  item: MenuItem,
  selected: boolean
}>()

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
const { dragState ,setupDrag } = useDragable(dropOtion)
const elRef = ref()
onMounted(() => {
    if(!elRef) return
    if(props.item.component && props.item.component !== '') {
        // only dragable if no children
        setupDrag(elRef.value)
    }
})
</script>

<template>
  <div ref="elRef" :class="{menuItem:true, selected}" @click="$emit('click', props.item)">
    <Icon :name="item.icon"></Icon>
    <div class="label">
      {{ $t(item.label) }}
    </div>
    <slot />
  </div>
  <Teleport v-if="dragState.type === 'preview'" :to="dragState.container">
            <div class="dropPreviewFile">
                <Icon v-if="item.icon" :name="item.icon"></Icon>
            </div>
        </Teleport>
</template>

<style scoped lang="scss">
.menuItem{
  
  cursor: pointer;
  width: 100%;
  line-height: 1;
  padding: var(--app-space-xs);
  border-radius: var(--app-border-radius-s);
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: var(--app-space-xs);
  color: var(--app-grey-200);
  .label{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  transition: all 0.2s ease-in-out;
  &.selected{
    background: var(--app-primary-color) !important;
    color: var(--app-paper) !important;
    box-shadow: var(--app-shadow-s);
  }
  &:hover{
    box-shadow: var(--app-shadow-s);
    background: var(--app-primary-alpha-30);
  }
}
</style>
