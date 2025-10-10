<template>
  <div ref="nodeWrapper" :class="['org-chart-node-wrapper',  `rbac-node-${data.status}`]">
    <div class="person-name">{{ data.name }}</div>
      <div class="person-count" v-if="data.count">Count: {{ data.count }}</div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

interface NodeData {
  id: string
  name: string
  grade?: string
  tag?: string
  style?: Record<string, string | number>
  children?: any[]
  parentId?: string
  count?: number
}

const props = defineProps<{
  node: {
    getData: () => NodeData
    trigger: (event: string, ...args: any[]) => void
  }
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()

const data = computed(() => props.node.getData() || {})
const hasChildren = computed(() => data.value.children?.length > 0)
const nodeWrapper = ref<HTMLDivElement>()
// 动态更新节点内容
function updateNodeContent() {
  length.value = length.value === 1 ? 4 : 1
  // 计算新的高度并更新节点
  setTimeout(() => {
    nodeWrapper.value.style.height = '400px'
    const bbox = props.node.getBBox() // 获取节点的边界框
    console.log(bbox)
    props.node.resize(bbox.width, 400) // 根据边界框调整节点大小
  }, 1000)
}
function handleClick() {
  // updateNodeContent()
}
</script>

<style scoped>
.org-chart-node-wrapper {
  transition: all 0.3s;
  cursor: pointer;
  position: relative;
  z-index: 2;
  pointer-events: all;
  background: var(--app-grey-950);
  border-radius: var(--app-border-radius-m);
  padding: var(--app-space-s);
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: var(--node-height);
  min-width: var(--node-width);
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    z-index: 10;
  }
}
.rbac-node-2 {
  background: var(--app-grey-9500);
}
</style>
