<script lang="ts" setup>
import type { MenuItem } from '#imports'

const props= defineProps<{
  item: MenuItem
  selected: boolean
}>()
const emit = defineEmits(['click', 'hover', 'mouseOut'])
const dropOtion:any = {
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
const { t } = useI18n()

function mouseOver() {
  if(!props.item.children || props.item.children.length === 0) {
    emit('mouseOut')
    return;
  }
  emit('hover', props.item)
}
onMounted(() => {
    if(!elRef) return
    if(props.item.component && props.item.component !== '') {
        // only dragable if no children
        setupDrag(elRef.value)
    }
})
</script>

<template>
  <div ref="elRef" :class="{menuItem:true, selected}" 
    v-tooltip="t(item.label || '')"
  @click="emit('click', props.item)" @mouseover="mouseOver">
  <div class="icon">
    <template v-if="selected && item.hoverIcon">
      <Icon :name="item.hoverIcon"></Icon>
    </template>
    <template v-else>
      <Icon :name="item.icon"></Icon>
    </template>
  </div>
    <div class="label">
      {{ t(item.label || '') }}
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
  --app-shadow-color-h: var(--app-primary-h);
  --app-shadow-color-s: var(--app-primary-s);
  --app-shadow-color-l: var(--app-primary-l);
  cursor: pointer;
  width: var(--app-space-xl);
  padding-block: var(--app-space-xs);
  line-height: 1;
  // padding: var(--app-space-xs);
  border-radius: var(--app-border-radius-s);
  display: grid;
  place-items: center;
  gap: var(--app-space-xxs);
  transition: all 0.2s ease-in-out;
  border: 1px solid rgba(255, 255, 255, 0);
  .icon{
    font-size: calc(var(--app-font-size-xl) * 0.8);
    line-height: 0;
  }
  &.selected{
    background: var(--app-primary-color) !important;
    box-shadow: var(--app-shadow-primary-l);
    color: var(--app-paper);
    &:hover{
      color: var(--app-paper);
    }
  }
  &:hover{
    color: var(--app-primary-color);
    background: rgba(255, 255, 255, 0.6);
    box-shadow: var(--app-shadow-m);
    backdrop-filter: blur(6.3px);
    -webkit-backdrop-filter: blur(6.3px);
    border: 1px solid rgba(255, 255, 255, 0.31);
  }
}
.label{
  width: 100%;
  font-size: var(--app-font-size-xs);
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}
</style>
