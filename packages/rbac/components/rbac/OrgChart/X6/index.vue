<template>
  <div class="chart-container">
    <div ref="containerRef" style="width: 100%; height: 100%" @contextmenu.prevent />
    <RbacOrgChartX6ContextMenu :visible="contextMenuVisible" :position="contextMenuPosition" @edit="handleEdit" @add="handleAdd" @delete="handleDelete" />
    <RbacOrgChartX6EditSidebar :visible="sidebarVisible" :node-data="selectedNode" :is-add="isAddingNode" @close="closeSidebar" @save="handleSave" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Graph } from '@antv/x6'
import { register } from '@antv/x6-vue-shape'
import type { PropType } from 'vue'
import OrgChartNodePerson from './nodes/person.vue'
import './styles.css'

interface OrgNode {
  id: string
  name: string
  title?: string
  avatar?: string
  children?: OrgNode[]
  style?: Record<string, string | number>
  collapsed?: boolean
}

const props = defineProps({
  data: {
    type: Array as PropType<OrgNode[]>,
    required: true
  },
  nodeStyle: {
    type: Object as PropType<Record<string, string | number>>,
    default: () => ({})
  }
})

const emit = defineEmits<{
  (e: 'nodeClick', node: OrgNode): void
  (e: 'update:data', data: OrgNode[]): void
  (e: 'delete', id: string, data: OrgNode[]): void
  (e: 'add', formData: OrgNode, selectedNodeId: string): void
  (e: 'edit',formData: OrgNode, selectedNodeId: string): void
}>()

const contextMenuVisible = ref(false)
const contextMenuPosition = ref({ left: '0px', top: '0px' })
const sidebarVisible = ref(false)
const selectedNode = ref<OrgNode | null>(null)
const isAddingNode = ref(false)
const selectedCell = ref<any>(null)

// Register custom Vue shape
register({
  shape: 'org-node-person',
  width: 180,
  height: 100,
  component: OrgChartNodePerson
})

const containerRef = ref<HTMLDivElement | null>(null)
const graphRef = ref<Graph | null>(null)

const NODE_WIDTH = 180 // 节点宽度
const NODE_HEIGHT = 100 // 节点高度
const VERTICAL_GAP = 50 // 垂直间距

// 检查位置是否有碰撞
const hasCollision = (graph: Graph, x: number, y: number, excludeNode?: any) => {
  const nodes = graph.getNodes()
  const buffer = 10 // 额外的碰撞检测缓冲区

  return nodes.some((node) => {
    if (node === excludeNode) return false
    const pos = node.position()
    return x < pos.x + NODE_WIDTH + buffer && x + NODE_WIDTH + buffer > pos.x && y < pos.y + NODE_HEIGHT + buffer && y + NODE_HEIGHT + buffer > pos.y
  })
}

// 找到可用的位置
const findAvailablePosition = (graph: Graph, baseX: number, baseY: number, node: any) => {
  let x = baseX
  let y = baseY

  // 如果当前位置有碰撞，向右偏移直到找到可用位置
  while (hasCollision(graph, x, y, node)) {
    x += NODE_WIDTH + 20
  }

  return { x, y }
}

const createGraph = () => {
  if (!containerRef.value) return

  const graph = new Graph({
    container: containerRef.value,
    grid: true,
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      modifiers: ['ctrl', 'meta']
    },
    connecting: {
      enabled: false
    },
    panning: true,
    interacting: {
      nodeMovable: true
    }
  })

  // 添加节点拖动结束事件
  graph.on('node:moved', ({ node }) => {
    const edges = graph.getConnectedEdges(node)
    edges.forEach((edge) => {
      const source = edge.getSource()
      const target = edge.getTarget()
      edge.setSource(source)
      edge.setTarget(target)
    })
  })

  // 添加右键菜单事件
  graph.on('cell:contextmenu', ({ cell, e }) => {
    handleContextMenu(e, cell)
  })

  // 点击空白处关闭右键菜单
  graph.on('blank:click', () => {
    closeContextMenu()
  })

  // 点击节点关闭右键菜单
  graph.on('cell:click', ({ cell }) => {
    closeContextMenu()
    const nodeData = cell.getData()
    emit('nodeClick', nodeData)
  })

  graphRef.value = graph
  return graph
}

const renderTree = (graph: Graph, nodeData: OrgNode, parentNode?: any, x = 300, y = 50) => {
  // 找到可用位置
  const { x: availableX, y: availableY } = findAvailablePosition(graph, x, y, null)

  const node = graph.addNode({
    x: availableX,
    y: availableY,
    shape: 'org-node-person',
    data: {
      ...nodeData,
      style: { ...props.nodeStyle, ...nodeData.style },
      collapsed: nodeData.collapsed || false
    }
  })

  if (parentNode) {
    graph.addEdge({
      source: parentNode,
      target: node,
      connector: {
        name: 'rounded'
      },
      attrs: {
        line: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          targetMarker: null,
          sourceMarker: null
        }
      },
      router: {
        name: 'er',
        args: {
          direction: 'V'
        }
      }
    })
  }

  if (nodeData.children && !nodeData.collapsed) {
    const childWidth = NODE_WIDTH + VERTICAL_GAP // 节点宽度 + 间距
    const startX = availableX - ((nodeData.children.length - 1) * childWidth) / 2

    nodeData.children.forEach((child, index) => {
      const baseChildX = startX + index * childWidth
      renderTree(graph, child, node, baseChildX, availableY + NODE_HEIGHT + VERTICAL_GAP)
    })
  }

  return node
}

const initGraph = () => {
  const graph = graphRef.value ? graphRef.value : createGraph()
  if (!graph) return

  graph.clearCells()
  
  // 渲染每个根节点
  props.data.forEach((rootNode, index) => {
    const startX = 300 + index * (NODE_WIDTH + VERTICAL_GAP)
    renderTree(graph, rootNode, undefined, startX, 50)
  })

  // Center and fit content
  graph.centerContent()
  graph.zoomToFit({ padding: 20 })
}

// Initialize graph when component is mounted
onMounted(() => {
  initGraph()
})

// Clean up when component is unmounted
onUnmounted(() => {
  if (graphRef.value) {
    graphRef.value.dispose()
  }
})

// Watch for data changes and re-render
watch(
  () => props.data,
  () => {
    console.log('data changed')
    initGraph()
  },
  { deep: true, immediate: true }
)

// Watch for nodeStyle changes
watch(
  () => props.nodeStyle,
  () => {
    initGraph()
  },
  { deep: true }
)

// 处理右键菜单
const handleContextMenu = (e: MouseEvent, cell: any) => {
  e.preventDefault()
  contextMenuVisible.value = true
  contextMenuPosition.value = {
    left: `${e.clientX}px`,
    top: `${e.clientY}px`
  }
  selectedCell.value = cell
  selectedNode.value = cell.getData()
}

// 关闭右键菜单
const closeContextMenu = () => {
  contextMenuVisible.value = false
}

// 处理编辑
const handleEdit = () => {
  isAddingNode.value = false
  sidebarVisible.value = true
  closeContextMenu()
}

// 处理添加子节点
const handleAdd = () => {
  isAddingNode.value = true
  sidebarVisible.value = true
  closeContextMenu()
}

// 处理删除
const handleDelete = () => {
  if (!selectedNode.value || !selectedCell.value) return
  const data = JSON.parse(JSON.stringify(props.data))
  function deleteChildById(nodes: OrgNode[], childId: string): OrgNode[] {
    return nodes.map(node => {
      if (node.id === childId) {
        return null
      }
      if (node.children) {
        node.children = node.children.filter(child => child.id !== childId)
        node.children.forEach(child => {
          if (child.children) {
            child.children = deleteChildById(child.children, childId)
          }
        })
      }
      return node
    }).filter(Boolean) as OrgNode[]
  }

  const newData = deleteChildById(data, selectedNode.value.id)
  closeContextMenu()
  emit('delete', selectedNode.value.id, newData)
}

// 关闭侧边栏
const closeSidebar = () => {
  sidebarVisible.value = false
  selectedNode.value = null
}

// 处理保存
const handleSave = (formData: Partial<OrgNode>) => {
  if (!selectedNode.value || !selectedCell.value) return
  if (isAddingNode.value) {
    emit('add', formData, selectedNode.value.id)
  } else {
    // 更新现有节点
    emit('edit', formData, selectedNode.value.id)
  }
  closeSidebar()
}
</script>

<style scoped>
.chart-container {
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.container {
  position: relative;
}
</style>
