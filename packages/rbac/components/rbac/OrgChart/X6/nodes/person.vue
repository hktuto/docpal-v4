<template>
  <div ref="nodeWrapper" class="org-chart-node-wrapper">
    <div class="org-chart-node-person" :style="nodeStyle">

      <div class="person-info">
        <div class="person-name">{{ data.name }}</div>
        <div class="person-title" v-if="data.grade">{{ data.grade }}</div>
        <div class="person-tag" v-if="data.tag">{{ data.tag }}</div>
        <div class="person-count" v-if="data.userCount">人数: {{ data.userCount }}</div>
      </div>
    </div>
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
  userCount?: number
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
const nodeStyle = computed(() => ({
  background: '#fff',
  border: '1px solid #ddd',
  borderRadius: '4px',
  padding: '10px',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  ...data.value.style
}))
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
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 100%;
}

.org-chart-node-person {
  transition: all 0.3s;
  cursor: pointer;
  position: relative;
  z-index: 2;
  pointer-events: all;
  background: #fff !important;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  min-width: 150px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.org-chart-node-person:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
  z-index: 10;
  background: #f0f0f0 !important;
}

.person-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 8px;
  position: relative;
  background: #fff;
}

.person-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #fff;
}

.person-info {
  text-align: center;
  position: relative;
  background: transparent;
}

.person-name {
  font-weight: bold;
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: transparent;
}

.person-title {
  font-size: 1rem;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: transparent;
}

.person-tag {
  font-size: 1rem;
  color: #666;
  margin-top: 4px;
  padding: 2px 6px;
  background: #f5f5f5;
  border-radius: 4px;
  display: inline-block;
}

.person-count {
  font-size: 1rem;
  color: #666;
  margin-top: 4px;
}
</style>
