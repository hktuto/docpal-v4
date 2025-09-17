<script setup lang="ts">
import { MenuRouterKey } from '#imports'
import { FolderOpened } from '@element-plus/icons-vue'
import { computed } from 'vue'

const routerProvider = inject(MenuRouterKey)

const props = withDefaults(defineProps<{
  path: string
  canOpen: boolean
  fileName: string
  openParent: boolean
}>(), {
  path: '',
  canOpen: false,
  openParent: false
})
const splitPath = computed(() => {
  return !props.path ? [] : props.path.split('/')
})
const displayPathLabel = computed(() => {
  if (props.path?.length <= 32 || splitPath.value.length <= 3) {
    return props.path
  }
  const last2Items = splitPath.value.slice(-2)
  return '...' + last2Items.join('/')
})

function openPath() {
  if (props.canOpen) {
    const path = props.openParent ? splitPath.value.slice(0, -1).join('/') : props.path
    const newItem = toBrowseItem(path)
    routerProvider?.navigateTo(newItem)
  }
}
</script>

<template>
  <div :class="{logicalPathText:true, canOpen}">
    <div class="label">
      {{ displayPathLabel }}
    </div>
    <el-icon
      v-if="canOpen && path"
      @click="openPath"
    >
      <FolderOpened />
    </el-icon>
  </div>
</template>

<style scoped lang="scss">
.logicalPathText {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  &.canOpen {
    cursor: pointer;
  }

  .label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
