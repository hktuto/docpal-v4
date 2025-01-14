<script setup lang="ts">
import { MenuRouterKey } from '#imports';
import {FolderOpened} from '@element-plus/icons-vue'
import { computed } from 'vue'

const routerProvider = inject(MenuRouterKey)

const props = withDefaults(defineProps<{
  path: string
  displayPath: string
  canOpen: boolean
  fileName: string
  openParent: boolean
}>(),{
  path:'',
  displayPath:"",
  canOpen: false,
  openParent: false
})
const splitPath = computed(() => {
  return !props.path ? [] : props.path.split('/')
})
const displayPathLabel = computed(() => {
  if(splitPath.value.length <= 3) return props.displayPath
  const last2Items = splitPath.value.slice(-2);
  return '...' + last2Items.join('/');
})

function openPath(){
  if(props.canOpen){
    const path = props.openParent ? splitPath.value.slice(0, -1).join('/') : props.path
    const newItem = {
      id: 'client-browse',
      name: path,
      icon: 'dp-icon:browse-outline',
      hoverIcon: 'dp-icon:browse-fill',
      label: props.fileName,
      component: "LazyBrowsePage",
      props:{
        query:{
          idOrPath:path,
          selectFile: props.fileName
        }
      }
    }
    routerProvider?.navigateTo(newItem);
  }
}
</script>

<template>
  <el-tooltip
    effect="dark"
    placement="top-start"
  >
    <template #content> <div class="pathPoper">{{ displayPath }}</div> </template>
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
  </el-tooltip>
</template>

<style scoped lang="scss">
.logicalPathText{
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  &.canOpen{
    cursor: pointer;
  }
  .label{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
